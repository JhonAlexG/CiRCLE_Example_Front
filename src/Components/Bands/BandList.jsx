import { useContext } from "react";
import { BandContext } from "../../Context/BandContext";
import { Link, useNavigate } from "react-router-dom";
import BandListStyl from "../../Styles/BandListStyl.css";

function BandList() {
  const { band } = useContext(BandContext);
  const navigate = useNavigate();

  if (band.length === 0) {
    return (
      <div>
        <h1>No band found</h1>
        <button onClick={() => navigate("/")}> Back </button>
        <button onClick={() => navigate("/bands/addband")}>Add Band </button>
      </div>
    );
  }

  return (
    <div className="bandListContainer">
      {band.map((band) => (
        <Link key={band.id} to={`/bands/${band.id}`}>
          <img style={{ height: "300px" }} src={band.logo.url} />
        </Link>
      ))}
      <br></br>
      <button onClick={() => navigate("/home")}> Back </button>
      <button onClick={() => navigate("/bands/addband")}>Add Band </button>
    </div>
  );
}

export default BandList;
