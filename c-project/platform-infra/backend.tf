terraform {
  backend "s3" {
    bucket       = "my-bucket-ra-2026-v1-l73rn523"
    key          = "platform/terraform.tfstate"
    region       = "us-east-1"
    encrypt      = true
    use_lockfile = true
  }
}
