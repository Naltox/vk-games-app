import GameRoundScore from "../entity/GameRoundScore";

export abstract class BaseRoundsRepository {
    public abstract async addScore(score: GameRoundScore[]): Promise<void>

    public abstract async getScore(gameId: string): Promise<GameRoundScore[]>

    public abstract async deleteScore(gameId: string): Promise<void>

    // returns sorted scores by rounds for player
    public abstract async getPlayerScore(gameId: string, playerId: string): Promise<GameRoundScore[]>
}