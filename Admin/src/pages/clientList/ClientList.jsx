import "./client.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { publicRequest } from "../../requestMethods";

export default function ClientList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [clientID,setClientID] = useState(null);

  useEffect(() => {
    const getItems = async () => {
      try {
        setLoading(true)
        const res = await publicRequest.get("/clients");
        setData(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    
    getItems();
  }, []);
  const handleDelete = (id) => {
    setOpen(true);
    setClientID(id);
    
  };

  const delelePemantly = async () => {
    
    if(clientID){
      try {

        await publicRequest.delete(`/clients/${clientID}`)
        window.location.reload();
        
      } catch (error) {
        
      }
    }
  }

  const handleCancel = (e) =>{
    e.preventDefault();
    setOpen(!open)
  }

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    { field: "fullname", headerName: "Full Name", width: 150 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "address", headerName: "address", width: 200 },
   
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/client/" + params.row._id}>
              <button className="userListEdit">View</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <h3 className="incidences-header">All Clients</h3>
     { loading ? <span>Loading...</span>:<DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
      />}

      {open && <div className="modal">
        <span className="modal-header">Are you sure you want to delete?</span>
        <div className="cancel-delete">
          <button onClick={handleCancel}>Cancel</button>
          <button onClick={delelePemantly}>Confirm</button>
        </div>
      </div>}
    </div>
  );
}
