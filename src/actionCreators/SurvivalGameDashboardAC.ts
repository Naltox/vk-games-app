import {ActionCreator, creator} from "./ActionCreator";
import {BaseGamesRepository} from "../domain/repository/BaseGamesRepository";
import {BaseSurvivalGameRepository} from "../domain/repository/BaseSurvivalGameRepository";
import SurvivalGameNode from "../domain/entity/SurvivalGameNode";
import {LoadGameAct} from "../actions/GamesListActions";
import {LoadSurvivalDataAct} from "../actions/SurvivalGameActions";

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
            LoadGameAct(null),
            LoadSurvivalDataAct(null)
        ]
    }

    @creator
    async loadGame(gameId: string) {
        let game = await this.gamesRepository.getGame(gameId)

        return LoadGameAct(game!)
    }

    @creator
    async loadData(gameId: string) {
        let data = await this.survivalRepository.getData(gameId)

        return LoadSurvivalDataAct(data)
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