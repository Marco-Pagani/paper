terraform {
  required_providers {
    supabase = {
      source  = "supabase/supabase"
      version = "~> 1.0"
    }
  }
}

variable "SUPABASE_ACCESS_TOKEN" {
  sensitive = true
}

provider "supabase" {
  access_token = var.SUPABASE_ACCESS_TOKEN
}
