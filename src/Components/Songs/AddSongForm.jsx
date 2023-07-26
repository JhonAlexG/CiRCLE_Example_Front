import { useState, useContext } from "react";
import { SongContext } from "../../Context/SongContext";
import { BandContext } from "../../Context/BandContext";
import { Link, useParams } from "react-router-dom";

function SongForm() {
  const { createSong, updateSong, getSongById } = useContext(SongContext);
  const { id } = useParams();
  const song = getSongById(String(id));

  const [title, setTitle] = useState(song ? song.title : "");
  const [alt_title, setAltTitle] = useState(song ? song.alt_title : "");
  const [mband, setMBand] = useState(song ? song.band : "");
  const [otraBanda, setOtraBanda] = useState(song ? song.band : "");
  const [type, setType] = useState(song ? song.type : "");
  const [lyrics, setLyrics] = useState(song ? song.lyrics : "");
  const [eng_translation, setEngTranslation] = useState(
    song ? song.eng_translation : ""
  );
  const [esp_translation, setEspTranslation] = useState(
    song ? song.esp_translation : ""
  );
  const [cover_img, setCoverImg] = useState("");

  const { band } = useContext(BandContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (song) {
      updateSong(song.id,{
        title,
        id: title.replaceAll(" ", "_"),
        alt_title,
        band: mband === "Other" ? otraBanda : mband,
        type,
        lyrics,
        eng_translation,
        esp_translation,
      });
    } else {
      createSong({
        title: title,
        alt_title: alt_title,
        band: mband === "Other" ? otraBanda : mband,
        type: type,
        lyrics: lyrics,
        eng_translation: eng_translation,
        esp_translation: esp_translation,
        cover_img: cover_img,
      });
    }

    setTitle("");
    setAltTitle("");
    setMBand("");
    setOtraBanda("");
    setType("");
    setLyrics("");
    setEngTranslation("");
    setEspTranslation("");
    setCoverImg("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            className="songForm"
            name="title"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </div>
        <div>
          <input
            type="text"
            className="songForm"
            name="alt_title"
            placeholder="Alternate Title"
            onChange={(e) => setAltTitle(e.target.value)}
            value={alt_title}
            required
          />
        </div>
        <div>
          <select
            className="songForm"
            name="band"
            onChange={(e) => setMBand(e.target.value)}
            value={mband}
            required
          >
            <option defaultChecked value="">
              Select Band
            </option>
            {band.map((band) => (
              <option key={band.id} value={band.name}>
                {band.name}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
        </div>
        {mband === "Other" && (
          <div>
            <input
              type="text"
              className="songForm"
              name="band"
              placeholder="Band"
              onChange={(e) => setOtraBanda(e.target.value)}
              value={otraBanda}
              required={mband === "Other"}
            />
          </div>
        )}
        <div>
          <select
            className="songForm"
            name="type"
            onChange={(e) => setType(e.target.value)}
            value={type}
          >
            <option defaultChecked value="">
              Select Type
            </option>
            <option value="Original">Original</option>
            <option value="Cover">Cover</option>
            <option value="Tied-Up">Tied-Up</option>
          </select>
        </div>

        <div>
          <textarea
            type="text"
            rows="10"
            cols="50"
            className="songForm"
            name="lyrics"
            placeholder="Lyrics"
            onChange={(e) => setLyrics(e.target.value)}
            value={lyrics}
          />
        </div>
        <div>
          <textarea
            type="text"
            rows="10"
            cols="50"
            className="songForm"
            name="eng_translation"
            placeholder="English Translation"
            onChange={(e) => setEngTranslation(e.target.value)}
            value={eng_translation}
          />
        </div>
        <div>
          <textarea
            type="text"
            rows="10"
            cols="50"
            className="songForm"
            name="esp_translation"
            placeholder="Spanish Translation"
            onChange={(e) => setEspTranslation(e.target.value)}
            value={esp_translation}
          />
        </div>
        <div>
          <input
            type="file"
            className="songForm"
            name="cover_img"
            placeholder="Cover Image"
            onChange={(e) => setCoverImg(e.target.files[0])}
            defaultValue={cover_img}
          />
        </div>
        <div>
          <button
            onSubmit={handleSubmit}
            type="submit"
            className="songFormButton"
          >
            {song ? "Update" : "Create"}
          </button>
        </div>
      </form>
      <Link to="/songs">
        <button className="songFormButton"> Back </button>
      </Link>
    </div>
  );
}

export default SongForm;
