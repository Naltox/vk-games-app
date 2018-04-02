import {ActionCreator, creator} from "./ActionCreator";
import {BasePlayersRepository} from "../domain/repository/BasePlayersRepository";
import {BaseGamesRepository} from "../domain/repository/BaseGamesRepository";
import LoadGame from "../actions/gamesList/LoadGame";
import LoadPlayers from "../actions/game/LoadPlayers";
import {BaseRoundsRepository} from "../domain/repository/BaseRoundsRepository";
import LoadScore from "../actions/pointsGame/LoadScore";
import GameRoundScore from "../domain/entity/GameRoundScore";
import GamePlayer from "../domain/entity/GamePlayer";
import LoadTableData from "../actions/pointsGame/LoadTableData";

export type PointsGameTableItem = { player: GamePlayer, score: GameRoundScore[] }

export default class PointsGameDashboardAC extends ActionCreator {
    constructor(
        private gamesRepository: BaseGamesRepository,
        private playersRepository: BasePlayersRepository,
        private roundsRepository: BaseRoundsRepository
    ) {
        super()
    }

    @creator
    async loadGame(gameId: string) {
        let game = await this.gamesRepository.getGame(gameId)

        return new LoadGame(game!)
    }

    @creator
    async loadPlayers(gameId: string) {
        let players = await this.playersRepository.getPlayers(gameId)

        return new LoadPlayers(players)
    }

    @creator
    async loadScore(gameId: string) {
        let score = await this.roundsRepository.getScore(gameId)

        return new LoadScore(score)
    }

    @creator
    async addScore(gameId: string, score: GameRoundScore[]) {
        await this.roundsRepository.addScore(score)

        return this.loadScore(gameId)
    }

    @creator
    async resetDashboard() {
        return [
            new LoadScore(null),
            new LoadGame(null),
            new LoadPlayers(null),
            new LoadTableData(null)
        ]
    }

    @creator
    async loadTableData(gameId: string) {
        let data: PointsGameTableItem[] = []

        let players = await this.playersRepository.getPlayers(gameId)

        for (let player of players) {
            let score = await this.roundsRepository.getPlayerScore(gameId, player.id)

            data.push({
                player,
                score
            })
        }

        return new LoadTableData(data)
    }
}