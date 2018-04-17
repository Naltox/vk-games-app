import SurvivalGameNode from "../domain/entity/SurvivalGameNode";

export const LoadSurvivalDataActID = 'LOAD_SURVIVAL_DATA'

export const LoadSurvivalDataAct = (data: SurvivalGameNode[]|null) => ({ type: LoadSurvivalDataActID, data })