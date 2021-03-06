import React, {Component} from "react";
import Sugar from "sugar-date";
import $ from "jquery";

class NewPred extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prediction: "",
      dateCreated: "",
      dateKnown: "",
      prob: 0,
      isPublic: true,
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    const dateKnown = Sugar.Date.create(this.state.dateKnown).toJSON();
    this.setState({
      dateCreated: new Date().toJSON(),
      dateKnown: dateKnown,
    }, () => { 
      //console.log(this.state);
      $.ajax({
      method: "POST",
      url: "/newPred",
      data: this.state,
      success: (pred) => {
        console.log("sending prediction: ", pred);
        this.props.addPred(pred);
      }
    });
    })
  } 

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form className="pred-form" onSubmit={this.handleSubmit.bind(this)}>
        <div>
          <p>What do you think will happen?</p>
          <textarea 
            placeholder="your prediction" 
            name="prediction"
            value={this.prediction}
            onChange={this.handleInputChange.bind(this)}>
          </textarea>
        </div>
        <div>
          <p>How confident are you?</p>
          <span><input 
            type="number" 
            name="prob" 
            value={this.state.prob} 
            onChange={this.handleInputChange.bind(this)}/> % chance
          </span>
        </div>
        <div>
          <p>When will you know?</p>
          <input
          name="dateKnown"
          value={this.state.dateKnown}
          onChange={this.handleInputChange.bind(this)} />
        </div>
        <div>
          <input 
            type="checkbox" 
            name="isPublic" 
            checked={this.state.isPublic} 
            onChange={this.handleInputChange.bind(this)} />
          <label>Public?</label>
        </div>
        <div>
          <button type="submit">Submit Prediction</button>
        </div>
      </form>
    );
  }
}

export default NewPred;
