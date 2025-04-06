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
  blNumber: string;             // Bill of Lading Number
  channel: string;              // Original channel value
  containerCount: number;       // Original Container_Count as number
  regDate: string;              // Original Reg_Date
  releaseDate: string;          // Original Release_Date
  invoiceValue: number;         // Original Invoice_Value as number
  exporterName: string;         // Anonymized exporter name
  originCountry: string;        // Original Trade_Cty
  incoterm: string;             // Original INCOTERM
  destination: string;          // Destination port/location
}

export interface AnonymizedContainer {
  id: string;                   // Container ID
  number: string;               // Container number
  cusdecId: string;             // Reference to the AnonymizedCusDecRecord.id
  size: string;                 // Size (e.g., 20ft, 40ft)
  type: string;                 // Container type
  status: string;               // Container status
  location: string;             // Current location
  channel: string;              // Channel (color) - Yellow, Red, Green, or Blue
  shippingLine: string;         // Shipping line
  vesselName: string;           // Name of vessel
  voyage: string;               // Voyage number
  arrivalDate: string;          // Arrival date
  lastUpdated: string;          // Last status update
}

// Define yard locations enum
export enum YardLocations {
  GRAYLINE1 = 'GRAYLINE1',
  GRAYLINE2 = 'GRAYLINE2',
  RELEASE = 'RELEASE',
  EXEMPTED = 'EXEMPTED',
  OUTPANEL = 'OUTPANEL',
  OGAOUTPANEL = 'OGAOUTPANEL'
}

// Define color codes for yard locations
export const yardLocationColors: Record<string, { bg: string, text: string, border: string }> = {
  [YardLocations.GRAYLINE1]: { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-200' },
  [YardLocations.GRAYLINE2]: { bg: 'bg-slate-200', text: 'text-slate-800', border: 'border-slate-300' },
  [YardLocations.RELEASE]: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
  [YardLocations.EXEMPTED]: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  [YardLocations.OUTPANEL]: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  [YardLocations.OGAOUTPANEL]: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' }
};

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
    blNumber: "BL-123456789",
    channel: "Yellow",
    containerCount: 1,
    regDate: "2025-01-03",
    releaseDate: "2025-01-03",
    invoiceValue: 6890614.50,
    exporterName: "Chem Solutions Ltd.",
    originCountry: "IN",
    incoterm: "CFR",
    destination: "New Delhi"
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
    blNumber: "BL-123456790",
    channel: "Green",
    containerCount: 2,
    regDate: "2025-01-04",
    releaseDate: "2025-01-05",
    invoiceValue: 12457890.75,
    exporterName: "Electronics Global Corp.",
    originCountry: "CN",
    incoterm: "FOB",
    destination: "Shanghai"
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
    blNumber: "BL-123456791",
    channel: "",
    containerCount: 1,
    regDate: "2025-01-05",
    releaseDate: "",
    invoiceValue: 5687450.25,
    exporterName: "MedEquip International",
    originCountry: "DE",
    incoterm: "CIF",
    destination: "Berlin"
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
    blNumber: "BL-123456792",
    channel: "Red",
    containerCount: 3,
    regDate: "2025-01-06",
    releaseDate: "",
    invoiceValue: 8935720.40,
    exporterName: "Agricultural Products Inc.",
    originCountry: "AU",
    incoterm: "DAP",
    destination: "Sydney"
  },
  {
    id: "CUS-12759682",
    declarantTIN: "D-1049581726",
    declarantName: "Prime Customs Agents",
    consigneeTIN: "C-2051492376",
    consigneeName: "Construction Materials Co.",
    cusdecNumber: "CBHQ1-I-1568",
    status: "Processing",
    officeCode: "CBHQ1",
    blNumber: "BL-123456793",
    channel: "Red",
    containerCount: 2,
    regDate: "2025-01-07",
    releaseDate: "",
    invoiceValue: 15783950.60,
    exporterName: "Heavy Industries Corp.",
    originCountry: "JP",
    incoterm: "DDP",
    destination: "Tokyo"
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
    blNumber: "BL-123456794",
    channel: "Yellow",
    containerCount: 5,
    regDate: "2025-01-08",
    releaseDate: "2025-01-09",
    invoiceValue: 57324620.81,
    exporterName: "Industrial Supplies Co.",
    originCountry: "IN",
    incoterm: "CFR",
    destination: "Mumbai"
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
    blNumber: "BL-123456795",
    channel: "Yellow",
    containerCount: 5,
    regDate: "2025-01-08",
    releaseDate: "2025-01-09",
    invoiceValue: 57228381.57,
    exporterName: "Industrial Supplies Co.",
    originCountry: "IN",
    incoterm: "CFR",
    destination: "Mumbai"
  },
  {
    id: "CUS-12732575",
    declarantTIN: "D-1040835367",
    declarantName: "Alpha Freight Ltd.",
    consigneeTIN: "C-2040081677",
    consigneeName: "Global Products Inc.",
    cusdecNumber: "CBHQ1-I-4944",
    status: "Exempted",
    officeCode: "CBHQ1",
    blNumber: "BL-123456796",
    channel: "Yellow",
    containerCount: 4,
    regDate: "2025-01-08",
    releaseDate: "2025-01-09",
    invoiceValue: 45504177.57,
    exporterName: "Industrial Supplies Co.",
    originCountry: "IN",
    incoterm: "CFR",
    destination: "Mumbai"
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
    location: "GRAYLINE1",
    channel: "Yellow",
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
    location: "RELEASE",
    channel: "Green",
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
    location: "RELEASE",
    channel: "Green",
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
    location: "RCT",
    channel: "Blue",
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
    location: "OUTPANEL",
    channel: "Red",
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
    location: "OUTPANEL",
    channel: "Red",
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
    location: "OUTPANEL",
    channel: "Red",
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
    location: "OGAOUTPANEL",
    channel: "Red",
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
    location: "OGAOUTPANEL",
    channel: "Red",
    shippingLine: "COSCO",
    vesselName: "COSCO Europe",
    voyage: "V654-E",
    arrivalDate: "2025-01-06",
    lastUpdated: "2025-01-07"
  },
  {
    id: "CONT-45892176",
    number: "OOLU7865421",
    cusdecId: "CUS-12712517",
    size: "40ft",
    type: "Dry",
    status: "Registered",
    location: "GRAYLINE2",
    channel: "Yellow",
    shippingLine: "OOCL",
    vesselName: "OOCL Hong Kong",
    voyage: "V298-E",
    arrivalDate: "2025-01-02",
    lastUpdated: "2025-01-03"
  },
  {
    id: "CONT-45903582",
    number: "EISU9876543",
    cusdecId: "CBHQ-I-13247",
    size: "20ft",
    type: "Open Top",
    status: "AcknowledgedYard",
    location: "EXEMPTED",
    channel: "Green",
    shippingLine: "Evergreen",
    vesselName: "Ever Given",
    voyage: "V475-E",
    arrivalDate: "2025-01-07",
    lastUpdated: "2025-01-08"
  },
  {
    id: "CONT-45915673",
    number: "EISU8765432",
    cusdecId: "CBHQ-I-13247",
    size: "20ft",
    type: "Open Top",
    status: "AcknowledgedYard",
    location: "EXEMPTED",
    channel: "Green",
    shippingLine: "Evergreen",
    vesselName: "Ever Given",
    voyage: "V475-E",
    arrivalDate: "2025-01-07",
    lastUpdated: "2025-01-08"
  },
  {
    id: "CONT-45926487",
    number: "YMLU5432198",
    cusdecId: "CBHQ-I-13359",
    size: "40ft HC",
    type: "Dry",
    status: "AcknowledgedGate",
    location: "OUTPANEL",
    channel: "Blue",
    shippingLine: "Yang Ming",
    vesselName: "YM Witness",
    voyage: "V532-E",
    arrivalDate: "2025-01-08",
    lastUpdated: "2025-01-09"
  },
  {
    id: "CONT-45938752",
    number: "YMLU6543219",
    cusdecId: "CBHQ-I-13359",
    size: "40ft HC",
    type: "Dry",
    status: "AcknowledgedGate",
    location: "OUTPANEL",
    channel: "Blue",
    shippingLine: "Yang Ming",
    vesselName: "YM Witness",
    voyage: "V532-E",
    arrivalDate: "2025-01-08",
    lastUpdated: "2025-01-09"
  },
  {
    id: "CONT-45947283",
    number: "APLU2468013",
    cusdecId: "CBHQ-I-13478",
    size: "40ft",
    type: "Reefer",
    status: "Processing",
    location: "RCT",
    channel: "Yellow",
    shippingLine: "APL",
    vesselName: "APL Denver",
    voyage: "V687-E",
    arrivalDate: "2025-01-09",
    lastUpdated: "2025-01-10"
  }
];