"use client";

import * as React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { cn } from "@/lib/utils";

interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: {
    name: string;
    value: number;
  }[];
  variant?: "line" | "bar";
  showXAxis?: boolean;
  showYAxis?: boolean;
  showGrid?: boolean;
  showTooltip?: boolean;
  lineColor?: string;
  strokeWidth?: number;
}

export function Chart({
  data,
  variant = "line",
  showXAxis = true,
  showYAxis = true,
  showGrid = true,
  showTooltip = true,
  lineColor = "hsl(var(--chart-1))",
  strokeWidth = 2,
  className,
  ...props
}: ChartProps) {
  return (
    <div className={cn("w-full h-[300px]", className)} {...props}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 5,
            left: 5,
            bottom: 5,
          }}
        >
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={true}
              vertical={false}
              stroke="hsl(var(--border))"
            />
          )}
          {showXAxis && (
            <XAxis
              dataKey="name"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
          )}
          {showYAxis && (
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
          )}
          {showTooltip && (
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Name
                          </span>
                          <span className="font-bold text-muted-foreground">
                            {payload[0].payload.name}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Value
                          </span>
                          <span className="font-bold">
                            {payload[0].payload.value}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }

                return null;
              }}
            />
          )}
          <Line
            type="monotone"
            dataKey="value"
            stroke={lineColor}
            strokeWidth={strokeWidth}
            activeDot={{
              r: 6,
              style: { fill: "var(--chart-1)", opacity: 0.25 },
            }}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}