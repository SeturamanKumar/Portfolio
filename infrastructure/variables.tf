variable "sender_email" {
  description = "Email address SES sends contact form message from. Must be verified in SES."
  type        = string
}

variable "recipient_email" {
  description = "Email address that receives contact from messages."
  type        = string
}
