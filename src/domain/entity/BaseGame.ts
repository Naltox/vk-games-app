export default class BaseGame {
    constructor(
        readonly id: string,
        readonly name: string
    ) {

    }

    public serialize(): any {
        return {

        }
    }

    public getTypeString(): string {
        return ''
    }
}