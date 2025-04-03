import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/Card";

interface ChartContainerProps {
  children: ReactNode;
  className?: string;
}

export function ChartContainer({ children, className }: ChartContainerProps) {
  return (
    <Card className={className}>
      <CardContent className="p-6">{children}</CardContent>
    </Card>
  );
}
