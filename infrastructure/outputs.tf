# This route is for now debugging
output "api_gateway_url" {
  description = "Base URL for API Gateway. Set as NEXT_PUBLIC_API_URL in Github secrets."
  value       = trimsuffix(aws_apigatewayv2_stage.default.invoke_url, "/")
  sensitive   = true
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

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID for cache invalidation."
  value       = aws_cloudfront_distribution.frontend.id
}

output "api_custom_domain" {
  description = "API Gateway regional domain name. Used as CNAME target in Cloudflare for api.seturaman.me"
  value       = aws_apigatewayv2_domain_name.api.domain_name_configuration[0].target_domain_name
}

output "github_actions_role_arn" {
  description = "IAM role ARN for GitHub Actions OIDC. Add as AWS_GITHUB_ACTIONS_ROLE_ARN in GitHub secrets."
  value       = aws_iam_role.github_actions.arn
  sensitive   = true
}
