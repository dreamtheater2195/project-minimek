import React, { Component } from 'react';
import {
  Header,
  Container
} from "semantic-ui-react";
import TabBarContainer from './features/tabs/TabBarContainer';
import './App.css';

const tabs = [
  { name: "Unit Info" },
  { name: "Pilots" },
  { name: "Mechs" },
  { name: "Unit Organization" }
];
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Header inverted as="h1">Project Mini-Mek</Header>
        </div>
        <Container>
          <TabBarContainer tabs={tabs} />
        </Container>
      </div>

    );
  }
}

export default App;
