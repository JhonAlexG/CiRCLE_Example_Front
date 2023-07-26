import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const MemberContext = createContext();

export function MemberContextProvider({ children }) {
  const [member, setMember] = useState([]);
  const [membersAux, setMembersAux] = useState([]);

  const url = "http://localhost:3000/api/members";
  const getMembers = async () => {
    const response = await axios.get(url);
    setMember(response.data.members);
    setMembersAux(response.data.members);
  };

  useEffect(() => {
    getMembers();
  }, []);

  async function createMember(newMember) {
    newMember.id = newMember.name.replaceAll(" ", "_");
    console.log(newMember);

    await axios
      .post(url, newMember, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((data) => {
        setMember([...member, data.data.member]);
        setMembersAux([...membersAux, data.data.member]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function deleteMember(id) {
    axios
      .delete(`${url}/${id}`)
      .then((data) => {
        setMember(member.filter((member) => member.id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function filterMembers(band) {
    if (band === "") {
      setMember(membersAux);
    } else {
      setMember(membersAux.filter((member) => member.band === band));
    }
  }

  useEffect(() => {
    setMember(member);
  }, []);

  function getMemberById(id) {
    return member.find((member) => member.id === id);
  }

  return (
    <MemberContext.Provider
      value={{
        member: member,
        createMember: createMember,
        deleteMember: deleteMember,
        getMemberById: getMemberById,
        filterMembers: filterMembers,
      }}
    >
      {children}
    </MemberContext.Provider>
  );
}
