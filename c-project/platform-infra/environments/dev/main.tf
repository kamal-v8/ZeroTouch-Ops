# environments/dev/main.tf

terraform {
  backend "s3" {
    bucket       = "my-bucket-ra-2026-v1-l73rn523" # Your actual bucket name
    key          = "platform/dev/terraform.tfstate"
    region       = "us-east-1"
    encrypt      = true
    use_lockfile = true
  }
}

provider "aws" {
  region = var.region
}

# ====================== NETWORKING ======================
module "networking" {
  source = "../../modules/networking"

  cluster_name = var.cluster_name
  region       = var.region
  environment  = var.environment
}

# ====================== EKS ======================
module "eks" {
  source = "../../modules/eks"

  cluster_name = var.cluster_name
  region       = var.region
  subnet_ids   = module.networking.public_subnet_ids
  node_type    = var.node_type
  node_count   = var.node_count
  environment  = var.environment
}

# ====================== OUTPUTS ======================
output "cluster_name" {
  value = module.eks.cluster_name
}

output "cluster_endpoint" {
  value = module.eks.cluster_endpoint
}

output "vpc_id" {
  value = module.networking.vpc_id
}

output "public_subnet_ids" {
  value = module.networking.public_subnet_ids
}
