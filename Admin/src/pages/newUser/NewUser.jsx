import { useState } from "react";
import "./newUser.css";
import { publicRequest } from "../../requestMethods";

export default function NewUser() {
  const [inputs, setInputs] = useState({});
  const [success, setSuccess]=useState(false)
  const [files, setFile] = useState([]);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClick = async (e) =>{
    e.preventDefault();
    try {
      await publicRequest.post('/auth/register',inputs);  
      setSuccess(true); 
      window.location.reload()
    } catch (error) {
      setSuccess(false);
    }
    
  }

  const submitPDF = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    const result = await publicRequest.post("/users/upload",
      formData,
      {
       headers:{"Content-Type": "multipart/form-data"} 
      }
    );

    console.log(result)

  }

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New Staff</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Username</label>
          <input type="text" placeholder="john" name="username"  onChange={handleChange}/>
        </div>
        <div className="newUserItem">
          <label>Full Name</label>
          <input type="text" placeholder="John Smith" name="fullname"  onChange={handleChange}/>
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input type="email" placeholder="john@gmail.com" name="email" onChange={handleChange} />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input type="password" placeholder="password" name="password"  onChange={handleChange}/>
        </div>
        <div className="newUserItem">
          <label>Phone</label>
          <input type="text" placeholder="+1 123 456 78" name="phone"  onChange={handleChange}/>
        </div>
        <div className="newUserItem">
          <label>Address</label>
          <input type="text" placeholder="New York | USA" name="address"  onChange={handleChange} />
        </div>
        <div className="newUserItem">
          <label>Staff ID</label>
          <input type="text" placeholder="AP100" name="staffID"  onChange={handleChange}/>
        </div>
        <div className="newUserItem">
          <label>Gender</label>
          <div className="newUserGender">
            <input type="radio" name="gender" id="male" value="Male" onChange={handleChange}/>
            <label for="male">Male</label>
            <input type="radio" name="gender" id="female" value="Female" onChange={handleChange}/>
            <label for="female">Female</label>
            <input type="radio" name="gender" id="other" value="other" onChange={handleChange}/>
            <label for="other">Other</label>
          </div>
        </div>
        <input type="file" onChange={(e) => setFile(e.target.files)} multiple/>
        <div className="newUserItem">
          <label>Active</label>
          <select className="newUserSelect" name="active" id="active" onChange={handleChange}>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <button className="newUserButton" onClick={handleClick}>Create</button>
        <button onClick={submitPDF}>Submit File</button>
      </form>
    </div>
  );
}
