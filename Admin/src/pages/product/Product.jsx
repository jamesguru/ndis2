import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./product.css";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { publicRequest } from "../../requestMethods";
import jsPDF from "jspdf";
import "jspdf-autotable";

const libraries = ["places"];
const mapContainerStyle = {
  width: "70vw",
  height: "60vh",
};


export default function Product() {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({});
  const [loading, setLoading] = useState(false);
  const [staffEmail,setStaffEmail] = useState("");
  const location = useLocation();
  const [shift, setShift] = useState({});
  const [staffs, setStaffs] = useState([]);
  const [error, setError] = useState("");
  const shiftId = location.pathname.split("/")[2];
  const [inputs, setInputs] = useState({});

  useEffect(() => {
    const getActivity = async () => {
      try {
        setLoading(true);
        const res = await publicRequest.get("/shifts/find/" + shiftId);
        setShift(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getActivity();
  }, [shiftId]);

  useEffect(() => {
    const getStaffs = async () => {
      try {
        const res = await publicRequest.get("/users");
        setStaffs(res.data);
      } catch (error) {}
    };
    getStaffs();
  }, []);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCeQ-SAYDNxH277bfJbNjed0Mqkik8bofo",
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  const handleCloseMap = (e, coords) => {
    e.preventDefault();
    setCoords(coords);
    setOpen(!open);
  };


  const selectStaff = (e) => {
      setStaffEmail(e.target.value)
      
  }

  const handleAssignShift = async (e) =>{
    e.preventDefault()
    try {
      if(staffEmail){
        await publicRequest.put(`/shifts/assign/${shift._id}`,{
          "location": shift.location,
          "date":shift.date,
          "time":shift.time,
          "type":shift.type,
          "duration":shift.duration,
          "client":"Jeff",
          "staffEmail":staffEmail,
          "notes":shift.notes
        })
      window.location.reload();
    }else{
      setError("Make sure you have selected user");
    }

    } catch (error) {
      setError(error.message)
    }
  }

  const handleCancelShift = async (e) => {
    e.preventDefault();
    try {
      await publicRequest.put(`/shifts/assign/${shift._id}`,{
        "location": shift.location,
        "date":shift.date,
        "time":shift.time,
        "type":shift.type,
        "duration":shift.duration,
        "client":"Jeff",
        "staffEmail":"",
        "notes":shift.notes
      })
    window.location.reload();
    } catch (error) {
      setError(error.message)
    }

  }

  const handleUpdate = async(e) =>{
    e.preventDefault();
    if(inputs){
      try {
        await publicRequest.put(`/shifts/${shift._id}`,inputs);
        window.location.reload();
      } catch (error) {
        
      }
    }
  }
  const generatePDF = () => {
    const pdf = new jsPDF("landscape");

    // Set the title of the document
    pdf.text(`Shift ${shift._id} Case Notes Report`, 15, 15);

    // Set column headers
    const headers = [
      "TIME",
      "EVENT",
      "NOTES",
    ];

    // Set data for the table
    const tableData = shift?.casenotes?.map((item) => [
      item.time,
      item.event,
      item.notes,
    ]);

    // Auto page breaks and table styling
    pdf.autoTable({
      startY: 20,
      head: [headers],
      body: tableData,
      styles: {
        fontSize: 10,
        cellWidth: "wrap",
      },
      margin: { top: 20 },
    });

    // Save the PDF with a specific name
    pdf.save(`shift_${shift._id}_casenotes_report.pdf`);
  };
  return (
    <div className="product">
    {loading ? <span>Loading ...</span> :
    
    <div>
      <div className="productTitleContainer">
        <h3 className="productTitle">Shift: {shiftId}</h3>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <ul>
            <li>
              <strong>ID:</strong>
              {shift._id}
            </li>
            <li>
              <strong>Location: </strong>
              <input onChange={handleChange} name="location" type="text" className="input-edit" placeholder={shift.location} />
            </li>
            <li>
              <strong>Date and Time: </strong>
              <input  onChange={handleChange} name="date"type="text" className="input-edit" placeholder={shift.date} />
              <input  onChange={handleChange} name="time" type="text" className="input-edit" placeholder={shift.time} />
           
            </li>
            <li>
              <strong>Type:</strong> 
              <input  onChange={handleChange} name="type" type="text" className="input-edit" placeholder={shift.type} />
            </li>
            <li>
              <strong>Duration:</strong>
              <input  onChange={handleChange} name="duration" type="text" className="input-edit" placeholder={shift.duration} /> 
            </li>
            <li>
              <strong>Client:</strong>
              <input  onChange={handleChange} name="client" type="text" className="input-edit" placeholder={shift?.client} /> 
            </li>
            <li>
              <strong>Assigned To:</strong> 
             {shift.staffEmail}
            </li>
            <li>
              <strong>Notes:</strong>
              <textarea  className="shift-textarea" name="" id="" cols="30" rows="10" placeholder={shift.notes}></textarea>
            </li>
            
            <li>
              <strong>Clock In:</strong>
              {shift?.clockin?.map((clock, index) => (
                <div key={index}>
                  <span>Time:{clock.time}</span> |
                  <span>Accuracy:{clock.accuracy} Metres</span> |
                  <button
                    className="showmap-btn"
                    onClick={(e) => handleCloseMap(e, clock.coords)}
                  >
                    Show Map
                  </button>
                </div>
              ))}
            </li>
            <li>
              <strong>Clock Out:</strong>
              {shift?.clockout?.map((clock, index) => (
                <div key={index}>
                  <span>Time:{clock.time}</span> |
                  <span>Accuracy:{clock.accuracy} Metres</span> |
                  <button
                    className="showmap-btn"
                    onClick={(e) => handleCloseMap(e, clock.coords)}
                  >
                    Show Map
                  </button>
                </div>
              ))}
            </li>
            

            <button className="update-shift" onClick={handleUpdate}>Update</button>
          </ul>
          
        </div>
        <div className="productTopRight">
        <button onClick={generatePDF} className="generatepdf">Generate Case Notes Pdf</button>
          <div className="productInfoBottom">
          
            <table>
              <tr>
                <th>Date/Time</th>
                <th>Case</th>
                <th>Notes</th>
              </tr>
              {
                shift?.casenotes?.map((note, index) =>      
                <tr key={index}>
                <td>{note.time}</td>
                <td>{note.event}</td>
                <td>
                 {note.notes}
                </td>
              </tr>
                
                )
              }
            </table>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <ul>
              <li>
                <strong>Shift Date:</strong>{shift.date}
              </li>
              <li>
                <strong>Shift Time:</strong>{shift.time}
              </li>
            </ul>

            <select name="staffEmail"  onChange={selectStaff}>
            {staffs.map((staff,index) => (
              
              <option value={staff.email} name={staff.email} key={index}>
                {staff.fullname}
              </option>
            ))}
          </select>
            <button className="productAddButton" onClick={handleAssignShift}>Assign to Staff</button>
            {error && <span className="error">{error}</span>}
            {shift.staffEmail && <button className="cancel-shift" onClick={handleCancelShift}>Cancel Shift</button>}
          </div>
        </form>
      </div>
      {open && (
        <div className="popup">
          <button className="popup-map-btn" onClick={handleCloseMap}>
            close
          </button>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={10}
            center={coords}
          >
            <Marker position={coords} />
          </GoogleMap>
        </div>
      )}
      </div>
    
    }
    </div>
  );
}
