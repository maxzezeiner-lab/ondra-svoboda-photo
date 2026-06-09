export interface TableConfig {
  type: "poker" | "blackjack" | "roulette" | "custom" | null;
  size: "small" | "standard" | "large";
  shape: "oval" | "bean" | "round";
  pit: boolean;
  legs: "A" | "B" | "C" | "D" | "E";
  feltMode: "color" | "design";
  feltColorId: string;
  feltCustomHex: string;
  feltDesign: "A" | "B" | "C" | "D" | "custom";
  feltDesignFile: string;
  uploadedLogoName: string;
  vinylType: "standard" | "premium" | "custom";
  vinylColorId: string;
  vinylCustomHex: string;
  chipRack: boolean;
  cupHolderCount: number;
  cupHolderMaterial: "mosas" | "brass";
  cupHolderSize: "small" | "big";
  dealerMaterial: "metal" | "cushioned" | "nothing";
  feetColor: "black" | "gold" | "brass" | "chrome" | "custom";
  feetCustomHex: string;
  accessories: string[];
}

export interface ChairConfig {
  type: "highStool" | "lowOfficeChair";
  armrests: boolean;
  colorId: string;
  colorCustomHex: string;
  amount: number;
  notes: string;
}

export interface ChipsConfig {
  material: "A" | "B" | "C";
  designColorId: string;
  designOwnUpload: boolean;
  designFileName: string;
  amount: number;
  notes: string;
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  message: string;
}

export interface SubmissionPayload {
  configurationType: "Table" | "Chair" | "Chips";
  customer: CustomerInfo;
  configuration: TableConfig | ChairConfig | ChipsConfig;
  estimatedTotal: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "poker" | "blackjack" | "roulette" | "custom" | "chairs" | "chips";
  description: string;
  imagePlaceholder: string;
  image?: string | null;
}

export type Language = "en" | "cs";
