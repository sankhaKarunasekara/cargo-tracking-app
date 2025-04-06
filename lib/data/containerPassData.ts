// Define interfaces for container pass data
export interface ContainerPass {
  id: string;                // Generated unique ID for container pass
  instanceId: string;        // Original instance_id
  sadInstance: string;       // Reference to CusDec ID
  passDate: string;          // Container pass date
  destination: string;       // Destination for the container
  containerNumber: string;   // Container number
  scanned: number;           // Whether the container has been scanned (0/1)
}

// Container pass data linked to CusDecs
export const containerPassData: ContainerPass[] = [
  {
    id: "CP-378121201",
    instanceId: "3781212",
    sadInstance: "13083051",
    passDate: "2025-04-02",
    destination: "EXEMPTED",
    containerNumber: "OOLU9734872",
    scanned: 0
  },
  {
    id: "CP-378121301",
    instanceId: "3781213",
    sadInstance: "13083051",
    passDate: "2025-04-02",
    destination: "EXEMPTED",
    containerNumber: "TRHU6224624",
    scanned: 0
  },
  {
    id: "CP-378121401",
    instanceId: "3781214",
    sadInstance: "13083051",
    passDate: "2025-04-02",
    destination: "EXEMPTED",
    containerNumber: "CSNU8573328",
    scanned: 0
  },
  {
    id: "CP-378121501",
    instanceId: "3781215",
    sadInstance: "13083051",
    passDate: "2025-04-02",
    destination: "RELEASE",
    containerNumber: "TRHU5265038",
    scanned: 1
  },
  {
    id: "CP-378121601",
    instanceId: "3781216",
    sadInstance: "13083051",
    passDate: "2025-04-02",
    destination: "EXEMPTED",
    containerNumber: "BEAU6181768",
    scanned: 0
  },
  {
    id: "CP-378121701",
    instanceId: "3781217",
    sadInstance: "13083051",
    passDate: "2025-04-02",
    destination: "EXEMPTED",
    containerNumber: "FFAU2771606",
    scanned: 0
  },
  {
    id: "CP-378121801",
    instanceId: "3781218",
    sadInstance: "13083051",
    passDate: "2025-04-02",
    destination: "RELEASE",
    containerNumber: "OOLU9568160",
    scanned: 1
  },
  {
    id: "CP-378121901",
    instanceId: "3781219",
    sadInstance: "13083051",
    passDate: "2025-04-02",
    destination: "RELEASE",
    containerNumber: "TRHU8847789",
    scanned: 1
  },
  {
    id: "CP-378122001",
    instanceId: "3781220",
    sadInstance: "13083051",
    passDate: "2025-04-02",
    destination: "EXEMPTED",
    containerNumber: "CSLU6037247",
    scanned: 0
  },
  {
    id: "CP-378122101",
    instanceId: "3781221",
    sadInstance: "13083051",
    passDate: "2025-04-02",
    destination: "EXEMPTED",
    containerNumber: "CCLU7937896",
    scanned: 0
  },
  {
    id: "CP-378122201",
    instanceId: "3781222",
    sadInstance: "13075896",
    passDate: "2025-04-02",
    destination: "RELEASE",
    containerNumber: "TLLU7651783",
    scanned: 1
  },
  {
    id: "CP-378122301",
    instanceId: "3781223",
    sadInstance: "13082779",
    passDate: "2025-04-02",
    destination: "CVT",
    containerNumber: "DFSU1030549",
    scanned: 0
  },
  {
    id: "CP-378122401",
    instanceId: "3781224",
    sadInstance: "13082321",
    passDate: "2025-04-02",
    destination: "BOI KEPZ",
    containerNumber: "TGHU9743072",
    scanned: 0
  },
  {
    id: "CP-378122501",
    instanceId: "3781225",
    sadInstance: "13083121",
    passDate: "2025-04-02",
    destination: "BOI BEPZ",
    containerNumber: "TLLU7634087",
    scanned: 0
  },
  {
    id: "CP-378122601",
    instanceId: "3781226",
    sadInstance: "13081388",
    passDate: "2025-04-02",
    destination: "BOI MWEPZ",
    containerNumber: "OOLU0488171",
    scanned: 0
  },
  {
    id: "CP-378122701",
    instanceId: "3781227",
    sadInstance: "13083243",
    passDate: "2025-04-02",
    destination: "BOI BEPZ",
    containerNumber: "FCIU4454594",
    scanned: 0
  },
  {
    id: "CP-378122801",
    instanceId: "3781228",
    sadInstance: "13082045",
    passDate: "2025-04-02",
    destination: "RELEASE",
    containerNumber: "BLJU2551572",
    scanned: 1
  },
  {
    id: "CP-378122901",
    instanceId: "3781229",
    sadInstance: "13083750",
    passDate: "2025-04-02",
    destination: "EXEMPTED",
    containerNumber: "UACU5917900",
    scanned: 0
  },
  {
    id: "CP-378123001",
    instanceId: "3781230",
    sadInstance: "13081494",
    passDate: "2025-04-02",
    destination: "BOI OUTZONE",
    containerNumber: "ONEU0792460",
    scanned: 0
  },
  {
    id: "CP-378123101",
    instanceId: "3781231",
    sadInstance: "13081494",
    passDate: "2025-04-02",
    destination: "BOI OUTZONE",
    containerNumber: "ONEU1957605",
    scanned: 0
  }
]; 