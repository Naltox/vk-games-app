import {reduce, Reducer} from "./Reducer";
import {LoadSurvivalDataActID} from "../actions/SurvivalGameActions";
import {LoadGameActID} from "../actions/GamesListActions";

class SurvivalGameDashboardReducer extends Reducer {
    @reduce(LoadGameActID, {})
    handleLoadGame(state, action) {
        return { ...state, game: action.game }
    }

    @reduce(LoadSurvivalDataActID, {})
    handleLoadSurvivalData(state, action) {
        return { ...state, data: action.data }
    }
}

export default new SurvivalGameDashboardReducer()