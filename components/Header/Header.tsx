import Link from "next/link";
import React from "react";
import { FiHome } from "react-icons/fi";
import css from "./Header.module.css";

const Header = () => {
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home" className={css.logo}>
        NoteHub
      </Link>

      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/" className={css.navLink}>
              <FiHome className={css.icon} /> Home
            </Link>
          </li>
          <li>
            <Link href="/notes/filter/all" className={css.navLink}>
              All Notes
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
