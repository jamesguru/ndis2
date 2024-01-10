import { useState } from "react";
import "./newProduct.css";
import { publicRequest } from "../../requestMethods";
import { useEffect } from "react";

export default function NewProduct() {
  const [inputs, setInputs] = useState({});
  const [success, setSuccess] = useState(false);
  const [date, setDate] = useState("");
  const [staffs, setStaffs] = useState([]);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  useEffect(() => {
    const getStaffs = async () => {
      try {
        const res = await publicRequest.get("/users");
        setStaffs(res.data);
      } catch (error) {}
    };
    getStaffs();
  }, []);
  const handleClick = async (e) => {
    e.preventDefault();
    const dateObject = new Date(date);
    // Use toLocaleDateString to format the date
    const formattedDate = dateObject.toLocaleDateString('en-AU');
    console.log(formattedDate)
    try {
      await publicRequest.post("/shifts", {...inputs, "date":formattedDate});
      setSuccess(true);
      window.location.reload();
    } catch (error) {
      setSuccess(false);
    }
  };
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Shift</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Location</label>
          <input
            type="text"
            placeholder="Adelaide"
            name="location"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Date And Time</label>
          <input
            type="date"
            placeholder="2023-12-15"
            name="date"
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            type="text"
            placeholder="08:00AM - 05:00PM"
            name="time"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Type</label>
          <input
            type="text"
            placeholder="AM/PM"
            name="type"
            onChange={handleChange}
          />
        </div>

        <div className="addProductItem">
          <label>Duration</label>
          <input
            type="text"
            placeholder="8 hours"
            name="duration"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Notes</label>
          <textarea
            type="text"
            placeholder="Lunch break at 5:00 PM"
            name="notes"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Assign Shift</label>
          <select name="staffEmail"  onChange={handleChange}>
            {staffs.map((staff,index) => (
              <option value={staff.email} name={staff.email} key={index}>
                {staff.fullname}
              </option>
            ))}
          </select>
        </div>
        <div className="addProductItem">
          <label>Active</label>
          <select name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <button className="addProductButton" onClick={handleClick}>
          Create
        </button>
      </form>
    </div>
  );
}
