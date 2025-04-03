"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { TemperatureChart } from "@/components/charts/TemperatureChart";
import { PressureChart } from "@/components/charts/PressureChart";
import { FlowChart } from "@/components/charts/FlowChart";
import { DeviceDetails } from "@/components/DeviceDetails";
import { useStore } from "@/store/useStore";
import { formatValue } from "@/lib/utiles";
import { deviceMap, deviceParameters } from "@/data/sampleData";
import { Maximize2, Plus } from "lucide-react";
import { TimeRangeSelector } from "@/components/TimeRangeSelector";

export default function DashboardPage() {
  const { systemStatus, startSimulation, stopSimulation } = useStore();
  const [mounted, setMounted] = useState(false);
  const [selectedDevice] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState(24); // Default 24 hours

  // Transform device parameters to array format
  const transformParameters = (params: Record<string, string>) => {
    return Object.entries(params).map(([name, value]) => ({
      name,
      value,
    }));
  };

  useEffect(() => {
    setMounted(true);
    startSimulation();
    return () => stopSimulation();
  }, [startSimulation, stopSimulation]);

  if (!mounted) {
    return null;
  }

  // Group devices by parameter type
  const temperatureDevices = deviceMap.filter(
    (d) => d.parameter === "temperature"
  );
  const pressureDevices = deviceMap.filter((d) => d.parameter === "pressure");
  const flowDevices = deviceMap.filter((d) => d.parameter === "flow");

  // if (!isClient || !systemStatus) {
  //   return (
  //     <div className="min-h-screen bg-background">
  //       <Navigation />
  //       <div className="p-6">
  //         <h1 className="text-3xl font-bold mb-6">Loading...</h1>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <>
      <div className="flex justify-between mb-6 items-center gap-3 flex-col sm:flex-row">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <TimeRangeSelector
          selectedRange={timeRange}
          onRangeChange={setTimeRange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
        {/* System Overview Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>System Overview</CardTitle>
            <Maximize2 className="h-4 w-4 text-muted-foreground cursor-pointer" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Devices</p>
                <p className="text-2xl font-bold">{deviceMap.length}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Devices</p>
                <p className="text-2xl font-bold text-green-600">
                  {deviceMap.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Temperature Status Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Temperature Status</CardTitle>
            <Maximize2 className="h-4 w-4 text-muted-foreground cursor-pointer" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  Average Temperature
                </p>
                <p className="text-2xl font-bold">
                  {formatValue(
                    systemStatus
                      ? temperatureDevices.reduce(
                          (acc, device) =>
                            acc +
                            (systemStatus[device.name.toLowerCase()] as number),
                          0
                        ) / temperatureDevices.length
                      : 0,
                    "K"
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Devices</p>
                <p className="text-2xl font-bold">
                  {temperatureDevices.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pressure Status Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Pressure Status</CardTitle>
            <Maximize2 className="h-4 w-4 text-muted-foreground cursor-pointer" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  Average Pressure
                </p>
                <p className="text-2xl font-bold">
                  {formatValue(
                    systemStatus
                      ? pressureDevices.reduce(
                          (acc, device) =>
                            acc +
                            (systemStatus[device.name.toLowerCase()] as number),
                          0
                        ) / pressureDevices.length
                      : 0,
                    "mbar"
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Devices</p>
                <p className="text-2xl font-bold">{pressureDevices.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Flow Status Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Flow Status</CardTitle>
            <Maximize2 className="h-4 w-4 text-muted-foreground cursor-pointer" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Average Flow</p>
                <p className="text-2xl font-bold">
                  {formatValue(
                    systemStatus
                      ? flowDevices.reduce(
                          (acc, device) =>
                            acc +
                            (systemStatus[device.name.toLowerCase()] as number),
                          0
                        ) / flowDevices.length
                      : 0,
                    "mol/s"
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Devices</p>
                <p className="text-2xl font-bold">{flowDevices.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Temperature Measurements</CardTitle>
              <Maximize2 className="h-4 w-4 text-muted-foreground cursor-pointer" />
            </CardHeader>
            <CardContent>
              <TemperatureChart timeRange={timeRange} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Pressure Measurements</CardTitle>
              <Maximize2 className="h-4 w-4 text-muted-foreground cursor-pointer" />
            </CardHeader>
            <CardContent>
              <PressureChart timeRange={timeRange} />
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Flow Measurements</CardTitle>
              <Maximize2 className="h-4 w-4 text-muted-foreground cursor-pointer" />
            </CardHeader>
            <CardContent>
              <FlowChart timeRange={timeRange} />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Device Details Section */}
      {selectedDevice && deviceParameters[selectedDevice] && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Device Details</CardTitle>
            <Maximize2 className="h-4 w-4 text-muted-foreground cursor-pointer" />
          </CardHeader>
          <CardContent>
            <DeviceDetails
              deviceName={selectedDevice.toUpperCase()}
              parameters={transformParameters(deviceParameters[selectedDevice])}
            />
          </CardContent>
        </Card>
      )}

      {/* Add Widget Button */}
      <button
        className="mt-6 flex items-center justify-center w-full p-6 rounded-lg border-2 border-dashed 
          border-blue-200 hover:border-blue-400 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 
          transition-all duration-300 group relative overflow-hidden"
        onClick={() => {
          // TODO: Implement widget addition logic
          console.log("Add widget clicked");
        }}
      >
        <div className="flex items-center space-x-3 text-blue-500 group-hover:text-blue-600 z-10">
          <div className="p-2.5 rounded-full bg-blue-100 group-hover:bg-blue-200 transition-colors">
            <Plus className="h-6 w-6" />
          </div>
          <span className="text-lg font-medium">Add widget</span>
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-r from-blue-100/20 via-indigo-100/20 to-purple-100/20 
          opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      </button>
    </>
  );
}
