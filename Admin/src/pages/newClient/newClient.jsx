import "./newclient.css";
import { publicRequest } from "../../requestMethods";
import { useState } from "react";
export default function NewClient() {
  
  const [success, setSuccess]=useState(false);
  const [loading, setLoading]=useState(false);
  const [username, setUsername]=useState("");
  const [fullname, setFullname]=useState("");
  const [password, setPassword]= useState("");
  const [email, setEmail]=useState("");
  const [phone, setPhone]=useState("");
  const [address, setAdrress]=useState("");

  const [gender, setGender]=useState("");
  const [files, setFile] = useState([]);

  const handleClick = async (e) =>{
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('username',username);
    formData.append('fullname',fullname);
    formData.append('password',password);
    formData.append('email',email);
    formData.append('phone',phone);
    formData.append('address',address);
    formData.append('gender',gender);


    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    try {
      setLoading(true);
      await publicRequest.post('/clients',formData,{
        headers: { 'Content-Type': 'multipart/form-data' },
      });  
      setSuccess(true); 
      window.location.reload()
      setLoading(false);
    } catch (error) {
      setSuccess(false);
      setLoading(false);
    }
    
    
  }

  return (
    <div className="newUser">
    <h1 className="newUserTitle">New Client</h1>
    <form className="newUserForm">
        <div className="newUserItem">
          <label>Username</label>
          <input type="text" placeholder="john" name="username"  onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div className="newUserItem">
          <label>Full Name</label>
          <input type="text" placeholder="John Smith" name="fullname"  onChange={(e) => setFullname(e.target.value)}/>
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input type="email" placeholder="john@gmail.com" name="email" onChange={(e) => setEmail(e.target.value)} />
        </div>
       
        <div className="newUserItem">
          <label>Phone</label>
          <input type="text" placeholder="+1 123 456 78" name="phone"  onChange={(e) => setPhone(e.target.value)}/>
        </div>
        <div className="newUserItem">
          <label>Address</label>
          <input type="text" placeholder="New York | USA" name="address"  onChange={(e) => setAdrress(e.target.value)} />
        </div>
        
        <div className="newUserItem">
          <label>Gender</label>
          <div className="newUserGender">
            <input type="radio" name="gender" id="male" value="Male" onChange={(e) => setGender(e.target.value)}/>
            <label for="male">Male</label>
            <input type="radio" name="gender" id="female" value="Female" onChange={(e) => setGender(e.target.value)}/>
            <label for="female">Female</label>
            <input type="radio" name="gender" id="other" value="other" onChange={(e) => setGender(e.target.value)}/>
            <label for="other">Other</label>
          </div>
        </div>
        <div className="newUserItem">
        <input type="file" onChange={(e) => setFile(e.target.files)} multiple/>
        <span>Select clients's documents</span>
        </div>
        <div className="newUserItem">
          <label>Active</label>
          <select className="newUserSelect" name="active" id="active" >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <button className="newUserButton" onClick={handleClick}>{loading ? 'Loading...' : 'Create'}</button>
        <span>{loading ? 'Loading ...' : ''}</span>
      </form>
  </div>
  );
}
