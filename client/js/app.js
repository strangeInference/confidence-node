import React, {Component} from "react";
import ReactDOM, {render} from "react-dom";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import NewPred from "./newPred.js";
import Chart from "./chart.js";
import PredList from "./predList.js";
import $ from "jquery";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
      predictions: this.props.predictions || [] /*[{prediction: "this will work", prob: 40, outcome: false, pending: false}, 
                    {prediction: "this wont't work", prob: 60, outcome: true, pending: false},
                    {prediction: "this will be pending", prob: 76, outcome: true, pending: true}] */
    }
  }

  componentDidMount() {
    console.log(this.props.url)
    // $.ajax({
    //   method: "GET",
    //   url: "/predictions",
    //   dataType: "json",
    //   cache: false,
    //   success: (data) => {
    //     this.setState({
    //       predictions: data
    //     });
    //     console.log("getting predictions", data);
    //   },
    //   error: (xhr, status, err) => {
    //     console.error(this.props.url, status, err.toString());
    //   }
    // })
  }

  setOutcome(index, out) {
    const predictions = [...this.state.predictions];
    predictions[index].outcome = out
    this.setState({
      predictions: predictions
    });
  }

  addPred(pred) {
    const predictions = [...this.state.predictions];
    predictions.push(pred);
    this.setState({
      predictions: predictions
    });
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
          <NewPred addPred={this.addPred.bind(this)}/>
        </TabPanel>
        <TabPanel>
          <PredList predictions={this.state.predictions} type={"pending"} setOutcome={this.setOutcome.bind(this)}/>
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

export default App;
//render(<App/>, document.getElementById('root'));
