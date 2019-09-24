import {
  EXAMPLE_ACTION,
  EXAMPLE_ACTION_ERROR,
  EXAMPLE_ACTION_PENDING,
  EXAMPLE_ACTION_FULFILLED,
} from './example';

const state = {
  init: false,
  error: null,
  pending: false,
  completed: false,
};

const exampleReducer = (state = [], action) => {
  switch (action.type) {
    case EXAMPLE_ACTION:
      state = {
        ...state,
        init: true,
      };
      return state;
    case EXAMPLE_ACTION_ERROR:
      state = {
        ...state,
        error: true,
      };
      return state;
    case EXAMPLE_ACTION_PENDING:
      state = {
        ...state,
        pending: true,
        completed: false,
      };
      return state;
    case EXAMPLE_ACTION_FULFILLED:
      state = {
        ...state,
        pending: false,
        completed: true,
      };
      return state;
    default:
      return state;
  }
};

export default exampleReducer;
