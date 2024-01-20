import { useState, useContext } from "react";
import { MemberContext } from "../../Context/MemberContext";
import { BandContext } from "../../Context/BandContext";
import { Link, useParams } from "react-router-dom";

function MemberForm() {
  const { createMember, getMemberById, updateMember } =
    useContext(MemberContext);
  const { id } = useParams();
  const member = getMemberById(id);

  const [name, setName] = useState(member ? member.name : "");
  const [mband, setMband] = useState(member ? member.band : "");
  const [position, setPosition] = useState(member ? member.position : "");
  const [birthday, setBirthday] = useState(member ? member.birthday : "");
  const [age, setAge] = useState(member ? member.age : "");
  const [height, setHeight] = useState(member ? member.height : "");
  const [school, setSchool] = useState(member ? member.school : "");
  const [likes, setLikes] = useState(member ? member.likes : "");
  const [dislikes, setDislikes] = useState(member ? member.dislikes : "");
  const [hobbies, setHobbies] = useState(member ? member.hobbies : "");
  const [image, setImage] = useState("");
  const { band } = useContext(BandContext);

  console.log(typeof id, id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (member) {
      updateMember(member.id, {
        name,
        id: name.replaceAll(" ", "_"),
        band: mband,
        position,
        birthday,
        age,
        height,
        school,
        likes,
        dislikes,
        hobbies,
        image,
      });
    } else {
      createMember({
        name: name,
        band: mband,
        position: position,
        birthday: birthday,
        age: age,
        height: height,
        school: school,
        likes: likes,
        dislikes: dislikes,
        hobbies: hobbies,
        image: image,
      });

      setName("");
      setMband("");
      setPosition("");
      setBirthday("");
      setAge("");
      setHeight("");
      setSchool("");
      setLikes("");
      setDislikes("");
      setImage("");
    }

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              className="memberForm"
              name="name"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div>
            <input
              type="file"
              className="memberForm"
              name="image"
              placeholder="Image"
              onChange={(e) => setImage(e.target.files[0])}
              defaultValue={image}
            />
          </div>
          <div>
            <select
              className="memberForm"
              name="band"
              onChange={(e) => setMband(e.target.value)}
              value={mband}
            >
              <option value="">Select Band</option>
              {band.map((band) => (
                <option key={band.id} value={band.name}>
                  {band.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <input
              type="text"
              className="memberForm"
              name="position"
              placeholder="Position"
              onChange={(e) => setPosition(e.target.value)}
              value={position}
            />
          </div>
          <div>
            <input
              type="text"
              className="memberForm"
              name="birthday"
              placeholder="Birthday"
              onChange={(e) => setBirthday(e.target.value)}
              value={birthday}
            />
          </div>
          <div>
            <input
              type="number"
              min="12"
              max="99"
              className="memberForm"
              name="age"
              placeholder="Age"
              onChange={(e) => setAge(e.target.value)}
              value={age}
            />
          </div>
          <div>
            <input
              type="number"
              className="memberForm"
              name="height"
              placeholder="Height"
              onChange={(e) => setHeight(e.target.value)}
              value={height}
            />
          </div>
          <div>
            <input
              type="text"
              className="memberForm"
              name="school"
              placeholder="School"
              onChange={(e) => setSchool(e.target.value)}
              value={school}
            />
          </div>
          <div>
            <input
              type="text"
              className="memberForm"
              name="likes"
              placeholder="Likes"
              onChange={(e) => setLikes(e.target.value)}
              value={likes}
            />
          </div>
          <div>
            <input
              type="text"
              className="memberForm"
              name="dislikes"
              placeholder="Dislikes"
              onChange={(e) => setDislikes(e.target.value)}
              value={dislikes}
            />
          </div>
          <div>
            <textarea
              raws="5"
              columns="30"
              type="text"
              className="memberForm"
              name="hobbies"
              placeholder="Hobbies"
              onChange={(e) => setHobbies(e.target.value)}
              value={hobbies}
            />
          </div>
          <div>
            <button className="addMemberButton" type="submit">
              Add Member
            </button>
          </div>
        </form>
        <Link to="/members">
          <button className="addMemberButton">Back</button>
        </Link>
      </div>
    );
  };
}
export default MemberForm;
