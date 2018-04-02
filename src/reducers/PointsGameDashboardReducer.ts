import {reduce, Reducer} from "./Reducer";
import LoadGame from "../actions/gamesList/LoadGame";
import LoadPlayers from "../actions/game/LoadPlayers";
import LoadScore from "../actions/pointsGame/LoadScore";
import LoadTableData from "../actions/pointsGame/LoadTableData";

class PointsGameDashboardReducer extends Reducer {
    @reduce(LoadGame, {})
    handleLoadGame(state, action) {
        return { ...state, game: action.game }
    }


    @reduce(LoadPlayers, {})
    handleLoadPLayers(state, action) {
        return { ...state, players: action.players }
    }

    @reduce(LoadScore, {})
    handleLoadScore(state, action) {
        return { ...state, score: action.score }
    }

    @reduce(LoadTableData, {})
    handleLoadTableData(state, action) {
        return { ...state, tableData: action.data }
    }
}

export default new PointsGameDashboardReducer()