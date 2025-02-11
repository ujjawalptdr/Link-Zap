import React, { useState } from "react";
import Header from "./Components/Header";
import Bg from "./Components/BG-Animation/Bg";
import FormForUrlShortner from "./Components/FormForUrlShortner";
import Loging from "./Components/Loging";
import Menu from "./Components/Menu";
import UrlList from "./Components/UrlList";
import { UrlProvider } from "./Components/Contexts/UrlContext";
import Signup from "./Components/Signup";
import About from "./Components/About";

function App() {
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const [about, setAbout] = useState(false);
  const [home, setHome] = useState(true);

  return (
    <div className="font-Raleway">
      <UrlProvider>
        <Header login={login} setLogin={setLogin} signup={signup} setSignup={setSignup} showMenu={showMenu} setShowMenu={setShowMenu} setAbout={setAbout} setHome={setHome} />
        {
          about && <About />
        }

        {
          home &&
          <>
            <FormForUrlShortner shortenedUrl={shortenedUrl} setShortenedUrl={setShortenedUrl} />
            <UrlList shortenedUrl={shortenedUrl} />
          </>
        }


        {login && <Loging setLogin={setLogin} setSignup={setSignup} />}
        {signup && <Signup setLogin={setLogin} login={login} setSignup={setSignup} signup={signup} />}
        {showMenu && <Menu setLogin={setLogin} setSignup={setSignup} setHome={setHome} setAbout={setAbout} setShowMenu={setShowMenu} />}
      </UrlProvider>

      <Bg />
    </div>
  );
}

export default App;
