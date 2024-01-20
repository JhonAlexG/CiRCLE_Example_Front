import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { MemberContext } from "../../Context/MemberContext";

function MemberCard() {
  const { id } = useParams();
  const { deleteMember, getMemberById } = useContext(MemberContext);
  const navigate = useNavigate();
  const member = getMemberById(id);
  console.log(member, typeof id, id);

  return (
    <div className="member-card">
      {member && (
        <>
          <h1> {member.name} </h1>
          <h2> {member.band} </h2>
          <img src={member.image.url} alt={member.name} />
          <h3> Instruments: {member.position}</h3>
          <h3> Birthday: {member.birthday} </h3>
          <h3> Age: {member.age} </h3>
          <h3> Height: {member.height} </h3>
          <h3> School: {member.school}</h3>
          <h3> Favorite Food: {member.likes}</h3>
          <h3> Least Favorite Food: {member.dislikes}</h3>
          <h3> Hobbies: {member.hobbies}</h3>

          {(localStorage.getItem("userType") === "admin" ||
            localStorage.getItem("userType") === "staff") && (
            <>
              <button onClick={() => navigate("/members/edit/" + member.id)}>
                {" "}
                Edit{" "}
              </button>
              <button
                onClick={() => {
                  deleteMember(member.id);
                  navigate("/members");
                }}
              >
                {" "}
                Delete{" "}
              </button>
            </>
          )}
          <button onClick={() => navigate("/members")}> Go Back </button>
        </>
      )}
    </div>
  );
}

export default MemberCard;
