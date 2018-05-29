import Immutable from 'immutable';
import {FETCH_MESSAGES, POST_TRANSLATED_MESSAGE} from '../actions/types';

export default function (state = Immutable.OrderedMap(), action) {
    switch (action.type) {
        case FETCH_MESSAGES:
            action.payload.forEach(message => {
                state = state.set(message.id, Immutable.Map({...message}));
            });
            return state;
        case POST_TRANSLATED_MESSAGE:
            return state.update(action.id, message => {
                return message.set('id', action.id)
                    .set('translatedMessage', action.translatedMessage)
                    .set('translateTime', action.translateTime);
            });
    }
    return state;
}
