import Action from "../Action";
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