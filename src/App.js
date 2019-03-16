import React, { Component } from 'react';
import './App.css';
import VideoRecorder from './components/VideoRecorder';


class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
        <VideoRecorder />
      </div>
    );
  }
}

export default App;
