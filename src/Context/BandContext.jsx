import { createContext, useState, useEffect } from "react";
import axios from "axios";
export const BandContext = createContext();

export function BandContextProvider(props) {
  const [band, setBand] = useState([]);

  const url = "mongodb://localhost:27017/";
  const getBands = async () => {
    const response = await axios.get(url, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    setBand(response.data.bands);
  };
  useEffect(() => {
    if (localStorage.getItem("token")) getBands();
  }, [localStorage.getItem("token")]);

  async function createBand(newBand) {
    newBand.id = newBand.name.replaceAll(" ", "_");

    console.log(newBand);
    await axios
      .post(url, newBand, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((data) => {
        setBand([...band, data.data.band]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function deleteBand(id) {
    axios
      .delete(`${url}/${id}`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((data) => {
        setBand(band.filter((band) => band.id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    setBand(band);
  }, []);

  function getBandById(id) {
    return band.find((band) => band.id === id);
  }

  return (
    <BandContext.Provider
      value={{
        band: band,
        createBand: createBand,
        deleteBand: deleteBand,
        getBandById: getBandById,
      }}
    >
      {props.children}
    </BandContext.Provider>
  );
}
