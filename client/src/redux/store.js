import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const middleware = [thunk];

if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);
  middleware.push(logger);
}

// const store = createStore(rootReducer, applyMiddleware(...middleware));
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
window.store = store;
export default store;
