import styled from 'styled-components'
import {
  Tab as UnstyledTab,
  TabList as UnstyledTabList,
  Tabs as UnstyledTabs,
  TabPanel as UnstyledTabPanel,
} from 'react-tabs'

const Tabs = styled(UnstyledTabs)`
  padding: 0.5rem 0 6rem 0;
`

const TabList = styled(UnstyledTabList)`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 0;
  margin: 0 0 4rem 0;
`

const Tab = styled(UnstyledTab).attrs({
  selectedClassName: 'selected',
  disabledClassName: 'disabled',
})`
  list-style: none;
  cursor: pointer;
  background: none;
  padding: 0.5rem 3rem;
  color: var(--primary);
  border-radius: var(--br);

  @media (max-width: 600px) {
    padding: 0.5rem 2rem;
  }

  &.selected {
    background: var(--primary);
    color: var(--white);
    border: 1px solid var(--primary);
    box-shadow: 0 4px 25px rgba(0, 0, 0, 0.25);
  }
`

const TabPanel = styled(UnstyledTabPanel).attrs({ selectedClassName: 'selected' })`
  display: none;
  &.selected {
    display: block;
  }
`

Tab.tabsRole = 'Tab'
Tabs.tabsRole = 'Tabs'
TabPanel.tabsRole = 'TabPanel'
TabList.tabsRole = 'TabList'

export { Tab, TabList, Tabs, TabPanel }
