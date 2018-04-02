import Action from '../Action'

export default class OpenScreenAction extends Action {
    constructor(screenId) {
        super({ screenId })
    }

    get screenId() {
        return this._payload.screenId
    }

    static deserialize(raw) {
        return new OpenScreenAction(raw.payload.screenId)
    }
}