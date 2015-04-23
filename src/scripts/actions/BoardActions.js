import AppDispatcher  from'../dispatcher/AppDispatcher';
import BoardConstants from'../constants/BoardConstants';

export default {

  play () {
    AppDispatcher.dispatch({
       id:BoardConstants.PLAY
    });
  },

  pause () {
    AppDispatcher.dispatch({
      id:BoardConstants.PAUSE
    });
  },

  seed () {
    AppDispatcher.dispatch({
      id:BoardConstants.SEED
    });
  }

}
