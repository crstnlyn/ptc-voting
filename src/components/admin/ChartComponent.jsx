import React, { useEffect, useRef } from "react";
import { Chart as ChartJS, Filler } from "chart.js/auto";

const ChartComponent = ({ type, labels, datas, title, color }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy previous chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create new chart
    chartInstance.current = new ChartJS(chartRef.current, {
      type: type,
      data: {
        labels: labels,
        datasets: [
          {
            label: title,
            data: datas,
            backgroundColor: color,
            borderWidth: 2,
            borderColor: type === "line" ? "#134686" : undefined,
            tension: type === "line" ? 0.3 : 0,
            pointRadius: 0.5,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: { position: "bottom" },
          title: { display: true, text: title },
        },
        scales: {
          x: {
            display: type === "doughnut" ? false : true,
            grid: {
              display: false, // ❌ remove x-axis gridlines
              drawBorder: false, // ❌ remove x-axis line
            },
          },
          y: {
            display: type === "doughnut" ? false : true,
            grid: {
              display: false, // ❌ remove y-axis gridlines
              drawBorder: false, // ❌ remove y-axis line
            },
            ticks: {
              precision: 0, // whole numbers only
            },
          },
        },
      },
    });

    // Cleanup on unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null; // important!
      }
    };
  }, [labels, datas, title, type, color]);

  return <canvas ref={chartRef} className="w-full"></canvas>;
};

export default ChartComponent;
