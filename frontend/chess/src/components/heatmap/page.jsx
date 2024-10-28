"use client"
import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { format } from "date-fns";


const generateDummyData = () => {
  const today = new Date();
  const data = [];

  // Generate data for the past year with random counts
  for (let i = 0; i < 365; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    data.push({
      date: format(date, "yyyy-MM-dd"),
      count: Math.floor(Math.random() * 5), // Random activity count
    });
  }

  return data;
};

export default function ChessActivityHeatmap() {
  const data = generateDummyData();

  return (
    <div className="p-4">
      <h2 className="text-6lg font-semibold mb-2">Chess Activity in the Last Year</h2>
      <CalendarHeatmap
        startDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
        endDate={new Date()}
        values={data}
        classForValue={(value) => {
          if (!value || value.count === 0) return "color-empty";
          return `color-scale-${Math.min(value.count, 4)}`;
        }}
        showWeekdayLabels
        tooltipDataAttrs={(value) => ({
          "data-tip": `${value.date} - ${value.count || 0} games/moves`,
        })}
      />
      <style jsx>{`
        .color-empty {
          fill: #ebedf0;
        }
        .color-scale-1 {
          fill: #9be9a8;
        }
        .color-scale-2 {
          fill: #40c463;
        }
        .color-scale-3 {
          fill: #30a14e;
        }
        .color-scale-4 {
          fill: #216e39;
        }
      `}</style>
    </div>
  );
}
