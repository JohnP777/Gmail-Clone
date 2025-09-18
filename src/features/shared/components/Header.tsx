"use client";

import DotMenu from "./ui/DotMenu";
import Gear from "./ui/Gear";
import Hamburger from "./ui/Hamburger";
import Icon from "./ui/Icon";
import Profile from "./ui/Profile";
import Question from "./ui/Question";
import SearchBar from "./ui/SearchBar";

export default function Header() {
  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="mx-auto flex w-full items-center justify-between gap-3 px-4 md:px-6 py-2">
        <div className="flex items-center gap-0 shrink-0">
          <Hamburger />
          <Icon />
        </div>

        <div className="flex-1 flex justify-center pr-72">
          <SearchBar />
        </div>

        <div className="flex items-center gap-1.5 shrink-0 -mr-2">
          <Question />
          <Gear />
          <DotMenu />
          <Profile />
        </div>
      </div>
    </header>
  );
}


