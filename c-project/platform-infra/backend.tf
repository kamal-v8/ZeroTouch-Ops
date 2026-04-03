terraform {
  backend "s3" {
    bucket         = "my-bucket-ra-2026"
    key            = ".terraform/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-lock"
    encrypt        = true
  }
}
