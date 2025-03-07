# import {
#   to = supabase_project.paper
#   id = [SUPABASE_PROJECT_ID]
# }

variable "SUPABASE_DB_PASSWORD" {
  sensitive = true
}
variable "SUPABASE_ORGANIZATION_ID" {
  sensitive = true
}

resource "supabase_project" "paper" {
  organization_id   = var.SUPABASE_ORGANIZATION_ID
  name              = "paper.pagani.io"
  instance_size     = null
  database_password = var.SUPABASE_DB_PASSWORD
  region            = "us-east-1"

  lifecycle {
    ignore_changes = [database_password]
  }
}

