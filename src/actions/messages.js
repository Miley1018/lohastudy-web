import axios from 'axios'
import {FETCH_MESSAGES, POST_TRANSLATED_MESSAGE} from './types';

import request from "./request.js";

export function fetchMessages(ids) {
    return function(dispatch) {
        return axios({
            url: 'http://api.v0.logiwork.com:8001/graphql',
            method: 'post',
            headers: {
                Authorization: 'Bearer '+localStorage.getItem('token')
            },
            data: {
                query: `
                    query Messages($ids: [ID]) {
                    messages(ids: $ids) {
                    id
                    message
                    translatedMessage
                    translateTime
                    sendTime
                    projectId
                    }} `,
                variables: {ids}
            }
        }).then(response => {
            dispatch({
                type: FETCH_MESSAGES,
                payload: response.data.data.messages
            })
        }).catch((error) => {
            if (error.response.status === 401) {
                location.href = '/signin'
            }
            console.log(error)
        })
    }
}

export function postTranslateMessage(id, translatedMessage) {
    return (dispatch) => {
       return request({
           query:`
           mutation TranslateMessage($id: ID, $translatedMessage: String){
           translateMessage(id: $id,translatedMessage: $translatedMessage){
            id
            translatedMessage
            translateTime
            }} `,
           variables: {id, translatedMessage}
       }).then(response => {
            dispatch({
                type: POST_TRANSLATED_MESSAGE,
                ...response.data.translateMessage,
            })
        })
    }
}




