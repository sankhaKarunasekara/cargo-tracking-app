// Define the cargo item type
export interface CargoItem {
  id: string;             // Unique identifier for the cargo item
  instanceId: string;     // Reference to the AnonymizedCusDecRecord.id
  hsCode: string;         // Harmonized System code
  description: string;    // Description of cargo
  quantity: number;       // Quantity
  unit: string;           // Unit of measurement
  unitPrice: number;      // Unit price
  totalValue: number;     // Total value
  origin: string;         // Origin country
  weight: number;         // Weight in kg
  netWeight: number;      // Net weight in kg
}

// Sample cargo items data linked to CusDec records
export const cargoItemsData: CargoItem[] = [
  {
    id: "ITEM-001",
    instanceId: "CUS-12712517",
    hsCode: "8471.30.00",
    description: "Laptop computers, 14-inch display, i7 processor",
    quantity: 250,
    unit: "PCS",
    unitPrice: 850.50,
    totalValue: 212625.00,
    origin: "IN",
    weight: 675.00,
    netWeight: 625.00
  },
  {
    id: "ITEM-002",
    instanceId: "CUS-12712517",
    hsCode: "8471.60.00",
    description: "Computer keyboards, USB wired",
    quantity: 500,
    unit: "PCS",
    unitPrice: 15.25,
    totalValue: 7625.00,
    origin: "IN",
    weight: 225.00,
    netWeight: 200.00
  },
  {
    id: "ITEM-003",
    instanceId: "CUS-12724680",
    hsCode: "8517.12.00",
    description: "Mobile phones, smartphone, 6.5-inch display",
    quantity: 1000,
    unit: "PCS",
    unitPrice: 450.75,
    totalValue: 450750.00,
    origin: "CN",
    weight: 300.00,
    netWeight: 250.00
  },
  {
    id: "ITEM-004",
    instanceId: "CUS-12724680",
    hsCode: "8517.62.00",
    description: "Wireless earbuds with charging case",
    quantity: 1500,
    unit: "PCS",
    unitPrice: 35.20,
    totalValue: 52800.00,
    origin: "CN",
    weight: 187.50,
    netWeight: 150.00
  },
  {
    id: "ITEM-005",
    instanceId: "CUS-12736945",
    hsCode: "9018.90.00",
    description: "Medical diagnostic equipment, portable ultrasound",
    quantity: 50,
    unit: "PCS",
    unitPrice: 3500.00,
    totalValue: 175000.00,
    origin: "DE",
    weight: 750.00,
    netWeight: 600.00
  },
  {
    id: "ITEM-006",
    instanceId: "CUS-12748523",
    hsCode: "1704.90.00",
    description: "Confectionery products, sugar-free candy assortment",
    quantity: 5000,
    unit: "KG",
    unitPrice: 4.50,
    totalValue: 22500.00,
    origin: "AU",
    weight: 5500.00,
    netWeight: 5000.00
  },
  {
    id: "ITEM-007",
    instanceId: "CUS-12748523",
    hsCode: "1806.90.00",
    description: "Chocolate confectionery, assorted gift boxes",
    quantity: 2500,
    unit: "KG",
    unitPrice: 8.75,
    totalValue: 21875.00,
    origin: "AU",
    weight: 2750.00,
    netWeight: 2500.00
  },
  {
    id: "ITEM-008",
    instanceId: "CUS-12748523",
    hsCode: "2106.90.00",
    description: "Food preparations, protein bars",
    quantity: 10000,
    unit: "KG",
    unitPrice: 3.25,
    totalValue: 32500.00,
    origin: "AU",
    weight: 10500.00,
    netWeight: 10000.00
  },
  {
    id: "ITEM-009",
    instanceId: "CUS-12759682",
    hsCode: "7308.90.00",
    description: "Steel structures, pre-fabricated building components",
    quantity: 200,
    unit: "TON",
    unitPrice: 1500.00,
    totalValue: 300000.00,
    origin: "JP",
    weight: 200000.00,
    netWeight: 200000.00
  },
  {
    id: "ITEM-010",
    instanceId: "CUS-12759682",
    hsCode: "7318.15.00",
    description: "Steel bolts and fasteners, assorted sizes",
    quantity: 50000,
    unit: "KG",
    unitPrice: 3.50,
    totalValue: 175000.00,
    origin: "JP",
    weight: 50500.00,
    netWeight: 50000.00
  },
  {
    id: "ITEM-011",
    instanceId: "CUS-12731557",
    hsCode: "8437.10.00",
    description: "Agricultural machinery, seed cleaning machines",
    quantity: 20,
    unit: "PCS",
    unitPrice: 12500.00,
    totalValue: 250000.00,
    origin: "IN",
    weight: 15000.00,
    netWeight: 12000.00
  },
  {
    id: "ITEM-012",
    instanceId: "CUS-12732222",
    hsCode: "8429.51.00",
    description: "Construction machinery, front-end loaders",
    quantity: 5,
    unit: "PCS",
    unitPrice: 75000.00,
    totalValue: 375000.00,
    origin: "IN",
    weight: 35000.00,
    netWeight: 30000.00
  }
]; 