import {BaseGamesRepository} from "../../domain/repository/BaseGamesRepository";
import BaseGame from "../../domain/entity/BaseGame";
import * as Nedb from "nedb";
import {join} from "path";
import {getUserDataPath} from "../../utils/Electron";
import GameForPoints from "../../domain/entity/GameForPoints";
import {find, insert, remove} from "../NeDBUtils";
import SurvivalGame from "../../domain/entity/SurvivalGame";

export default class LocalGamesRepository extends BaseGamesRepository {
    private db: Nedb

    constructor() {
        super()

        this.db = new Nedb({
            filename: join(getUserDataPath(), 'games.db'),
            autoload: true
        })
    }

    public async addGame(game: BaseGame): Promise<string> {
        let savedGame = await insert(
            this.db,
            {
                type: game.getTypeString(),
                game: game.serialize()
            }
        ) as any

        return savedGame._id
    }

    public async deleteGame(id: string): Promise<void> {
        await remove(this.db, { _id: id })
    }

    public async getGames(): Promise<BaseGame[]> {
        let data = await find(this.db, {}) as any

        let games: BaseGame[] = []

        for (let gameData of data) {
            gameData.game.id = gameData._id

            if (gameData.type === 'for_points')
                games.push(GameForPoints.deserialize(gameData.game))

            if (gameData.type === 'survival')
                games.push(SurvivalGame.deserialize(gameData.game))
        }

        return games
    }

    public async getGame(gameId: string): Promise<BaseGame|null> {
        let game = (await find(this.db, { _id: gameId }) as any)[0]

        if (!game)
            return null

        game.game.id = game._id

        if (game.type === 'for_points')
            return GameForPoints.deserialize(game.game)

        if (game.type === 'survival')
            return SurvivalGame.deserialize(game.game)

        return null
    }
}