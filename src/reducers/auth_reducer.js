import {AUTH_USER,UNAUTH_USER,AUTH_SIGNINERROR} from '../actions/types';

export default function(state={},action){
    switch(action.type){
        case AUTH_USER:
            return{...state,authenticated:true, signinerror: ''};
        case UNAUTH_USER:
            return{...state,authenticated:false};
        case AUTH_SIGNINERROR:
            return{...state,signinerror:action.payload};
    }
    return state;
}
