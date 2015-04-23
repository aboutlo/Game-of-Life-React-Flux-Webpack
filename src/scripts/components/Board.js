require('../../assets/stylesheets/board.scss');
import React from 'react';
import _     from 'underscore';

import BoardStore from '../stores/BoardStore';
import Cell       from './Cell';
import Grid       from '../constants/GridConstants';

const Board = React.createClass({

  getDefaultProps (){
    return {
      rows: Grid.ROWS,
      columns: Grid.COLUMNS
    }
  },

  getInitialState () {
    return {
      cells: BoardStore.getAll()
    }
  },

  componentDidMount: function() {
    BoardStore.addChangeListener(this.onChange);
  },

  componentWillUnmount: function() {
    BoardStore.removeChangeListener(this.onChange);
  },

  onChange: function() {
    this.setState({cells:BoardStore.getAll()});
  },

  render () {
      //FIXME ugly change board rendering (key generation and create row component)
      var cells = _.clone(this.state.cells);
      var rows = [];
      var key = 0;
      while( cells.length > 0 ){
        var columns = cells.splice(0,this.props.rows);
        columns = columns.map(cell => {
          return <Cell key={key++} cell={cell}/>
        } );
        rows.push(<tr key={key++}>{columns}</tr>)
      }

      return (<table className="board">{rows}</table>);
    }

});

export default Board;
