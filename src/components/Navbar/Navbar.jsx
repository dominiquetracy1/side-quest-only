import React from "react";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
  { name: "QUEST BOARD", path: "/quests" },
  { name: "THE MAP", path: "/map" },
  { name: "MY LOG", path: "/log" },
];

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo} onClick={() => (window.location.href = "/")}>
        SIDE QUESTS <span className={styles.accent}>ONLY</span>
      </div>

      <div className={styles.navLinks}>
        {NAV_LINKS.map((link, index) => (
          <span key={index} className={styles.link}>
            {link.name}
          </span>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
