import React, {Component} from "react";
import ReactDOM, {render} from "react-dom";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

class App extends Component {
  condtructor() {
    this.state = {tabIndex: 0}
  }
  render() {
    return (
      <Tabs>
        <TabList>
          <Tab>Title 1</Tab>
          <Tab>Title 2</Tab>
        </TabList>
        <TabPanel>
          <p>Some stuff</p>
        </TabPanel>
        <TabPanel>
          <p>some other stuff</p>
        </TabPanel>
      </Tabs>
    );
  }
}
render(<App/>, document.getElementById('root'));
