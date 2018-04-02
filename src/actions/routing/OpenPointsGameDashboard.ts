import Action from '../Action'

export default class OpenPointsGameDashboard extends Action {
    constructor(gameId: string) {
        super({ gameId })
    }

    get gameId() {
        return this._payload.gameId
    }

    static deserialize(raw) {
        return new OpenPointsGameDashboard(raw.payload.gameId)
    }
}