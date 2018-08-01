import React, { Component } from 'react';
import {
  Header,
  Container
} from "semantic-ui-react";
import TabBarContainer from './features/tabs/TabBarContainer';
import './App.css';
import ModalManager from "./features/modals/ModalManager";
import UnitInfo from "./features/unitInfo";
import Pilots from "./features/pilots";
import Mechs from "./features/mechs";
import UnitOrganization from "./features/unitOrganization";
import Tools from "./features/tools";
const tabs = [
  { name: "unitInfo", label: "Unit Info", component: UnitInfo, },
  { name: "pilots", label: "Pilots", component: Pilots, },
  { name: "mechs", label: "Mechs", component: Mechs, },
  { name: "unitOrganization", label: "Unit Organization", component: UnitOrganization },
  { name: "tools", label: "Tools", component: Tools }
];
class App extends Component {
  render() {
    return (
      <div className="App">
        <ModalManager />
        <div className="App-header">
          <Header inverted as="h1">Project Mini-Mek</Header>
        </div>
        <Container>
          <TabBarContainer tabs={tabs} size="massive" />
        </Container>
      </div>

    );
  }
}

export default App;
