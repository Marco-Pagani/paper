import os
import time
from dotenv import load_dotenv
from supabase import create_client, Client
from escpos.printer import Usb

load_dotenv(dotenv_path=".env")
supabase: Client = create_client(
    os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_SERVICE_ROLE_KEY")
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
    print(f"Printing message: {message}")
    # TODO: printer code here
    # mark_as_printed(message["id"])
    return


def mark_as_printed(message_id):
    supabase.from_("messages").update({"status": "printed"}).eq(
        "id", message_id
    ).execute()


def main():

    p = Usb(0x04B8, 0x0202, 0, profile="RP326")
    p.text("Hello World\n")
    p.image("logo.gif")
    p.barcode("4006381333931", "EAN13", 64, 2, "", "")
    p.cut()

    # while True:
    #     process_pending_messages()
    #     time.sleep(10)
    # listen_for_messages()


if __name__ == "__main__":
    main()
