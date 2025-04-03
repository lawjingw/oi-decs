import { ChartData } from "@/lib/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const formatTimestamp = (timestamp: string): string => {
  return new Date(timestamp).toLocaleString();
};

export const formatValue = (value: number, unit: string): string => {
  return `${value.toFixed(2)} ${unit}`;
};

export const generateMockData = (hours: number = 24): ChartData[] => {
  const now = new Date();
  const data: ChartData[] = [];

  for (let i = 0; i < hours * 60; i++) {
    const timestamp = new Date(now.getTime() - (hours * 60 - i) * 60000);
    data.push({
      timestamp: timestamp.toISOString(),
      value: Math.random() * 100,
      label: formatTimestamp(timestamp.toISOString()),
    });
  }

  return data;
};

export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
