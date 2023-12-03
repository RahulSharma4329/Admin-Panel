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
  const [selectednum, setselectednum] = useState(0);

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
    const filteredJson = usersbackup.filter((item) =>
      Object.keys(item).some((key) =>
        item[key].toString().toLowerCase().includes(searchKey.toLowerCase())
      )
    );
    setFilteredData(filteredJson);
  }, [searchKey]);

  useEffect(() => {
    const checkboxes = document.querySelectorAll(".selcheck ");
    const updateCount = () => {
      let count = 0;
      checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
          count += 1;
        }
      });
      setselectednum(count);
    };
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", updateCount);
    });
  }, [users]);

  const handleSearch = () => {
    setusers(filteredData);
  };
  const deleteEntry = (ids) => {
    let newarray = users.filter((obj) => !ids.includes(obj.id));
    setusers([...newarray]);
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
    setselectednum(0);
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
          selectednum={selectednum}
          totalnum={users.length}
        />
      ) : (
        "Loading"
      )}
    </div>
  );
}
