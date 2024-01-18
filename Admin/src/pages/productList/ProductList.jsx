import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { publicRequest } from "../../requestMethods";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function ProductList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [shiftID, setShiftID] = useState(null);

  useEffect(() => {
    const getShifts = async () => {
      try {
        setLoading(true);
        const res = await publicRequest.get("/shifts");
        setData(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getShifts();
  }, []);
  const generatePDF = () => {
    const pdf = new jsPDF("landscape");

    // Set the title of the document
    pdf.text("Data Report", 10, 10);

    // Set column headers
    const headers = [
      "ID",
      "DATE",
      "TIME",
      "LOCATION",
      "CLIENT",
      "DURATION",
      "STAFF",
      "NOTES",
    ];

    // Set data for the table
    const tableData = data.map((item) => [
      item._id,
      item.date,
      item.time,
      item.location,
      item.client,
      item.duration,
      item.staffEmail,
      item.notes,
    ]);

    // Auto page breaks and table styling
    pdf.autoTable({
      startY: 20,
      head: [headers],
      body: tableData,
      styles: {
        fontSize: 10, // Set the font size for the entire table
        cellWidth: "wrap", // Set cell width to 'wrap' for automatic width adjustment
      },
      margin: { top: 20 },
    });

    // Save the PDF with a specific name
    pdf.save("data_report.pdf");
  };
  const delelePemantly = async () => {
    if (shiftID) {
      try {
        await publicRequest.delete(`/shifts/${shiftID}`);
        window.location.reload();
      } catch (error) {}
    }
  };
  const handleDelete = (id) => {
    setOpen(true);
    setShiftID(id);
  };
  const handleCancel = (e) => {
    e.preventDefault();
    setOpen(!open);
  };
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 200,
    },

    { field: "date", headerName: "Date", width: 120 },
    { field: "time", headerName: "Time", width: 150 },
    { field: "location", headerName: "Location", width: 140 },

    {
      field: "duration",
      headerName: "Duration",
      width: 120,
    },
    {
      field: "staffEmail",
      headerName: "Staff Email",
      width: 150,
    },

    {
      field: "notes",
      headerName: "Notes",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">View</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <h3 className="incidences-header">All Shifts</h3>
      <button className="generatepdf" onClick={generatePDF}>
        Generate Pdf
      </button>
      {loading ? (
        <span>Loading ...</span>
      ) : (
        <DataGrid
          rows={data}
          disableSelectionOnClick
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={8}
          checkboxSelection
        />
      )}
      {open && (
        <div className="modal">
          <span className="modal-header">Are you sure you want to delete?</span>
          <div className="cancel-delete">
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={delelePemantly}>Confirm</button>
          </div>
        </div>
      )}
    </div>
  );
}
