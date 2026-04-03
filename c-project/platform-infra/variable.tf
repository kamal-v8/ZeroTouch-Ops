variable "region" {
  default = "us-east-1"
}

variable "cluster_name" {
  default = "observability"
}

variable "environment" {
  default = "dev"
}

variable "node_type" {
  description = "Instance type for worker nodes"
  type        = string
  default     = "c7i-flex.large"
}

variable "node_count" {
  description = "Desired number of nodes in the node group"
  type        = number
  default     = 2
}
