import { DeviceParameters, SystemStatus } from "@/lib/types";

export const generateSampleSystemStatus = (): SystemStatus => {
  const now = new Date();
  const minTemp = 0.001;
  const maxTemp = 0.3;
  const baseTemperature = (minTemp + maxTemp) / 2;
  const basePressure = 1.013; // Base pressure in mbar (atmospheric pressure)
  const variation = (maxTemp - minTemp) * 0.8; // 10% variation

  return {
    // Temperature devices
    "srb-ggs-s": Number(
      (baseTemperature + Math.random() * variation).toFixed(5)
    ),
    "dri-mix-s": Number(
      (baseTemperature + Math.random() * variation).toFixed(5)
    ),
    "dri-pt2-s": Number(
      (baseTemperature + Math.random() * variation).toFixed(5)
    ),
    "ptr1-pt2-s": Number(
      (baseTemperature + Math.random() * variation).toFixed(5)
    ),
    "dri-pt1-s": Number(
      (baseTemperature + Math.random() * variation).toFixed(5)
    ),
    "ptr1-pt1-s": Number(
      (baseTemperature + Math.random() * variation).toFixed(5)
    ),
    "mag-msp-s": Number(
      (baseTemperature + Math.random() * variation).toFixed(5)
    ),

    // Pressure devices
    "3cl-pg-01": Number((basePressure * (1 + Math.random() * 0.1)).toFixed(5)),
    "3cl-pg-02": Number((basePressure * (1 + Math.random() * 0.1)).toFixed(5)),
    "3cl-pg-03": Number((basePressure * (1 + Math.random() * 0.1)).toFixed(5)),
    "3cl-pg-04": Number((basePressure * (1 + Math.random() * 0.1)).toFixed(5)),
    "3cl-pg-05": Number((basePressure * (1 + Math.random() * 0.1)).toFixed(5)),
    "3cl-pg-06": Number((basePressure * (1 + Math.random() * 0.1)).toFixed(5)),

    // Flow devices
    "3cl-fm-01": Number((2.0 + Math.random() * 0.5).toFixed(5)),

    // System state
    timestamp: now.toISOString(),
  };
};

// Generate an array of historical data points
export const generateHistoricalData = (hours: number = 24): SystemStatus[] => {
  const data: SystemStatus[] = [];
  const now = new Date();

  for (let i = 0; i < hours; i++) {
    const timestamp = new Date(now.getTime() - (hours - i) * 3600000); // Subtract hours
    const minTemp = 0.001;
    const maxTemp = 0.3;
    const baseTemperature = (minTemp + maxTemp) / 2;
    const variation = (maxTemp - minTemp) * 0.2; // 10% variation
    const basePressure = 1.013; // Base pressure in mbar (atmospheric pressure)

    data.push({
      // Temperature devices
      "srb-ggs-s": Number(
        (baseTemperature + Math.random() * variation).toFixed(5)
      ),
      "dri-mix-s": Number(
        (baseTemperature + (Math.random() - 0.5) * variation).toFixed(5)
      ),
      "dri-pt2-s": Number(
        (baseTemperature + (Math.random() - 0.4) * variation).toFixed(5)
      ),
      "ptr1-pt2-s": Number(
        (baseTemperature + (Math.random() - 0.3) * variation).toFixed(5)
      ),
      "dri-pt1-s": Number(
        (baseTemperature + (Math.random() - 0.2) * variation).toFixed(5)
      ),
      "ptr1-pt1-s": Number(
        (baseTemperature + (Math.random() - 0.1) * variation).toFixed(5)
      ),
      "mag-msp-s": Number(
        (baseTemperature + (Math.random() - 0.6) * variation).toFixed(5)
      ),

      // Pressure devices
      "3cl-pg-01": Number(
        (basePressure * (1 + Math.random() * 0.1)).toFixed(5)
      ),
      "3cl-pg-02": Number(
        (basePressure * (2 + Math.random() * 0.2)).toFixed(5)
      ),
      "3cl-pg-03": Number(
        (basePressure * (3 + Math.random() * 0.3)).toFixed(5)
      ),
      "3cl-pg-04": Number(
        (basePressure * (4 + Math.random() * 0.4)).toFixed(5)
      ),
      "3cl-pg-05": Number(
        (basePressure * (5 + Math.random() * 0.5)).toFixed(5)
      ),
      "3cl-pg-06": Number(
        (basePressure * (6 + Math.random() * 0.6)).toFixed(5)
      ),

      // Flow devices
      "3cl-fm-01": Number((2.0 + Math.random() * 0.5).toFixed(5)),

      // System state
      timestamp: timestamp.toISOString(),
    });
  }

  return data;
};

// Device to parameter mapping
export const deviceMap = [
  // Temperature devices
  { name: "SRB-GGS-S", parameter: "temperature" },
  { name: "DRI-MIX-S", parameter: "temperature" },
  { name: "DRI-PT2-S", parameter: "temperature" },
  { name: "PTR1-PT2-S", parameter: "temperature" },
  { name: "DRI-PT1-S", parameter: "temperature" },
  { name: "PTR1-PT1-S", parameter: "temperature" },
  { name: "MAG-MSP-S", parameter: "temperature" },
  // Pressure devices
  { name: "3CL-PG-01", parameter: "pressure" },
  { name: "3CL-PG-02", parameter: "pressure" },
  { name: "3CL-PG-03", parameter: "pressure" },
  { name: "3CL-PG-04", parameter: "pressure" },
  { name: "3CL-PG-05", parameter: "pressure" },
  { name: "3CL-PG-06", parameter: "pressure" },
  // Flow devices
  { name: "3CL-FM-01", parameter: "flow" },
];

// Mock device parameters (replace with real data from your backend)
export const deviceParameters: Record<string, DeviceParameters> = {
  "dri-mix-s": {
    resistance: "18.03 kΩ",
    powerDissipation: "1800049e-15 W",
    reactance: "-622.5 Ω",
    excitationMagnitude: "6.32 μV",
    filterTime: "18.00s",
    calibrationCurve: "21 RX-102B-RS-0.01",
    resistanceRange: "20.0 kΩ",
  },
  "3cl-fm-01": {
    resistance: "12.43 kΩ",
    powerDissipation: "1802449e-15 W",
    reactance: "-234.5 Ω",
    excitationMagnitude: "6.32 μV",
    filterTime: "14.00s",
    calibrationCurve: "21 RX-102B-RS-0.01",
    resistanceRange: "20.0 kΩ",
  },
  "3cl-pg-01": {
    resistance: "14.56 kΩ",
    powerDissipation: "1710049e-15 W",
    reactance: "-332.5 Ω",
    excitationMagnitude: "6.32 μV",
    filterTime: "18.00s",
    calibrationCurve: "21 RX-102B-RS-0.01",
    resistanceRange: "20.0 kΩ",
  },
  "3cl-pg-02": {
    resistance: "15.53 kΩ",
    powerDissipation: "1505049e-15 W",
    reactance: "-572.5 Ω",
    excitationMagnitude: "6.32 μV",
    filterTime: "18.00s",
    calibrationCurve: "21 RX-102B-RS-0.01",
    resistanceRange: "20.0 kΩ",
  },
  "3cl-pg-03": {
    resistance: "21.03 kΩ",
    powerDissipation: "2300049e-15 W",
    reactance: "-522.5 Ω",
    excitationMagnitude: "6.32 μV",
    filterTime: "18.00s",
    calibrationCurve: "21 RX-102B-RS-0.01",
    resistanceRange: "20.0 kΩ",
  },
  "3cl-pg-04": {
    resistance: "18.53 kΩ",
    powerDissipation: "1856049e-15 W",
    reactance: "-727.7 Ω",
    excitationMagnitude: "6.32 μV",
    filterTime: "18.00s",
    calibrationCurve: "21 RX-102B-RS-0.01",
    resistanceRange: "20.0 kΩ",
  },
  "3cl-pg-05": {
    resistance: "11.63 kΩ",
    powerDissipation: "1100049e-15 W",
    reactance: "-122.5 Ω",
    excitationMagnitude: "6.32 μV",
    filterTime: "18.00s",
    calibrationCurve: "21 RX-102B-RS-0.01",
    resistanceRange: "20.0 kΩ",
  },
  "3cl-pg-06": {
    resistance: "19.03 kΩ",
    powerDissipation: "1800053e-15 W",
    reactance: "-622.5 Ω",
    excitationMagnitude: "8.36 μV",
    filterTime: "18.00s",
    calibrationCurve: "21 RX-102B-RS-0.01",
    resistanceRange: "20.0 kΩ",
  },
  "dri-pt2-s": {
    resistance: "14.04 kΩ",
    powerDissipation: "1400549e-15 W",
    reactance: "-622.5 Ω",
    excitationMagnitude: "7.52 μV",
    filterTime: "18.00s",
    calibrationCurve: "21 RX-102B-RS-0.01",
    resistanceRange: "20.0 kΩ",
  },
  "ptr1-pt2-s": {
    resistance: "14.03 kΩ",
    powerDissipation: "1800049e-15 W",
    reactance: "-522.5 Ω",
    excitationMagnitude: "6.32 μV",
    filterTime: "16.00s",
    calibrationCurve: "21 RX-102B-RS-0.01",
    resistanceRange: "20.0 kΩ",
  },
  "dri-pt1-s": {
    resistance: "16.03 kΩ",
    powerDissipation: "1800049e-15 W",
    reactance: "-472.5 Ω",
    excitationMagnitude: "6.32 μV",
    filterTime: "16.00s",
    calibrationCurve: "21 RX-102B-RS-0.01",
    resistanceRange: "20.0 kΩ",
  },
  "ptr1-pt1-s": {
    resistance: "22.43 kΩ",
    powerDissipation: "2200049e-15 W",
    reactance: "-622.5 Ω",
    excitationMagnitude: "6.32 μV",
    filterTime: "14.00s",
    calibrationCurve: "21 RX-102B-RS-0.01",
    resistanceRange: "20.0 kΩ",
  },
  "mag-msp-s": {
    resistance: "15.63 kΩ",
    powerDissipation: "1670049e-15 W",
    reactance: "-622.5 Ω",
    excitationMagnitude: "7.32 μV",
    filterTime: "18.00s",
    calibrationCurve: "21 RX-102B-RS-0.01",
    resistanceRange: "20.0 kΩ",
  },
  "srb-ggs-s": {
    resistance: "12.03 kΩ",
    powerDissipation: "1800049e-15 W",
    reactance: "-422.5 Ω",
    excitationMagnitude: "6.32 μV",
    filterTime: "38.00s",
    calibrationCurve: "21 RX-102B-RS-0.01",
    resistanceRange: "20.0 kΩ",
  },
};
