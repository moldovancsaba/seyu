import { fetchSheetData } from './utils/googleSheets.js';

async function test() {
  const data = await fetchSheetData();
  console.log('Header logo:', data.header.logo);
  console.log('Footer logo:', data.footer.logo);
}

test().catch(console.error);

