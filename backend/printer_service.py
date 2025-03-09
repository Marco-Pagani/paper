import os
import time
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv(dotenv_path="../.env")
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

def process_pending_messages():
    response = supabase.from_("messages").select(
        "*").eq("status", "pending").execute()
    if response.data:
        for message in response.data:
            print_message(message)

def listen_for_messages():
    response = (
    supabase.channel("new_messages")
    .on_postgres_changes("INSERT", schema="public", table="messages", callback=print_message)
    .subscribe()
)

def print_message(message):
    print(f"Printing message: {message}")
    # TODO: printer code here
    # mark_as_printed(message["id"])
    return

def mark_as_printed(message_id):
    supabase.from_("messages").update({"status": "printed"}).eq("id", message_id).execute()
    

def main():
   process_pending_messages()
   listen_for_messages()

if __name__ == "__main__":
    main()
