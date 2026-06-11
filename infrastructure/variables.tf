variable "sender_email" {
  description = "Email address SES sends contact form message from. Must be verified in SES."
  type        = string
}

variable "recipient_email" {
  description = "Email address that receives contact from messages."
  type        = string
}

variable "recaptcha_secret_key" {
  description = "Google reCAPTCHA v3 secret key bot verification in Lambda."
  type        = string
  sensitive   = true
}

variable "cloudflare_api_token" {
  description = "Cloudflare API token with DNS edit permissions for seturaman.me zone."
  type        = string
  sensitive   = true
}

variable "cloudflare_zone_id" {
  description = "Cloudflare Zone ID for seturaman.me"
  type        = string
}

variable "aws_account_id" {
  description = "AWS account ID used for scoping IAM policy resources"
  type        = string
  sensitive   = true
}
