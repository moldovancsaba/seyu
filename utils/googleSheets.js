import fetch from 'node-fetch';
import { parse } from 'csv-parse/sync';

// Individual sheet URLs - replace these with your actual published sheet URLs
const SHEET_URLS = {
  META: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSdbki4EdJ_AIkBZXGw3lzmIQTck3jV8HmeMV7UHfKw5v3V3MZxE6eI85KkssJm1XG72JHnVHW3YCJB/pub?gid=0&single=true&output=csv',
  HEADER: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSdbki4EdJ_AIkBZXGw3lzmIQTck3jV8HmeMV7UHfKw5v3V3MZxE6eI85KkssJm1XG72JHnVHW3YCJB/pub?gid=1&single=true&output=csv',
  HERO: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSdbki4EdJ_AIkBZXGw3lzmIQTck3jV8HmeMV7UHfKw5v3V3MZxE6eI85KkssJm1XG72JHnVHW3YCJB/pub?gid=2&single=true&output=csv',
  FEATURES: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSdbki4EdJ_AIkBZXGw3lzmIQTck3jV8HmeMV7UHfKw5v3V3MZxE6eI85KkssJm1XG72JHnVHW3YCJB/pub?gid=3&single=true&output=csv',
  STATISTICS: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSdbki4EdJ_AIkBZXGw3lzmIQTck3jV8HmeMV7UHfKw5v3V3MZxE6eI85KkssJm1XG72JHnVHW3YCJB/pub?gid=4&single=true&output=csv',
  FOOTER: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSdbki4EdJ_AIkBZXGw3lzmIQTck3jV8HmeMV7UHfKw5v3V3MZxE6eI85KkssJm1XG72JHnVHW3YCJB/pub?gid=5&single=true&output=csv'
};

// Fallback to the original combined sheet URL
const COMBINED_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSdbki4EdJ_AIkBZXGw3lzmIQTck3jV8HmeMV7UHfKw5v3V3MZxE6eI85KkssJm1XG72JHnVHW3YCJB/pub?output=csv';
/**
 * Fetches data from a single sheet URL
 * @param {string} url - The URL of the sheet to fetch
 * @returns {Array} - Array of parsed records from the sheet
 */
async function fetchSingleSheet(url) {
  try {
    console.log(`Fetching sheet data from: ${url}`);
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch sheet: ${response.status} ${response.statusText}`);
    }
    
    const csvData = await response.text();
    
    // Parse CSV data
    const records = parse(csvData, {
      columns: true,
      skip_empty_lines: true
    });
    
    console.log(`Successfully parsed ${records.length} records from sheet`);
    return records;
  } catch (error) {
    console.error(`Error fetching sheet from ${url}:`, error);
    return [];
  }
}

/**
 * Fetches data from all individual sheets
 * @returns {Array} - Array of all records from all sheets
 */
async function fetchAllSheets() {
  try {
    const allRecords = [];
    
    // Fetch data from each sheet in parallel
    const sheetPromises = Object.entries(SHEET_URLS).map(async ([sheetName, url]) => {
      try {
        const records = await fetchSingleSheet(url);
        console.log(`Fetched ${records.length} records from ${sheetName} sheet`);
        return records;
      } catch (error) {
        console.error(`Failed to fetch ${sheetName} sheet:`, error);
        return [];
      }
    });
    
    // Wait for all sheet data to be fetched
    const sheetResults = await Promise.all(sheetPromises);
    
    // Combine all records
    sheetResults.forEach(records => {
      allRecords.push(...records);
    });
    
    console.log(`Combined ${allRecords.length} total records from all sheets`);
    return allRecords;
  } catch (error) {
    console.error("Error fetching all sheets:", error);
    throw error;
  }
}

/**
 * Fetches data using combined sheet as fallback if individual sheets fail
 * @returns {Array} - Array of all records
 */
async function fetchSheetDataWithFallback() {
  try {
    // Try individual sheets first
    const records = await fetchAllSheets();
    
    // If we got data from individual sheets, return it
    if (records && records.length > 0) {
      return records;
    }
    
    // Fallback to combined sheet
    console.log("No data from individual sheets, trying combined sheet URL");
    return await fetchSingleSheet(COMBINED_SHEET_URL);
  } catch (error) {
    console.error("Error in fetchSheetDataWithFallback:", error);
    // Final fallback - try the combined sheet directly
    return await fetchSingleSheet(COMBINED_SHEET_URL);
  }
}

export async function fetchSheetData() {
  try {
    // Get all records from sheets
    const records = await fetchSheetDataWithFallback();
    
    if (!records || records.length === 0) {
      console.error("No data returned from any sheets");
      throw new Error("No data available from Google Sheets");
    }
    // Initialize content structure to match content.json
    const content = {
      meta: { title: "" },
      header: { logo: "", navigation: [] },
      hero: { title: "", subtitle: "", description: "", buttons: [] },
      features: { title: "", items: [], buttons: [] },
      statistics: { items: [] },
      footer: { logo: "", links: [], copyright: "" }
    };

    // Temporary storage for grouped items
    const navItems = [];
    const heroButtons = [];
    const featureItems = [];
    const featureButtons = [];
    const statItems = [];
    const footerLinks = [];

    records.forEach(record => {
      const section = record.section;
      const key = record.key;
      const value = record.value;

      switch(section) {
        case 'meta':
          if (key === 'title') {
            content.meta.title = value;
          }
          break;

        case 'header':
          if (key === 'logo') {
            content.header.logo = value;
          } else if (key === 'navigation_item') {
            navItems.push({
              label: record.label,
              href: record.href
            });
          }
          break;

        case 'hero':
          if (['title', 'subtitle', 'description'].includes(key)) {
            content.hero[key] = value;
          } else if (key === 'button') {
            heroButtons.push({
              label: record.label,
              type: record.type
            });
          }
          break;

        case 'features':
          if (key === 'title') {
            content.features.title = value;
          } else if (key === 'item') {
            featureItems.push({
              title: record.title,
              description: record.description
            });
          } else if (key === 'button') {
            featureButtons.push({
              label: record.label,
              type: record.type
            });
          }
          break;

        case 'statistics':
          if (key === 'item') {
            statItems.push({
              number: record.number,
              label: record.label
            });
          }
          break;

        case 'footer':
          if (key === 'logo') {
            content.footer.logo = value;
          } else if (key === 'copyright') {
            content.footer.copyright = value;
          } else if (key === 'link') {
            footerLinks.push({
              label: record.label,
              href: record.href
            });
          }
          break;
      }
    });

    // Assign collected arrays to their respective sections
    content.header.navigation = navItems;
    content.hero.buttons = heroButtons;
    content.features.items = featureItems;
    content.features.buttons = featureButtons;
    content.statistics.items = statItems;
    content.footer.links = footerLinks;

    return content;
  } catch (error) {
    console.error('Error in fetchSheetData:', error);
    // Return default content structure as fallback
    return {
      meta: { title: "Seyu - Attract Fans!" },
      header: { logo: "", navigation: [] },
      hero: { title: "", subtitle: "", description: "", buttons: [] },
      features: { title: "", items: [], buttons: [] },
      statistics: { items: [] },
      footer: { logo: "", links: [], copyright: "© 2023 Seyu. All rights reserved." }
    };
  }
}

/**
 * Validates the content structure to ensure all required fields are present
 * @param {Object} content - The content object to validate
 * @returns {Object} - The validated and possibly fixed content object
 */
export function validateContent(content) {
  try {
    const defaultContent = {
      meta: { title: "Seyu - Attract Fans!" },
      header: { logo: "", navigation: [] },
      hero: { title: "", subtitle: "", description: "", buttons: [] },
      features: { title: "", items: [], buttons: [] },
      statistics: { items: [] },
      footer: { logo: "", links: [], copyright: "© 2023 Seyu. All rights reserved." }
    };
    
    // Ensure each section exists
    for (const section in defaultContent) {
      if (!content[section]) {
        console.warn(`Missing section: ${section}, using default`);
        content[section] = defaultContent[section];
      }
      
      // Ensure each property in the section exists
      for (const prop in defaultContent[section]) {
        if (content[section][prop] === undefined) {
          console.warn(`Missing property: ${section}.${prop}, using default`);
          content[section][prop] = defaultContent[section][prop];
        }
      }
    }
    
    return content;
  } catch (error) {
    console.error('Error validating content:', error);
    return content;
  }
}

