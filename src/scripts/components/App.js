import React   from 'react';

import Board   from './Board';
import Toolbar from './Toolbar';

const App = React.createClass({
  render (){
    return (
    <div>
      <header>
        <h1>GOL (Game of Life) with React</h1>
      </header>
      <Toolbar/>
      <Board/>
    </div>
    );
  }
});

export default App;
