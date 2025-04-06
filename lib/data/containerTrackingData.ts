// Import interfaces from main data file
import { ContainerTrackingRecord } from './anonymizedCusDecData';

// Container tracking data with historical records
export const containerTrackingData: ContainerTrackingRecord[] = [
  {
    id: "TRACK-1446740-1",
    instanceId: "CONT-45781293",
    cusdecId: "CUS-12712517",
    passDate: "2025-01-03",
    destination: "EXEMPTED",
    containerNumber: "MSCU1234567",
    isScanned: false,
    docId: "DOC-1447686",
    docVersion: 3,
    operationName: "DOC Center Modification",
    operationDateTime: "2025-01-03 13:25:23",
    binderId: "un.asyctn B_ContainerPass"
  },
  {
    id: "TRACK-1446740-2",
    instanceId: "CONT-45781293",
    cusdecId: "CUS-12712517",
    passDate: "2025-01-03",
    destination: "EXEMPTED",
    containerNumber: "MSCU1234567",
    isScanned: false,
    docId: "DOC-1447686",
    docVersion: 4,
    operationName: "DOC Center Modification",
    operationDateTime: "2025-01-03 13:27:27",
    binderId: "un.asyctn B_ContainerPass"
  },
  {
    id: "TRACK-1446740-3",
    instanceId: "CONT-45781293",
    cusdecId: "CUS-12712517",
    passDate: "2025-01-03",
    destination: "SCANNING",
    containerNumber: "MSCU1234567",
    isScanned: false,
    docId: "DOC-1447686",
    docVersion: 5,
    operationName: "Yard Entry",
    operationDateTime: "2025-01-03 14:15:23",
    binderId: "un.asyctn B_ContainerPass"
  },
  {
    id: "TRACK-1447253-1",
    instanceId: "CONT-45796124",
    cusdecId: "CUS-12724680",
    passDate: "2025-01-04",
    destination: "EXEMPTED",
    containerNumber: "MAEU7654321",
    isScanned: false,
    docId: "DOC-1448199",
    docVersion: 2,
    operationName: "DOC Center Modification",
    operationDateTime: "2025-01-04 16:12:05",
    binderId: "un.asyctn B_ContainerPass"
  },
  {
    id: "TRACK-1447253-2",
    instanceId: "CONT-45796124",
    cusdecId: "CUS-12724680",
    passDate: "2025-01-04",
    destination: "SCANNING",
    containerNumber: "MAEU7654321",
    isScanned: false,
    docId: "DOC-1448199",
    docVersion: 3,
    operationName: "Yard Entry",
    operationDateTime: "2025-01-04 17:35:12",
    binderId: "un.asyctn B_ContainerPass"
  },
  {
    id: "TRACK-1447253-3",
    instanceId: "CONT-45796124",
    cusdecId: "CUS-12724680",
    passDate: "2025-01-04",
    destination: "RELEASED",
    containerNumber: "MAEU7654321",
    isScanned: true,
    docId: "DOC-1448199",
    docVersion: 4,
    operationName: "Scan Completed",
    operationDateTime: "2025-01-05 09:22:18",
    binderId: "un.asyctn B_ContainerPass"
  },
  {
    id: "TRACK-1447253-4",
    instanceId: "CONT-45796124",
    cusdecId: "CUS-12724680",
    passDate: "2025-01-04",
    destination: "EXIT GATE",
    containerNumber: "MAEU7654321",
    isScanned: true,
    docId: "DOC-1448199",
    docVersion: 5,
    operationName: "Yard Exit",
    operationDateTime: "2025-01-05 14:47:33",
    binderId: "un.asyctn B_ContainerPass"
  },
  {
    id: "TRACK-1447254-1",
    instanceId: "CONT-45807935",
    cusdecId: "CUS-12724680",
    passDate: "2025-01-04",
    destination: "EXEMPTED",
    containerNumber: "MAEU8765432",
    isScanned: false,
    docId: "DOC-1448200",
    docVersion: 2,
    operationName: "DOC Center Modification",
    operationDateTime: "2025-01-04 16:14:22",
    binderId: "un.asyctn B_ContainerPass"
  },
  {
    id: "TRACK-1447254-2",
    instanceId: "CONT-45807935",
    cusdecId: "CUS-12724680",
    passDate: "2025-01-04",
    destination: "SCANNING",
    containerNumber: "MAEU8765432",
    isScanned: false,
    docId: "DOC-1448200",
    docVersion: 3,
    operationName: "Yard Entry",
    operationDateTime: "2025-01-04 17:38:45",
    binderId: "un.asyctn B_ContainerPass"
  },
  {
    id: "TRACK-1447254-3",
    instanceId: "CONT-45807935",
    cusdecId: "CUS-12724680",
    passDate: "2025-01-04",
    destination: "RELEASED",
    containerNumber: "MAEU8765432",
    isScanned: true,
    docId: "DOC-1448200",
    docVersion: 4,
    operationName: "Scan Completed",
    operationDateTime: "2025-01-05 09:45:33",
    binderId: "un.asyctn B_ContainerPass"
  },
  {
    id: "TRACK-1447254-4",
    instanceId: "CONT-45807935",
    cusdecId: "CUS-12724680",
    passDate: "2025-01-04",
    destination: "EXIT GATE",
    containerNumber: "MAEU8765432",
    isScanned: true,
    docId: "DOC-1448200",
    docVersion: 5,
    operationName: "Yard Exit",
    operationDateTime: "2025-01-05 15:12:08",
    binderId: "un.asyctn B_ContainerPass"
  },
  {
    id: "TRACK-1447255-1",
    instanceId: "CONT-45819746",
    cusdecId: "CUS-12736945",
    passDate: "2025-01-05",
    destination: "WAITING CONFIRMATION",
    containerNumber: "CMAU1928374",
    isScanned: false,
    docId: "DOC-1448201",
    docVersion: 1,
    operationName: "DOC Center Creation",
    operationDateTime: "2025-01-05 10:22:15",
    binderId: "un.asyctn B_ContainerPass"
  },
  {
    id: "TRACK-1447255-2",
    instanceId: "CONT-45819746",
    cusdecId: "CUS-12736945",
    passDate: "2025-01-05",
    destination: "TERMINAL",
    containerNumber: "CMAU1928374",
    isScanned: false,
    docId: "DOC-1448201",
    docVersion: 2,
    operationName: "Yard Entry",
    operationDateTime: "2025-01-05 11:35:42",
    binderId: "un.asyctn B_ContainerPass"
  },
  {
    id: "TRACK-1447256-1",
    instanceId: "CONT-45825638",
    cusdecId: "CUS-12748523",
    passDate: "2025-01-06",
    destination: "EXEMPTED",
    containerNumber: "HLXU2837465",
    isScanned: false,
    docId: "DOC-1448202",
    docVersion: 1,
    operationName: "DOC Center Creation",
    operationDateTime: "2025-01-06 09:08:33",
    binderId: "un.asyctn B_ContainerPass"
  },
  {
    id: "TRACK-1447256-2",
    instanceId: "CONT-45825638",
    cusdecId: "CUS-12748523",
    passDate: "2025-01-06",
    destination: "INSPECTION AREA",
    containerNumber: "HLXU2837465",
    isScanned: false,
    docId: "DOC-1448202",
    docVersion: 2,
    operationName: "Officer Assignment",
    operationDateTime: "2025-01-06 10:22:18",
    binderId: "un.asyctn B_ContainerPass"
  },
  {
    id: "TRACK-1447256-3",
    instanceId: "CONT-45825638",
    cusdecId: "CUS-12748523",
    passDate: "2025-01-06",
    destination: "INSPECTION AREA",
    containerNumber: "HLXU2837465",
    isScanned: false,
    docId: "DOC-1448202",
    docVersion: 3,
    operationName: "Officer Checked",
    operationDateTime: "2025-01-06 14:17:45",
    binderId: "un.asyctn B_ContainerPass"
  }
]; 