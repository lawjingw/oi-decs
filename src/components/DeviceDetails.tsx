import { Clock, Activity, Info, Cpu } from "lucide-react";

type Parameter = {
  name: string;
  value: string | number;
  unit?: string;
  timestamp?: string;
};

type DeviceDetailsProps = {
  deviceName: string;
  parameters: Parameter[];
};

export function DeviceDetails({ deviceName, parameters }: DeviceDetailsProps) {
  return (
    <div className="space-y-6">
      {/* Device Header */}
      <div className="flex items-center justify-between pb-4 border-b">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-full bg-primary/10">
            <Cpu className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{deviceName}</h3>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
          Active
        </span>
      </div>

      {/* Parameters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {parameters.map((param, index) => (
          <div
            key={index}
            className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Activity className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm font-medium text-muted-foreground">
                    {param.name}
                  </p>
                </div>
                <div className="flex items-baseline space-x-2">
                  <p className="text-2xl font-bold">{param.value}</p>
                  {param.unit && (
                    <span className="text-sm text-muted-foreground">
                      {param.unit}
                    </span>
                  )}
                </div>
              </div>
              {param.timestamp && (
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{new Date(param.timestamp).toLocaleTimeString()}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Additional Info */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground pt-2">
        <Info className="h-4 w-4" />
        <p>Last updated: {new Date().toLocaleString()}</p>
      </div>
    </div>
  );
}
