import {FETCH_TAGS} from "../actions/types";

let initState = {
  tags: {}
}
export default function (state = initState, action) {
  switch (action.type) {
    case FETCH_TAGS:
      state = initState
      return {
        ...state,
        tags: _.keyBy(action.payload.courseTags, 'id')
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
