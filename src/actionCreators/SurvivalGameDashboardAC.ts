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
import {BaseSurvivalGameRepository} from "../domain/repository/BaseSurvivalGameRepository";
import LoadSurvivalData from "../actions/survivalGame/LoadSurvivalData";
import SurvivalGameNode from "../domain/entity/SurvivalGameNode";

export default class SurvivalGameDashboardAC extends ActionCreator {
    constructor(
        private gamesRepository: BaseGamesRepository,
        private survivalRepository: BaseSurvivalGameRepository
    ) {
        super()
    }

    @creator
    async resetDashboard() {
        return [
            new LoadGame(null),
            new LoadSurvivalData(null)
        ]
    }

    @creator
    async loadGame(gameId: string) {
        let game = await this.gamesRepository.getGame(gameId)

        return new LoadGame(game!)
    }

    @creator
    async loadData(gameId: string) {
        let data = await this.survivalRepository.getData(gameId)

        return new LoadSurvivalData(data)
    }

    @creator
    async addStage(gameId: string, stageData: SurvivalGameNode[]) {
        await this.survivalRepository.addStage(gameId, stageData)

        return this.loadData(gameId)
    }

    @creator
    async setScore(
        gameId: string,
        stage: number,
        gameIndex: number,
        firstPlayerScore: number,
        secondPlayerScore: number
    ) {
        await this.survivalRepository.setGameScore(
            gameId,
            stage,
            gameIndex,
            firstPlayerScore,
            secondPlayerScore
        )

        return this.loadData(gameId)
    }
}