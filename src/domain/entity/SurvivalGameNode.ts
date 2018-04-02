export default class SurvivalGameNode {
    constructor(
        public id: string,
        public gameId: string,
        public index: number,
        public stageNumber: number,
        public firstPlayer: string,
        public secondPlayer: string,
        public firstPlayerScore: number,
        public secondPlayerScore: number
    ) {

    }

    static deserialize(raw: any): SurvivalGameNode {
        return new SurvivalGameNode(
            raw['_id'],
            raw['gameId'],
            raw['index'],
            raw['stageNumber'],
            raw['firstPlayer'],
            raw['secondPlayer'],
            raw['firstPlayerScore'],
            raw['secondPlayerScore'],
        )
    }

    public serialize(): object {
        return {
            gameId: this.gameId,
            stageNumber: this.stageNumber,
            index: this.index,
            firstPlayer: this.firstPlayer,
            secondPlayer: this.secondPlayer,
            firstPlayerScore: this.firstPlayerScore,
            secondPlayerScore: this.secondPlayerScore
        }
    }
}