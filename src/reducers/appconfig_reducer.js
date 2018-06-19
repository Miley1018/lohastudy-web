import {FETCH_APPCONFIGS_DEFAULT} from '../actions/types'

const initState = {
  default: {}
}

export default function(state = initState, action) {
  switch (action.type) {
    case FETCH_APPCONFIGS_DEFAULT:
      return {
        ...state,
        default: action.payload.appConfig,
      }
  }
  return state
}
