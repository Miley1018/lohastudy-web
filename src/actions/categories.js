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

export function addCategory(name, order, image) {
  return (dispatch) => {
    return requestWithToken('/categories', 'POST', {category: {
        name, order, image}
    })
  }
}

export function editCategory(name, order, image, id) {
  return (dispatch) => {
    return requestWithToken('/categories/' + id, 'PUT', {category: {
        name, order, image}
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

//

export function deleteCategory(categoryId) {
  return (dispatch) => {
    return requestWithToken('/categories/' + categoryId, 'DELETE'
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
