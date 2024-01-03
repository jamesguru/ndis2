import { Link, useLocation} from "react-router-dom";
import {useState,useEffect} from 'react';
import "./product.css";
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { publicRequest } from "../../requestMethods";

const libraries = ['places'];
const mapContainerStyle = {
  width: '70vw',
  height: '60vh',
};
const center = {
  lat: -1.1050066, // default latitude
  lng: 37.0142407, // default longitude
};

export default function Product() {
  const [open,setOpen] = useState(false);
  const [coords, setCoords] = useState({});
  const location = useLocation();
  const [shift, setShift] = useState({});
  const shiftId = location.pathname.split("/")[2];
  useEffect(() => {
    const getActivity = async () => {
      try {
        const res = await publicRequest.get("/shifts/find/" + shiftId);
        setShift(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getActivity();
  }, [shiftId]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCeQ-SAYDNxH277bfJbNjed0Mqkik8bofo',
    libraries,
  });



  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  const handleCloseMap =(e,coords)=>{
    e.preventDefault();
    setCoords(coords)
    setOpen(!open)
  }

  

  return (
    <div className="product">
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
              <strong>ID:</strong>{shift._id}
            </li>
            <li>
              <strong>Location: </strong>{shift.location}
            </li>
            <li>
              <strong>Date and Time: </strong>{shift.date} {shift.time}
            </li>
            <li>
              <strong>Type:</strong> {shift.type}
            </li>
            <li>
              <strong>Duration:</strong> {shift.duration}
            </li>
            <li>
              <strong>Assigned:</strong> {shift.staffEmail}
            </li>
            <li>
              <strong>Pending:</strong> Ongoing
            </li>
            <li>
              <strong>Clock In:</strong> 
              {shift?.clockin?.map((clock, index) => 
              <div key={index}>
                <span>Time:{clock.time}</span> |
                <span>Accuracy:{clock.accuracy}</span> |
                <button className="showmap-btn" onClick={(e) => handleCloseMap(e,clock.coords)}>Show Map</button>
              </div>)}
              
            </li>
            <li>
              <strong>Clock Out:</strong>
              {shift?.clockout?.map((clock, index) => 
              <div key={index}>
                <span>Time:{clock.time}</span> |
                <span>Accuracy:{clock.accuracy}</span> |
                <button className="showmap-btn" onClick={(e) => handleCloseMap(e,clock.coords)}>Show Map</button>
              </div>)}
            </li>
            <li>
              <strong>Notes:</strong> Lunch break at 5:00 PM
            </li>
          </ul>
        </div>
        <div className="productTopRight">
          <div className="productInfoBottom">
            <table>
              <tr>
                <th>Date/Time</th>
                <th>Case</th>
                <th>Notes</th>
              </tr>

              <tr>
                <td>2023-12-12 04:00 PM</td>
                <td>Sickness</td>
                <td>
                  The employee reported feeling unwell during the shift and
                  requested a break to rest. A 15-minute break was provided, and
                  the employee resumed duties afterward.{" "}
                </td>
              </tr>
              <tr>
                <td>2023-12-12 08:00 AM</td>
                <td>Head Home</td>
                <td>
                  The employee reported feeling unwell during the shift and
                  requested a break to rest. A 15-minute break was provided, and
                  the employee resumed duties afterward.{" "}
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <ul>
              <li>
                <strong>Client Name:</strong>James Doe
              </li>
              <li>
                <strong>Client ID:</strong>562726291
              </li>
            </ul>

            <select name="" id="">
              <option value="">John Doe</option>
              <option value="">James Doe</option>
              <option value="">Jane Doe</option>
              <option value="">John Doe</option>
              <option value="">James Doe</option>
              <option value="">Jane Doe</option>
              <option value="">John Doe</option>
              <option value="">James Doe</option>
              <option value="">Jane Doe</option>
              <option value="">John Doe</option>
              <option value="">James Doe</option>
              <option value="">Jane Doe</option>
            </select>

            <button>Assign to Staff</button>
          </div>
        </form>
      </div>
      {open && 
      <div className="popup">
      <button className="popup-map-btn" onClick={handleCloseMap}>close</button>
      <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={10}
      center={coords}
    >
      <Marker position={coords} />
    </GoogleMap>
    </div>
      }
    </div>
  );
}
