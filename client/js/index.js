import React, {Component} from "react";
import ReactDOM, {render} from "react-dom";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import NewPred from "./newPred.js";
import Chart from "./chart.js";
import PredList from "./predList.js";
import $ from "jquery";

class App extends Component {
  constructor() {
    super();
    this.state = {
      tabIndex: 0,
      predictions: [] /*[{prediction: "this will work", prob: 40, outcome: false, pending: false}, 
                    {prediction: "this wont't work", prob: 60, outcome: true, pending: false},
                    {prediction: "this will be pending", prob: 76, outcome: true, pending: true}] */
    }
  }

  componentDidMount() {
    console.log(this.props.url)
    $.ajax({
      method: "GET",
      url: "/predictions",
      dataType: "json",
      cache: false,
      success: (data) => {
        this.setState({
          predictions: data
        });
        console.log("getting predictions");
      },
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString());
      }
    })
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
          <PredList predictions={this.state.predictions} type={"pending"} />
        </TabPanel>
        <TabPanel>
          <PredList predictions={this.state.predictions} type={"past"} />
        </TabPanel>
        <TabPanel>
        </TabPanel>
        <TabPanel>
          <Chart/>
        </TabPanel>
      </Tabs>
    );
  }
}
render(<App/>, document.getElementById('root'));
