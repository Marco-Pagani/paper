from supabase import create_client, Client
import time
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv(dotenv_path="../.env")

# Supabase credentials
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def fetch_messages():
    """Fetch unprinted messages from Supabase."""
    response = supabase.from_("messages").select(
        "*").eq("status", "pending").execute()
    return response.data if response.data else []

def mark_as_printed(message_id):
    """Update message status to 'printed'."""
    supabase.from_("messages").update(
        {"status": "printed"}).eq("id", message_id).execute()

def main():
    while True:
        messages = fetch_messages()
        if messages:
            for message in messages:
                # print_message(message["content"])
                mark_as_printed(message["id"])  # Mark message as printed
                print(message)
        else:
            print("No messages to print")
        time.sleep(10)  # Poll every 10 seconds

if __name__ == "__main__":
    main()
