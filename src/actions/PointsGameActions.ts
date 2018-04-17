import GameRoundScore from "../domain/entity/GameRoundScore";
import {PointsGameTableItem} from "../actionCreators/PointsGameDashboardAC";

export const LoadScoreActID = 'LOAD_SCORE'

export const LoadScoreAct = (score: GameRoundScore[]|null) => ({ type: LoadScoreActID, score })


export const LoadTableDataActID = 'LOAD_TABLE_DATA'

export const LoadTableDataAct = (data: PointsGameTableItem[]|null) => ({ type: LoadTableDataActID, data })