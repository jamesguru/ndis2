import "./newclient.css";
import { publicRequest } from "../../requestMethods";
import { useState } from "react";
export default function NewClient() {
  const [inputs, setInputs] = useState({});
  const [success, setSuccess]=useState(false);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClick = async (e) =>{
    e.preventDefault();
    try {
      await publicRequest.post('/clients',inputs);  
      setSuccess(true); 
      window.location.reload()
    } catch (error) {
      setSuccess(false);
    }
    
  }

  return (
    <div className="newUser">
    <h1 className="newUserTitle">New Client</h1>
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
        <label>Phone</label>
        <input type="text" placeholder="+1 123 456 78" name="phone"  onChange={handleChange}/>
      </div>
      <div className="newUserItem">
        <label>Address</label>
        <input type="text" placeholder="New York | USA" name="address"  onChange={handleChange} />
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
      <div className="newUserItem">
        <label>Active</label>
        <select className="newUserSelect" name="active" id="active" onChange={handleChange}>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
      <button className="newUserButton" onClick={handleClick}>Create</button>
    </form>
  </div>
  );
}
