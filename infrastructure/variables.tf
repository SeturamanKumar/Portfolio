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
