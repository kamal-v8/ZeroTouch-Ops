terraform {
  backend "s3" {
    bucket         = "my-bucket-ra-2026"
    key            = "platform/dev/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-lock"
    encrypt        = true
  }
}

provider "aws" {
  region = var.region
}

module "networking" {
  source = "../../modules/networking"

  cluster_name = var.cluster_name
  region       = var.region
  environment  = var.environment
}

module "eks" {
  source = "../../modules/eks"

  cluster_name = var.cluster_name
  region       = var.region
  subnet_ids   = module.networking.public_subnet_ids
  node_type    = var.node_type
  node_count   = var.node_count
  environment  = var.environment
}

output "cluster_name" {
  value = module.eks.cluster_name
}

output "cluster_endpoint" {
  value = module.eks.cluster_endpoint
}

output "vpc_id" {
  value = module.networking.vpc_id

}
