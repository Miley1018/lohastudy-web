import {FETCH_CATEGORIES, FETCH_COURSE_TAGS,FETCH_COURSE} from './types';
import {request,requestWithToken} from "./request.js";

export function fetchCategories() {
  return (dispatch) => {
    return request('/categories', 'GET')
      .then((response) => {
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

export function deleteCategory(categoryId) {
  return (dispatch) => {
    return requestWithToken('/categories/' + categoryId, 'DELETE'
    )
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
