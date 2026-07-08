function StatsTable({ title, stats, className = "" }) {
    if (!stats) {
        return null;
    }

    const tableData = Object.entries(stats)
        .sort(([labelA], [labelB]) => labelB.localeCompare(labelA))
        .map(([label, stat]) => ({
            label,
            count: stat.count,
            percentage: stat.percentage,
        }));

    return (
        <div
            className={`overflow-hidden rounded-xl border shadow-sm ${className}`}
            style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border)",
                boxShadow: "0 2px 8px var(--shadow)",
            }}
        >
            <table className="min-w-full border-collapse">
                <caption
                    className="px-4 py-3 text-lg font-semibold"
                    style={{
                        backgroundColor: "var(--bg-input)",
                        color: "var(--text-primary)",
                    }}
                >
                    {title} Table
                </caption>

                <thead
                    style={{
                        backgroundColor: "var(--bg-input)",
                        color: "var(--text-primary)",
                    }}
                >
                    <tr>
                        <th className="px-4 py-3 text-left font-semibold">
                            {title}
                        </th>

                        <th className="px-4 py-3 text-center font-semibold">
                            Count
                        </th>

                        <th className="px-4 py-3 text-center font-semibold">
                            Percentage
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {tableData.map((row) => (
                        <tr
                            key={row.label}
                            className="transition-colors"
                            style={{
                                borderTop: "1px solid var(--border)",
                            }}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                    "var(--bg-input)")
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                    "transparent")
                            }
                        >
                            <td
                                className="px-4 py-2 font-mono"
                                style={{ color: "var(--text-primary)" }}
                            >
                                {row.label}
                            </td>

                            <td
                                className="px-4 py-2 text-center"
                                style={{ color: "var(--text-secondary)" }}
                            >
                                {row.count}
                            </td>

                            <td
                                className="px-4 py-2 text-center"
                                style={{ color: "var(--text-secondary)" }}
                            >
                                {row.percentage.toFixed(2)}%
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default StatsTable;