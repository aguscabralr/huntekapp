"use client";
import Link from "next/link";
import Image from "next/image";
import Profile from "./profile";
import {useState} from "react";
import ForumIcon from "@mui/icons-material/Forum";
import {usePathname} from "next/navigation";

const NavBar = () => {
  let currentPath = usePathname();
  const [close, setClose] = useState(false);
  const backArrowPaths = ["/interviews", "/profileExtend", "/swipe", "/conversations"];
  const conversationButtonPaths = ["/swipe"];
  const handleClick = () => {
    setClose(!close);
  };
  
  return (
    <nav className="navbar h-[10%] shadow-xl bg-pri">
      <article className="navbar-start">
        {!backArrowPaths.includes(currentPath) ? (
          <div className="drawer">
            <input type="checkbox" id="my-drawer-2" className="drawer-toggle" onClick={handleClick} />
            <label htmlFor="my-drawer-2" className=" drawer-button  avatar">
              <div className="w-10 rounded-full  shadow-xl ">
                <Image
                  alt="avatar"
                  src="/images/pexels-monstera-5384445.jpg"
                  width={100}
                  height={100}
                  quality={100}
                  className="w-5 h-5 cursor-pointer"
                />
              </div>
            </label>
            <div className="drawer-side z-40">
              <label htmlFor="my-drawer-2" className=" z-40"></label>
              <ul className=" z-40  w-full h-screen bg-sec ">
                <li>
                  <Profile />
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <Link href="/home">
            <button className="btn btn-ghost z-0 btn-circle">
              <div className="indicator">
                <Image src="/utils/back.svg" alt="backArrow" width={25} height={25} />
              </div>
            </button>
          </Link>
        )}
      </article>
      <article className="w-1/4 h-8 bg-Huntek bg-contain bg-no-repeat bg-center navbar-center">
        <Link href={"/home"} className="w-full h-full"></Link>
      </article>
      <article className="navbar-end">
        {close ? (
          <button
            onClick={() => {
              document.getElementById("my-drawer-2").click();
              setClose(!close);
            }}
            className="btn z-50 btn-ghost btn-circle ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 z-50 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#046255">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        ) : (
          <>
            {conversationButtonPaths.includes(currentPath) ? (
              <button className="btn btn-ghost z-0 btn-circle">
                <a href="/conversations">
                  <ForumIcon style={{fontSize: "24px", color: "white"}} />
                </a>
              </button>
            ) : (
              ""
            )}
            <button className="btn btn-ghost z-0 btn-circle">
              <Link href="/notifications" className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#ffffff">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </Link>
            </button>
          </>
        )}
      </article>
    </nav>
  );
};

export default NavBar;
