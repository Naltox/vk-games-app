import {BaseSurvivalGameRepository} from "../../domain/repository/BaseSurvivalGameRepository";
import SurvivalGameNode from "../../domain/entity/SurvivalGameNode";
import {join} from "path";
import * as Nedb from "nedb";
import {getUserDataPath} from "../../utils/Electron";
import {find, insert, remove, update} from "../NeDBUtils";

export default class LocalSurvivalGameRepository extends BaseSurvivalGameRepository {
    private db: Nedb

    constructor() {
        super()

        this.db = new Nedb({
            filename: join(getUserDataPath(), 'survival_game.db'),
            autoload: true
        })
    }

    public async getData(gameId: string): Promise<SurvivalGameNode[]> {
        let data = await find(this.db, { gameId }) as any

        return data.map(SurvivalGameNode.deserialize)
    }

    public async addStage(gameId: string, data: SurvivalGameNode[]): Promise<void> {
        await insert(
            this.db,
            data.map(s => s.serialize())
        )
    }

    public async setGameScore(
        gameId: string,
        stage: number,
        gameIndex: number,
        firstPlayerScore: number,
        secondPlayerScore: number
    ): Promise<void> {
        await update(
            this.db,
            { gameId, index: gameIndex, stageNumber: stage },
            { $set: { firstPlayerScore, secondPlayerScore } }
        )
    }

    public async deleteData(gameId: string): Promise<void> {
        await remove(this.db, { gameId })
    }
}