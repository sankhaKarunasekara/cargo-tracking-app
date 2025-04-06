// Define interfaces for container tracking data
export interface ContainerTrackingEvent {
  id: string;                // Generated unique ID for tracking event
  instanceId: string;        // Original instance_id
  sadInstance: string;       // Reference to CusDec ID
  passDate: string;          // Container pass date
  destination: string;       // Destination for the container
  containerNumber: string;   // Container number
  scanned: number;           // Whether the container has been scanned (0/1)
  iedId: string;             // IED ID
  docVersion: number;        // Document version
  operationName: string;     // Name of the operation performed
  operationDateTime: string; // Date and time of the operation
  binderID: string;          // System binder ID
}

// Container tracking data linked to containerPassData through containerNumber
export const containerTrackingEvents: ContainerTrackingEvent[] = [
  {
    id: "CTE-14467401",
    instanceId: "1446740",
    sadInstance: "4750075",
    passDate: "2025-03-25",
    destination: "RCT",
    containerNumber: "UETU5392122",
    scanned: 0,
    iedId: "1447686",
    docVersion: 3,
    operationName: "DOC Center Modification",
    operationDateTime: "2025-03-25 13:25:23",
    binderID: "un.asyctn B_ContainerPass"
  },
  {
    id: "CTE-14467402",
    instanceId: "1446740",
    sadInstance: "4750075",
    passDate: "2025-03-25",
    destination: "RCT",
    containerNumber: "UETU5392122",
    scanned: 0,
    iedId: "1447686",
    docVersion: 4,
    operationName: "DOC Center Modification",
    operationDateTime: "2025-03-25 13:27:27",
    binderID: "un.asyctn B_ContainerPass"
  },
  {
    id: "CTE-14467403",
    instanceId: "1446740",
    sadInstance: "4750075",
    passDate: "2025-03-25",
    destination: "RCT",
    containerNumber: "UETU5392122",
    scanned: 0,
    iedId: "1447686",
    docVersion: 5,
    operationName: "DOC Center Modification",
    operationDateTime: "2025-03-25 13:27:53",
    binderID: "un.asyctn B_ContainerPass"
  },
  {
    id: "CTE-14472531",
    instanceId: "1447253",
    sadInstance: "4756186",
    passDate: "2025-02-07",
    destination: "GRAYLINE2",
    containerNumber: "MSKU8285899",
    scanned: 0,
    iedId: "1448199",
    docVersion: 2,
    operationName: "DOC Center Modification",
    operationDateTime: "2025-02-07 16:12:05",
    binderID: "un.asyctn B_ContainerPass"
  },
  {
    id: "CTE-23897311",
    instanceId: "2389731",
    sadInstance: "7790649",
    passDate: "2025-04-02",
    destination: "BOI BEPZ",
    containerNumber: "CAXU6471043",
    scanned: 0,
    iedId: "2391622",
    docVersion: 3,
    operationName: "DOC Center Modification",
    operationDateTime: "2025-04-02 09:58:13",
    binderID: "un.asyctn B_ContainerPass"
  },
  {
    id: "CTE-24613481",
    instanceId: "2461348",
    sadInstance: "8021444",
    passDate: "2025-01-31",
    destination: "ASIAN YARD",
    containerNumber: "FCIU2546135",
    scanned: 0,
    iedId: "2463241",
    docVersion: 5,
    operationName: "DOC Center Modification",
    operationDateTime: "2025-01-31 14:22:32",
    binderID: "un.asyctn B_ContainerPass"
  },
  {
    id: "CTE-26213911",
    instanceId: "2621391",
    sadInstance: "8623010",
    passDate: "2025-01-17",
    destination: "CFS5",
    containerNumber: "MSKU2289557",
    scanned: 0,
    iedId: "2623286",
    docVersion: 3,
    operationName: "Gate Acknowledgement",
    operationDateTime: "2025-01-17 11:07:28",
    binderID: "un.asyctn B_ContainerPass"
  },
  {
    id: "CTE-29812941",
    instanceId: "2981294",
    sadInstance: "10034669",
    passDate: "2025-03-20",
    destination: "RCT",
    containerNumber: "EGHU8258910",
    scanned: 1,
    iedId: "2983213",
    docVersion: 7,
    operationName: "Yard Exit",
    operationDateTime: "2025-03-20 00:33:46",
    binderID: "un.asyctn B_ContainerPass"
  },
  {
    id: "CTE-29871311",
    instanceId: "2987131",
    sadInstance: "10054196",
    passDate: "2025-02-11",
    destination: "ASIAN YARD",
    containerNumber: "CAXU6356266",
    scanned: 0,
    iedId: "2989050",
    docVersion: 7,
    operationName: "DOC Center Modification",
    operationDateTime: "2025-02-11 15:42:59",
    binderID: "un.asyctn B_ContainerPass"
  },
  {
    id: "CTE-30612691",
    instanceId: "3061269",
    sadInstance: "10366917",
    passDate: "2025-03-03",
    destination: "GRAYLINE1",
    containerNumber: "DRYU2172146",
    scanned: 0,
    iedId: "3063209",
    docVersion: 9,
    operationName: "Yard Exit",
    operationDateTime: "2025-03-03 13:56:48",
    binderID: "un.asyctn B_ContainerPass"
  },
  {
    id: "CTE-32209841",
    instanceId: "3220984",
    sadInstance: "11004632",
    passDate: "2025-02-11",
    destination: "GRAYLINE2",
    containerNumber: "BEAU6435991",
    scanned: 1,
    iedId: "3222935",
    docVersion: 10,
    operationName: "Yard Exit",
    operationDateTime: "2025-02-11 20:13:56",
    binderID: "un.asyctn B_ContainerPass"
  },
  {
    id: "CTE-32459991",
    instanceId: "3245999",
    sadInstance: "11099275",
    passDate: "2025-02-03",
    destination: "EXEMPTED",
    containerNumber: "BSIU2881763",
    scanned: 0,
    iedId: "3247950",
    docVersion: 5,
    operationName: "Scan Container",
    operationDateTime: "2025-02-03 11:31:23",
    binderID: "un.asyctn B_ContainerPass"
  },
  {
    id: "CTE-32460001",
    instanceId: "3246000",
    sadInstance: "11099275",
    passDate: "2025-02-03",
    destination: "EXEMPTED",
    containerNumber: "OOLU0691527",
    scanned: 0,
    iedId: "3247951",
    docVersion: 5,
    operationName: "Scan Container",
    operationDateTime: "2025-02-03 11:31:23",
    binderID: "un.asyctn B_ContainerPass"
  },
  {
    id: "CTE-32460011",
    instanceId: "3246001",
    sadInstance: "11099275",
    passDate: "2025-02-03",
    destination: "EXEMPTED",
    containerNumber: "TGBU2364901",
    scanned: 0,
    iedId: "3247952",
    docVersion: 5,
    operationName: "Scan Container",
    operationDateTime: "2025-02-03 11:31:24",
    binderID: "un.asyctn B_ContainerPass"
  },
  {
    id: "CTE-32460021",
    instanceId: "3246002",
    sadInstance: "11099275",
    passDate: "2025-02-03",
    destination: "EXEMPTED",
    containerNumber: "CXDU1346540",
    scanned: 0,
    iedId: "3247953",
    docVersion: 5,
    operationName: "Scan Container",
    operationDateTime: "2025-02-03 11:31:22",
    binderID: "un.asyctn B_ContainerPass"
  }
];

// Group tracking events by containerId for easy lookup
export const containerTrackingData: { [containerNumber: string]: ContainerTrackingEvent[] } = {};

// Initialize the lookup object
containerTrackingEvents.forEach(event => {
  if (!containerTrackingData[event.containerNumber]) {
    containerTrackingData[event.containerNumber] = [];
  }
  containerTrackingData[event.containerNumber].push(event);
}); 