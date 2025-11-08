import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { dashboardData } from "../../data/dashboardData";

const chartData = dashboardData.chartData;

export default function BarChartComponent() {
  return (
    <div>
      <div>
        <p className="text-2xl font-semibold p-4">Performance</p>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart width={750} height={400} data={chartData}>
          <XAxis dataKey="month" stroke="red" />
          <YAxis stroke="red" />
          <Tooltip />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Bar
            dataKey="sales"
            fill="green"
            barSize={30}
            radius={[10, 10, 0, 0]}
          />
          <Bar
            dataKey="users"
            fill="darkgreen"
            barSize={30}
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
