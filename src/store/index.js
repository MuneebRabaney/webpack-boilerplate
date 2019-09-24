import { createStore, combineReducers } from 'redux';
import { exampleReducer } from './reducers';

const reducers = combineReducers({
  exampleReducer,
});

const store = createStore(reducers);

export default store;
