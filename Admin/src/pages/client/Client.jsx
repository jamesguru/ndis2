import {
    CalendarToday,
    LocationSearching,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
    Visibility,
    Description,
  } from "@material-ui/icons";
  import "./client.css";
  import { Link, useLocation} from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { publicRequest,url } from "../../requestMethods";
  
  export default function Client() {
    const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [client, setClient] = useState({});
  useEffect(() => {
    const getClient = async () => {
      try {
        const res = await publicRequest.get("/clients/find/" + id);
        setClient(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getClient();
  }, [id]);

  const handleView = (doc) =>{
    window.open(`${url}/files/${doc}`,"_blank","noreferrer")

  }
    return (
      <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit Client</h1>
        <Link to="/newclient">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
           
            <div className="userShowTopTitle">
              <span className="userShowUsername">{client.fullname}</span>
             
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{client.username}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">10.12.1999</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{client.phone}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{client.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">{client.address}</span>
            </div>
          </div>
          <div>
           <span className="documents">Documents</span>

              {client?.documents?.map((doc,index) => 
              
              <div className="doc" key={index}>
                <Description className="visibility_icon" onClick={() => handleView(doc)} />
                <span>{doc}</span>
              </div>
              )}
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
                  placeholder={client.username}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder={client.fullname}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder={client.email}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder={client.phone}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Address</label>
                <input
                  type="text"
                  placeholder={client.address}
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
  