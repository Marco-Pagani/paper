import { createCanvas, loadImage } from 'canvas'
import ReceiptPrinterEncoder from '@point-of-sale/receipt-printer-encoder';
import usb from 'usb';


function createImage(text) {
  // Create a canvas
  const width = 600; // Typical thermal printer width
  const height = 96; // Adjust to fit message size
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Background color (optional)
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);

  // Text styling
  ctx.fillStyle = '#000000';
  ctx.font = '50px Arial'; // Use a font that supports Unicode and emojis
  ctx.fillText(text, 10, 40);

  // Convert canvas to image buffer
  return canvas
}

let encoder = new ReceiptPrinterEncoder();

// const image = await loadImage()

const image = createImage('Hello World 🔥')

let result = encoder
  .initialize()
  .image(image, image.width, image.height, 'floydsteinberg')
  .encode();

const device = usb.findByIds(0x0FE6, 0x811E);


if (device) {
  device.open();
  const iface = device.interfaces[0];
  iface.claim();
  const endpoint = iface.endpoint(3)

  if (endpoint) {
    // const data = Buffer.from('Hello, printer!\n', 'utf-8');
    endpoint.transfer(result, (error) => {
      if (error) console.error('Error sending data:', error);
      else console.log('Data sent!');
      device.close();
    });
  } else {
    console.error('No OUT endpoint found.');
    device.close();
  }
} else {
  console.error('Printer not found.');
}