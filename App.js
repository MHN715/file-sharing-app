import React, { useState, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import AccessTokenContext from "./api/AccessTokenContext";
import WhatsPlayingContext from "./Context/WhatsPlayingContext";
import WebPlaybackSDK from "./components/WebPlaybackSDK/WebPlaybackSDK";

const Login = lazy(() => import("./routes/login/Login"));
const Callback = lazy(() => import("./routes/callback/Callback"));
const Home = lazy(() => import("./routes/home/Home"));
const Search = lazy(() => import("./routes/search/Search"));
const Playlist = lazy(() => import("./routes/Playlist/Playlist"));
const YourLibrary = lazy(() => import("./routes/YourLibrary/YourLibrary"));

const code = new URLSearchParams(window.location.search).get("code");

function App() {
  const accessTokenState = useState(null);
  const [chosenTrack, setChosenTrack] = useState(null);
  const [chosenId, setChosenId] = useState("");
  const [chosenPlaylist, setChosenPlaylist] = useState([]);
  const [chosenIndex, setChosenIndex] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [currentlyPlayingName, setCurrentlyPlayingName] = useState("");
  const [spotifyWebPlaybackStatus, setSpotifyWebPlaybackStatus] =
    useState(null);
  const [playerSDK, setPlayerSDK] = useState({});
  const [duration, setDuration] = useState(1);
  const [currentDuration, setCurrentDuration] = useState(1);
  const [playerFullScreen, setplayerFullScreen] = useState(false);
  const [repeatSongState, setRepeatSongState] = useState();
  const [imageUrl, setImageUrl] = useState("");

  return (
    <AccessTokenContext.Provider value={accessTokenState}>
      <WhatsPlayingContext.Provider
        value={{
          chosenTrack,
          setChosenTrack,
          chosenPlaylist,
          setChosenPlaylist,
          chosenIndex,
          setChosenIndex,
          playing,
          setPlaying,
          currentlyPlayingName,
          setCurrentlyPlayingName,
          spotifyWebPlaybackStatus,
          setSpotifyWebPlaybackStatus,
          playerSDK,
          setPlayerSDK,
          chosenId,
          setChosenId,
          duration,
          setDuration,
          currentDuration,
          setCurrentDuration,
          playerFullScreen,
          setplayerFullScreen,
          repeatSongState,
          setRepeatSongState,
          setImageUrl,
          imageUrl,
        }}
      >
        {(() => {
          if (accessTokenState[0])
            return <WebPlaybackSDK accessToken={accessTokenState} />;
        })()}

        <Suspense fallback={<p>loading...</p>}>
          <Routes>
            {(() => {
              if (accessTokenState[0])
                return (
                  <>
                    <Route path="/" element={<Home />} />
                    <Route path="search" element={<Search />} />
                    <Route path="playlist" element={<Playlist />} />
                    <Route path="your_library" element={<YourLibrary />} />
                    <Route path="playlist/:id" element={<Playlist />} />
                  </>
                );
            })()}
            <Route path="*" element={<Login />} />
            <Route path="/callback" element={<Callback code={code} />} />;
          </Routes>
        </Suspense>
      </WhatsPlayingContext.Provider>
    </AccessTokenContext.Provider>
  );
}

export default App;
