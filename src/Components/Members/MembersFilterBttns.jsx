import { useContext } from "react";
import { MemberContext } from "../../Context/MemberContext";
import { BandContext } from "../../Context/BandContext";

function MemberFilterByBand (){
    const { member, filterMembers } = useContext(MemberContext);
    const { band } = useContext(BandContext);

    return (
    <div>
        <button onClick={() => filterMembers("")}>Ver todas</button>
      {band.map((band) => (
        <button
          key={band.id}
          className={"char_container_" + band.id}
          style={{ backgroundColor: band?.colors[0] }}
          onClick={() => filterMembers(band.name)}
        >
          {band.name}
        </button>
      ))}
    </div>       
    )
}

export default MemberFilterByBand;