import _                from 'underscore';
import AppDispatcher    from '../dispatcher/AppDispatcher';
import assign           from 'object-assign';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';
const ALIVE        = true;
const DEAD         = false;

const CellStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  onChange (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  off (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  create (status,x,y) {
    return { status: status, x:x, y:y };
  },

  evolve (cell, neighbours) {
    //console.log('neighbours',neighbours);
    if (cell.status === ALIVE) {
      return {status: neighbours === 2 || neighbours === 3, x: cell.x, y:cell.y}
    } else {
      return {status: neighbours === 3, x: cell.x, y:cell.y }
    }
    //return { status: cell.status, cell.x, cell.y};
  },


});

CellStore.dispatchToken = AppDispatcher.register(function(action) {

  switch(action.id) {

    default:
      // do nothing
  }

});

export default CellStore;
