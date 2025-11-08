import BarChartComponent from "../components/Dashboard/BarChartComponent";
import DataStats from "../components/Dashboard/DataStats";
import CustomPaginationActionsTable from "../components/Dashboard/Transactions";

const Dashboard = () => {
  return (
    <div className="flex flex-col rounded-t-4xl bg-green-50 py-6 lg:px-8 lg:py-12 h-full md:h-screen w-full ">
      <div className="pb-6 px-4">
        <p className="font-semibold text-3xl">Dashboard</p>
      </div>
      <div className="flex flex-col gap-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-4 md:px-0">
          <DataStats />
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className=" bg-white md:p-4 rounded-xl shadow-md">
            <BarChartComponent />
          </div>
          <div className="bg-white md:p-4 rounded-xl shadow-md">
            <div className="relative">
              <CustomPaginationActionsTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
