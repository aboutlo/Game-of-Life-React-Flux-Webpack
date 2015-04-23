import React      from 'react';
import BoardStore from '../stores/BoardStore';

import BoardActions from '../actions/BoardActions';

const Toolbar = React.createClass({

  doPlay () {
    BoardActions.play();
  },

  doPause () {
    BoardActions.pause();
  },

  doSeed () {
    BoardActions.seed();
  },

  render () {
    return <header>
            <button onClick={this.doPlay}>play</button>
            <button onClick={this.doPause}>pause</button>
            <button onClick={this.doSeed}>seed</button>
           </header>
  }
});

export default Toolbar;
