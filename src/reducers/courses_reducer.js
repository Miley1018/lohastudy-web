import {FETCH_COURSES} from '../actions/types';
import _ from 'lodash'

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_COURSES:
      return {
        ...state,
        courses: {
          ...state.courses,
          ..._.keyBy(action.payload.courses, 'id')
        }
      }
  }
  return state;
}
