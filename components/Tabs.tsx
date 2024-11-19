import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { loadTabsState, saveTabsState } from "../utils/storage";

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
    const router = useRouter()
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
        const selectedTab = tabs.find((tab) => tab.id  === tabId)
        if (selectedTab) { 
            setActiveTab(tabId)
            router.push(selectedTab.url)
        }
    }

    const handleTabReorder = (updatedTabs: Tab[]) => {
        setTabs(updatedTabs)
    }

    return (
        <div>
            <h1>TabList</h1>
        </div>
    
    )
}

export default Tabs;