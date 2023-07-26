import { useContext } from "react";
import { SongContext } from "../../Context/SongContext";
import { BandContext } from "../../Context/BandContext";

function SongsFilter() {
  const { song, setFilterByBand, setFilterByType } = useContext(SongContext);
  const { band } = useContext(BandContext);
  return (
    <div>
      <div>
        <button onClick={() => setFilterByBand("")}>Ver todas</button>
        {band.map((band) => (
          <button
            key={band.id}
            className={"char_container_" + band.id}
            style={{ backgroundColor: band?.colors[0] }}
            onClick={() => setFilterByBand(band.name)}
          >
            {band.name}
          </button>
        ))}
        <button onClick={() => setFilterByBand("Others")}>Otros</button>
      </div>
      <div>
        <button onClick={() => setFilterByType("")}>Ver todas</button>
        <button onClick={() => setFilterByType("Original")}>Original</button>
        <button onClick={() => setFilterByType("Cover")}>Cover</button>
        <button onClick={() => setFilterByType("Tied-Up")}>Tied-Up</button>
      </div>
    </div>
  );
}

export default SongsFilter;
