"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { TemperatureChart } from "./charts/TemperatureChart";
import { PressureChart } from "./charts/PressureChart";
import { FlowChart } from "./charts/FlowChart";

type ChartType = "temperature" | "pressure" | "flow";

interface ChartModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  chartType: ChartType;
  timeRange: number;
}

export function ChartModal({
  open,
  onOpenChange,
  chartType,
  timeRange,
}: ChartModalProps) {
  const getChartComponent = () => {
    switch (chartType) {
      case "temperature":
        return <TemperatureChart timeRange={timeRange} />;
      case "pressure":
        return <PressureChart timeRange={timeRange} />;
      case "flow":
        return <FlowChart timeRange={timeRange} />;
    }
  };

  const getChartTitle = () => {
    switch (chartType) {
      case "temperature":
        return "Temperature Measurements";
      case "pressure":
        return "Pressure Measurements";
      case "flow":
        return "Flow Measurements";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] w-full h-[90vh]">
        <DialogHeader>
          <DialogTitle>{getChartTitle()}</DialogTitle>
        </DialogHeader>
        <div className="flex-1 h-full min-h-0">{getChartComponent()}</div>
      </DialogContent>
    </Dialog>
  );
}
