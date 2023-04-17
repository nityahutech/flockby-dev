import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage'
import { auth, post, loggedInState } from 'fby-common';
import authReducer from './authReducer';
import spaceReducer from './spaceReducer';
import tagsReducer from './tagsReducer';
import pageReducer from './pageReducer';
import postReducer from './postReducer';
import uploadReducer from './uploadReducer';
import newsReducer from './newsReducer';

const appReducer = combineReducers({
  // add the list of reducers here
  auth,
  post,
  authReducer,
  spaceReducer,
  tagsReducer,
  pageReducer,
  postReducer,
  uploadReducer,
  newsReducer,
  loggedInState
})

const rootReducer = (state, action) => {
  if (action.type === "SIGNOUT_REQUEST") {
    // for all keys defined in your persistConfig(s)
    storage.removeItem('persist:root')
    // storage.removeItem('persist:otherKey')

    state = undefined;
  }
  return appReducer(state, action);
}

export default rootReducer;

