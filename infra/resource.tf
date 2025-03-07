# Define a linked project variable as user input
variable "linked_project" {
  type = string
}

import {
  to = supabase_project.production
  id = var.linked_project
}

# Create a project resource
resource "supabase_project" "production" {
  organization_id   = "<your-org-id>"
  name              = "tf-example"
  database_password = "<your-password>"
  region            = "ap-southeast-1"

  lifecycle {
    ignore_changes = [database_password]
  }
}
