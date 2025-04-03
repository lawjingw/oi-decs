"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type DataKey = {
  key: string;
  name: string;
  color: string;
  unit?: string;
};

type BaseChartProps = {
  data: { [key: string]: string | number; timestamp: string; label: string }[];
  title: string;
  yAxisLabel: string;
  yAxisUnit: string;
  height: number;
  dataKeys: DataKey[];
};

export function BaseChart({
  data,
  title,
  yAxisLabel,
  yAxisUnit,
  height,
  dataKeys,
}: BaseChartProps) {
  const [isAnimated, setIsAnimated] = useState(true);

  // Disable animation after the first render
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(false);
    }, 1000); // Wait for initial animation to complete

    return () => clearTimeout(timer);
  }, []);

  // Format time to HH:MM:ss
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div style={{ width: "100%", height }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" tickFormatter={formatTime} />
            <YAxis
              label={{
                value: `${yAxisLabel} (${yAxisUnit})`,
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip
              labelFormatter={(value) => new Date(value).toLocaleString()}
              formatter={(value: number, name: string) => {
                const dataKey = dataKeys.find((dk) => dk.key === name);
                return [
                  `${value} ${dataKey?.unit || yAxisUnit}`,
                  dataKey?.name || name,
                ];
              }}
            />
            <Legend />
            {dataKeys.map(({ key, name, color }) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                name={name}
                stroke={color}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 8 }}
                isAnimationActive={isAnimated}
                animationDuration={1000}
                animationEasing="ease-in-out"
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
