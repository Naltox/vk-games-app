import Action from "../Action";
import BaseGame from "../../domain/entity/BaseGame";

export default class LoadGame extends Action {
    constructor(game: BaseGame|null) {
        super({ game })
    }

    get game(): BaseGame[] {
        return this._payload.game
    }

    static deserialize(raw) {
        return new LoadGame(raw.payload.game)
    }
}