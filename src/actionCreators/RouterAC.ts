import {ActionCreator, creator} from "./ActionCreator";
import OpenScreenAction from "../actions/routing/OpenScreenAction";
import OpenPointsGameDashboard from "../actions/routing/OpenPointsGameDashboard";
import OpenSurvivalGameDashboard from "../actions/routing/OpenSurvivalGameDashboard";

export default class RouterAC extends ActionCreator {
    @creator
    openGamesScreen() {
        return new OpenScreenAction('gamesList')
    }

    @creator
    openPointsGameDashboard(gameId: string) {
        return new OpenPointsGameDashboard(gameId)
    }

    @creator
    opeSurvivalGameDashboard(gameId: string) {
        return new OpenSurvivalGameDashboard(gameId)
    }
}