import * as React from 'react'
import {render} from 'react-dom'
import './uikit/style/main.scss'
import { BrowserRouter, Route } from 'react-router-dom'
import LocalGamesRepository from "./infrastructure/repository/LocalGamesRepository";
import {applyMiddleware, createStore} from "redux";
import AppReducers from "./reducers/AppReducers";
import thunk from "redux-thunk";
import RootAC from "./actionCreators/RootAC";
import {Provider} from "react-redux";
import {ActionCreators} from "./actionCreators/ActionCreators";
import GamesListContainer from "./containers/gamesList/GamesListContainer";
import LocalPlayersRepository from "./infrastructure/repository/LocalPlayersRepository";
import RouterAC from "./actionCreators/RouterAC";
import RootContainer from "./containers/root/RootContainer";
import Action from "./actions/Action";
import GameForPointsDashboard from "./containers/gameForPointsDashboard/GameForPointsDashboard";
import PointsGameDashboardAC from "./actionCreators/PointsGameDashboardAC";
import LocalRoundsRepository from "./infrastructure/repository/LocalRoundsRepository";
import SurvivalGameDashboard from "./containers/survivalGameDasboard/SurvivalGameDashboard";
import SurvivalGameDashboardAC from "./actionCreators/SurvivalGameDashboardAC";
import LocalSurvivalGameRepository from "./infrastructure/repository/LocalSurvivalGameRepository";
import {webFrame} from 'electron'

webFrame.setZoomLevelLimits(1, 1)

const store = createStore(
    AppReducers,
    applyMiddleware(thunk)
)

const dispatch = (action: Action) => store.dispatch(action.serialize())

let gamesRepository = new LocalGamesRepository()
let playersRepository = new LocalPlayersRepository()
let roundsRepository = new LocalRoundsRepository()
let survivalGameRepository = new LocalSurvivalGameRepository()

const appRoutingSchema = {
    'gamesList': GamesListContainer,
    'pointsGameDashboard': GameForPointsDashboard,
    'survivalGameDashboard': SurvivalGameDashboard
}


ActionCreators.rootAC = new RootAC(
    gamesRepository,
    playersRepository
)
ActionCreators.routingAC = new RouterAC()
ActionCreators.pointsGameDashboard = new PointsGameDashboardAC(
    gamesRepository,
    playersRepository,
    roundsRepository
)
ActionCreators.survivalGameDashboard = new SurvivalGameDashboardAC(
    gamesRepository,
    survivalGameRepository
)


dispatch(ActionCreators.routingAC.openGamesScreen())

render(
    <Provider store={store}>
        <RootContainer routingSchema={appRoutingSchema}/>
    </Provider>,
    document.getElementById('root')
)


let m = module as any

if (m.hot)
    m.hot.accept()