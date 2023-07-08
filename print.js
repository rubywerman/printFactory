const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Desired file sizes in inches
const fileSizes = [
  { width: 5, height: 7 },
  { width: 8, height: 10 },
  { width: 9, height: 12 },
  { width: 11, height: 14 },
  { width: 16, height: 20 },
  { width: 18, height: 24 },
  { width: 24, height: 36 }
];

async function resizeImage(inputPath, outputPath, width, height) {
  await sharp(inputPath)
    .resize(width * 900, height * 900)
    .withMetadata({ density: 300 })
    .toFile(outputPath);
}

async function generateFileSizes(inputPath) {
  try {

    const outputFolder = 'output';
    if (!fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder);
    }

    for (const size of fileSizes) {
      const { width, height } = size;

      const outputPath = path.join(outputFolder, `${contentName}_${width}x${height}.jpg`);

      await resizeImage(inputPath, outputPath, width, height);

      console.log(`Generated ${outputPath}`);
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// specify the path to your image
const contentName = 'westernwoman';
const inputPath = `img/${contentName}-transformed.jpeg`;

generateFileSizes(inputPath);
