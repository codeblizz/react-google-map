// import React from "react";
// import { useHistory, Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// let basePath = ``;

// function Menu({ selected, path, name, icon, children, noClick }) {
//   const history = useHistory();
//   const handleClick = () => {
//     history.push(basePath + path);
//   };
//   return (
//     <li className="sidebar-left" style={{ cursor: "pointer" }}>
//       <Link to={!noClick ? basePath + path : null} style={{ cursor: "pointer" }}>
//         <FontAwesomeIcon
//           icon={icon}
//           style={{
//             color: "#fff",
//             textAlign: " center",
//             display: "inline-block",
//             cursor: "pointer",
//             marginRight: " 10px"
//           }}
//         />
//         <span className="title">{name}</span>
//         {icon == "home" ? "" : <FontAwesomeIcon icon="angle-left" className="arrow" />}
//       </Link>
//       {children}
//     </li>
//   );
// }

// export default Menu;
