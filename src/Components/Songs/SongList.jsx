import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SongContext } from "../../Context/SongContext";
import SongsFilter from "./SongsFilterBttns";

function SongList() {
  const navigate = useNavigate();
  const { song } = useContext(SongContext);

  if (song.length === 0) {
    return (
      <div>
        {" "}
        <SongsFilter />
        <h1>No songs found</h1>{" "}
        <button onClick={() => navigate("/songs/addsong")}> New Song</button>
        <button onClick={() => navigate("/")}> Back </button>
      </div>
    );
  }

  return (
    <div className="songListContainer" style={{ backgroundColor: "#CED1F2" }}>
      <SongsFilter />
      {song.map((songItem) => (
        <Link key={songItem.id} className="song" to={`/songs/${songItem.id}`}>
          <h1>{songItem.title}</h1>
        </Link>
      ))}
      {(localStorage.getItem("userType") === "admin" ||
        localStorage.getItem("userType") === "staff") && (
        <button onClick={() => navigate("/songs/addsong")}> New Song</button>
      )}{" "}
      <button onClick={() => navigate("/home")}> Back </button>
    </div>
  );
}

export default SongList;
