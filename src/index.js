import React from "react";
import ReactDOM from "react-dom";
// import axios from "axios";
import response from "./data.json";

import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      responseData: response.slice(0, 10),
      index: 10
    };
    this.loadRef = React.createRef();
  }

  componentDidMount() {
    this.observer = new IntersectionObserver(entries => {
      const { index } = this.state;
      console.log(entries, "entries")
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          console.log(index, "index");
          this.setState({
            responseData: response.slice(0, index + 10),
            index: index + 10
          });
        }
      });
    });
    this.observer.observe(this.loadRef.current);
  }

  stopLoader = () => {
    this.observer.disconnect();
  };

  render() {
    const { responseData } = this.state;
    console.log(responseData);
    return (
      <div className="App">
        <h1>Welcome to the Internet</h1>
        <button onClick={this.stopLoader}>Stop Infinite Loading</button>
        {responseData.map(item => (
          <div>
            <p>{item.title}</p>
            <img src={item.thumbnailUrl} alt={item.title} />
          </div>
        ))}
        <p id="load" ref={this.loadRef} />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
