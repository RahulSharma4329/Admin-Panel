import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

function UserBox(user) {
  const [status, setStatus] = useState("show");
  const [data, setdata] = useState([]);
  const [selected, setselected] = useState(false);
  useEffect(() => {
    setdata(user.user);
  }, [user]);

  const handleEdit = () => {
    setStatus("edit");
  };

  const handleSave = () => {
    let newdata = data;
    if (
      document.querySelector(".Name input").value == "" ||
      document.querySelector(".Email input").value == "" ||
      document.querySelector(".Role input").value == ""
    ) {
      setStatus("show");
      alert("Please fill all the fields");
      return;
    } else {
      newdata.name = document.querySelector(".Name input").value;
      newdata.email = document.querySelector(".Email input").value;
      newdata.role = document.querySelector(".Role input").value;
      setdata(newdata);
      setStatus("show");
    }
  };

  const { name, email, role, id } = data;
  return (
    <div
      className="UserBox"
      style={{ backgroundColor: !selected ? "#fff" : "#d3d3d3" }}
    >
      <div className="col checkbox">
        <input
          type="checkbox"
          name="select"
          id={"check" + id}
          className="checki"
          onClick={() => {
            setselected(!selected);
          }}
        />
      </div>
      {status == "show" ? (
        <>
          <div className="col w-25 Name">{name ? name : "User Not Found"}</div>
          <div className="col w-25 Email">
            {" "}
            {email ? email : "sampleemail@gmail.com"}
          </div>
          <div className="col w-15 Role"> {role ? role : "None"}</div>
          <div className="col w-15 Actions">
            <div className="Edit">
              <button className="editbtn edit" onClick={handleEdit}>
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  style={{ color: "#343452" }}
                />
              </button>
            </div>
            <div
              className="Delete editbtn delete"
              onClick={() => {
                user.deleteentry(data.id);
              }}
            >
              <FontAwesomeIcon icon={faTrash} style={{ color: "#d6243f" }} />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="col w-25 Name">
            <input type="text" placeholder="Enter new Name" />
          </div>
          <div className="col w-25 Email">
            <input type="text" placeholder="Enter new Email" />
          </div>
          <div className="col w-15 Role">
            <input type="text" placeholder="Enter new Role" />
          </div>
          <div className="col w-15 Actions">
            <div className="Save">
              <button className="savebtn save" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default UserBox;
