import {FETCH_PROJECTS} from './types';
import {request_noGraphql} from "./request.js";

export function fetchProjects() {
    return (dispatch) => {
        return request_noGraphql('/internal_postCustomerProject', {"action":"GET_LIST"})
            .then((response) => {
                dispatch({
                    type: FETCH_PROJECTS,
                    payload: response.data
                })
            })
    }
}

export function postTranslateProject(type, id, projectName_cn, projectName_en, projectInformation_cn, projectInformation_en,
    otherDetail_cn, otherDetail_en)  {
    return (dispatch) => {
        return request_noGraphql('/internal_postCustomerProject', {"action": type, "projectId": id,
            "projectName_cn": projectName_cn,
            "projectName_en": projectName_en,
            "projectInformation_cn": projectInformation_cn,
            "projectInformation_en": projectInformation_en,
            "otherDetail_cn": otherDetail_cn,
            "otherDetail_en":otherDetail_en
        })
            .then((response) => {
               // console.log(response)
            })
    }
}

