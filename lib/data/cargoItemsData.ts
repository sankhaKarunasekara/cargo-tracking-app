// Define interfaces for cargo item data
export interface CargoItem {
  id: string;               // Generated unique ID for item
  instanceId: string;       // Reference to CusDec Instance_ID
  itemNo: string;           // Item number in the declaration
  originCountry: string;    // Country of origin
  hsCode: string;           // Harmonized System code
  itemDescription: string;  // Description of the item
  cpc: string;              // Customs Procedure Code
  npc: string;              // National Procedure Code
  suppQty: number;          // Supplementary quantity
  grossWeight: number;      // Gross weight in kg
  netWeight: number;        // Net weight in kg
  uom: string;              // Unit of measure
  totalValue: number;       // Total value
  invoiceValue: number;     // Invoice value
  externalFreight: number;  // External freight cost
  internalFreight: number;  // Internal freight cost
  insuranceValue: number;   // Insurance value
  otherCosts: number;       // Other costs
  deductions: number;       // Deductions
}

// Connect cargo items to CusDec records
export const cargoItemsData: CargoItem[] = [
  {
    id: "ITEM-7789156-1",
    instanceId: "CUS-12712517",
    itemNo: "1",
    originCountry: "LK",
    hsCode: "62052019",
    itemDescription: "MENS WOVEN SHIRTS-98% COTTON 2% ELASTANE FABRIC STYLE NO:771296 PO NO:1603234",
    cpc: "1378",
    npc: "95G",
    suppQty: 3720,
    grossWeight: 1265,
    netWeight: 1175,
    uom: "NIU",
    totalValue: 5575841,
    invoiceValue: 5575841.04,
    externalFreight: 0,
    internalFreight: 0,
    insuranceValue: 0,
    otherCosts: 0,
    deductions: 0
  },
  {
    id: "ITEM-7789157-1",
    instanceId: "CUS-12724680",
    itemNo: "1",
    originCountry: "US",
    hsCode: "82084000",
    itemDescription: "BEDKNIFE",
    cpc: "4000",
    npc: "000",
    suppQty: 3,
    grossWeight: 3,
    netWeight: 3,
    uom: "KGM",
    totalValue: 20912,
    invoiceValue: 18383.69,
    externalFreight: 2252.22,
    internalFreight: 0,
    insuranceValue: 276.42,
    otherCosts: 0,
    deductions: 0
  },
  {
    id: "ITEM-7789157-2",
    instanceId: "CUS-12724680",
    itemNo: "2",
    originCountry: "US",
    hsCode: "84339010",
    itemDescription: "LAWN MOVER PARTS: ES REEL, ROD SUPPORT, SKID BRACKET, PULL LINK ASM",
    cpc: "4000",
    npc: "000",
    suppQty: 50,
    grossWeight: 50,
    netWeight: 50,
    uom: "KGM",
    totalValue: 422543,
    invoiceValue: 371465.78,
    externalFreight: 45503.72,
    internalFreight: 0,
    insuranceValue: 5573.12,
    otherCosts: 0,
    deductions: 0
  },
  {
    id: "ITEM-7789158-1",
    instanceId: "CUS-12736945",
    itemNo: "1",
    originCountry: "GB",
    hsCode: "85171220",
    itemDescription: "MOBILE PHONE",
    cpc: "4000",
    npc: "000",
    suppQty: 1,
    grossWeight: 0.5,
    netWeight: 0.5,
    uom: "NIU",
    totalValue: 32876,
    invoiceValue: 31666.9,
    externalFreight: 733.62,
    internalFreight: 0,
    insuranceValue: 475,
    otherCosts: 0,
    deductions: 0
  },
  {
    id: "ITEM-7789159-1",
    instanceId: "CUS-12748523",
    itemNo: "1",
    originCountry: "LK",
    hsCode: "62034219",
    itemDescription: "MENS WOVEN PANTS-98% COTTON 2% SPANDEX FABRIC STYLE NO:859004",
    cpc: "1378",
    npc: "95G",
    suppQty: 176,
    grossWeight: 105,
    netWeight: 101,
    uom: "NIU",
    totalValue: 339861,
    invoiceValue: 339860.79,
    externalFreight: 0,
    internalFreight: 0,
    insuranceValue: 0,
    otherCosts: 0,
    deductions: 0
  },
  {
    id: "ITEM-7789160-1",
    instanceId: "CUS-12759682",
    itemNo: "1",
    originCountry: "CN",
    hsCode: "54071000",
    itemDescription: "92% NYLON 8% SPANDEX FABRIC 56\" 405.00 YDS",
    cpc: "7800",
    npc: "R00",
    suppQty: 56.7,
    grossWeight: 100,
    netWeight: 56.7,
    uom: "KGM",
    totalValue: 384274,
    invoiceValue: 275930.55,
    externalFreight: 104205.39,
    internalFreight: 0,
    insuranceValue: 4138.47,
    otherCosts: 0,
    deductions: 0
  },
  {
    id: "ITEM-7789161-1",
    instanceId: "CUS-12731557",
    itemNo: "1",
    originCountry: "IN",
    hsCode: "52093900",
    itemDescription: "96% COTTON 4% SPANDEX WOVEN FABRIC - 128 CM 1,069.55 YDS",
    cpc: "7800",
    npc: "R00",
    suppQty: 172.91,
    grossWeight: 177.56,
    netWeight: 172.91,
    uom: "KGM",
    totalValue: 548325,
    invoiceValue: 537152.59,
    externalFreight: 3114.56,
    internalFreight: 0,
    insuranceValue: 8056.98,
    otherCosts: 0,
    deductions: 0
  },
  {
    id: "ITEM-7789162-1",
    instanceId: "CUS-12732222",
    itemNo: "1",
    originCountry: "LK",
    hsCode: "57039090",
    itemDescription: "PVC BACKED COIR TUFTED MATS",
    cpc: "1100",
    npc: "000",
    suppQty: 2698.14,
    grossWeight: 19880,
    netWeight: 17500,
    uom: "MTK",
    totalValue: 3708618,
    invoiceValue: 3708618.39,
    externalFreight: 0,
    internalFreight: 0,
    insuranceValue: 0,
    otherCosts: 0,
    deductions: 0
  },
  {
    id: "ITEM-7789162-2",
    instanceId: "CUS-12732222",
    itemNo: "2",
    originCountry: "LK",
    hsCode: "57050000",
    itemDescription: "RUBBER, COIR ROD COMBINE MAT",
    cpc: "1100",
    npc: "000",
    suppQty: 344.25,
    grossWeight: 3570,
    netWeight: 3400,
    uom: "MTK",
    totalValue: 1168192,
    invoiceValue: 1168191.79,
    externalFreight: 0,
    internalFreight: 0,
    insuranceValue: 0,
    otherCosts: 0,
    deductions: 0
  },
  {
    id: "ITEM-7789163-1",
    instanceId: "CUS-12732575",
    itemNo: "1",
    originCountry: "LK",
    hsCode: "57022010",
    itemDescription: "COIR BRUSH MATS",
    cpc: "1100",
    npc: "000",
    suppQty: 225,
    grossWeight: 1350,
    netWeight: 1300,
    uom: "MTK",
    totalValue: 565254,
    invoiceValue: 565254.09,
    externalFreight: 0,
    internalFreight: 0,
    insuranceValue: 0,
    otherCosts: 0,
    deductions: 0
  }
]; 