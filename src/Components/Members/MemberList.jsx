import { Link, useNavigate } from "react-router-dom";
import BandMembersContainer from "./BandMembersContainer";


function MemberList() {
  const navigate = useNavigate();

  return (
    <div className="memberListContainer">
      <BandMembersContainer />
      <Link to={`/members/addmember`}>
        <button className="addMemberBtn">Add Member</button>
      </Link>
      <button
        className="MenuBtn"
        onClick={() => {
          navigate("/home");
        }}
      >
        Menu
      </button>
    </div>
  );
}

export default MemberList;
