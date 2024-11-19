import React from "react";
import "./BurgerMenu.css";
import styles from './BurgerMenu.module.css'

interface BurgerMenuProps {
  hiddenTabs: string[];
  onTabClick: (index: number) => void;
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ hiddenTabs, onTabClick }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

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
          {hiddenTabs.map((tab, index) => (
            <div
              key={index}
              className={styles.burgerItem}
              onClick={() => {
                onTabClick(index);
                setIsMenuOpen(false);
              }}
            >
              {tab}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;