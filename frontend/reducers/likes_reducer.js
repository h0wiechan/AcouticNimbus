import { RECEIVE_EXTRA_LIKES, RECEIVE_LESS_LIKES } from "../actions/like_actions";
import { merge } from "lodash";

// const defaultState = {
//   id: null,
//   likeableType: null,
//   likeableId: null,
//   likerId: null,
// };
const likesReducer = (state = null, action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case RECEIVE_EXTRA_LIKES:
      newState = merge({}, action.likes);
      return merge({}, state, newState);
    case RECEIVE_LESS_LIKES:
      newState = merge({}, action.likes);
      return merge({}, newState);
    default:
      return state;
  }
};

export default likesReducer;
