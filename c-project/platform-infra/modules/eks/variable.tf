variable "cluster_name" {
  description = "Name of the EKS cluster"
  type        = string
}

variable "region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "subnet_ids" {
  description = "List of subnet IDs for the cluster"
  type        = list(string)
}

variable "node_type" {
  description = "Instance type for worker nodes"
  type        = string
  default     = "c7i-flex.large"
}

variable "node_count" {
  description = "Desired number of nodes"
  type        = number
  default     = 2
}

variable "environment" {
  description = "Environment name (dev/staging/prod)"
  type        = string
}
