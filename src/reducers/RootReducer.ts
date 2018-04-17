import {reduce, Reducer} from "./Reducer";
import {
    OpenPointsGameDashboardActID, OpenScreenActID,
    OpenSurvivalGameDashboardActID
} from "../actions/RoutingActions";
import {LoadGamesActID} from "../actions/GamesListActions";

class RootReducer extends Reducer {
    @reduce(OpenScreenActID, {})
    handleOpenScreen(state, action) {
        return { ...state, currentScreen: action.screenId }
    }


    @reduce(LoadGamesActID, {})
    handleLoadGames(state, action) {
        return { ...state, games: action.games }
    }

    @reduce(OpenSurvivalGameDashboardActID, {})
    handleOpenSurvivalGameDashboard(state, action) {
        return {
            ...state,
            currentScreen: 'survivalGameDashboard',
            dashboardGameId: action.gameId
        }
    }

    @reduce(OpenPointsGameDashboardActID, {})
    handleOpenPointsGameDashboard(state, action) {
        return {
            ...state,
            currentScreen: 'pointsGameDashboard',
            dashboardGameId: action.gameId
        }
    }
}

export default new RootReducer()