import Action from "../Action";
import GamePlayer from "../../domain/entity/GamePlayer";

export default class LoadPlayers extends Action {
    constructor(players: GamePlayer[]|null) {
        super({ players })
    }

    get players(): GamePlayer[] {
        return this._payload.players
    }

    static deserialize(raw) {
        return new LoadPlayers(raw.payload.players)
    }
}