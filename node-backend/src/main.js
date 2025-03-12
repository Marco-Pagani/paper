import dotenv from 'dotenv'
import SupabaseClient from './lib/supabaseClient.js'
import Printer from './lib/printer.js'

// set up printer
const printer = new Printer()
printer.initPrinter()

// set up client
dotenv.config()
const supabaseClient = new SupabaseClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

// print any pending messages
const queuedMessages = await supabaseClient.getQueuedMessages()
queuedMessages.forEach(async (message) => {
  await printer.printMessage(message)
  await supabaseClient.markPrinted(message.id)
})

// listen for new messages
supabaseClient.subscribeToChanges(async (payload) => {
  const message = payload.new
  if (message && message.content) {
    await printer.printMessage(message)
    await supabaseClient.markPrinted(message.id)
  }
})
