import BaseGame from "./BaseGame";

export default class GameForPoints extends BaseGame {
    constructor(
        readonly id: string,
        readonly name: string,
        readonly roundsNumber: number,
        readonly winnersCount: number,
        readonly maxPoints: number
    ) {
        super(id, name)
    }

    public serialize() {
        return {
            id: this.id,
            name: this.name,
            roundsNumber: this.roundsNumber,
            winnersCount: this.winnersCount,
            maxPoints: this.maxPoints
        }
    }

    public static deserialize(raw: any): GameForPoints {
        return new GameForPoints(
            raw['id'],
            raw['name'],
            raw['roundsNumber'],
            raw['winnersCount'],
            raw['maxPoints']
        )
    }

    public getTypeString(): string {
        return 'for_points'
    }
}