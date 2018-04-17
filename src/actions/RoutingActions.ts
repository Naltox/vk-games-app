export const OpenScreenActID = 'OPEN_SCREEN'

export const OpenScreenAct = (screenId: string) => ({ type: OpenScreenActID, screenId })


export const OpenPointsGameDashboardActID = 'OPEN_POINTS_GAME_DASHBOARD'

export const OpenPointsGameDashboardAct = (gameId: string) => ({ type: OpenPointsGameDashboardActID, gameId })


export const OpenSurvivalGameDashboardActID = 'OPEN_SURVIVAL_GAME_DASHBOARD'

export const OpenSurvivalGameDashboardAct = (gameId: string) => ({ type: OpenSurvivalGameDashboardActID, gameId })
