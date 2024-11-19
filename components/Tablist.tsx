import { useRef, useState } from "react";
import { Tab } from "./Tabs";
import styles from './Tablist.module.css'

interface TabListProps {
    tabs: Tab[];
    activeTab: string | null;
    onTabChange: (tabId: string) => void;
    onReorder: (updatedTabs: Tab[]) => void;
}

const TabList: React.FC<TabListProps> = ({tabs, activeTab, onTabChange, onReorder}) => {

    const handleTabClick = (tabId: string) => {
        onTabChange(tabId)
    }

    return (
        <div className={styles.tabList}>
            {tabs.map((tab) => (
                <div key={tab.id}
                    className={`${styles.tab} ${tab.isPinned ? styles.pinned : ''} ${
                    activeTab === tab.id ? styles.active : ''
                    }`}
                    onClick={() => handleTabClick(tab.id)}
                >
                    {tab.label}
                </div>
            ))}
        </div>
    )
}

export default TabList;