import Action from "../Action";
import SurvivalGameNode from "../../domain/entity/SurvivalGameNode";

export default class LoadSurvivalData extends Action {
    constructor(data: SurvivalGameNode[]|null) {
        super({ data })
    }

    get data(): SurvivalGameNode[] {
        return this._payload.data
    }

    static deserialize(raw) {
        return new LoadSurvivalData(raw.payload.data)
    }
}