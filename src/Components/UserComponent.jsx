import React from "react";
import { useState, useEffect } from "react";
import "./css/UserComponent.css";
import UserBox from "./UserBox";
import PaginationBar from "./PaginationBar";

export default function UserComponent(users) {
  console.log("users", users);
  const [pagerange, setPagerange] = useState([0, 9]);
  const [listofpages, setListofpages] = useState([]);
  const [userlist, setUserlist] = useState(
    users.users.slice(pagerange[0], pagerange[1])
  );

  useEffect(() => {}, [users]);

  useEffect(() => {
    const numberofpages = Math.ceil(users.users.length / 10);
    const listuser = [];
    for (let index = 1; index <= numberofpages; index++) {
      listuser.push({
        key: index,
        uplimit: index * 10 - 1,
        downlimit: index * 10 - 10,
      });
    }
    setListofpages(listuser);
  }, [users]);

  useEffect(() => {
    setUserlist(users.users.slice(pagerange[0], pagerange[1] + 1));
  }, [pagerange, users]);

  const updatePagerange = (uplimit, downlimit) => {
    setPagerange([downlimit, uplimit]);
  };

  const decrementpage = () => {
    if (pagerange[0] != 0) {
      setPagerange([pagerange[0] - 10, pagerange[1] - 10]);
    }
  };

  const incrementpage = () => {
    if (pagerange[1] < users.users.length) {
      setPagerange([pagerange[0] + 10, pagerange[1] + 10]);
    }
  };
  const gotoStart = () => {
    setPagerange([0, 9]);
  };
  const gotoEnd = () => {
    setPagerange([
      listofpages[listofpages.length - 1].downlimit,
      listofpages[listofpages.length - 1].uplimit,
    ]);
  };
  const deleteentry = (id) => {
    users.deleteEntry(id);
  };
  const editentry = (id, paramter, newValue) => {
    if (paramter == "name") {
      userlist[id - 1].name = newValue;
    } else if (paramter == "email") {
      userlist[id - 1].email = newValue;
    } else if (paramter == "role") {
      userlist[id - 1].role = newValue;
    }
  };

  const handledeleteall = () => {
    if (document.querySelector(".checki").checked) {
      document.querySelectorAll(".checkbox input").forEach((item) => {
        item.checked = true;
      });
    } else {
      document.querySelectorAll(".checkbox input").forEach((item) => {
        item.checked = false;
      });
    }
  };

  return (
    <div className="UserTable">
      <div className="titlebar">
        <div className="col checkbox">
          <input
            type="checkbox"
            name="selectall"
            id="a=selectall"
            className="checki "
            onClick={handledeleteall}
          />
        </div>
        <div className="col w-25">Name</div>
        <div className="col w-25">Email</div>
        <div className="col w-15">Role</div>
        <div className="col w-15">Actions</div>
      </div>
      <div className="UserListItems">
        {userlist.map((user) => {
          return (
            <UserBox
              user={user}
              key={user.name}
              deleteentry={deleteentry}
              editentry={editentry}
            />
          );
        })}
      </div>
      <div className="bottombar">
        <div className="selectednum">
          {users.selectednum ? users.selectednum : 0} of {users.totalnum} rows
          selected
        </div>
        <div className="paginationbar">
          <button className="PageItem first-page" onClick={gotoStart}>
            {"<<"}
          </button>
          <button className="PageItem previous-page" onClick={decrementpage}>
            {"<"}
          </button>
          {listofpages.map((page, index) => {
            return (
              <PaginationBar
                key={index}
                list={page}
                updatePagerange={updatePagerange}
              />
            );
          })}
          <button className="PageItem next-page" onClick={incrementpage}>
            {">"}
          </button>
          <button className="PageItem last-page" onClick={gotoEnd}>
            {">>"}
          </button>
        </div>
      </div>
    </div>
  );
}
