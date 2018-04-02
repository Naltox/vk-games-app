import {ActionCreator, creator} from "./ActionCreator";
import {BaseGamesRepository} from "../domain/repository/BaseGamesRepository";
import LoadGames from "../actions/gamesList/LoadGames";
import {NewGameInfo} from "../components/gamesList/newGamePopup/NewGamePopup";
import GameForPoints from "../domain/entity/GameForPoints";
import {BasePlayersRepository} from "../domain/repository/BasePlayersRepository";
import SurvivalGame from "../domain/entity/SurvivalGame";

export default class RootAC extends ActionCreator {
    constructor(
        private gamesRepository: BaseGamesRepository,
        private playersRepository: BasePlayersRepository
    ) {
        super()
    }

    @creator
    async loadGames() {
        let games = await this.gamesRepository.getGames()

        return new LoadGames(games)
    }

    @creator
    async addGameForPoints(gameInfo: NewGameInfo, players: string[]) {
        let savedGameId = await this.gamesRepository.addGame(
            new GameForPoints(
                '',
                gameInfo.name,
                gameInfo.roundsNumber,
                gameInfo.winnersCount,
                gameInfo.maxPoints
            )
        )

        await this.playersRepository.addGamePlayers(
            savedGameId,
            players
        )

        return this.loadGames()
    }

    @creator
    async addSurvivalGame(gameInfo: NewGameInfo) {
        await this.gamesRepository.addGame(
            new SurvivalGame(
                '',
                gameInfo.name,
                gameInfo.playersCount,
                gameInfo.maxPoints
            )
        )

        return this.loadGames()
    }

    @creator
    async removeGame(gameId: string) {
        await this.gamesRepository.deleteGame(gameId)

        return this.loadGames()
    }
}