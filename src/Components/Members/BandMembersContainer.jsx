import { useContext } from "react";
import { Link } from "react-router-dom";
import { MemberContext } from "../../Context/MemberContext";
import { BandContext } from "../../Context/BandContext";
import MemberFilterByBand from "./MembersFilterBttns";

function BandMembers() {
  const { member, filterMembers } = useContext(MemberContext);
  const { band } = useContext(BandContext);

  function getBandMembers(band) {
    const bandMembers = [];
    for (let i = 0; i < member.length; i++) {
      if (member[i].band === band) {
        bandMembers.push(member[i]);
      }
    }
    if (bandMembers.length > 0) {
      return bandMembers.map((member) => (
        <Link
          style={{ width: "300px", textDecoration: "none", color: "black" }}
          className="character"
          key={member.id}
          to={`/members/${member.id}`}
        >
          <h1>{member.name}</h1>
          <img style={{ height: "300px" }} src={member.image.url} />
        </Link>
      ));
    }
  }

  if (member && member.length === 0) {
    return (
      <div>
        <MemberFilterByBand />
        <h1> No members found</h1>{" "}
      </div>
    );
  }

  return (
    <div className="memberListContainer">
      {band && member && (
        <>
          <MemberFilterByBand />
          {band.map(
            (band) =>
              member.find((memb) => memb.band === band.name) && (
                <div
                  key={band.id}
                  className={"char_container_" + band.id}
                  style={{ backgroundColor: band?.colors[0] }}
                >
                  {getBandMembers(band.name)}
                </div>
              )
          )}
        </>
      )}
    </div>
  );
}

export default BandMembers;
