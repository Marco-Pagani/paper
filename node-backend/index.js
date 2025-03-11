import { createCanvas } from 'canvas'
import ReceiptPrinterEncoder from '@point-of-sale/receipt-printer-encoder'
import usb from 'usb'

const PRINTER_VENDOR_ID = 0x0fe6
const PRINTER_PRODUCT_ID = 0x811e
const PRINTER_ENDPOINT = 3

function initPrinter() {
  const printer = usb.findByIds(PRINTER_VENDOR_ID, PRINTER_PRODUCT_ID)

  if (printer) {
    printer.open()
    const printerIface = printer.interfaces[0]
    printerIface.claim()
    const endpoint = printerIface.endpoint(PRINTER_ENDPOINT)

    if (endpoint) {
      return { printer, endpoint }
    } else {
      console.error('No OUT endpoint found.')
      device.close()
    }
  } else {
    console.error('Printer not found.')
  }
}

function createImage(text) {
  // Create a canvas
  const width = 600 // Typical thermal printer width
  const height = 96 // Adjust to fit message size
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')

  // Background color (optional)
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, width, height)

  // Text styling
  ctx.fillStyle = '#000000'
  ctx.font = '50px Arial' // Use a font that supports Unicode and emojis
  ctx.fillText(text, 10, 40)

  // Convert canvas to image buffer
  return canvas
}

function encodeImage(encoder, image) {
  let result = encoder.initialize().image(image, image.width, image.height, 'floydsteinberg').encode()

  return result
}

function main() {
  const encoder = new ReceiptPrinterEncoder()
  const { printer, endpoint } = initPrinter()
  const message = createImage('Hello World 🔥')
  const encodedMessage = encodeImage(encoder, message)

  endpoint.transfer(encodedMessage, (error) => {
    if (error) console.error('Error sending data:', error)
    else console.log('Data sent!')
    printer.close()
  })
}

main()
