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
        let constructo: any = this.constructor

        if (!constructo.spawnersList)
            return []

        constructo.spawnersList.forEach(i => {
            creators[i] = (...args) => {
                let resp = this[i](...args)

                if (resp instanceof Promise) {
                    return dispatch => {
                        resp
                            .then(action => {
                                if (action && Array.isArray(action) === true) {
                                    for (let act of action) {
                                        dispatch(act.serialize())
                                    }
                                }
                                else if (action)
                                    dispatch(action.serialize())
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
                            dispatch(action.serialize())
                        }, getState)
                    }
                }
                else if (resp) {
                    return resp.serialize()
                }
            }
        })

        return creators
    }
}