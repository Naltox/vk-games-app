import GamePlayer from "../domain/entity/GamePlayer";

export const LoadPlayersActID = 'LOAD_PLAYERS'

export const LoadPlayersAct = (players: GamePlayer[]|null) => ({ type: LoadPlayersActID, players })