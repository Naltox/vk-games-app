export function reduce(action, defaultState) {
    return function (target, key, descriptor) {
        const constructor = target.constructor

        if (constructor.reducers)
            constructor.reducers[action] = key
        else {
            constructor.reducers = { }
            constructor.reducers[action] = key
        }

        if (defaultState) {
            if (constructor.defaultState)
                constructor.defaultState[action] = defaultState
            else {
                constructor.defaultState = { }
                constructor.defaultState[action] = defaultState
            }
        }

        return descriptor
    }
}

export class Reducer {
    handle(state, action) {
        let constructor: any = this.constructor

        if (constructor.reducers && constructor.reducers[action.type]) {
            return this[constructor.reducers[action.type]](state, action)
        }
        else {
            return state
        }
    }

    getReducer() {
        return (state, action) => {
            let constructor: any = this.constructor

            state = state || this.defaultState || constructor.defaultState[action.type]

            return this.handle(state, action)
        }
    }

    get defaultState() {
        return {}
    }
}