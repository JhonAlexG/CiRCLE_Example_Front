import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { BandContext } from "../../Context/BandContext";
import BandCardStyle from "../../Styles/BandCardStyl.css";

function BandCard() {
  const { deleteBand, getBandById } = useContext(BandContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const band = getBandById(id);

  console.log(band);

  return (
    <div
      className="bandCard"
      style={{ backgroundColor: band?.colors[0], borderColor: band?.colors[1] }}
    >
      <img
        style={{ backgroundColor: band?.colors[1] }}
        className="logoIMG"
        src={band?.logo.url}
      />
      <img className="charaIMG" src={band?.image.url} />
      <button onClick={() => navigate("/bands")}> Back </button>

      {(localStorage.getItem("userType") === "admin" ||
        localStorage.getItem("userType") === "staff") && (
        <>
          <button onClick={() => editBand(band.id)}> Edit </button>
          <button
            onClick={() => {
              deleteBand(band.id);
              navigate("/bands");
            }}
          >
            {" "}
            Delete{" "}
          </button>
        </>
      )}
    </div>
  );
}

export default BandCard;
