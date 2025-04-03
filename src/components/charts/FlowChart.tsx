import { useEffect, useState } from "react";
import { BaseChart } from "./BaseChart";
import { generateHistoricalData } from "@/data/sampleData";
import { SystemStatus } from "@/lib/types";
import { DeviceSelector } from "./DeviceSelector";

type FlowData = {
  timestamp: string;
  label: string;
  [key: string]: string | number;
};

const availableDevices = [
  { name: "3cl-fm-01", label: "3CL FM 01", color: "#0066CC" },
];

type FlowChartProps = {
  selectedDevice?: string;
};

export function FlowChart({ selectedDevice }: FlowChartProps) {
  const [data, setData] = useState<FlowData[]>([]);
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
    const initialData = historicalData.map((item: SystemStatus) => {
      const dataPoint: FlowData = {
        timestamp: item.timestamp,
        label: new Date(item.timestamp).toLocaleString(),
      };
      availableDevices.forEach((device) => {
        const value = item[device.name];
        dataPoint[device.name] =
          typeof value === "number" ? Number(value.toFixed(5)) : 0;
      });
      return dataPoint;
    });
    setData(initialData);

    // Set up real-time updates
    const interval = setInterval(() => {
      setData((prevData) => {
        const now = new Date();
        const newData = [...prevData];
        const baseFlow = 10; // 10 L/min
        const variation = 2; // ±2 L/min variation

        const newPoint: FlowData = {
          timestamp: now.toISOString(),
          label: now.toLocaleString(),
        };

        availableDevices.forEach((device) => {
          newPoint[device.name] = Number(
            (baseFlow + (Math.random() - 0.5) * variation).toFixed(5)
          );
        });

        newData.push(newPoint);
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
        title="Flow Measurements"
        yAxisLabel="Flow"
        yAxisUnit="mol/s"
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
