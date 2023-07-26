import { useContext, useState } from "react";
import { SongContext } from "../../Context/SongContext";

function ShowLyrics({ song }) {
  const [songLyrics, setSongLyrics] = useState("");

  return (
    <>
      <div className="lyricsLanguaje">
        <div className="languajes" style={{display: "flex"}}>
          <h2 onClick={() => setSongLyrics("romaji")}> Romaji </h2>
          <h2 onClick={() => setSongLyrics("english")}> English </h2>
          <h2 onClick={() => setSongLyrics("spanish")}> Español </h2>
        </div>

        {songLyrics ? (
          songLyrics === "romaji" ? (
            (<h2 style={{ whiteSpace: 'pre-line'}} className="lyricsPara"> {song.lyrics} </h2>)
          ) : songLyrics === "english" ? (
            (<h2 style={{ whiteSpace: 'pre-line'}} className="lyricsPara"> {song.eng_translation} </h2>)
          ) : songLyrics === "spanish" ? (
            (<h2 style={{ whiteSpace: 'pre-line'}} className="lyricsPara"> {song.esp_translation} </h2>)
          ) : (
            <h2></h2>
          )
        ) : (
          <h2 style={{ whiteSpace: 'pre-line'}} > {song.lyrics} </h2>
        )}
      </div>
    </>
  );
}

export default ShowLyrics;
