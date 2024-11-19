import { useEffect, useRef, useState } from "react";
import { Tab } from "./Tabs";
import styles from './Tablist.module.css'
import BurgerMenu from "./BurgerMenu";

interface TabListProps {
    tabs: Tab[];
    activeTab: string | null;
    onTabChange: (tabId: string) => void;
    onPinToggle: (tabId: string, isPinned: boolean) => void
    moveTab: (fromIndex: number, toIndex: number) => void;
}

const TabList: React.FC<TabListProps> = ({tabs, activeTab, onTabChange, onPinToggle, moveTab}) => {
    const containerRef = useRef<HTMLDivElement>(null);
  const moreButtonRef = useRef<HTMLDivElement>(null);
  const [hiddenTabs, setHiddenTabs] = useState<Tab[]>([]);

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

  const handlePinToggle = (tabId: string) => {
    const tab = tabs.find((t) => t.id === tabId);
    if (tab) {
      onPinToggle(tabId, !tab.isPinned); // Toggle the pinned state
    }
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.dataTransfer.setData('index', index.toString());
  };


  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Required to allow dropping
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    const fromIndex = parseInt(e.dataTransfer.getData('index'), 10);
    if (fromIndex !== index) {
      moveTab(fromIndex, index); // Reorder tabs
    }
  };


    return (
    <div className={styles.tabList} ref={containerRef}>
        {tabs
        .filter((tab) => !hiddenTabs.includes(tab))
        .map((tab, index) => (
          <div
            key={tab.id}
            className={`${styles.tab} ${tab.isPinned ? styles.pinned : ''} ${
              activeTab === tab.id ? styles.active : ''
            }`}
            draggable={!tab.isPinned    }
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}

          >
            <p>{tab.label}</p>
            <button
                className={styles.pinButton}
                onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering tab click
                    handlePinToggle(tab.id);
                  }}
            >
                {tab.isPinned ? "🔒" : "🔓"}
            </button>
            </div>
        ))}

        {/* Burger Menu */}
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
        
export default TabList;     