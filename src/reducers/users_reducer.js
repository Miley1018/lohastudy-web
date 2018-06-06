import {FETCH_USERS} from '../actions/types';
import _ from 'lodash'

let initState = {
  users: {}
}
export default function (state = initState, action) {
  switch (action.type) {
    case FETCH_USERS:
      state = initState
      return {
        ...state,
        users: _.keyBy(action.payload.users, 'id')
      }
  }
  return state;
}
