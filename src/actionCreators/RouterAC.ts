import {ActionCreator, creator} from "./ActionCreator";
import {
    OpenPointsGameDashboardAct, OpenScreenAct,
    OpenSurvivalGameDashboardAct
} from "../actions/RoutingActions";

export default class RouterAC extends ActionCreator {
    @creator
    openGamesScreen() {
        //return new OpenScreenAction('gamesList')
        return OpenScreenAct('gamesList')
    }

    @creator
    openPointsGameDashboard(gameId: string) {
        return OpenPointsGameDashboardAct(gameId)
       // return new OpenPointsGameDashboard(gameId)
    }

    @creator
    opeSurvivalGameDashboard(gameId: string) {
        return OpenSurvivalGameDashboardAct(gameId)
        //return new OpenSurvivalGameDashboard(gameId)
    }
}