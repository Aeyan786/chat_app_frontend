import React from "react";
import SideBar from "./SideBar";
import MessageContainer from "./MessageContainer";
import { useSelector } from "react-redux";

const Home = () => {
  const { open } = useSelector((store) => store.user);

  return (
    <div className="flex flex-col [@media(min-width:751px)]:flex-row  w-full gap-5 rounded-2xl bg-white/10 backdrop-blur-md  p-4 md:p-8 shadow-xl border border-white/20 overflow-hidden">
      <div
        className={`w-full [@media(min-width:751px)]:w-[300px] ${
          open ? "hidden [@media(min-width:751px)]:block" : "block"
        }`}
      >
        <SideBar />
      </div>

      <div className="hidden [@media(min-width:751px)]:block w-px bg-gray-200" />

      <div
        className={`w-full [@media(min-width:751px)]:flex-1  ${
          open ? "block" : "hidden"
        }  [@media(min-width:751px)]:block`}
      >
        <MessageContainer />
      </div>
    </div>
  );
};

export default Home;
