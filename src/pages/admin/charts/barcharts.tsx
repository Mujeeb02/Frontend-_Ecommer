import { useSelector } from "react-redux";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { BarChart } from "../../../components/admin/Charts";
import { useBarstatsQuery} from "../../../redux/api/dashboardApi";
import { RootState } from "../../../redux/reducer/store";
import { customError } from "../../../types/api-types";
import toast from "react-hot-toast";
import { Skeleton } from "../../../components/loading";
import { getLastMonths } from "../../../utils/features";


const{last6Months,last12Months} =getLastMonths();

const Barcharts = () => {
  const { user } = useSelector((state: RootState) => state.userReducer)
  const { data, isLoading, isError, error } = useBarstatsQuery(user?._id!)
  if (isError) {
    const err = error as customError;
    toast.error(err.data.message)
  }
  // console.log(data)
  return (
    <div className="admin-container">
      <AdminSidebar />
      {
        isLoading ? <Skeleton length={20}/> : (
          <main className="chart-container">
            <h1>Bar Charts</h1>
            <section>
              <BarChart

                data_1={data?.charts.products!}
                data_2={data?.charts.users!}
                labels={last6Months}
                title_1="Products"
                title_2="Users"
                bgColor_1={`hsl(260, 50%, 30%)`}
                bgColor_2={`hsl(360, 90%, 90%)`}
              />
              <h2>Top Products & Top Customers</h2>
            </section>

            <section>
              <BarChart
                horizontal={true}
                data_1={data?.charts.orders!}
                data_2={[]}
                title_1="Orders"
                title_2=""
                bgColor_1={`hsl(180, 40%, 50%)`}
                bgColor_2=""
                labels={last12Months}
              />
              <h2>Orders throughout the year</h2>
            </section>
          </main>
        )
      }
    </div>
  );
};

export default Barcharts;
