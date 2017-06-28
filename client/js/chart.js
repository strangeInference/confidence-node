import React, {Component} from "react";
//import * as d3 from "d3";
var d3 = require("d3")

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.generateData(),
      buckets: [],
    };
    console.log(this.state.data);
  }
  componentDidMount() {
    this.bucketData();
  }

  shouldComponentUpdate() {
    return false;
  }

  generateData() {
    let d = [];
    for (let i = 0; i < 100; i++) {
      let p = {};
      p.prob = Math.floor(Math.random() * 100);
      p.outcome = Math.random() < p.prob / 100 ? true : false;
      d.push(p);
    }
    return d;
  }

  bucketData() {
    let buckets = [];
    for (let i = 0; i < 6; i++) {
      let bucket = {};
      bucket.lable = 50 + i * 10;
      bucket.n = 0;
      bucket.accurate = 0;
      buckets.push(bucket);
    }
    const bucketer = (d) => {
      for (let b of buckets) {
        if (d.prob < b.lable + 5 && d.prob >= b.lable - 5){
          b.n++;
          if (d.outcome){
            b.accurate++;
          }
        } else if (d.prob < 100 - b.lable + 5 && d.prob >= 100 - b.lable - 5) {
          b.n++;
          if(!d.outcome) {
            b.accurate++
          }
        }
      }
    }
    for (let d of this.state.data) {
      bucketer(d);
    }
    this.setState({
      buckets: buckets
    }, () => {
      console.log(this.state.buckets);
      this.drawChart()
    });

  }

  drawChart() {
    const xScale = d3.scaleLinear().domain([50, 100]).range([0, 500]);
    const yScale = d3.scaleLinear().domain([0, 100]).range([0, 300]);

    const chart = d3.select(this.svg).attr("width", 500).attr("height", 300);
    const conf = chart.selectAll("g").data(this.state.buckets).enter().append("g");
    conf.append("circle")
        .attr("cx", (d) => {return xScale(d.lable)})
        .attr("cy", (d) => {return yScale((d.accurate / d.n) * 100)})
        .attr("fill", "black").attr("r", 5);

  }

  render() {
    return (
      <div>
        <svg ref={(svg) => this.svg = svg}></svg>
      </div>
    );
  }

}

export default Chart;
