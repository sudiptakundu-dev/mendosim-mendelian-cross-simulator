import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function BarChart({ stats, title, isDark }) {
    // Don't render the chart until data is available
    if (!stats) {
        return null;
    }

    const textColor = isDark
        ? "rgba(255, 255, 255, 0.85)"
        : "rgba(17, 24, 39, 0.85)";

    const gridColor = isDark
        ? "rgba(255, 255, 255, 0.08)"
        : "rgba(0, 0, 0, 0.08)";

    // Sort genotype labels alphabetically
    const sortedStats = Object.entries(stats).sort(
        ([labelA], [labelB]) => labelB.localeCompare(labelA)
    );

    const data = {
        labels: sortedStats.map(([label]) => label),
        datasets: [
            {
                label: "Percentage",
                data: sortedStats.map(([, stat]) => stat.percentage.toFixed(2)),
                backgroundColor: "rgb(16, 185, 129)",
                borderColor: "rgb(5, 150, 105)",
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: textColor,
                },
            },
            title: {
                display: true,
                text: `${title} Distribution`,
                color: textColor,
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const { count, percentage } =
                            sortedStats[context.dataIndex][1];

                        return [
                            `Count: ${count}`,
                            `Percentage: ${percentage.toFixed(2)}%`,
                        ];
                    },
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: title,
                    color: textColor,
                },
                ticks: {
                    color: textColor,
                },
                grid: {
                    color: gridColor,
                },
            },
            y: {
                beginAtZero: true,
                max: 100,
                title: {
                    display: true,
                    text: "Percentage (%)",
                    color: textColor,
                },
                ticks: {
                    color: textColor,
                    callback: (value) => `${value}%`,
                },
                grid: {
                    color: gridColor,
                },
            },
        },
    };

    return (
        <Bar
            key={isDark ? "dark" : "light"}
            data={data}
            options={options}
        />
    );
}