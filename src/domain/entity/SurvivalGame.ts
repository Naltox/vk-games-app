import BaseGame from "./BaseGame";

export default class SurvivalGame extends BaseGame {
    constructor(
        readonly id: string,
        readonly name: string,
        readonly playersCount: number,
        readonly maxPoints: number
    ) {
        super(id, name)
    }

    public serialize() {
        return {
            id: this.id,
            name: this.name,
            playersCount: this.playersCount,
            maxPoints: this.maxPoints
        }
    }

    public static deserialize(raw: any): SurvivalGame {
        return new SurvivalGame(
            raw['id'],
            raw['name'],
            raw['playersCount'],
            raw['maxPoints']
        )
    }

    public getTypeString(): string {
        return 'survival'
    }
}