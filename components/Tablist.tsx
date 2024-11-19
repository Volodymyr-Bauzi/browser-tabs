import { useEffect, useRef, useState } from "react";
import { Tab } from "./Tabs";
import styles from './Tablist.module.css'
import BurgerMenu from "./BurgerMenu";
import { useRouter } from "next/router";

interface TabListProps {
    tabs: Tab[];
    activeTab: string | null;
    onTabChange: (tabId: string) => void;
    onReorder: (updatedTabs: Tab[]) => void;
    onPinToggle: (tabId: string, isPinned: boolean) => void;
    onTabClick: (tabId: string, e: React.MouseEvent) => void;
}

const TabList: React.FC<TabListProps> = ({tabs, activeTab, onTabChange, onReorder, onPinToggle, onTabClick}) => {
    const containerRef = useRef<HTMLDivElement>(null);
  const moreButtonRef = useRef<HTMLDivElement>(null);
  const [hiddenTabs, setHiddenTabs] = useState<Tab[]>([]);
  const [draggedTabId, setDraggedTabId] = useState<string | null>(null);
  const [dragTimeout, setDragTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const router = useRouter();

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

  const handleTabClick = (tabId: string, e: React.MouseEvent) => {
    onTabClick(tabId, e)
  };

  const handlePinToggle = (tabId: string) => {
    const tab = tabs.find((t) => t.id === tabId);
    if (tab) {
      onPinToggle(tabId, !tab.isPinned); // Toggle the pinned state
    }
  };

  const handleDragStart = (tabId: string) => {
    setDraggedTabId(tabId);
    setIsDragging(true);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>, targetTabId: string) => {
    event.preventDefault();
    if (!draggedTabId) return;

    const draggedTabIndex = tabs.findIndex((tab) => tab.id === draggedTabId);
    const targetTabIndex = tabs.findIndex((tab) => tab.id === targetTabId);

    if (draggedTabIndex !== -1 && targetTabIndex !== -1 && draggedTabIndex !== targetTabIndex) {
      const updatedTabs = [...tabs];
      const [draggedTab] = updatedTabs.splice(draggedTabIndex, 1);
      updatedTabs.splice(targetTabIndex, 0, draggedTab);
      onReorder(updatedTabs);
    }
  };

  const handleDragEnd = () => {
    setDraggedTabId(null);
    setIsDragging(false);
  };

  const handleTouchStart = (tabId: string) => {
    if (dragTimeout) clearTimeout(dragTimeout);

    const timeout = setTimeout(() => {
      setDraggedTabId(tabId);
      setIsDragging(true);
    }, 2000);

    setDragTimeout(timeout);
  };

  const handleTouchEnd = () => {
    if (dragTimeout) clearTimeout(dragTimeout);
    setDragTimeout(null);
    setDraggedTabId(null);
    setIsDragging(false);
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
            draggable={!tab.isPinned && isDragging}
            onDragStart={() => handleDragStart(tab.id)}
            onDragOver={(e) => handleDragOver(e, tab.id)}
            onDragEnd={handleDragEnd}
            onTouchStart={() => handleTouchStart(tab.id)}
            onTouchEnd={handleTouchEnd}
            onClick={(e) => !isDragging && handleTabClick(tab.id, e)}
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