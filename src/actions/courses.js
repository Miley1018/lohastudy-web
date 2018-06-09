import {FETCH_COURSES, FETCH_COURSE_TAGS,FETCH_COURSE} from './types';
import {request,requestWithToken} from "./request.js";

export function fetchCourses() {
  return (dispatch) => {
    return request('/courses', 'GET',  {"limit":"10000"})
      .then((response) => {
        dispatch({
          type: FETCH_COURSES,
          payload: response.data
        })
      })
  }
}

export function fetchCourseTags() {
  return (dispatch) => {
    return request('/course_tags', 'GET')
      .then((response) => {
        dispatch({
          type: FETCH_COURSE_TAGS,
          payload: response.data
        })
      })
  }
}

export function addCourse(course) {
  return (dispatch) => {
    return requestWithToken('/courses', 'POST', {course})
  }
}

export function editCourse(course, id) {
  return (dispatch) => {
    return requestWithToken('/courses/' + id, 'PUT', {course})
  }
}

export function deleteCourse(courseId) {
  return (dispatch) => {
    return requestWithToken('/courses/' + courseId, 'DELETE')
  }
}

export function fetchCourse(courseId) {
  return (dispatch) => {
    return request('/courses/' + courseId, 'GET')
      .then((response) => {
        dispatch({
          type: FETCH_COURSE,
          payload: response.data
        })
      })
  }
}
