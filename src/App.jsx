import Menu from "./Components/Menu";
import Login from "./Components/Navigation/Login";
import Register from "./Components/Navigation/Register";
import AddStaffForm from "./Components/Navigation/AddStaffForm";
import SongList from "./Components/Songs/SongList";
import SongCard from "./Components/Songs/SongCard";
import AddSongForm from "./Components/Songs/AddSongForm";
import MemberList from "./Components/Members/MemberList";
import MemberCard from "./Components/Members/MemberCard";
import AddMemberForm from "./Components/Members/AddMemberForm";
import BandList from "./Components/Bands/BandList";
import BandCard from "./Components/Bands/BandCard";
import AddBandForm from "./Components/Bands/AddBandForm";

import {
  createBrowserRouter,
  BrowserRouter,
  Link,
  Route,
  Routes,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/staff/addstaff" element={<AddStaffForm />} />
        <Route path="/home" element={<Menu />} />
        <Route path="/songs" element={<SongList />} />
        <Route path="/songs/addsong" element={<AddSongForm />} />
        <Route path="/songs/edit/:id" element={<AddSongForm />} />
        <Route path="/songs/:id" element={<SongCard />} />
        <Route path="/members" element={<MemberList />} />
        <Route path="/members/addmember" element={<AddMemberForm />} />
        <Route path="/members/edit/:id" element={<AddMemberForm />} />
        <Route path="/members/:id" element={<MemberCard />} />
        <Route path="/bands" element={<BandList />} />
        <Route path="/bands/addband" element={<AddBandForm />} />
        <Route path="/bands/edit/:id" element={<AddBandForm />} />
        <Route path="/bands/:id" element={<BandCard />} />
        <Route path="*" element={<h1> 404 Not Found </h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
