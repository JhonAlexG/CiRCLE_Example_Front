import { useContext } from "react";
import { SongContext } from "../../Context/SongContext";
import { useParams, useNavigate } from "react-router-dom";
import SongLyrics from "./SongLyrics";

function SongCard() {
  const { deleteSong, getSongById } = useContext(SongContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const song = getSongById(String(id));

  return (
    <div className="song-card">
      {song && (
        <>
          <img
            className="album cover"
            src={song.cover_img.url}
            style={{ height: "500px" }}
          />
          <h1>
            {song.title} - {song.band}{" "}
          </h1>
          <h2> {song.alt_title} </h2>
          <SongLyrics song={song} />
          <button
            onClick={() => {
              deleteSong(song.id);
              navigate("/songs");
            }}
          >
            {" "}
            Delete{" "}
          </button>
          <button onClick={() => navigate("/songs/edit/" + song.id)}>
            {" "}
            Edit{" "}
          </button>
          <button onClick={() => navigate("/songs")}> Back </button>
          <button
            onClick={() => {
              deleteSong(song.id);
              navigate("/songs");
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

export default SongCard;
