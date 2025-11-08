import React from "react";
import { dashboardData } from "../../data/dashboardData";
function DataStats() {
  return (
    <>
      {dashboardData.stats.map((stat) => (
        <div
          className="flex flex-col bg-white p-4 rounded-xl shadow-md"
          key={stat.id}
        >
          <p className="text-[var(--text-primary)]">{stat.title}</p>
          <p className="text-2xl font-semibold">{stat.value}</p>
          <p className="text-[var(--text-primary)]">
            <span className="text-green-600">{stat.change}</span> vs last month
          </p>
        </div>
      ))}
    </>
  );
}

export default DataStats;
