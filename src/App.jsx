import React from 'react'
import './App.css'
import {data} from "./data.js"

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      display: ""
    }
    this.changeDisplay = this.changeDisplay.bind(this);
  }

  changeDisplay(name){
    this.setState({
      display: name
    });
  }
  
  render (){
    return(
      <div id="drum-machine">
        <div id="pads">
          {data.map((pad) => {return (<DrumPad changeDisplay={this.changeDisplay} key={pad.text} text={pad.text}/>)})}
        </div>
        <div id="display" className='flex'>
          {this.state.display || ""}
        </div>
      </div>
    );
  }
    
}

class DrumPad extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      pad: {}
    }
    this.handleKey = this.handleKey.bind(this);
    this.playSound = this.playSound.bind(this);
  }

  componentDidMount(){
    document.addEventListener("keydown", this.handleKey)
    const thisPad = data.find(pad => pad.text==this.props.text);
    this.setState({
      pad: thisPad
    });
  }

  playSound(){
    const sound = document.getElementById(this.state.pad.text);
    sound.play();
    sound.currentTime = 0;
    this.props.changeDisplay(this.state.pad.name);
  }

  handleKey(e){
    if(e.key.toUpperCase() === this.props.text){
      this.playSound();
    }
  }

  render(){
    return (<div id={this.state.pad.name} className="drum-pad flex" onClick={this.playSound}>
      <audio className="clip" id={this.state.pad.text} src={this.state.pad.audio}></audio>
      {this.props.text}
    </div>)};
}