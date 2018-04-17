import BaseGame from "../domain/entity/BaseGame";

export const LoadGamesActID = 'LOAD_GAMES'

export const LoadGamesAct = (games: BaseGame[]) => ({ type: LoadGamesActID, games })


export const LoadGameActID = 'LOAD_GAME'

export const LoadGameAct = (game: BaseGame|null) => ({ type: LoadGameActID, game })