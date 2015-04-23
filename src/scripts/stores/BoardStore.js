import _                from 'underscore';
import assign           from 'object-assign';
import { EventEmitter } from 'events';

import AppDispatcher  from '../dispatcher/AppDispatcher';
import CellStore      from '../stores/CellStore';
import GridConstants  from '../constants/GridConstants';
import BoardConstants from '../constants/BoardConstants';

const CHANGE_EVENT = 'change';

//let _cells = [
//  {status: false, x: 0, y: 0}, {status: true, x: 1, y: 0}, {status: false, x: 2, y: 0},
//  {status: true , x: 0, y: 1}, {status: true, x: 1, y: 1}, {status: true, x: 2, y: 1},
//  {status: false, x: 0, y: 2}, {status: true, x: 1, y: 2}, {status: false, x: 2, y: 2}];
let _cells = [];

let interval;

function aliveNeighbours (x, y) {
  var count, i, cell;
  for (count = 0, i = 0; i < _cells.length; i++) {
    cell = _cells[i];
    if (cell.status && (
      (cell.x === x && cell.y === y - 1 )     || //N
      (cell.x === x + 1 && cell.y === y - 1 ) || //NE
      (cell.x === x + 1 && cell.y === y   )   || //E
      (cell.x === x + 1 && cell.y === y + 1 ) || //SE
      (cell.x === x && cell.y === y + 1 )     || //S
      (cell.x === x - 1 && cell.y === y + 1 ) || //SW
      (cell.x === x - 1 && cell.y === y   )   || //W
      (cell.x === x - 1 && cell.y === y - 1 ))   //NW
    ) {
      count++;
    }
  }
  return count;
}

const BoardStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  onChange (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  off (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getAll () {
    return _cells;
  },

  seed () {
    _cells = [];
    for (var i = 0; i < GridConstants.ROWS; i++) {
      for (var j = 0; j < GridConstants.COLUMNS; j++) {
        _cells.push(CellStore.create(Math.random() < 0.1, i, j));
      }
    }
    this.emitChange();
  },

  tick () {
    _cells = _cells.map(cell => {
      return CellStore.evolve(cell, aliveNeighbours(cell.x, cell.y));
    });
    this.emitChange();
  },

  play () {
    interval = setInterval(this.tick.bind(this), 250);
  },

  pause () {
    clearInterval(interval);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

});

BoardStore.dispatchToken = AppDispatcher.register(function(action) {

  switch(action.id) {

    case BoardConstants.PLAY:
      BoardStore.play();
      break;

    case BoardConstants.PAUSE:
      BoardStore.pause();
      break;

    case BoardConstants.SEED:
      BoardStore.seed();
      break;

    default:
      // do nothing
  }

});

BoardStore.seed();

export default BoardStore;
