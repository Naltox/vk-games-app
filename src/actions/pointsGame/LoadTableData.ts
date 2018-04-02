import Action from "../Action";
import GameRoundScore from "../../domain/entity/GameRoundScore";
import {PointsGameTableItem} from "../../actionCreators/PointsGameDashboardAC";


export default class LoadTableData extends Action {
    constructor(data: PointsGameTableItem[]|null) {
        super({ data })
    }

    get data(): PointsGameTableItem[] {
        return this._payload.data
    }

    static deserialize(raw) {
        return new LoadTableData(raw.payload.data)
    }
}