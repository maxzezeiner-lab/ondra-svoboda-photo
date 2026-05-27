// ============================================================
// PRICING CONFIGURATION
// Edit all prices here — do not hardcode prices in components.
// All prices are in EUR (€).
// ============================================================

export const PRICES = {
  table: {
    base: {
      poker: 1200,
      blackjack: 1100,
      roulette: 2500,
      custom: 1500,
    },
    size: {
      small: 0,
      standard: 0,
      large: 300,
    },
    shape: {
      oval: 0,
      bean: 150,
      round: 100,
    },
    pit: {
      yes: 200,
      no: 0,
    },
    legs: {
      A: 0,
      B: 150,
      C: 250,
      D: 400,
      E: 600,
    },
    felt: {
      standard: 0,
      customHex: 80,
      ownDesign: 200,
    },
    matDesign: {
      plain: 0,
      simpleLine: 100,
      premiumBorder: 250,
      custom: 400,
    },
    vinyl: {
      standard: 0,
      premium: 200,
      customHex: 300,
    },
    chipRack: {
      yes: 120,
      no: 0,
    },
    cupHolder: {
      perCup: 25,
      materialBrass: 20, // extra per cup vs mosas
      sizeBig: 15,       // extra per cup vs small
    },
    dealerMaterial: {
      metal: 50,
      cushioned: 0,
      nothing: 0,
    },
    accessories: {
      lightRail: 180,
      dropBox: 90,
      billSlot: 60,
    },
  },
  chair: {
    base: {
      highStool: 180,
      lowOfficeChair: 220,
    },
    armrests: {
      yes: 40,
      no: 0,
    },
  },
  chips: {
    base: {
      A: 0.8,  // price per chip
      B: 1.2,
      C: 2.0,
    },
  },
} as const;

// ============================================================
// CONTENT / TRANSLATIONS
// Add Czech translations under the "cs" key when ready.
// ============================================================

export const CONTENT = {
  en: {
    nav: {
      home: "Home",
      tables: "Tables",
      chairs: "Chairs",
      chips: "Chips",
      gallery: "Gallery",
      about: "About",
      contact: "Contact",
      customize: "Customize Now",
    },
    hero: {
      title: "Custom Casino Tables Built for Champions",
      subtitle:
        "From intimate home game rooms to professional casino floors — we craft bespoke poker, blackjack, and roulette tables tailored to your exact vision.",
      cta1: "Customize Your Table",
      cta2: "Contact Us",
    },
    process: {
      title: "How It Works",
      steps: [
        {
          number: "01",
          title: "Choose Your Product",
          desc: "Select from poker, blackjack, roulette, or a fully custom table.",
        },
        {
          number: "02",
          title: "Customize Every Detail",
          desc: "Pick size, shape, felt color, vinyl, cup holders, and accessories.",
        },
        {
          number: "03",
          title: "Get Your Estimate",
          desc: "See an instant price estimate as you configure your table.",
        },
        {
          number: "04",
          title: "We Contact You",
          desc: "Submit your configuration and our team will reach out to finalize your order.",
        },
      ],
    },
    footer: {
      tagline: "Premium custom casino tables and accessories crafted with precision.",
      rights: "© 2024 King Shark Poker. All rights reserved.",
    },
  },
  cs: {
    // TODO: Add Czech translations here
    nav: {
      home: "Domů",
      tables: "Stoly",
      chairs: "Židle",
      chips: "Žetony",
      gallery: "Galerie",
      about: "O nás",
      contact: "Kontakt",
      customize: "Konfigurovat",
    },
    hero: {
      title: "Zakázkové kasinové stoly pro vítěze",
      subtitle:
        "Od soukromých herních místností až po profesionální kasina — vyrábíme stoly přesně podle vašich představ.",
      cta1: "Konfigurovat stůl",
      cta2: "Kontaktujte nás",
    },
    process: {
      title: "Jak to funguje",
      steps: [
        { number: "01", title: "Zvolte produkt", desc: "Vyberte z pokeru, blackjacku, rulety nebo vlastního stolu." },
        { number: "02", title: "Přizpůsobte detaily", desc: "Zvolte velikost, tvar, barvu sukna, vinyl, pohárky a příslušenství." },
        { number: "03", title: "Získejte odhad ceny", desc: "Okamžitý odhad ceny při konfiguraci." },
        { number: "04", title: "Kontaktujeme vás", desc: "Odešlete konfiguraci a náš tým vás kontaktuje." },
      ],
    },
    footer: {
      tagline: "Prémiové zakázkové kasinové stoly s precizním zpracováním.",
      rights: "© 2024 King Shark Poker. Všechna práva vyhrazena.",
    },
  },
};
