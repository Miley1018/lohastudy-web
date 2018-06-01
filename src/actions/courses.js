import {FETCH_COURSES, POST_COURSE} from './types';
import {request} from "./request.js";

export function fetchCourses() {
  return (dispatch) => {
    return request('/courses', {"limit":"10"}, 'GET')
      .then((response) => {
        dispatch({
          type: FETCH_COURSES,
          payload: response.data
        })
      })
  }
}

export function createCourse(content) {
  return (dispatch) => {
    return request('/courses', content, 'POST')
      .then((response) => {
        console.log(response)
        // dispatch({
        //   type: POST_COURSE,
        //   payload: response.data
        // })
      })
  }
}
