import {FETCH_COURSES, POST_COURSE, FETCH_COURSE_TAGS} from './types';
import {request,requestWithToken} from "./request.js";

export function fetchCourses() {
  return (dispatch) => {
    return request('/courses', 'GET',  {"limit":"10"})
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
    return request('/courses', 'POST' , content)
      .then((response) => {
        console.log(1,response)
        // dispatch({
        //   type: POST_COURSE,
        //   payload: response.data
        // })
      })
  }
}

export function fetchCourseTags() {
  return (dispatch) => {
    return request('/course_tags', 'GET')
      .then((response) => {
        console.log(2,response)
        dispatch({
          type: FETCH_COURSE_TAGS,
          payload: response.data
        })
      })
  }
}

export function addCourse(images,title, categories,tags,place,duration,
  content,items,address, lng, lat,
  note,price) {
  return (dispatch) => {
    console.log('lng',lng,lat)
    return requestWithToken('/courses', 'POST', {course: {
      images,title, categories,tags,place,duration,
      content,items,address, location:{type:'Point',coordinates:[lng, lat]},
      note,price}
    })
      .then((response) => {
        console.log(2,response)
        // dispatch({
        //   type: FETCH_COURSE_TAGS,
        //   payload: response.data
        // })
      })
  }
}
