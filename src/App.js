import { useRef, useState } from "react";
import "./App.scss";
import Navbar from "./Components/Navbar/Navbar";
import Posts from "./Layout/Posts/Posts";
import { Route, Routes } from "react-router-dom";
import Albums from "./Layout/Photos/Albums";
import Todos from "./Layout/Todos/Todos";
import UserPhotos from "./Layout/Photos/Components/UserPhotos/UserPhotos";

function App() {
  const [isSticky, setSticky] = useState(false);

  const stickyRef = useRef(null);
  const handleScroll = () => {
    window.scrollY > stickyRef.current.getBoundingClientRect().bottom
      ? setSticky(true)
      : setSticky(false);
  };
  const debounce = (func, wait = 20, immediate = true) => {
    let timeOut;
    return () => {
      let context = this,
        args = arguments;
      const later = () => {
        timeOut = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeOut;
      clearTimeout(timeOut);
      timeOut = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  window.addEventListener("scroll", debounce(handleScroll));
  return (
    <>
      <Navbar sticky={isSticky} />
      <div className={isSticky ? "sticky" : ""}>
        <Routes>
          <Route path="/" element={<Posts stickyRef={stickyRef} />} />
          <Route path="/albums" element={<Albums stickyRef={stickyRef} />} />
          <Route path="/todos" element={<Todos stickyRef={stickyRef} />} />
          <Route
            path="/albums/user-photos/:id"
            element={<UserPhotos stickyRef={stickyRef} />}
          />
          <Route
            path="*"
            element={<h1 className="not-found">Page not Found</h1>}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
