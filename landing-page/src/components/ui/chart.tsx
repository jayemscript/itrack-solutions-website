"use client"

import * as React from "react"
import {
    Bar,
    BarChart as ReBarChart,
    Line,
    LineChart as ReLineChart,
    Pie,
    PieChart as RePieChart,
    Tooltip as ReTooltip,
    ResponsiveContainer,
} from "recharts"

import { cn } from "@/lib/utils"

export function ChartContainer({ className, children }) {
    return (
        <div className={cn("w-full h-full", className)}>
            <ResponsiveContainer width="100%" height="100%">
                {children}
            </ResponsiveContainer>
        </div>
    )
}

export function ChartTooltip(props) {
    return <ReTooltip {...props} />
}

export function ChartTooltipContent({ active, payload, label }) {
    if (!active || !payload || payload.length === 0) return null

    return (
        <div className="rounded-md border bg-white p-2 text-sm shadow-md dark:bg-neutral-900">
            {label && (
                <p className="mb-1 font-medium text-neutral-800 dark:text-neutral-200">
                    {label}
                </p>
            )}
            {payload.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between gap-2">
                    <span className="text-neutral-600 dark:text-neutral-300">
                        {item.name}
                    </span>
                    <span className="font-medium text-neutral-900 dark:text-neutral-100">
                        {item.value}
                    </span>
                </div>
            ))}
        </div>
    )
}
