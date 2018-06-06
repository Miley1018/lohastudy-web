import {FETCH_ORDERS} from '../actions/types';
import _ from 'lodash'

let initState = {
  orders: {}
}
export default function (state = initState, action) {
  switch (action.type) {
    case FETCH_ORDERS:
      state = initState
      return {
        ...state,
        orders: _.keyBy(action.payload.orders, 'id')
      }
  }
  return state;
}
