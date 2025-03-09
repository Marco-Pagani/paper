import os
import time
from datetime import datetime
from zoneinfo import ZoneInfo
from dotenv import load_dotenv
from supabase import create_client, Client
from escpos.printer import Usb

load_dotenv(dotenv_path=".env")

supabase: Client = create_client(
    os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_SERVICE_ROLE_KEY")
)

printer = Usb(
    idVendor=0x0FE6, idProduct=0x811E, in_ep=0x81, out_ep=0x03, profile="RP326"
)


def process_pending_messages():
    response = supabase.from_("messages").select("*").eq("status", "pending").execute()
    if response.data:
        for message in response.data:
            print_message(message)


# TODO: This requires the async client which is undocumented
def listen_for_messages():
    response = (
        supabase.channel("new_messages")
        .on_postgres_changes(
            "INSERT", schema="public", table="messages", callback=print_message
        )
        .subscribe()
    )


def print_message(message):
    send_date_time = (
        datetime.fromisoformat(message["created_at"])
        .astimezone(ZoneInfo("America/New_York"))
        .strftime("%B %d, %Y @ %I:%M %p")
    )
    printer.textln(f"Sent by {message['sender']} on {send_date_time}")
    printer.textln(message["content"])
    printer.textln("------------------------------------------------")
    # mark_as_printed(message["id"])
    return


def mark_as_printed(message_id):
    supabase.from_("messages").update({"status": "printed"}).eq(
        "id", message_id
    ).execute()


def main():
    process_pending_messages()

    # while True:
    #     process_pending_messages()
    #     time.sleep(10)
    # listen_for_messages()


if __name__ == "__main__":
    main()
