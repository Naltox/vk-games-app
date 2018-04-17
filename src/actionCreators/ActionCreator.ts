export function creator(target, key, descriptor) {
    const constructor = target.constructor

    if (constructor.spawnersList)
        constructor.spawnersList.push(key)
    else
        constructor.spawnersList = [key]

    return descriptor
}

export class ActionCreator {
    constructor(

    ) {

    }

    getCreators() {
        let creators = {}
        let constructor: any = this.constructor

        if (!constructor.spawnersList)
            return []

        constructor.spawnersList.forEach(i => {
            creators[i] = (...args) => {
                let resp = this[i](...args)

                if (resp instanceof Promise) {
                    return dispatch => {
                        resp
                            .then(action => {
                                if (action && Array.isArray(action) === true) {
                                    for (let act of action) {
                                        dispatch(act)
                                    }
                                }
                                else if (action)
                                    dispatch(action)
                            })
                            .catch(e => {
                                // resending error to global handler
                                setTimeout(() => {
                                    throw e
                                }, 0)
                            })
                    }
                }
                else if (typeof resp === 'function') {
                    return (dispatch, getState) => {
                        resp(action => {
                            dispatch(action)
                        }, getState)
                    }
                }
                else if (resp) {
                    return resp
                }
            }
        })

        return creators
    }
}