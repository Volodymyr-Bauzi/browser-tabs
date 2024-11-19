import { Tab } from "../components/Tabs";

const TABS_STATE_KEY = 'tabs_state'

export const saveTabsState = (tabs: Tab[]) => {
    localStorage.setItem(TABS_STATE_KEY, JSON.stringify(tabs))
}

export const loadTabsState = ():Tab[] => {
    const saved = localStorage.getItem(TABS_STATE_KEY)
    return saved ? JSON.parse(saved) : []
}