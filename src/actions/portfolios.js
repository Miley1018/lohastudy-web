import {FETCH_PORTFOLIOS} from './types';
import {request_noGraphql} from "./request.js";

export function fetchPortfolios() {
    return (dispatch) => {
        return request_noGraphql('/internal_postDesignerPortfolio', {"action":"GET"})
            .then((response) => {
                dispatch({
                    type: FETCH_PORTFOLIOS,
                    payload: response.data
                })
            })
    }
}

export function postTranslatePortfolio(type, id, projectTitle_cn, projectTitle_en, description_cn, description_en,
    relatedSkills_cn, relatedSkills_en)  {
    return (dispatch) => {
        return request_noGraphql('/internal_postDesignerPortfolio', {"action": type, "portfolioProjectId": id,
        "projectTitle_en": projectTitle_en,
            "projectTitle_cn": projectTitle_cn,
            "description_en": description_en,
            "description_cn": description_cn,
            "relatedSkills_en": relatedSkills_en,
            "relatedSkills_cn":relatedSkills_cn
        })
            .then((response) => {
               //console.log(response)
                // dispatch({
                //     type: FETCH_PORTFOLIOS,
                //     payload: response.data
                // })
            })
    }
}

