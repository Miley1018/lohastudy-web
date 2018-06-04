import {FETCH_COURSES, FETCH_COURSE_TAGS} from '../actions/types';
import _ from 'lodash'

let initState = {
  courses: {},
  tags: {}
}
export default function (state = initState, action) {
  switch (action.type) {
    case FETCH_COURSES:
      return {
        ...state,
        courses: {
          ...state.courses,
          ..._.keyBy(action.payload.courses, 'id')
        }
      }
    case FETCH_COURSE_TAGS:
      let tags = {}
      action.payload.courseTags && action.payload.courseTags.forEach((tag) => {
        tags[tag.id] = tag
      })
      return {
        ...state,
        tags: tags
      }
  }
  return state;
}
