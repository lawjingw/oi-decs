import { Checkbox } from "@/components/ui/Checkbox";

type Device = {
  name: string;
  label: string;
  color: string;
};

type DeviceSelectorProps = {
  devices: Device[];
  selectedDevices: string[];
  onDeviceToggle: (deviceName: string) => void;
};

export function DeviceSelector({
  devices,
  selectedDevices,
  onDeviceToggle,
}: DeviceSelectorProps) {
  return (
    <div className="flex flex-wrap gap-4 p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {devices.map((device) => (
        <div key={device.name} className="flex items-center space-x-2">
          <Checkbox
            id={device.name}
            checked={selectedDevices.includes(device.name)}
            onCheckedChange={() => onDeviceToggle(device.name)}
          />
          <label
            htmlFor={device.name}
            className="flex items-center space-x-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: device.color }}
            />
            <span>{device.label}</span>
          </label>
        </div>
      ))}
    </div>
  );
}
