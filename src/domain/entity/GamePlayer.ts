export default class GamePlayer {
    constructor(
        readonly id: string,
        readonly gameId: number,
        readonly name: string
    ) {

    }

    static deserialize(raw: any): GamePlayer {
        return new GamePlayer(
            raw['_id'],
            raw['gameId'],
            raw['name']
        )
    }
}