import { createCanvas, registerFont } from 'canvas'
import ReceiptPrinterEncoder from '@point-of-sale/receipt-printer-encoder'
import usb from 'usb'

const PRINTER_VENDOR_ID = 0x0fe6
const PRINTER_PRODUCT_ID = 0x811e
const PRINTER_ENDPOINT = 3

class Printer {
  constructor() {
    this.encoder = new ReceiptPrinterEncoder()
  }

  initPrinter() {
    const printer = usb.findByIds(PRINTER_VENDOR_ID, PRINTER_PRODUCT_ID)

    if (printer) {
      printer.open()
      const printerIface = printer.interfaces[0]
      printerIface.claim()
      const endpoint = printerIface.endpoint(PRINTER_ENDPOINT)

      if (endpoint) {
        this.printer = printer
        this.endpoint = endpoint
      } else {
        console.error('No OUT endpoint found.')
        printer.close()
      }
    } else {
      console.error('Printer not found.')
    }

    registerFont('assets/IBMPlexSans-Medium.otf', { family: 'Plex' })
  }

  wrapText(text, maxWidth) {
    const words = text.split(' ')
    let lines = []
    let currentLine = words[0]

    for (let i = 1; i < words.length; i++) {
      let word = words[i]
      if ((currentLine + ' ' + word).length <= maxWidth) {
        currentLine += ' ' + word
      } else {
        if (word.length > 15) {
          while (word.length > 0) {
            const part = word.slice(0, maxWidth - currentLine.length - 1) + '-'
            lines.push(currentLine + ' ' + part)
            word = word.slice(maxWidth - currentLine.length - 1)
            currentLine = ''
          }
        } else {
          lines.push(currentLine)
          currentLine = word
        }
      }
    }
    lines.push(currentLine)
    return lines.join('\n')
  }

  createImage(message) {
    const lines = this.wrapText(message.content, 50).split('\n')

    const width = 640
    const lineHeight = 30
    let height = (lines.length + 4) * lineHeight // ceiling to nearest multiple of 8
    height += 8 - (height % 8)

    const canvas = createCanvas(width, height)
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = '#000000'
    ctx.font = '24px "Plex"'
    ctx.textDrawingMode = 'glyph'

    // date
    const date = new Date(message.created_at)
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }
    const formattedDate = date.toLocaleString('en-US', options)
    ctx.fillText(formattedDate, 0, lineHeight)

    // message
    lines.forEach((line, index) => {
      ctx.fillText(line, 0, (index + 3) * lineHeight)
    })
    // sender
    ctx.fillText(`-${message.sender || 'Anonymous'}`, 0, (lines.length + 3) * lineHeight)
    // horizontal line
    ctx.fillRect(0, (lines.length + 4) * lineHeight, width, 2)

    return canvas
  }

  encodeImage(image) {
    return this.encoder.initialize().image(image, image.width, image.height, 'floydsteinberg', 50).encode()
  }

  async printMessage(message) {
    const encodedMessage = this.encodeImage(this.createImage(message))

    return new Promise((resolve, reject) => {
      this.endpoint.transfer(encodedMessage, (error) => {
        if (error) {
          console.error('Error sending data:', error)
          reject(error)
        } else {
          console.log('Data sent!')
          resolve()
        }
      })
    })
  }

  closePrinter() {
    this.printer.close()
  }
}

export default Printer
