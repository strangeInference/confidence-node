import React, {Component} from "react";

class NewPred extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      prediction: {
        prediction: "",
        dateCreated: "",
        dateKnown: "",
        confidence: 0,
        isPublic: true,
      },
    };
  }
  render() {
    return (
      <form className="pred-form">
        <div>
          <p>What do you think will happen?</p>
          <textarea placeholder="your prediction"></textarea>
        </div>
        <div>
          <p>How confident are you?</p>
          <span><input/>%</span>
        </div>
        <div>
          <p>When will you know?</p>
          <input/>
        </div>
      </form>
    );
  }
}

export default NewPred;
