import React, { useEffect, useState } from "react";
import axios from "axios";
import UserComponent from "./UserComponent";
import "./css/UserList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function UserList() {
  const [usersbackup, setusersbackup] = useState([]);
  const [users, setusers] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const baseURL =
    "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      if (response.data != undefined) {
        setusersbackup(response.data);
        setusers(response.data);
      }
    });
  }, []);

  useEffect(() => {
    if (searchKey == "") {
      setusers(usersbackup);
      return;
    }
    const filteredJson = users.filter((item) =>
      Object.keys(item).some((key) =>
        item[key].toString().toLowerCase().includes(searchKey.toLowerCase())
      )
    );
    setFilteredData(filteredJson);
  }, [searchKey]);

  const handleSearch = () => {
    setusers(filteredData);
  };
  const deleteEntry = (id) => {
    users.splice(id - 1, 1);
    setusers([...users]);
  };

  const removeEntry = (ids) => {
    let newarray = users.filter((obj) => !ids.includes(obj.id));
    setusers([...newarray]);
  };

  const handledeletebtn = () => {
    let idstoremove = [];
    document.querySelectorAll(".checkbox input").forEach((item) => {
      if (item.checked == true) {
        idstoremove.push(item.id.replace("check", ""));
      } else if (item.id == "a=selectall") return;
    });
    removeEntry(idstoremove);
    let ele = document.getElementById("a=selectall");
    ele.checked = false;
  };

  return (
    <div>
      <div className="header">
        <div className="searchbar">
          <input
            type="text"
            placeholder="Search"
            value={searchKey}
            onChange={(e) => {
              setSearchKey(e.target.value);
            }}
          />
          <button className="searchbutton search-icon" onClick={handleSearch}>
            Search
          </button>
        </div>
        <div className="deleteallbtn">
          <button onClick={handledeletebtn}>
            <FontAwesomeIcon icon={faTrash} style={{ color: "#d6243f" }} />
          </button>
        </div>
      </div>
      {users.length != 0 ? (
        <UserComponent
          className="userlistcomponent"
          users={users}
          deleteEntry={deleteEntry}
        />
      ) : (
        "Loading"
      )}
    </div>
  );
}
