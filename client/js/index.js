import React, {Component} from "react";
import ReactDOM, {render} from "react-dom";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import NewPred from "./newPred.js";

class App extends Component {
  constructor() {
    super();
    this.state = {tabIndex: 0}
  }
  render() {
    return (
      <Tabs>
        <TabList>
          <Tab>New Prediction</Tab>
          <Tab>Pending Predictions</Tab>
          <Tab>Past Predictions</Tab>
          <Tab>Prediction Feed</Tab>
          <Tab>Confidence Chart</Tab>
        </TabList>
        <TabPanel>
          <NewPred/>
        </TabPanel>
        <TabPanel>
          <p>some other stuff</p>
        </TabPanel>
        <TabPanel>
        </TabPanel>
        <TabPanel>
        </TabPanel>
        <TabPanel>
        </TabPanel>
      </Tabs>
    );
  }
}
render(<App/>, document.getElementById('root'));
