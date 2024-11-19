import { useEffect, useRef, useState } from "react";
import { Tab } from "./Tabs";
import styles from './Tablist.module.css'
import BurgerMenu from "./BurgerMenu";

interface TabListProps {
    tabs: Tab[];
    activeTab: string | null;
    onTabChange: (tabId: string) => void;
    onReorder: (updatedTabs: Tab[]) => void;
}

const TabList: React.FC<TabListProps> = ({tabs, activeTab, onTabChange, onReorder}) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const moreButtonRef = useRef<HTMLDivElement>(null)
    const [hiddenTabs, setHiddenTabs] = useState<Tab[]>([])

    useEffect(() => {
        const calculateVisibleTabs = () => {
            if (!containerRef.current || !moreButtonRef.current) return;
      
            const containerWidth = containerRef.current.offsetWidth;
            const moreButtonWidth = moreButtonRef.current.offsetWidth;
      
            let totalWidth = 0;
            const newHiddenTabs: Tab[] = [];
      
            containerRef.current.childNodes.forEach((node, index) => {
              const element = node as HTMLElement;
      
              // Skip the "More" button
              if (element.classList.contains(styles.burgerMenu)) return;
      
              const tabWidth = element.offsetWidth;
      
              if (totalWidth + tabWidth + moreButtonWidth > containerWidth) {
                newHiddenTabs.push(tabs[index]);
              } else {
                totalWidth += tabWidth;
              }
            });
      
            setHiddenTabs(newHiddenTabs);
          };
      
          calculateVisibleTabs();
          window.addEventListener("resize", calculateVisibleTabs);
      
          return () => window.removeEventListener("resize", calculateVisibleTabs);
        }, [tabs]);
      
        const handleTabClick = (tabId: string) => {
          onTabChange(tabId);
        };
      
        return (
          <div className={styles.tabList} ref={containerRef}>
            {tabs
              .filter((tab) => !hiddenTabs.includes(tab))
              .map((tab) => (
                <div
                  key={tab.id}
                  className={`${styles.tab} ${tab.isPinned ? styles.pinned : ''} ${
                    activeTab === tab.id ? styles.active : ''
                  }`}
                  onClick={() => handleTabClick(tab.id)}
                >
                  <p>{tab.label}</p>
                </div>
              ))}
      
            {/* Бургер-меню для прихованих вкладок */}
            <div className={styles.burgerMenu} ref={moreButtonRef}>
              <BurgerMenu
                hiddenTabs={hiddenTabs}
                onTabClick={(tabId: string) => {
                  onTabChange(tabId);
                }}
              />
            </div>
          </div>
        );
      };