import GamePLayer from "../entity/GamePlayer";

export abstract class BasePlayersRepository {
    public abstract async addGamePlayers(gameId: string, players: string[]): Promise<void>

    public abstract async deletePlayers(gameId: string): Promise<void>

    public abstract async getPlayers(gameId: string): Promise<GamePLayer[]>
}