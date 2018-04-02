import {BaseRoundsRepository} from "../../domain/repository/BaseRoundsRepository";
import * as Nedb from "nedb";
import {join} from "path";
import {getUserDataPath} from "../../utils/Electron";
import GameRoundScore from "../../domain/entity/GameRoundScore";
import {find, insert, remove} from "../NeDBUtils";

export default class LocalRoundsRepository extends BaseRoundsRepository {
    private db: Nedb

    constructor() {
        super()

        this.db = new Nedb({
            filename: join(getUserDataPath(), 'rounds.db'),
            autoload: true
        })
    }

    public async addScore(score: GameRoundScore[]): Promise<void> {
        await insert(
            this.db,
            score.map(s => s.serialize())
        )
    }

    public async getScore(gameId: string): Promise<GameRoundScore[]> {
        let data = await find(this.db, { gameId }) as any

        return data
            .map(GameRoundScore.deserialize)
            .sort((a: GameRoundScore, b: GameRoundScore) => {
                return a.roundNumber - b.roundNumber
            })
    }

    public async deleteScore(gameId: string): Promise<void> {
        await remove(this.db, { gameId })
    }

    public async getPlayerScore(gameId: string, playerId: string): Promise<GameRoundScore[]> {
        return new Promise<GameRoundScore[]>((resolve ,reject) => {
            this.db.find({ gameId, playerId })
                .sort({ roundNumber: 1 })
                .exec((err, data) => {
                    if (err) {
                        reject(err)
                        return
                    }

                    resolve(data.map(GameRoundScore.deserialize))
                })
        })
    }
}