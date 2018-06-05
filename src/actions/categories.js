import {FETCH_CATEGORIES, FETCH_COURSE_TAGS,FETCH_COURSE} from './types';
import {request,requestWithToken} from "./request.js";

export function fetchCategories() {
  return (dispatch) => {
    return request('/categories', 'GET')
      .then((response) => {
        console.log(response)
        dispatch({
          type: FETCH_CATEGORIES,
          payload: response.data
        })
      })
  }
}

// export function fetchCourseTags() {
//   return (dispatch) => {
//     return request('/course_tags', 'GET')
//       .then((response) => {
//         dispatch({
//           type: FETCH_COURSE_TAGS,
//           payload: response.data
//         })
//       })
//   }
// }
//
// export function addCourse(images,title, categories,tags,place,duration,
//                           content,items,city, lng, lat,
//                           note,price, afterCity) {
//   return (dispatch) => {
//     return requestWithToken('/courses', 'POST', {course: {
//         images,title, categories,tags,place,duration,
//         content,items,concreteAddress: {city,detail:afterCity}, location:{type:'Point',coordinates:[lng, lat]},
//         note,price}
//     })
//   }
// }
//
// export function editCourse(images,title, categories,tags,place,duration,
//                            content,items,city, lng, lat,
//                            note,price, afterCity, id) {
//   return (dispatch) => {
//     return requestWithToken('/courses/' + id, 'PUT', {course: {
//         images,title, categories,tags,place,duration,
//         content,items,concreteAddress: {city,detail:afterCity}, location:{type:'Point',coordinates:[lng, lat]},
//         note,price}
//     })
//   }
// }

export function deleteCourse(courseId) {
  return (dispatch) => {
    return requestWithToken('/courses/' + courseId, 'DELETE'
    )
    // .then((response) => {
    //   console.log(2,response)
    // })
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
