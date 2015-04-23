require('../../assets/stylesheets/cell.scss');
import React from 'react'

const Cell = React.createClass({

  getInitialProps () {
    return {
      cell:{status:false}
    }
  },

  getInitialState () {
    return {
      alive:false
    }
  },

  render(){
    return <td className={this.props.cell.status ? 'cell--alive' : 'cell--dead' } />
  }

});

export default Cell;
