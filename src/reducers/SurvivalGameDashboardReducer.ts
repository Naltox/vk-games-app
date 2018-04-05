import {reduce, Reducer} from "./Reducer";
import LoadGame from "../actions/gamesList/LoadGame";
import LoadSurvivalData from "../actions/survivalGame/LoadSurvivalData";

class SurvivalGameDashboardReducer extends Reducer {
    @reduce(LoadGame, {})
    handleLoadGame(state, action) {
        return { ...state, game: action.game }
    }


    @reduce(LoadSurvivalData, {})
    handleLoadSurvivalData(state, action) {
        return { ...state, data: action.data }
    }
}

export default new SurvivalGameDashboardReducer()