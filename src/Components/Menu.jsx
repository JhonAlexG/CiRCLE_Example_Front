import { Link } from "react-router-dom";

function Menu() {
  return (
    <div>
      <h1> Menu </h1>
      <ul>
        <li>
          <Link to={"/songs"}> Canciones </Link>
        </li>
        <li>
          <Link to={"/members"}> Personajes </Link>
        </li>
        <li>
          <Link to={"/bands"}> Bandas </Link>
        </li>
        {localStorage.getItem("userType") === "admin" && (
          <li>
            <Link to={"/staff/addstaff"}> Agregar Staff </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Menu;
