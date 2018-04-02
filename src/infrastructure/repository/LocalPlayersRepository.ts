import * as Nedb from "nedb";
import {join} from "path";
import {getUserDataPath} from "../../utils/Electron";
import {BasePlayersRepository} from "../../domain/repository/BasePlayersRepository";
import {find, insert, remove} from "../NeDBUtils";
import GamePlayer from "../../domain/entity/GamePlayer";

export default class LocalPlayersRepository extends BasePlayersRepository {
    private db: Nedb

    constructor() {
        super()

        this.db = new Nedb({
            filename: join(getUserDataPath(), 'players.db'),
            autoload: true
        })
    }

    public async addGamePlayers(gameId: string, players: string[]): Promise<void> {
        await insert(
            this.db,
            players.map(name => {
                return {
                    gameId,
                    name
                }
            })
        )
    }

    public async deletePlayers(gameId: string): Promise<void> {
        await remove(this.db, { gameId })
    }

    public async getPlayers(gameId: string): Promise<GamePlayer[]> {
        let data = await find(this.db, { gameId }) as any

        return data.map(GamePlayer.deserialize)
    }
}