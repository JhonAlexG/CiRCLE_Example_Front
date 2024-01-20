import { createContext, useState, useEffect, useContext } from "react";
import { BandContext } from "./BandContext";
import axios from "axios";

export const SongContext = createContext();

export function SongContextProvider(props) {
  const [song, setSong] = useState([]);
  const [songAux, setSongAux] = useState([]);
  const { band } = useContext(BandContext);

  const [filterByBand, setFilterByBand] = useState("");
  const [filterByType, setFilterByType] = useState("");

  const url = "http://localhost:3000/api/songs";
  const getSongs = async () => {
    const response = await axios.get(url, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    setSong(response.data.songs);
    setSongAux(response.data.songs);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) return;

    getSongs();
  }, [localStorage.getItem("token")]);

  useEffect(() => {
    if (!filterByBand && !filterByType) return setSong(songAux);
    if (filterByBand === "Others" && filterByType)
      return setSong(
        songAux.filter(
          (song) =>
            song.type === filterByType &&
            !band.find((band) => band.name === song.band)
        )
      );
    if (filterByBand === "Others")
      return setSong(
        songAux.filter((song) => !band.find((band) => band.name === song.band))
      );
    if (filterByBand && !filterByType)
      return setSong(songAux.filter((song) => song.band === filterByBand));

    if (!filterByBand && filterByType)
      return setSong(songAux.filter((song) => song.type === filterByType));

    if (filterByType && filterByBand)
      setSong(
        songAux.filter(
          (song) => song.band === filterByBand && song.type === filterByType
        )
      );
  }, [filterByBand, filterByType]);

  async function createSong(newSong) {
    newSong.id = newSong.title.replaceAll(" ", "_");

    await axios
      .post(url, newSong, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((data) => {
        setSong([...song, data.data.song]);
        setSongAux([...songAux, data.data.song]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function updateSong(id, updatedSong) {
    await axios
      .put(`${url}/${id}`, updatedSong, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((data) => {
        setSong(song.map((song) => (song.id === id ? data.data.song : song)));
        setSongAux(
          songAux.map((song) => (song.id === id ? data.data.song : song))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function deleteSong(id) {
    //Delete from DB
    axios
      .delete(`${url}/${id}`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((data) => {
        setSong(song.filter((song) => song.id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getSongById(id) {
    return song.find((song) => song.id === id);
  }

  useEffect(() => {
    setSong(song);
  }, []);

  return (
    <SongContext.Provider
      value={{
        song: song,
        createSong: createSong,
        updateSong: updateSong,
        deleteSong: deleteSong,
        getSongById: getSongById,
        setFilterByBand: setFilterByBand,
        setFilterByType: setFilterByType,
      }}
    >
      {props.children}
    </SongContext.Provider>
  );
}
