data "archive_file" "lambda_placeholder" {
  type        = "zip"
  output_path = "${path.module}/lambda_placeholder.zip"

  source {
    content  = "def handler(event, context): return {'statusCode': 200, 'body': 'placeholder'}"
    filename = "handler.py"
  }
}

resource "aws_lambda_function" "contact" {
  function_name    = "portfolio-contact"
  role             = aws_iam_role.lambda_exec.arn
  runtime          = "python3.12"
  handler          = "handler.handler"
  filename         = data.archive_file.lambda_placeholder.output_path
  source_code_hash = data.archive_file.lambda_placeholder.output_base64sha256

  timeout     = 10
  memory_size = 128

  environment {
    variables = {
      SENDER_EMAIL         = var.sender_email
      RECIPIENT_EMAIL      = var.recipient_email
      RECAPTCHA_SECRET_KEY = var.recaptcha_secret_key
    }
  }

  lifecycle {
    ignore_changes = [filename, source_code_hash]
  }
}
