output "api_gateway_url" {
  description = "Base URL for API Gateway. Set as NEXT_PUBLIC_API_URL in Github secrets."
  value       = aws_apigatewayv2_stage.default.invoke_url
}

output "s3_bucket_name" {
  description = "S3 bucket name for frontend sync in Github Actions."
  value       = aws_s3_bucket.frontend.bucket
}

output "lambda_function_name" {
  description = "Lambda function name for Github Actions code deployment."
  value       = aws_lambda_function.contact.function_name
}

output "cloudfront_domain" {
  description = "CloudFront domain name. Add as CNAME in Namecheap."
  value       = aws_cloudfront_distribution.frontend.domain_name
}
