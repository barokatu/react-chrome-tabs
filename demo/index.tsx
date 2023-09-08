import React, { useEffect } from "react";
import { useState } from "react";
import { render } from "react-dom";
import { Tabs } from "../src";
import { TabProperties } from "../src/chrome-tabs";
import "../css/chrome-tabs.css";
import './css/demo.css'

import fb from "./images/facebook-favicon.ico";
import google from "./images/google-favicon.ico";

let id = 0;
function App() {
  const [tabs, setTabs] = useState<TabProperties[]>([
    { id: "abc", favicon: fb, title: "测试", active: true },
  ]);

  const addTabWithIcon = () => {
    id++;
    setTabs([
      ...tabs,
      {
        id: `tab-id-${id}`,
        title: `New Tabs ${id}`,
        favicon: tabs.length % 2 ? fb : google,
      },
    ]);
  }

  const addTabWithIconClass = () => {
    id++;
    setTabs([
      ...tabs,
      {
        id: `tab-id-${id}`,
        title: `New Tabs ${id}`,
        faviconClass: ' emoji'
      },
    ]);
  }


  const active = (id: string) => {
    setTabs(tabs.map((tab) => ({ ...tab, active: id === tab.id })));
  };

  const close = (id: string) => {
    setTabs(tabs.filter((tab) => tab.id !== id));
  };

  const reorder = (tabId: string, fromIndex: number, toIndex: number) => {
    const beforeTab = tabs.find(tab => tab.id === tabId);
    if (!beforeTab) {
        return;
    }
    let newTabs = tabs.filter(tab => tab.id !== tabId);
    newTabs.splice(toIndex, 0, beforeTab);
    setTabs(newTabs);
  };

  const closeAll = () => setTabs([]);
  
  return (
    <div>
      <Tabs
        onTabClose={close}
        onTabReorder={reorder}
        onTabActive={active}
        tabs={tabs}
      ></Tabs>
      <button onClick={addTabWithIcon}>Add Tab with icon</button>
      <button onClick={addTabWithIconClass}>Add Tab with iconClass</button>
      <button onClick={closeAll}>Close All</button>
    </div>
  );
}

render(<App />, document.getElementById("root"));
