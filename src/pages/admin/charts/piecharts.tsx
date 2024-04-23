import AdminSidebar from "../../../components/admin/AdminSidebar";
import { DoughnutChart, PieChart } from "../../../components/admin/Charts";
import { RootState } from "../../../redux/reducer/store";
import { useSelector } from "react-redux";
import { usePiestatsQuery } from "../../../redux/api/dashboardApi";
import { Skeleton } from "../../../components/loading";
import { Navigate } from "react-router-dom";

const PieCharts = () => {
  const { user } = useSelector((state: RootState) => state.userReducer)
  const { data, isLoading, isError } = usePiestatsQuery(user?._id!)
  if (isError) return <Navigate to={"/admin/dashboard"} />;
  // console.log(data)
  return (
    <div className="admin-container">
      <AdminSidebar />
      {
        isLoading ? <Skeleton length={20} /> : (
          <main className="chart-container">
            <h1>Pie & Doughnut Charts</h1>
            <section>
              <div>
                <PieChart
                  labels={["Processing", "Shipped", "Delivered"]}
                  data={[12, 9, 13]}
                  backgroundColor={[
                    `hsl(110,80%, 80%)`,
                    `hsl(110,80%, 50%)`,
                    `hsl(110,40%, 50%)`,
                  ]}
                  offset={[0, 0, 50]}
                />
              </div>
              <h2>Order Fulfillment Ratio</h2>
            </section>

            <section>
              <div>
                <DoughnutChart
                  labels={data?.charts.productCategories.map((i) => Object.keys(i)[0])!}
                  data={data?.charts.productCategories.map((i) => Object.values(i)[0])!}
                  backgroundColor={data?.charts.productCategories.map(
                    (i) => `hsl(${Object.values(i)[0] *Math.random()* 4}, ${Object.values(i)[0]}%, 50%)`
                  )!}
                  legends={false}
                  offset={[50, 40, 30, 80]}
                />
              </div>
              <h2>Product Categories Ratio</h2>
            </section>

            <section>
              <div>
                <DoughnutChart
                  labels={["In Stock", "Out Of Stock"]}
                  data={[data?.charts.stockAvailablity.inStock!,data?.charts.stockAvailablity.outOfStock!]}
                  backgroundColor={["hsl(269,80%,40%)", "rgb(53, 162, 255)"]}
                  legends={false}
                  offset={[0, 80]}
                  cutout={"70%"}
                />
              </div>
              <h2> Stock Availability</h2>
            </section>

            <section>
              <div>
                <DoughnutChart
                  labels={[
                    "Marketing Cost",
                    "Discount",
                    "Burnt",
                    "Production Cost",
                    "Net Margin",
                  ]}
                  data={[data?.charts.revenueDistribution.marketingCost!,
                    data?.charts.revenueDistribution.discount!,
                    data?.charts.revenueDistribution.burnt!,
                    data?.charts.revenueDistribution.productionCost!,
                    data?.charts.revenueDistribution.netMargin!
                  ]}
                  backgroundColor={[
                    "hsl(110,80%,40%)",
                    "hsl(19,80%,40%)",
                    "hsl(69,80%,40%)",
                    "hsl(300,80%,40%)",
                    "rgb(53, 162, 255)",
                  ]}
                  legends={false}
                  offset={[20, 30, 20, 30, 80]}
                />
              </div>
              <h2>Revenue Distribution</h2>
            </section>

            <section>
              <div>
                <PieChart
                  labels={[
                    "Teenager(Below 20)",
                    "Adult (20-40)",
                    "Older (above 40)",
                  ]}
                  data={[data?.charts.usersAgeGroup.teen!,data?.charts.usersAgeGroup.adult!,data?.charts.usersAgeGroup.old!]}
                  backgroundColor={[
                    `hsl(10, ${80}%, 80%)`,
                    `hsl(10, ${80}%, 50%)`,
                    `hsl(10, ${40}%, 50%)`,
                  ]}
                  offset={[0, 0, 50]}
                />
              </div>
              <h2>Users Age Group</h2>
            </section>

            <section>
              <div>
                <DoughnutChart
                  labels={["Admin", "Customers"]}
                  data={[data?.charts.adminCustomer.admin!,data?.charts.adminCustomer.customer!]}
                  backgroundColor={[`hsl(335, 100%, 38%)`, "hsl(44, 98%, 50%)"]}
                  offset={[0, 50]}
                />
              </div>
            </section>
          </main>
        )
      }
    </div>
  );
};

export default PieCharts;
