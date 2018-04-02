export default class GameRoundScore {
    constructor(
        readonly id: string,
        readonly gameId: string,
        readonly playerId: string,
        readonly roundNumber: number,
        readonly score: number
    ) {

    }

    static deserialize(raw: any): GameRoundScore {
        return new GameRoundScore(
            raw['_id'],
            raw['gameId'],
            raw['playerId'],
            raw['roundNumber'],
            raw['score']
        )
    }

    public serialize(): object {
        return {
            gameId: this.gameId,
            playerId: this.playerId,
            roundNumber: this.roundNumber,
            score: this.score
        }
    }
}