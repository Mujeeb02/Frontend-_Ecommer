import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTrash, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { useAllUsersQuery, useDeleteUserMutation } from "../../redux/api/userApi";
import { RootState } from "../../redux/reducer/store";
import { customError } from "../../types/api-types";
import { responseToast } from "../../utils/features";

interface DataType {
  avatar: ReactElement;
  name: string;
  email: string;
  gender: string;
  role: string;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Avatar",
    accessor: "avatar",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Customers = () => {
  const { user } = useSelector((state: RootState) => state.userReducer)
  const { data,isError, error } = useAllUsersQuery(user?._id!)
  const [rows, setRows] = useState<DataType[]>([]);
  const[deleteUser]=useDeleteUserMutation()
  if (isError) {
    const err = error as customError
    toast.error(err.data.message)
  }
  const deleteHandler=async(userId:string)=>{
    const res=await deleteUser({userId,adminUserId:user?._id!})
    responseToast(res,null,"");
  }
  useEffect(() => {
    if (data) {
      setRows(data.users.map((i) => ({
        avatar:<FaUser/>,
        name: i.name,
        email: i.email,
        gender: i.gender,
        role: i.role,
        action: (<button onClick={()=>{deleteHandler(i._id)}}><FaTrash/></button>)
      })))
    }
  }, [data])
  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Customers",
    rows.length > 6
  )();

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{Table}</main>
    </div>
  );
};

export default Customers;
