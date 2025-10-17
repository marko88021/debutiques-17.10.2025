import fs from 'fs';
import path from 'path';

const localesDir = path.resolve(process.cwd(), 'public/locales');
const outputDir = path.resolve(process.cwd(), 'exports');

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Function to flatten a nested JSON object
function flattenObject(obj, parentKey = '') {
  let result = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = parentKey ? `${parentKey}.${key}` : key;
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        Object.assign(result, flattenObject(obj[key], newKey));
      } else {
        result[newKey] = obj[key];
      }
    }
  }
  return result;
}

async function convertJsonToCsv() {
  try {
    const languages = fs.readdirSync(localesDir);
    console.log(`Found languages: ${languages.join(', ')}`);

    for (const lang of languages) {
      const jsonFilePath = path.join(localesDir, lang, 'translation.json');
      if (fs.existsSync(jsonFilePath)) {
        console.log(`Processing ${lang}...`);
        const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
        const flattenedData = flattenObject(jsonData);

        let csvContent = 'key,translation\n';
        for (const key in flattenedData) {
          if (Object.prototype.hasOwnProperty.call(flattenedData, key)) {
            // Escape double quotes and wrap in double quotes if content contains comma or double quote
            const value = String(flattenedData[key]).replace(/"/g, '""');
            csvContent += `"${key}","${value}"\n`;
          }
        }

        const csvFileName = `${lang}_translation.csv`;
        const csvFilePath = path.join(outputDir, csvFileName);
        fs.writeFileSync(csvFilePath, csvContent, 'utf8');
        console.log(`✓ Successfully converted ${lang}/translation.json to ${csvFileName}`);
      } else {
        console.log(`⚠ Translation file not found for language: ${lang}`);
      }
    }
    console.log('\n🎉 All language files converted to CSV successfully!');
    console.log(`📁 CSV files are located in: ${outputDir}`);
  } catch (error) {
    console.error('❌ Error converting JSON to CSV:', error);
  }
}

convertJsonToCsv();