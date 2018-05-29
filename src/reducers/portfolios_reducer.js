import Immutable from 'immutable';
import {FETCH_PORTFOLIOS} from '../actions/types';

export default function (state = Immutable.OrderedMap(), action) {
    switch (action.type) {
        case FETCH_PORTFOLIOS:
            state = Immutable.OrderedMap()
            action.payload.map(portfolio => {
                state = state.set(portfolio.portfolioProjectId, Immutable.OrderedMap({...portfolio}));
            });
            return state;
    }
    return state;
}
