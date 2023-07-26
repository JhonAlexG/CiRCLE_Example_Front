import { useState, useContext } from "react";
import { BandContext } from "../../Context/BandContext";
import { Link } from "react-router-dom";

function BandForm() {
  const [name, setName] = useState(band ? band.name : "");
  const [logo, setLogo] = useState("");
  const [image, setImage] = useState("");
  const [colors, setColors] = useState([]);
  const { createBand } = useContext(BandContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBand = createBand({
      name: name,
      logo: logo,
      image: image,
      colors: colors,
    });
    setName("");
    setLogo("");
    setImage("");
    setColors([]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            className="bandForm"
            name="name"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div>
          <label htmlFor="logo">Logo</label>
          <input
            type="file"
            className="bandForm"
            name="logo"
            onChange={(e) => setLogo(e.target.files[0])}
            defaultValue={logo}
          />
        </div>
        <div>
          <label htmlFor="image">Image</label>
          <input
            type="file"
            className="bandForm"
            name="image"
            onChange={(e) => setImage(e.target.files[0])}
            defaultValue={image}
          />
        </div>
        <div>
          <input
            id="colorsInput"
            type="text"
            className="bandForm"
            name="colors"
            placeholder="Colors"
          />
          <button
            type="button"
            className="addColorBtn"
            onClick={() => {
              setColors([...colors, document.getElementById("colorsInput").value]);
              document.getElementById("colorsInput").value = "";
            }}
          >
            Add Color
          </button>
        </div>
        <button type="submit">Add Band</button>
        <Link to="/bands">
          <button className="addBandButton">Back</button>
        </Link>{" "}
      </form>
    </div>
  );
}

export default BandForm;
