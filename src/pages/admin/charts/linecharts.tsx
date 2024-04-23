import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { LineChart } from "../../../components/admin/Charts";
import { useLinestatsQuery } from "../../../redux/api/dashboardApi";
import { RootState } from "../../../redux/reducer/store";
import { customError } from "../../../types/api-types";
import { Skeleton } from "../../../components/loading";
import { getLastMonths } from "../../../utils/features";


const{last12Months} =getLastMonths();

const Linecharts = () => {
  const { user } = useSelector((state: RootState) => state.userReducer)
  const { data, isLoading, isError, error } = useLinestatsQuery(user?._id!)
  if (isError) {
    const err = error as customError;
    toast.error(err.data.message)
  }
  // console.log(data)
  return (
    <div className="admin-container">
      <AdminSidebar />
      {
        isLoading ? <Skeleton length={20} /> : (
          <main className="chart-container">
            <h1>Line Charts</h1>
            <section>
              <LineChart
                data={data?.charts.users!}
                label="Users"
                borderColor="rgb(53, 162, 255)"
                labels={last12Months}
                backgroundColor="rgba(53, 162, 255, 0.5)"
              />
              <h2>Active Users</h2>
            </section>

            <section>
              <LineChart
                data={data?.charts.products!}
                backgroundColor={"hsla(269,80%,40%,0.4)"}
                borderColor={"hsl(269,80%,40%)"}
                labels={last12Months}
                label="Products"
              />
              <h2>Total Products (SKU)</h2>
            </section>

            <section>
              <LineChart
                data={data?.charts.revenue!}
                backgroundColor={"hsla(129,80%,40%,0.4)"}
                borderColor={"hsl(129,80%,40%)"}
                label="Revenue"
                labels={last12Months}
              />
              <h2>Total Revenue </h2>
            </section>

            <section>
              <LineChart
                data={data?.charts.discount!}
                backgroundColor={"hsla(29,80%,40%,0.4)"}
                borderColor={"hsl(29,80%,40%)"}
                label="Discount"
                labels={last12Months}
              />
              <h2>Discount Allotted </h2>
            </section>
          </main>
        )
      }
    </div>
  );
};

export default Linecharts;
