import React from "react";
import "../App.css";

const SearchBox = (...props) => {
  return (
        <div>      
          <input
            type="search"
            placeholder="search here for items"
            size="large" 
            icon=""
            name="query"
            id="query"
            value={props.queryInput}
            onChange={props.onChange}
            style={{ borderRadius: "3px", height: "33px" }}
          /> 
        </div>
  );
};
export default SearchBox;