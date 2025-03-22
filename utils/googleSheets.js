import fetch from 'node-fetch';
import { parse } from 'csv-parse/sync';

// Single sheet URL - replace with your published sheet URL when you create the combined sheet
const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSdbki4EdJ_AIkBZXGw3lzmIQTck3jV8HmeMV7UHfKw5v3V3MZxE6eI85KkssJm1XG72JHnVHW3YCJB/pub?gid=1850789130&single=true&output=csv';

export async function fetchSheetData() {
  const defaultContent = {
    meta: { 
      title: "Seyu - Attract Fans!" 
    },
    header: { 
      logo: "/images/seyu_logo_horizontal_white.PNG",
      navigation: [
        { label: "Seyu Services", href: "#services" },
        { label: "Log in", href: "#login" },
        { label: "Get Started", href: "#getstarted" }
      ] 
    },
    hero: { 
      title: "Lost the way to attract Fans?",
      subtitle: "We will Help You Win Them Back",
      description: "Our real-time fan engagement platform entertains, connects, and tracks your audience instantly — so you never miss a moment or lose a fan again!",
      buttons: [
        { label: "Report Lost Fans!", type: "primary" },
        { label: "How we help you!", type: "secondary" }
      ]
    },
    features: { 
      title: "Next-Level Fan Engagement",
      items: [
        { 
          title: "Real-Time Stadium Moments",
          description: "Bring fans closer with real-time, in-stadium experiences. Display their shared joy and support live on your digital surfaces."
        },
        {
          title: "Secure Sponsor Exposure",
          description: "Give sponsors guaranteed visibility. Every fan photo includes built-in, brand-safe presence across all digital displays."
        },
        {
          title: "Stronger Fan & Brand Bonds",
          description: "Deepen connections both ways — with your fans and with sponsors — through our smart, scalable engagement platform."
        }
      ],
      buttons: [
        { label: "I want Fan Feed!", type: "primary" },
        { label: "Cherish Connection!", type: "secondary" }
      ]
    },
    statistics: { 
      items: [
        { 
          number: "35%",
          label: "Boost in Live Fan Engagement - Real-time interactions on stadium screens drive deeper, measurable audience participation."
        },
        {
          number: "360°",
          label: "Fully Automated Brand Activation - Turn-key solution for ATL and BTL campaigns — no extra work, maximum impact."
        },
        {
          number: "100/100",
          label: "Curated Fan-Generated Content - Every image is reviewed and brand-safe, ready for instant, on-screen display."
        }
      ] 
    },
    footer: { 
      logo: "Seyu",
      links: [
        { label: "About", href: "#" },
        { label: "Privacy", href: "#" },
        { label: "Terms", href: "#" },
        { label: "Contact", href: "#" }
      ],
      copyright: "© {year} Seyu. All rights reserved."
    }
  };

  try {
    console.log('Fetching sheet data from:', SHEET_URL);
    const response = await fetch(SHEET_URL);
    
    if (!response.ok) {
      console.warn('Failed to fetch sheet data, using default content');
      return defaultContent;
    }

    const csvData = await response.text();
    const records = parse(csvData, {
      columns: true,
      skip_empty_lines: true
    });

    console.log(`Fetched ${records.length} records from sheet`);

    if (!records || records.length === 0) {
      console.warn('No data in sheet, using default content');
      return defaultContent;
    }

    // Initialize content structure with default values
    const content = {...defaultContent};

    // Temporary storage for grouped items
    const navItems = [];
    const heroButtons = [];
    const featureItems = [];
    const featureButtons = [];
    const statItems = [];
    const footerLinks = [];
    records.forEach(record => {
      const section = record.section?.toLowerCase();
      const key = record.key?.toLowerCase();

      switch(section) {
        case 'meta':
          if (key === 'title') {
            content.meta.title = record.value || content.meta.title;
          }
          break;

        case 'header':
          if (key === 'logo') {
            content.header.logo = record.label || content.header.logo;
          } else if (key === 'navigation_item') {
            navItems.push({
              label: record.label || "",
              href: record.href || "#"
            });
          }
          break;

        case 'hero':
          if (key === 'title') {
            content.hero.title = record.title || content.hero.title;
          } else if (key === 'subtitle') {
            content.hero.subtitle = record.subtitle || content.hero.subtitle;
          } else if (key === 'description') {
            content.hero.description = record.description || content.hero.description;
          } else if (key === 'button') {
            heroButtons.push({
              label: record.label || "",
              type: record.type || "primary"
            });
          }
          break;

        case 'features':
          if (key === 'title') {
            content.features.title = record.title || content.features.title;
          } else if (key === 'item') {
            featureItems.push({
              title: record.title || "",
              description: record.description || ""
            });
          } else if (key === 'button') {
            featureButtons.push({
              label: record.label || "",
              type: record.type || "primary"
            });
          }
          break;

        case 'statistics':
          if (key === 'item') {
            statItems.push({
              number: record.number || "",
              label: record.label || ""
            });
          }
          break;

        case 'footer':
          if (key === 'logo') {
            content.footer.logo = record.value || content.footer.logo;
          } else if (key === 'copyright') {
            content.footer.copyright = record.label || content.footer.copyright;
          } else if (key === 'link') {
            footerLinks.push({
              label: record.label || "",
              href: record.href || "#"
            });
          }
          break;
      }
    });

    // Assign collected arrays to their respective sections only if we have new items
    if (navItems.length > 0) content.header.navigation = navItems;
    if (heroButtons.length > 0) content.hero.buttons = heroButtons;
    if (featureItems.length > 0) content.features.items = featureItems;
    if (featureButtons.length > 0) content.features.buttons = featureButtons;
    if (statItems.length > 0) content.statistics.items = statItems;
    if (footerLinks.length > 0) content.footer.links = footerLinks;

    return content;
  } catch (error) {
    console.error('Error fetching sheet data:', error);
    // Return default content structure as fallback
    return defaultContent;
  }
}

