import Action from "../Action";
import BaseGame from "../../domain/entity/BaseGame";

export default class LoadGames extends Action {
    constructor(games: BaseGame[]) {
        super({ games })
    }

    get games(): BaseGame[] {
        return this._payload.games
    }

    static deserialize(raw) {
        return new LoadGames(raw.payload.games)
    }
}