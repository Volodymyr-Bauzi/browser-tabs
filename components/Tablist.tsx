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
    const [isDragging, setIsDragging] = useState(false);
    const dragStartIndex = useRef<number | null>(null);
    const [mobileHold, setMobileHold] = useState(false);

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

        const handleDragStart = (index: number) => {
            dragStartIndex.current = index;
            setIsDragging(true);
          };

          const handleDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
            e.preventDefault();
            if (!isDragging || dragStartIndex.current === null || index === dragStartIndex.current) return;
        
            const newTabs = [...tabs];
            const draggedTab = newTabs.splice(dragStartIndex.current, 1)[0];
            newTabs.splice(index, 0, draggedTab);
            dragStartIndex.current = index;
        
            onReorder(newTabs);
          };

          const handleDragEnd = () => {
            setIsDragging(false);
            dragStartIndex.current = null;
          };

          const handleTabClick = (tabId: string) => {
            if (!mobileHold) onTabChange(tabId);
          };
        
          const handleTouchStart = () => {
            setTimeout(() => setMobileHold(true), 2000);
          };
        
          const handleTouchEnd = () => {
            setMobileHold(false);
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
                  draggable={!tab.isPinned}
          onDragStart={() => handleDragStart(index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragEnd={handleDragEnd}
          onClick={() => handleTabClick(tab.id)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
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

export default TabList