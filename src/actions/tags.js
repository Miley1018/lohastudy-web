import {FETCH_TAGS, FETCH_COURSE_TAGS,FETCH_COURSE} from './types';
import {request,requestWithToken} from "./request.js";

export function fetchTags() {
  return (dispatch) => {
    return request('/course_tags', 'GET')
      .then((response) => {
        console.log(response)
        dispatch({
          type: FETCH_TAGS,
          payload: response.data
        })
      })
  }
}

export function addTag(name, category) {
  return (dispatch) => {
    return requestWithToken('/course_tags', 'POST', {courseTag: {
        name, category}
    })
  }
}

export function deleteTag(tagId) {
  return (dispatch) => {
    return requestWithToken('/course_tags/' + tagId, 'DELETE'
    ).catch(error => {
      console.log('err',error.response)
    })
  }
}

export function editTag(name, category, id) {
  return (dispatch) => {
    return requestWithToken('/course_tags/' + id, 'PUT', {courseTag: {name, category}
    })
  }
}




