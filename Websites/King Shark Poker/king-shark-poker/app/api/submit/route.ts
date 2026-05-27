import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";
import path from "path";
import fs from "fs";

// ---------------------------------------------------------------
// TEMPORARY LOCAL FILE SOLUTION
// All submissions are saved to /data/orders.xlsx
//
// Replace this with your preferred backend when ready:
//  - Email:    Nodemailer / Resend / SendGrid
//  - CRM:      HubSpot / Pipedrive API
//  - Database: Supabase / PlanetScale / MongoDB Atlas
//  - Admin UI: Add an /admin page with auth + DB reads
// ---------------------------------------------------------------

const DATA_DIR = path.join(process.cwd(), "data");
const FILE_PATH = path.join(DATA_DIR, "orders.xlsx");

const HEADERS = [
  "Date / Time",
  "Configuration Type",
  "Customer Name",
  "Email",
  "Phone",
  "Company / Casino",
  "Country",
  "Message",
  "Selected Category",
  "Configuration (JSON)",
  "Estimated Total (EUR)",
];

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

function loadOrCreate(): XLSX.WorkBook {
  if (fs.existsSync(FILE_PATH)) {
    return XLSX.read(fs.readFileSync(FILE_PATH), { type: "buffer" });
  }
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet([HEADERS]);
  // Style header row (bold) — basic column width
  ws["!cols"] = HEADERS.map((h) => ({ wch: Math.max(h.length + 4, 18) }));
  XLSX.utils.book_append_sheet(wb, ws, "Orders");
  return wb;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customer, configuration, configurationType, estimatedTotal } = body;

    if (!customer?.name || !customer?.email) {
      return NextResponse.json({ success: false, error: "Missing required customer fields" }, { status: 400 });
    }

    ensureDataDir();
    const wb = loadOrCreate();
    const ws = wb.Sheets["Orders"];

    const category =
      (configuration as Record<string, unknown>)?.type ??
      configurationType ??
      "Unknown";

    const row = [
      new Date().toLocaleString("en-GB"),
      configurationType,
      customer.name,
      customer.email,
      customer.phone ?? "",
      customer.company ?? "",
      customer.country ?? "",
      customer.message ?? "",
      String(category),
      JSON.stringify(configuration, null, 0),
      Number(estimatedTotal).toFixed(2),
    ];

    XLSX.utils.sheet_add_aoa(ws, [row], { origin: -1 });
    fs.writeFileSync(FILE_PATH, XLSX.write(wb, { type: "buffer", bookType: "xlsx" }));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[submit] Error:", err);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
