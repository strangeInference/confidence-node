import React, {Component} from "react";
import $ from "jquery";
import Sugar from "sugar-date";

class Pred extends Component {
  isCorrect() {
    if (this.props.p.outcome === null) {
      return " pending";
    } else if (this.props.p.outcome) {
      return " correct";
    } else {
      return " incorrect";
    }
  }

  isDue() {
    const known = new Sugar.Date(this.props.p.date_known);

    if (known.isPast().raw) {
      return " due";
    } else {
      return "";
    }
  }

  sendData(outcome) {
    $.ajax({
      method: "PUT",
      url: "/outcome",
      data: {id: this.props.p.id, outcome: outcome},
      success: () => {
        console.log("sending outcome");
        //need to set updatedAt an well as outcome
      }
    })
    this.props.setOutcome(this.props.index, outcome);
  }

  render() {
    if (this.props.p.outcome === null) {
      return (
        <div className={"pred" + this.isCorrect() + this.isDue()}>
          <div className={"button left"} onClick={() => {this.sendData(false)}}>incorrect</div>
          <div className={"p-info"}>
            <p>{this.props.p.prediction}</p>
            <p>({this.props.p.prob}% confidence)</p>
          </div>
          <div className={"button right"} onClick={() => {this.sendData(true)}}>correct</div>
        </div>
      )
    } else {
      return (
        <div className={"pred" + this.isCorrect()}>
          <p>{this.props.p.prediction}</p>
          <p>({this.props.p.prob}% confidence)</p>
        </div>
      )
    }
  }
}

export default Pred;
