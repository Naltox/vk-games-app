import {reduce, Reducer} from "./Reducer";
import {LoadGameActID} from "../actions/GamesListActions";
import {LoadScoreActID, LoadTableDataActID} from "../actions/PointsGameActions";
import {LoadPlayersActID} from "../actions/GameActions";

class PointsGameDashboardReducer extends Reducer {
    @reduce(LoadGameActID, {})
    handleLoadGame(state, action) {
        return { ...state, game: action.game }
    }


    @reduce(LoadPlayersActID, {})
    handleLoadPLayers(state, action) {
        return { ...state, players: action.players }
    }

    @reduce(LoadScoreActID, {})
    handleLoadScore(state, action) {
        return { ...state, score: action.score }
    }

    @reduce(LoadTableDataActID, {})
    handleLoadTableData(state, action) {
        return { ...state, tableData: action.data }
    }
}

export default new PointsGameDashboardReducer()