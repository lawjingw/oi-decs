import { AlertTriangle, XCircle, AlertOctagon } from "lucide-react";

interface Alert {
  type: "error" | "warning";
  message: string;
  timestamp: string;
}

interface DeviceAlertsProps {
  deviceName: string;
  alerts: Alert[];
}

export function DeviceAlerts({ deviceName, alerts }: DeviceAlertsProps) {
  if (alerts.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-4">
        <AlertOctagon className="h-5 w-5 mx-auto mb-2 opacity-50" />
        No errors or warnings for {deviceName}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {alerts.map((alert, index) => (
        <div
          key={`${alert.timestamp}-${index}`}
          className={`relative overflow-hidden ${
            alert.type === "error"
              ? "border-l-4 border-l-red-500 bg-gradient-to-r from-red-50 to-background"
              : "border-l-4 border-l-orange-500 bg-gradient-to-r from-orange-50 to-background"
          } rounded-lg shadow-sm`}
        >
          <div className="flex items-start space-x-4 p-4">
            {alert.type === "error" ? (
              <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-orange-500 flex-shrink-0" />
            )}
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <p
                  className={`font-semibold ${
                    alert.type === "error" ? "text-red-500" : "text-orange-500"
                  }`}
                >
                  {alert.type === "error" ? "Error" : "Warning"}
                </p>
                <time
                  className="text-xs text-muted-foreground"
                  dateTime={alert.timestamp}
                >
                  {new Date(alert.timestamp).toLocaleString()}
                </time>
              </div>
              <p className="text-sm leading-relaxed text-foreground/90">
                {alert.message}
              </p>
            </div>
          </div>
          <div
            className={`absolute top-0 right-0 w-32 h-full opacity-10 blur-2xl ${
              alert.type === "error" ? "bg-red-500" : "bg-orange-500"
            }`}
          />
        </div>
      ))}
    </div>
  );
}
