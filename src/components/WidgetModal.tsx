"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/Dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  Thermometer,
  Gauge,
  Wind,
  BarChart3,
  Activity,
  Bell,
  LineChart,
  PieChart,
  LucideIcon,
} from "lucide-react";

interface Widget {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  type: "chart" | "metric" | "alert";
}

const availableWidgets: Widget[] = [
  {
    id: "temperature-chart",
    title: "Temperature Chart",
    description: "Line chart showing temperature measurements over time",
    icon: Thermometer,
    type: "chart",
  },
  {
    id: "pressure-chart",
    title: "Pressure Chart",
    description: "Line chart showing pressure measurements over time",
    icon: Gauge,
    type: "chart",
  },
  {
    id: "flow-chart",
    title: "Flow Chart",
    description: "Line chart showing flow measurements over time",
    icon: Wind,
    type: "chart",
  },
  {
    id: "system-metrics",
    title: "System Metrics",
    description: "Overview of key system metrics and statistics",
    icon: BarChart3,
    type: "metric",
  },
  {
    id: "device-status",
    title: "Device Status",
    description: "Real-time status of all connected devices",
    icon: Activity,
    type: "metric",
  },
  {
    id: "alerts-panel",
    title: "Alerts Panel",
    description: "Display and manage system alerts and notifications",
    icon: Bell,
    type: "alert",
  },
  {
    id: "performance-trends",
    title: "Performance Trends",
    description: "Historical performance data and trends",
    icon: LineChart,
    type: "chart",
  },
  {
    id: "system-distribution",
    title: "System Distribution",
    description: "Distribution of system resources and usage",
    icon: PieChart,
    type: "chart",
  },
];

interface WidgetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddWidget: (widgetId: string) => void;
}

export function WidgetModal({
  open,
  onOpenChange,
  onAddWidget,
}: WidgetModalProps) {
  const [selectedWidget, setSelectedWidget] = useState<string | null>(null);

  const handleAddWidget = () => {
    if (selectedWidget) {
      onAddWidget(selectedWidget);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Add Widget</DialogTitle>
          <DialogDescription>
            Select a widget to add to your dashboard
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {availableWidgets.map((widget) => (
            <Card
              key={widget.id}
              className={`cursor-pointer transition-all ${
                selectedWidget === widget.id
                  ? "ring-2 ring-primary shadow-lg"
                  : "hover:shadow-md"
              }`}
              onClick={() => setSelectedWidget(widget.id)}
            >
              <CardHeader className="flex flex-row items-center space-x-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <widget.icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-base">{widget.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {widget.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex justify-end space-x-2 mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddWidget} disabled={!selectedWidget}>
            Add Widget
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
