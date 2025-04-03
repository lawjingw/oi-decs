export type SystemStatus = {
  // Temperature devices
  "srb-ggs-s": number;
  "dri-mix-s": number;
  "dri-pt2-s": number;
  "ptr1-pt2-s": number;
  "dri-pt1-s": number;
  "ptr1-pt1-s": number;
  "mag-msp-s": number;

  // Pressure devices
  "3cl-pg-01": number;
  "3cl-pg-02": number;
  "3cl-pg-03": number;
  "3cl-pg-04": number;
  "3cl-pg-05": number;
  "3cl-pg-06": number;

  // Flow devices
  "3cl-fm-01": number;

  // System state
  timestamp: string;

  // Index signature
  [key: string]: number | string;
};

export type ChartData = {
  timestamp: string;
  label: string;
  value: number;
};

export type DashboardConfig = {
  layout: "default" | "compact" | "expanded";
  showTemperatureChart: boolean;
  showPressureChart: boolean;
  showFlowChart: boolean;
  temperatureChartRange: "1h" | "24h" | "7d";
  pressureChartRange: "1h" | "24h" | "7d";
  flowChartRange: "1h" | "24h" | "7d";
};

export type UserPreferences = {
  layout: "default" | "compact" | "expanded";
  notifications: {
    enabled: boolean;
    criticalAlerts: boolean;
    warnings: boolean;
    systemUpdates: boolean;
  };
};

export type DeviceParameters = {
  resistance: string;
  powerDissipation: string;
  reactance: string;
  excitationMagnitude: string;
  filterTime: string;
  calibrationCurve: string;
  resistanceRange: string;
};
