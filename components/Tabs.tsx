import { useEffect, useState } from "react";
import { loadTabsState, saveTabsState } from "../utils/storage";
import TabList from "./Tablist";

export interface Tab {
    id: string;
    label: string;
    url: string;
    isPinned: boolean;
}

interface TabsProps {
    initialTabs: Tab[]
}

const Tabs: React.FC<TabsProps> = ({ initialTabs }) => {
    const [tabs, setTabs] = useState<Tab[]>([])
    const [activeTab, setActiveTab] = useState<string | null>(null)

    useEffect(() => {
        const savedTabs = loadTabsState();
        setTabs(savedTabs.length > 0 ? savedTabs : initialTabs)
    }, [initialTabs])

    useEffect(() => {
        if (tabs.length > 0) saveTabsState(tabs)
    }, [tabs])

    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId)
    }

    const handleTabReorder = (updatedTabs: Tab[]) => {
        setTabs(updatedTabs)
    }

    const handlePinToggle = (tabId: string, isPinned: boolean) => {
        setTabs((prevTabs) =>
          prevTabs.map((tab) =>
            tab.id === tabId ? { ...tab, isPinned } : tab
          )
        );
      };
      
      const handleTabClick = (tabId: string, e: React.MouseEvent) => {
        e.preventDefault(); // Prevent default browser navigation behavior (e.g., anchor behavior)
        
        handleTabChange(tabId); // Update active tab state
    
        const selectedTab = tabs.find((tab) => tab.id === tabId);
        if (selectedTab) {
          // Use window.history.replaceState or pushState to change the URL without reloading
          window.history.replaceState({}, "", selectedTab.url); // Modify URL without reload
        }
      };

    return (
        <div>
            <TabList
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={handleTabChange}
                onReorder={handleTabReorder}
                onPinToggle={handlePinToggle}
                onTabClick={handleTabClick}
            />
        </div>

    )
}

export default Tabs;