import { useEffect, useState } from "react";
import { BaseChart } from "./BaseChart";
import { generateHistoricalData } from "@/data/sampleData";
import { SystemStatus } from "@/lib/types";
import { DeviceSelector } from "./DeviceSelector";

type TemperatureData = {
  timestamp: string;
  label: string;
  [key: string]: string | number;
};

const availableDevices = [
  { name: "srb-ggs-s", label: "SRB GGS", color: "#0066CC" },
  { name: "dri-mix-s", label: "DRI MIX", color: "#10B981" },
  { name: "dri-pt2-s", label: "DRI PT2", color: "#F59E0B" },
  { name: "ptr1-pt2-s", label: "PTR1 PT2", color: "#EF4444" },
  { name: "dri-pt1-s", label: "DRI PT1", color: "#8B5CF6" },
  { name: "ptr1-pt1-s", label: "PTR1 PT1", color: "#EC4899" },
  { name: "mag-msp-s", label: "MAG MSP", color: "#14B8A6" },
];

type TemperatureChartProps = {
  selectedDevice?: string;
};

export function TemperatureChart({ selectedDevice }: TemperatureChartProps) {
  const [data, setData] = useState<TemperatureData[]>([]);
  const [selectedDevices, setSelectedDevices] = useState<string[]>(
    selectedDevice ? [selectedDevice] : availableDevices.map((d) => d.name)
  );

  useEffect(() => {
    if (selectedDevice) {
      setSelectedDevices([selectedDevice]);
    }
  }, [selectedDevice]);

  useEffect(() => {
    // Generate initial data
    const historicalData = generateHistoricalData(24);
    const initialData = historicalData.map((item: SystemStatus) => ({
      timestamp: item.timestamp,
      label: new Date(item.timestamp).toLocaleString(),
      "srb-ggs-s": Number(item["srb-ggs-s"]?.toFixed(5) || "0"),
      "dri-mix-s": Number(item["dri-mix-s"]?.toFixed(5) || "0"),
      "dri-pt2-s": Number(item["dri-pt2-s"]?.toFixed(5) || "0"),
      "ptr1-pt2-s": Number(item["ptr1-pt2-s"]?.toFixed(5) || "0"),
      "dri-pt1-s": Number(item["dri-pt1-s"]?.toFixed(5) || "0"),
      "ptr1-pt1-s": Number(item["ptr1-pt1-s"]?.toFixed(5) || "0"),
      "mag-msp-s": Number(item["mag-msp-s"]?.toFixed(5) || "0"),
    }));
    setData(initialData);

    // Set up real-time updates (mock for now)
    const interval = setInterval(() => {
      setData((prevData) => {
        const now = new Date();
        const newData = [...prevData];
        const minTemp = 0.001;
        const maxTemp = 0.3;
        const baseTemperature = (minTemp + maxTemp) / 2;
        const variation = (maxTemp - minTemp) * 0.2; // 20% variation

        newData.push({
          timestamp: now.toISOString(),
          label: now.toLocaleString(),
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
        });
        // Keep only the last 24 hours of data
        return newData.slice(-1440); // 24 hours * 60 minutes
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleDeviceToggle = (deviceName: string) => {
    setSelectedDevices((prev) =>
      prev.includes(deviceName)
        ? prev.filter((d) => d !== deviceName)
        : [...prev, deviceName]
    );
  };

  return (
    <div className="space-y-4">
      {!selectedDevice && (
        <DeviceSelector
          devices={availableDevices}
          selectedDevices={selectedDevices}
          onDeviceToggle={handleDeviceToggle}
        />
      )}
      <BaseChart
        data={data}
        title="Temperature Measurements"
        yAxisLabel="Temperature"
        yAxisUnit="K"
        height={400}
        dataKeys={availableDevices
          .filter((device) => selectedDevices.includes(device.name))
          .map((device) => ({
            key: device.name,
            name: device.label,
            color: device.color,
          }))}
      />
    </div>
  );
}
