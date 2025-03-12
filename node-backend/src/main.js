import dotenv from 'dotenv'
import SupabaseClient from './lib/supabaseClient.js'
import Printer from './lib/printer.js'

dotenv.config()

// const supabaseClient = new SupabaseClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
const printer = new Printer()

// const printMessageCallback = (payload) => {
//   const message = payload.new
//   if (message && message.content) {
//     printer.printMessage(message.content)
//   }
// }

// supabaseClient.subscribeToChanges(printMessageCallback)

printer.initPrinter()
// messages.forEach(async (message) => {
//   await printer.printMessage(message)
// })

// printer.closePrinter()
