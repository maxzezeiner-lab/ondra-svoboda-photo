import { GalleryItem } from "@/types";

// TODO: Replace imagePlaceholder with real image paths once photos are available.
// Structure: { id, title, category, description, imagePlaceholder }
// When adding real images: add an `image` field pointing to /public/gallery/<filename>.jpg

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "1",
    title: "Poker Table with custom Logo",
    category: "poker",
    description:
      "10-player oval poker table with Red felt and custom Logo. ",
     imagePlaceholder: "Premium Oval Poker Table",
     image: "/images/gallery/King_Shark_Poker_Table.jpeg",
  },
  {
    id: "2",
    title: "Poker table with pit and LED lights",
    category: "poker",
    description:
      "Blue Poker Table with Pit and LED lights.",
    imagePlaceholder: "Blackjack Table — Royal Blue / Chrome Legs",
    image: "/images/gallery/Blue_Poker_Table.jpeg"
  },
  // {
    //id: "3",
    //title: "Roulette Table — Full Setup",
    //category: "roulette",
    //description:
      //"Full roulette table with premium layout mat, brass fixtures, and custom dealer position. Part of a casino renovation project.",
    //imagePlaceholder: "Roulette Table — Premium Gold Layout",
  //},
 // {
   // id: "4",
    //title: "Custom VIP Poker Table",
    //category: "custom",
    //description:
    //  "8-player bean-shaped VIP poker table with custom club logo embroidered on the felt, burgundy vinyl, and premium light rail.",
    //imagePlaceholder: "Custom Poker Table — Burgundy / Logo Felt",
  //},
  //{
    //id: "5",
    //title: "High Stool Set — Black Leather",
    //category: "chairs",
    //description:
      //"Set of 9 high stools with black leather upholstery and polished brass feet. Matching a premium home game room setup.",
    //imagePlaceholder: "High Stools — Black / Brass",
  //},
  {
    id: "6",
    title: "Custom Casino Chips",
    category: "chips",
    description:
      "Chip set with denomination values. Premium clay composite material.",
    imagePlaceholder: "Custom Chips — Club Logo / Gold",
    image: "/images/gallery/Zetony_King_Shark_CashGame_8.jpeg",
  },
  //{
   // id: "7",
    //title: "Blackjack Table — Dark Edition",
    //category: "blackjack",
    //description:
      //"Charcoal felt with dark brown vinyl and matte black legs. Minimalist design for a modern bar installation.",
    //imagePlaceholder: "Blackjack Table — Charcoal / Dark Edition",
  //},
  //{
    //id: "8",
    //title: "Home Poker Room — Full Package",
    //category: "poker",
    //description:
      //"Complete home poker room package: custom oval table, 8 matching stools, and 300 custom chips. Gold and black color scheme.",
    //imagePlaceholder: "Home Poker Room — Full Package",
  //},
  //{
    //id: "9",
    //title: "Low Office Chair Set",
    //category: "chairs",
    //description:
     // "6 low office-style casino chairs with armrests, deep burgundy upholstery, and cushioned back support for extended sessions.",
    //imagePlaceholder: "Low Chairs — Burgundy / Cushioned",
  //},
];
