import SurvivalGameNode from "../entity/SurvivalGameNode";

export abstract class BaseSurvivalGameRepository {
    public abstract async getData(gameId: string): Promise<SurvivalGameNode[]>

    public abstract async addStage(gameId: string, data: SurvivalGameNode[]): Promise<void>

    public abstract async setGameScore(
        gameId: string,
        stage: number,
        gameIndex: number,
        firstPlayerScore: number,
        secondPlayerScore: number
    ): Promise<void>

    public abstract async deleteData(gameId: string): Promise<void>
}