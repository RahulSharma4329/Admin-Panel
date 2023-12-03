import React from "react";

import "./css/PaginationBar.css";

function PaginationBar(props) {
  const updatepage = () => {
    props.updatePagerange(props.list.uplimit, props.list.downlimit);
  };

  return (
    <div>
      <button className="PageItem" onClick={updatepage}>
        {props.list.key}
      </button>
    </div>
  );
}

export default PaginationBar;
