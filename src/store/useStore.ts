import { create } from "zustand";
import { SystemStatus, UserPreferences } from "@/lib/types";
import { generateSampleSystemStatus } from "@/data/sampleData";

type AppState = {
  systemStatus: SystemStatus | null;
  userPreferences: UserPreferences;
  setSystemStatus: (status: SystemStatus) => void;
  updateUserPreferences: (preferences: Partial<UserPreferences>) => void;
  startSimulation: () => void;
  stopSimulation: () => void;
};

let simulationInterval: NodeJS.Timeout | null = null;

export const useStore = create<AppState>((set) => ({
  systemStatus: generateSampleSystemStatus(),
  userPreferences: {
    layout: "default",
    notifications: {
      enabled: true,
      criticalAlerts: true,
      warnings: true,
      systemUpdates: true,
    },
  },
  setSystemStatus: (status) => set({ systemStatus: status }),
  updateUserPreferences: (preferences) =>
    set((state) => ({
      userPreferences: {
        ...state.userPreferences,
        ...preferences,
      },
    })),
  startSimulation: () => {
    if (simulationInterval) return;

    // Update immediately
    set({ systemStatus: generateSampleSystemStatus() });

    // Then update every 5 seconds
    simulationInterval = setInterval(() => {
      set({ systemStatus: generateSampleSystemStatus() });
    }, 5000);
  },
  stopSimulation: () => {
    if (simulationInterval) {
      clearInterval(simulationInterval);
      simulationInterval = null;
    }
  },
}));
