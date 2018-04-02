import Action from "../Action";
import GameRoundScore from "../../domain/entity/GameRoundScore";

export default class LoadScore extends Action {
    constructor(score: GameRoundScore[]|null) {
        super({ score })
    }

    get score(): GameRoundScore[] {
        return this._payload.score
    }

    static deserialize(raw) {
        return new LoadScore(raw.payload.score)
    }
}