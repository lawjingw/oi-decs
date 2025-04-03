"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { deviceMap, deviceParameters } from "@/data/sampleData";
import { useStore } from "@/store/useStore";
import { formatValue } from "@/lib/utiles";
import { TemperatureChart } from "@/components/charts/TemperatureChart";
import { PressureChart } from "@/components/charts/PressureChart";
import { FlowChart } from "@/components/charts/FlowChart";
import { DeviceDetails } from "@/components/DeviceDetails";
import { Thermometer, Gauge, Wind, ChevronRight, Cpu } from "lucide-react";
import { DeviceAlerts } from "@/components/DeviceAlerts";

// Group devices by type with icons and colors
const deviceCategories = [
  {
    name: "Temperature Devices",
    type: "temperature",
    icon: Thermometer,
    color: "text-red-500",
    bgColor: "bg-red-100",
    unit: "K",
  },
  {
    name: "Pressure Devices",
    type: "pressure",
    icon: Gauge,
    color: "text-blue-500",
    bgColor: "bg-blue-100",
    unit: "mbar",
  },
  {
    name: "Flow Devices",
    type: "flow",
    icon: Wind,
    color: "text-green-500",
    bgColor: "bg-green-100",
    unit: "mol/s",
  },
];

// Mock alerts data (replace with real data from your backend)
const deviceAlerts: Record<
  string,
  Array<{ type: "error" | "warning"; message: string; timestamp: string }>
> = {
  "srb-ggs-s": [
    {
      type: "error",
      message: "Temperature reading outside expected range",
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
    },
    {
      type: "warning",
      message: "Calibration due in 2 days",
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    },
  ],
  "dri-mix-s": [
    {
      type: "warning",
      message: "Approaching maximum operating temperature",
      timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(), // 10 minutes ago
    },
  ],
};

export default function DevicesPage() {
  const { systemStatus, startSimulation, stopSimulation } = useStore();
  const [mounted, setMounted] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    // Get the first temperature device as default
    const firstDevice = deviceMap.find((d) => d.parameter === "temperature");
    setSelectedDevice(firstDevice ? firstDevice.name.toLowerCase() : null);
    setExpandedCategory("temperature");
    startSimulation();
    return () => stopSimulation();
  }, [startSimulation, stopSimulation]);

  if (!mounted) {
    return null;
  }

  // Group devices by their parameter type
  const devicesByCategory = deviceMap.reduce((acc, device) => {
    if (!acc[device.parameter]) {
      acc[device.parameter] = [];
    }
    acc[device.parameter].push(device);
    return acc;
  }, {} as Record<string, typeof deviceMap>);

  // Get the current value for a device
  const getDeviceValue = (deviceName: string, unit: string) => {
    if (!systemStatus) return "---";
    const value = systemStatus[deviceName.toLowerCase()];
    return formatValue(value as number, unit);
  };

  // Get the appropriate chart component based on device type
  const getChartComponent = (type: string) => {
    switch (type) {
      case "temperature":
        return (
          <TemperatureChart
            key={selectedDevice}
            selectedDevice={selectedDevice || undefined}
            timeRange={24}
          />
        );
      case "pressure":
        return (
          <PressureChart
            key={selectedDevice}
            selectedDevice={selectedDevice || undefined}
            timeRange={24}
          />
        );
      case "flow":
        return (
          <FlowChart
            key={selectedDevice}
            selectedDevice={selectedDevice || undefined}
            timeRange={24}
          />
        );
      default:
        return null;
    }
  };

  // Transform device parameters to array format
  const transformParameters = (params: Record<string, string>) => {
    return Object.entries(params).map(([name, value]) => ({
      name,
      value,
    }));
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Devices</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Device Categories and List */}
        <div className="lg:col-span-4 space-y-4">
          {deviceCategories.map((category) => (
            <Card
              key={category.type}
              className={`cursor-pointer transition-all ${
                expandedCategory === category.type ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setExpandedCategory(category.type)}
            >
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-full ${category.bgColor}`}>
                    <category.icon className={`h-5 w-5 ${category.color}`} />
                  </div>
                  <CardTitle>{category.name}</CardTitle>
                </div>
                <ChevronRight
                  className={`h-5 w-5 transition-transform ${
                    expandedCategory === category.type ? "rotate-90" : ""
                  }`}
                />
              </CardHeader>
              {expandedCategory === category.type && (
                <CardContent>
                  <div className="space-y-2">
                    {devicesByCategory[category.type]?.map((device) => (
                      <div
                        key={device.name}
                        className={`p-3 rounded-lg cursor-pointer transition-all border-l-4 ${
                          selectedDevice === device.name.toLowerCase()
                            ? "bg-primary/5 border-primary shadow-sm text-primary font-medium"
                            : "hover:bg-muted border-transparent hover:border-muted-foreground/20"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDevice(device.name.toLowerCase());
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Cpu
                              className={`h-4 w-4 ${
                                selectedDevice === device.name.toLowerCase()
                                  ? "text-primary"
                                  : "text-muted-foreground"
                              }`}
                            />
                            <span>{device.name}</span>
                            {deviceAlerts[device.name.toLowerCase()]?.length >
                              0 && (
                              <div className="flex items-center space-x-1">
                                {deviceAlerts[device.name.toLowerCase()].some(
                                  (a) => a.type === "error"
                                ) && (
                                  <span className="text-xs bg-red-100 text-red-500 px-1.5 py-0.5 rounded-full">
                                    {
                                      deviceAlerts[
                                        device.name.toLowerCase()
                                      ].filter((a) => a.type === "error").length
                                    }
                                  </span>
                                )}
                                {deviceAlerts[device.name.toLowerCase()].some(
                                  (a) => a.type === "warning"
                                ) && (
                                  <span className="text-xs bg-orange-100 text-orange-500 px-1.5 py-0.5 rounded-full">
                                    {
                                      deviceAlerts[
                                        device.name.toLowerCase()
                                      ].filter((a) => a.type === "warning")
                                        .length
                                    }
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                          <span
                            className={`${
                              selectedDevice === device.name.toLowerCase()
                                ? "text-primary font-semibold"
                                : "text-muted-foreground"
                            }`}
                          >
                            {getDeviceValue(device.name, category.unit)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Device Details and Charts */}
        <div className="lg:col-span-8 space-y-6">
          {selectedDevice && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Device Parameters</CardTitle>
                </CardHeader>
                <CardContent>
                  <DeviceDetails
                    deviceName={selectedDevice.toUpperCase()}
                    parameters={transformParameters(
                      deviceParameters[selectedDevice]
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Measurements</CardTitle>
                </CardHeader>
                <CardContent>
                  {getChartComponent(
                    deviceMap.find(
                      (d) => d.name.toLowerCase() === selectedDevice
                    )?.parameter || ""
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Errors & Warnings</CardTitle>
                </CardHeader>
                <CardContent>
                  <DeviceAlerts
                    deviceName={selectedDevice.toUpperCase()}
                    alerts={deviceAlerts[selectedDevice] || []}
                  />
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </>
  );
}
