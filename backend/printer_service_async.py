import os
import time
import asyncio
from dotenv import load_dotenv
from supabase import acreate_client, AClient

load_dotenv(dotenv_path=".env")

supabase: AClient


async def process_pending_messages():
    response = (
        await supabase.from_("messages").select("*").eq("status", "pending").execute()
    )
    if response.data:
        for message in response.data:
            print_message(message)


async def listen_for_messages():
    await supabase.realtime.connect()
    await (
        supabase.channel("new_messages")
        .on_postgres_changes(
            "INSERT", schema="public", table="messages", callback=print_message
        )
        .subscribe()
    )
    await supabase.realtime.listen()


def print_message(message):
    print(f"Printing message: {message}")
    # TODO: printer code here
    # mark_as_printed(message["id"])
    return


def mark_as_printed(message_id):
    supabase.from_("messages").update({"status": "printed"}).eq(
        "id", message_id
    ).execute()


async def main():
    global supabase
    supabase = await acreate_client(
        os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_SERVICE_ROLE_KEY")
    )
    await process_pending_messages()
    await listen_for_messages()


if __name__ == "__main__":
    asyncio.run(main())
