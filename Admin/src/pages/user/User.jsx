import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Visibility,
Description,

  
} from "@material-ui/icons";
import "./user.css";
import { publicRequest, url } from "../../requestMethods";
import { Link, useLocation} from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

export default function User() {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [staff, setStaff] = useState({});
  useEffect(() => {
    const getStaff = async () => {
      try {
        const res = await publicRequest.get("/users/find/" + id);
        setStaff(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getStaff();
  }, [id]);

  const handleView = (doc) =>{
    window.open(`${url}/files/${doc}`,"_blank","noreferrer")

  }
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
           
            <div className="userShowTopTitle">
              <span className="userShowUsername">{staff.fullname}</span>
             
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{staff.username}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">10.12.1999</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{staff.phone}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{staff.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">{staff.address}</span>
            </div>

            <div>
              <span className="documents">Documents</span>

              {staff?.documents?.map((doc,index) => 
              
              <div className="doc" key={index}>
                <Description className="visibility_icon" onClick={() => handleView(doc)} />
                <span>{doc}</span>
              </div>
              )}
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  placeholder={staff.username}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder={staff.fullname}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder={staff.email}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder={staff.phone}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Address</label>
                <input
                  type="text"
                  placeholder={staff.address}
                  className="userUpdateInput"
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
              
                <label htmlFor="file">

                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="userUpdateButton">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
