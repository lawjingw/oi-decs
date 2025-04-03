import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import {
  Gauge,
  Thermometer,
  Wind,
  Activity,
  BarChart3,
  Bell,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    title: "Temperature Monitoring",
    description:
      "Real-time temperature tracking with high precision measurements down to 0.001K",
    icon: Thermometer,
    color: "text-red-500",
    bgColor: "bg-red-50",
  },
  {
    title: "Pressure Control",
    description:
      "Advanced pressure monitoring and control systems for vacuum environments",
    icon: Gauge,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    title: "Flow Management",
    description:
      "Precise flow rate control and monitoring for optimal system performance",
    icon: Wind,
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
];

const quickLinks = [
  {
    title: "Dashboard",
    description: "View system overview and real-time metrics",
    icon: BarChart3,
    href: "/dashboard",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
  {
    title: "Devices",
    description: "Manage and monitor individual devices",
    icon: Activity,
    href: "/devices",
    color: "text-indigo-500",
    bgColor: "bg-indigo-50",
  },
  {
    title: "Alerts",
    description: "View system alerts and notifications",
    icon: Bell,
    href: "/alerts",
    color: "text-orange-500",
    bgColor: "bg-orange-50",
  },
];

export default function HomePage() {
  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome to oi.DECS
        </h1>
        <p className="text-muted-foreground">
          Control system for managing low-temperature and cryomagnetic systems
        </p>
      </div>

      {/* Features Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Key Features</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="transition-all hover:shadow-md"
            >
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${feature.bgColor}`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Access Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Quick Access</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map((link) => (
            <Link key={link.title} href={link.href}>
              <Card className="transition-all hover:shadow-md hover:bg-accent/50 cursor-pointer">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${link.bgColor}`}>
                      <link.icon className={`h-6 w-6 ${link.color}`} />
                    </div>
                    <div className="space-y-1">
                      <CardTitle>{link.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {link.description}
                      </p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
