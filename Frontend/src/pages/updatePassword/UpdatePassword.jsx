import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { useState } from "react";
import { publicRequest } from "../../requestMethods";
const UpdatePassword = () => {

  const [staffID, setStaffID] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  

  const sendStaffID = async (e) => {
    e.preventDefault();
    if (staffID) {
      try {
        setLoading(true);
        await publicRequest.post("/users/update-password", {staffID});
        setSuccess(true);
        setLoading(false);
        
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    }
  };

  return (
    
    <div>   
        <Navbar />
      <div className="login-container">
        <form>
          <h2>Reset Password</h2>
          <label htmlFor="username">Enter your staff ID:</label>
          <div className="password">
            <input
              type="text"
              id="staffID"
              name="staffID"
              onChange={(e) => setStaffID(e.target.value.replace(/\s/g, ''))}
             />
          </div>
          <span className="login-btn" onClick={sendStaffID}>
            {loading ? <span>Loading...</span> : <span>Submit</span>}
          </span>
          {error && (
            <span className="error">
              You are not registered. Contact admin.
            </span>
          )}
          {success && (
            <span className="success">
              Check your email for a new password.
            </span>
          )}
        </form>
        
      </div>
      <Footer />
    </div>
  )
}

export default UpdatePassword;