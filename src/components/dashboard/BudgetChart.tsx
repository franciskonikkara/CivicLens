"use client";

import { useEffect, useRef } from "react";
import { Chart, ArcElement, DoughnutController, Tooltip, Legend } from "chart.js";
import type { ChartConfiguration } from "chart.js";
import { fmt } from "@/lib/data";

Chart.register(ArcElement, DoughnutController, Tooltip, Legend);

type Slice = { id: string; label: string; amount: number; color: string };

interface Props {
  data: Slice[];
  activeId: string | null;
  onSliceClick?: (id: string) => void;
}

export default function BudgetChart({ data, activeId, onSliceClick }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (chartRef.current) chartRef.current.destroy();

    const colors = data.map((d) => {
      if (activeId === null) return d.color;
      return activeId === d.id ? d.color : d.color + "55";
    });

    const config: ChartConfiguration<"doughnut"> = {
      type: "doughnut",
      data: {
        labels: data.map((d) => d.label),
        datasets: [
          {
            data: data.map((d) => d.amount),
            backgroundColor: colors,
            borderWidth: 2,
            borderColor: "#f5f0e8",
            hoverOffset: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "62%",
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.label}: ${fmt(ctx.parsed as number)}`,
            },
          },
        },
        onClick: (_e, els) => {
          if (!els.length || !onSliceClick) return;
          onSliceClick(data[els[0].index].id);
        },
      },
    };

    chartRef.current = new Chart(canvasRef.current, config);
    return () => chartRef.current?.destroy();
  }, [data, activeId, onSliceClick]);

  return <canvas ref={canvasRef} />;
}
