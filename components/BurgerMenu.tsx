import React, { useState } from "react";
import { Tab } from "./Tabs";
import styles from './BurgerMenu.module.css';

interface BurgerMenuProps {
  hiddenTabs: Tab[];
  onTabClick: (tabId: string) => void;
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ hiddenTabs, onTabClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={styles.burgerMenu}>
      <button
        className={styles.burgerButton}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        More
      </button>
      {isMenuOpen && (
        <div className={styles.burgerDropdown}>
          {hiddenTabs.map((tab) => (
            <div
              key={tab.id}
              className={styles.burgerItem}
              onClick={() => {
                onTabClick(tab.id);
                setIsMenuOpen(false);
              }}
            >
              {tab.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;