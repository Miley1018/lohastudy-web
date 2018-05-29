import Immutable from 'immutable';
import {FETCH_PROJECTS} from '../actions/types';

export default function (state = Immutable.OrderedMap(), action) {
    switch (action.type) {
        case FETCH_PROJECTS:
            console.log(action.payload)
            state = Immutable.OrderedMap()
            let projects = Immutable.OrderedMap()
            action.payload.projects.forEach(project => {
                console.log(project)
                projects.set(project.projectId, Immutable.OrderedMap({...project}))
                console.log(projects)
            });
            state = state.set('projects', projects);
            console.log(state)
            return state;
    }
    return state;
}
