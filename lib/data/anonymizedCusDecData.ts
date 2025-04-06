// Define the types for our anonymized data
export interface AnonymizedCusDecRecord {
  id: string;                   // Anonymized Instance_ID
  declarantTIN: string;         // Anonymized Declarent_TIN
  declarantName: string;        // Anonymized company name
  consigneeTIN: string;         // Anonymized Consignee_TIN
  consigneeName: string;        // Anonymized company name
  cusdecNumber: string;         // Formatted as "OFFICE_CODE-SER-REG_NO"
  status: string;               // Based on sec_nam (e.g., "Processing", "Exempted", "Released")
  officeCode: string;           // Original Office_Code
  channel: string;              // Original channel value
  containerCount: number;       // Original Container_Count as number
  regDate: string;              // Original Reg_Date
  releaseDate: string;          // Original Release_Date
  invoiceValue: number;         // Original Invoice_Value as number
  exporterName: string;         // Anonymized exporter name
  originCountry: string;        // Original Trade_Cty
  incoterm: string;             // Original INCOTERM
}

export interface AnonymizedContainer {
  id: string;                   // Container ID
  number: string;               // Container number
  cusdecId: string;             // Reference to the AnonymizedCusDecRecord.id
  size: string;                 // Size (e.g., 20ft, 40ft)
  type: string;                 // Container type
  status: string;               // Container status
  location: string;             // Current location
  shippingLine: string;         // Shipping line
  vesselName: string;           // Name of vessel
  voyage: string;               // Voyage number
  arrivalDate: string;          // Arrival date
  lastUpdated: string;          // Last status update
}

export interface CusDecItem {
  id: string;                   // Item ID
  instanceId: string;           // Reference to AnonymizedCusDecRecord.id
  itemNo: string;               // Item number
  originCountry: string;        // Country of origin
  hsCode: string;               // HS Code
  description: string;          // Item description
  cpc: string;                  // Customs Procedure Code
  npc: string;                  // National Procedure Code
  quantity: number;             // Quantity
  grossWeight: number;          // Gross weight
  netWeight: number;            // Net weight
  uom: string;                  // Unit of measure
  totalValue: number;           // Total value
  invoiceValue: number;         // Invoice value
}

export interface ContainerPassRecord {
  id: string;                   // Pass ID
  instanceId: string;           // Container instance ID
  cusdecId: string;             // Reference to AnonymizedCusDecRecord.id
  passDate: string;             // Pass date
  destination: string;          // Destination
  containerNumber: string;      // Container number
  isScanned: boolean;           // Whether container is scanned
}

export interface ContainerTrackingRecord {
  id: string;                   // Tracking ID
  instanceId: string;           // Container instance ID
  cusdecId: string;             // Reference to AnonymizedCusDecRecord.id
  passDate: string;             // Pass date
  destination: string;          // Destination
  containerNumber: string;      // Container number
  isScanned: boolean;           // Whether container is scanned
  docId: string;                // Document ID
  docVersion: number;           // Document version
  operationName: string;        // Operation name
  operationDateTime: string;    // Operation date and time
  binderId: string;             // Binder ID
}

// Anonymized dataset based on the original data
export const anonymizedCusDecData: AnonymizedCusDecRecord[] = [
  {
    id: "CUS-12712517",
    declarantTIN: "D-1040835367",
    declarantName: "Alpha Freight Ltd.",
    consigneeTIN: "C-2040081677",
    consigneeName: "Global Products Inc.",
    cusdecNumber: "CBHQ1-I-1564",
    status: "Processing",
    officeCode: "CBHQ1",
    channel: "Yellow",
    containerCount: 1,
    regDate: "2025-01-03",
    releaseDate: "2025-01-03",
    invoiceValue: 6890614.50,
    exporterName: "Chem Solutions Ltd.",
    originCountry: "IN",
    incoterm: "CFR"
  },
  {
    id: "CUS-12724680",
    declarantTIN: "D-1042391864",
    declarantName: "Omega Logistics Co.",
    consigneeTIN: "C-2041378542",
    consigneeName: "Tech Innovations Ltd.",
    cusdecNumber: "CBHQ1-I-1565",
    status: "Released",
    officeCode: "CBHQ1",
    channel: "Green",
    containerCount: 2,
    regDate: "2025-01-04",
    releaseDate: "2025-01-05",
    invoiceValue: 12457890.75,
    exporterName: "Electronics Global Corp.",
    originCountry: "CN",
    incoterm: "FOB"
  },
  {
    id: "CUS-12736945",
    declarantTIN: "D-1045723691",
    declarantName: "Fast Track Shipping",
    consigneeTIN: "C-2047823541",
    consigneeName: "Medical Supplies Co.",
    cusdecNumber: "CBHQ1-I-1566",
    status: "Waiting Confirmation",
    officeCode: "CBHQ1",
    channel: "",
    containerCount: 1,
    regDate: "2025-01-05",
    releaseDate: "",
    invoiceValue: 5687450.25,
    exporterName: "MedEquip International",
    originCountry: "DE",
    incoterm: "CIF"
  },
  {
    id: "CUS-12748523",
    declarantTIN: "D-1048276531",
    declarantName: "Eagle Express Cargo",
    consigneeTIN: "C-2049367215",
    consigneeName: "Food Processing Ltd.",
    cusdecNumber: "CBHQ1-I-1567",
    status: "On Hold",
    officeCode: "CBHQ1",
    channel: "Red",
    containerCount: 3,
    regDate: "2025-01-06",
    releaseDate: "",
    invoiceValue: 8935720.40,
    exporterName: "Agricultural Products Inc.",
    originCountry: "AU",
    incoterm: "DAP"
  },
  {
    id: "CUS-12759682",
    declarantTIN: "D-1049581726",
    declarantName: "Prime Customs Agents",
    consigneeTIN: "C-2051492376",
    consigneeName: "Construction Materials Co.",
    cusdecNumber: "CBHQ1-I-1568",
    status: "Rejected",
    officeCode: "CBHQ1",
    channel: "Red",
    containerCount: 2,
    regDate: "2025-01-07",
    releaseDate: "",
    invoiceValue: 15783950.60,
    exporterName: "Heavy Industries Corp.",
    originCountry: "JP",
    incoterm: "DDP"
  },
  {
    id: "CUS-12731557",
    declarantTIN: "D-1040835367",
    declarantName: "Alpha Freight Ltd.",
    consigneeTIN: "C-2040081677",
    consigneeName: "Global Products Inc.",
    cusdecNumber: "CBHQ1-I-4704",
    status: "Released",
    officeCode: "CBHQ1",
    channel: "Yellow",
    containerCount: 5,
    regDate: "2025-01-08",
    releaseDate: "2025-01-09",
    invoiceValue: 57324620.81,
    exporterName: "Industrial Supplies Co.",
    originCountry: "IN",
    incoterm: "CFR"
  },
  {
    id: "CUS-12732222",
    declarantTIN: "D-1040835367",
    declarantName: "Alpha Freight Ltd.",
    consigneeTIN: "C-2040081677",
    consigneeName: "Global Products Inc.",
    cusdecNumber: "CBHQ1-I-4855",
    status: "Released",
    officeCode: "CBHQ1",
    channel: "Yellow",
    containerCount: 5,
    regDate: "2025-01-08",
    releaseDate: "2025-01-09",
    invoiceValue: 57228381.57,
    exporterName: "Industrial Supplies Co.",
    originCountry: "IN",
    incoterm: "CFR"
  }
];

// Container data linked to CusDecs via cusdecId
export const anonymizedContainers: AnonymizedContainer[] = [
  {
    id: "CONT-45781293",
    number: "MSCU1234567",
    cusdecId: "CUS-12712517",
    size: "40ft",
    type: "Dry",
    status: "Scanning",
    location: "Yard1",
    shippingLine: "MSC",
    vesselName: "MSC Anna",
    voyage: "V123-E",
    arrivalDate: "2025-01-02",
    lastUpdated: "2025-01-03"
  },
  {
    id: "CONT-45796124",
    number: "MAEU7654321",
    cusdecId: "CUS-12724680",
    size: "20ft",
    type: "Dry",
    status: "Released",
    location: "Exit Gate",
    shippingLine: "Maersk",
    vesselName: "Maersk Sealand",
    voyage: "V456-E",
    arrivalDate: "2025-01-03",
    lastUpdated: "2025-01-05"
  },
  {
    id: "CONT-45807935",
    number: "MAEU8765432",
    cusdecId: "CUS-12724680",
    size: "20ft",
    type: "Dry",
    status: "Released",
    location: "Exit Gate",
    shippingLine: "Maersk",
    vesselName: "Maersk Sealand",
    voyage: "V456-E",
    arrivalDate: "2025-01-03",
    lastUpdated: "2025-01-05"
  },
  {
    id: "CONT-45819746",
    number: "CMAU1928374",
    cusdecId: "CUS-12736945",
    size: "40ft HC",
    type: "Refrigerated",
    status: "Waiting Confirmation",
    location: "Terminal",
    shippingLine: "CMA CGM",
    vesselName: "CMA CGM Marco Polo",
    voyage: "V789-E",
    arrivalDate: "2025-01-04",
    lastUpdated: "2025-01-05"
  },
  {
    id: "CONT-45825638",
    number: "HLXU2837465",
    cusdecId: "CUS-12748523",
    size: "40ft",
    type: "Dry",
    status: "Officer Checked",
    location: "Inspection Area",
    shippingLine: "Hapag-Lloyd",
    vesselName: "Hapag Hamburg",
    voyage: "V321-E",
    arrivalDate: "2025-01-05",
    lastUpdated: "2025-01-06"
  },
  {
    id: "CONT-45837492",
    number: "HLXU3948576",
    cusdecId: "CUS-12748523",
    size: "40ft",
    type: "Dry",
    status: "Officer Checked",
    location: "Inspection Area",
    shippingLine: "Hapag-Lloyd",
    vesselName: "Hapag Hamburg",
    voyage: "V321-E",
    arrivalDate: "2025-01-05",
    lastUpdated: "2025-01-06"
  },
  {
    id: "CONT-45849265",
    number: "HLXU4857693",
    cusdecId: "CUS-12748523",
    size: "20ft",
    type: "Dry",
    status: "Officer Checked",
    location: "Inspection Area",
    shippingLine: "Hapag-Lloyd",
    vesselName: "Hapag Hamburg",
    voyage: "V321-E",
    arrivalDate: "2025-01-05",
    lastUpdated: "2025-01-06"
  },
  {
    id: "CONT-45856379",
    number: "COSU5746382",
    cusdecId: "CUS-12759682",
    size: "40ft",
    type: "Flat Rack",
    status: "Detained",
    location: "Detention Yard",
    shippingLine: "COSCO",
    vesselName: "COSCO Europe",
    voyage: "V654-E",
    arrivalDate: "2025-01-06",
    lastUpdated: "2025-01-07"
  },
  {
    id: "CONT-45867594",
    number: "COSU6857493",
    cusdecId: "CUS-12759682",
    size: "40ft",
    type: "Flat Rack",
    status: "Detained",
    location: "Detention Yard",
    shippingLine: "COSCO",
    vesselName: "COSCO Europe",
    voyage: "V654-E",
    arrivalDate: "2025-01-06",
    lastUpdated: "2025-01-07"
  }
];