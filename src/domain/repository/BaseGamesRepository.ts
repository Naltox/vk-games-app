import BaseGame from "../entity/BaseGame";

export abstract class BaseGamesRepository {
    // returns created game id
    public abstract async addGame(game: BaseGame): Promise<string>

    public abstract async deleteGame(id: string): Promise<void>

    public abstract async getGames(): Promise<BaseGame[]>

    public abstract async getGame(gameId: string): Promise<BaseGame|null>
}