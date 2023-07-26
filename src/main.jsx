import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { SongContextProvider } from "./Context/SongContext.jsx";
import { MemberContextProvider } from "./Context/MemberContext.jsx";
import { BandContextProvider } from "./Context/BandContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BandContextProvider>
      <SongContextProvider>
        <MemberContextProvider>
          <App />
        </MemberContextProvider>
      </SongContextProvider>
    </BandContextProvider>
  </React.StrictMode>
);
