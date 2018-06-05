import {FETCH_COURSES, FETCH_COURSE_TAGS, FETCH_COURSE} from '../actions/types';
import _ from 'lodash'

let initState = {
  courses: {},
  tags: {}
}
export default function (state = initState, action) {
  switch (action.type) {
    case FETCH_COURSES:
      state = initState
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
    case FETCH_COURSE:
      return {
        ...state,
        course: action.payload.course
      }
  }
  return state;
}
