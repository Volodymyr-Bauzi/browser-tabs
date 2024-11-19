import { useRef, useState } from "react";
import { Tab } from "./Tabs";

interface TabListProps {
    tabs: Tab[];
}

const TabList: React.FC<TabListProps> = ({tabs}) => {
    return (
        <div>
            {tabs.map((tab) => (
                <div key={tab.id}>
                    {tab.label}
                </div>
            ))}
        </div>
    )
}