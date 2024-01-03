import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { publicRequest } from "../../requestMethods";

export default function UserList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id) => {};

  const handleUpdate = async (id) => {};

  useEffect(() => {
    const getItems = async () => {
      try {
        setLoading(true)
        const res = await publicRequest.get("/users");
        setData(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    getItems();
  }, []);

  const columns = [
    { field: "_id", headerName: "ID", width: 150 },
    { field: "fullname", headerName: "Full Name", width: 150 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "staffID", headerName: "StaffID", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "address", headerName: "Address", width: 100 },

    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">View</button>
            </Link>

            <DeleteOutline
              className="userListDelete"
              onClick={() => handleUpdate(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <h3 className="incidences-header">All Staffs</h3>
      {loading ? <span>Loading ...</span> : 
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={20}
        checkboxSelection
      />}
    </div>
  );
}
