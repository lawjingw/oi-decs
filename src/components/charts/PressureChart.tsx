import { useEffect, useState } from "react";
import { BaseChart } from "./BaseChart";
import { generateHistoricalData } from "@/data/sampleData";
import { SystemStatus } from "@/lib/types";
import { DeviceSelector } from "./DeviceSelector";

type PressureData = {
  timestamp: string;
  label: string;
  [key: string]: string | number;
};

const availableDevices = [
  { name: "3cl-pg-01", label: "3CL PG 01", color: "#0066CC" },
  { name: "3cl-pg-02", label: "3CL PG 02", color: "#10B981" },
  { name: "3cl-pg-03", label: "3CL PG 03", color: "#F59E0B" },
  { name: "3cl-pg-04", label: "3CL PG 04", color: "#EF4444" },
  { name: "3cl-pg-05", label: "3CL PG 05", color: "#8B5CF6" },
  { name: "3cl-pg-06", label: "3CL PG 06", color: "#EC4899" },
];

type PressureChartProps = {
  selectedDevice?: string;
};

export function PressureChart({ selectedDevice }: PressureChartProps) {
  const [data, setData] = useState<PressureData[]>([]);
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
      const dataPoint: PressureData = {
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
        const basePressure = 1.013; // Base pressure in mbar (atmospheric pressure)

        newData.push({
          timestamp: now.toISOString(),
          label: now.toLocaleString(),
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
        });
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
        title="Pressure Measurements"
        yAxisLabel="Pressure"
        yAxisUnit="mbar"
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
