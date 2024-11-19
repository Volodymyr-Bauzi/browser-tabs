import { useRef, useState } from "react";
import { Tab } from "./Tabs";
import styles from './Tablist.module.css'

interface TabListProps {
    tabs: Tab[];
    activeTab: string | null
}

const TabList: React.FC<TabListProps> = ({tabs, activeTab}) => {
    return (
        <div className={styles.tabList}>
            {tabs.map((tab) => (
                <div key={tab.id}
                    className={`${styles.tab} ${tab.isPinned ? styles.pinned : ''} ${
                    activeTab === tab.id ? styles.active : ''
                }`}>
                    {tab.label}
                </div>
            ))}
        </div>
    )
}

export default TabList;