import {ActionCreator, creator} from "./ActionCreator";
import {BasePlayersRepository} from "../domain/repository/BasePlayersRepository";
import {BaseGamesRepository} from "../domain/repository/BaseGamesRepository";
import {BaseRoundsRepository} from "../domain/repository/BaseRoundsRepository";
import GameRoundScore from "../domain/entity/GameRoundScore";
import GamePlayer from "../domain/entity/GamePlayer";
import {LoadGameAct} from "../actions/GamesListActions";
import {LoadScoreAct, LoadTableDataAct} from "../actions/PointsGameActions";
import {LoadPlayersAct} from "../actions/GameActions";

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

        return LoadGameAct(game)
    }

    @creator
    async loadPlayers(gameId: string) {
        let players = await this.playersRepository.getPlayers(gameId)

        return LoadPlayersAct(players)
    }

    @creator
    async loadScore(gameId: string) {
        let score = await this.roundsRepository.getScore(gameId)

        return LoadScoreAct(score)
    }

    @creator
    async addScore(gameId: string, score: GameRoundScore[]) {
        await this.roundsRepository.addScore(score)

        return this.loadScore(gameId)
    }

    @creator
    async resetDashboard() {
        return [
            LoadScoreAct(null),
            LoadGameAct(null),
            LoadPlayersAct(null),
            LoadTableDataAct(null)
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

        return LoadTableDataAct(data)
    }
}