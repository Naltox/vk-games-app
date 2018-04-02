import {combineReducers} from "redux";
import RootReducer from "./RootReducer";
import PointsGameDashboardReducer from "./PointsGameDashboardReducer";
import SurvivalGameDashboardReducer from "./SurvivalGameDashboardReducer";

const rootReducer = combineReducers({
    root: RootReducer.getReducer(),
    pointsGameDashboard: PointsGameDashboardReducer.getReducer(),
    survivalGameDashboard: SurvivalGameDashboardReducer.getReducer()
})

export default rootReducer
