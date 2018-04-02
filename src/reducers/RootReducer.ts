import {reduce, Reducer} from "./Reducer";
import LoadGames from "../actions/gamesList/LoadGames";
import OpenScreenAction from "../actions/routing/OpenScreenAction";
import OpenPointsGameDashboard from "../actions/routing/OpenPointsGameDashboard";
import OpenSurvivalGameDashboard from "../actions/routing/OpenSurvivalGameDashboard";

class RootReducer extends Reducer {
    @reduce(OpenScreenAction, {})
    handleOpenScreen(state, action) {
        return { ...state, currentScreen: action.screenId }
    }


    @reduce(LoadGames, {})
    handleLoadGames(state, action) {
        return { ...state, games: action.games }
    }

    @reduce(OpenPointsGameDashboard, {})
    handleOpenPointsGameDashboard(state, action) {
        return {
            ...state,
            currentScreen: 'pointsGameDashboard',
            dashboardGameId: action.gameId
        }
    }

    @reduce(OpenSurvivalGameDashboard, {})
    handleOpenSurvivalGameDashboard(state, action) {
        return {
            ...state,
            currentScreen: 'survivalGameDashboard',
            dashboardGameId: action.gameId
        }
    }
}

export default new RootReducer()