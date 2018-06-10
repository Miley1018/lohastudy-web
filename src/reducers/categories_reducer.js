import {FETCH_CATEGORIES} from "../actions/types";
import _ from '../utils/common'

let initState = {
  categories: {}
}
export default function (state = initState, action) {
  switch (action.type) {
    case FETCH_CATEGORIES:
      state = initState
      return {
        ...state,
        categories: _.keyBy(action.payload.categories, 'id')
      }
    // case FETCH_COURSE_TAGS:
    //   let tags = {}
    //   action.payload.courseTags && action.payload.courseTags.forEach((tag) => {
    //     tags[tag.id] = tag
    //   })
    //   return {
    //     ...state,
    //     tags: tags
    //   }
    // case FETCH_COURSE:
    //   return {
    //     ...state,
    //     course: action.payload.course
    //   }
  }
  return state;
}
