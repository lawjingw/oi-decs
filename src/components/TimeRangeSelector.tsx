import { Clock } from "lucide-react";

type TimeRange = {
  label: string;
  value: number; // hours
};

const timeRanges: TimeRange[] = [
  { label: "1h", value: 1 },
  { label: "6h", value: 6 },
  { label: "12h", value: 12 },
  { label: "24h", value: 24 },
  { label: "48h", value: 48 },
  { label: "7d", value: 168 },
];

type TimeRangeSelectorProps = {
  selectedRange: number;
  onRangeChange: (range: number) => void;
};

export function TimeRangeSelector({
  selectedRange,
  onRangeChange,
}: TimeRangeSelectorProps) {
  return (
    <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-lg shadow-sm">
      <div className="flex items-center text-slate-600 dark:text-slate-300 px-2">
        <Clock className="h-4 w-4 mr-1.5" />
        <span className="text-sm font-medium">Time Range:</span>
      </div>
      <div className="flex space-x-1">
        {timeRanges.map((range) => (
          <button
            key={range.value}
            onClick={() => onRangeChange(range.value)}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
              selectedRange === range.value
                ? "bg-blue-600 text-white shadow-sm font-semibold"
                : "hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
            }`}
          >
            {range.label}
          </button>
        ))}
      </div>
    </div>
  );
}
