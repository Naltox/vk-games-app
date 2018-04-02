import Action from '../Action'

export default class OpenSurvivalGameDashboard extends Action {
    constructor(gameId: string) {
        super({ gameId })
    }

    get gameId() {
        return this._payload.gameId
    }

    static deserialize(raw) {
        return new OpenSurvivalGameDashboard(raw.payload.gameId)
    }
}