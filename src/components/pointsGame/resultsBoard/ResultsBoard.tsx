import * as React from "react";
import BigTitle from "../../../uikit/components/bigTitle/BigTitle";
import GamePlayer from "../../../domain/entity/GamePlayer";
const style = require('./ResultsBoard.scss')

interface ResultsBoardProps {
    players: GamePlayer[],
    winners: [string, number][][] // [[[playerName, totalScore]]]
}

export class ResultsBoard extends React.Component<ResultsBoardProps, {}> {
    render() {
        let {
            winners
        } = this.props

        return(
            <div className={style.ResultsBoard}>
                {winners.map((w, index) => {
                    return (
                        <div key={index} className={style.Result}>
                            <BigTitle
                                text={`${this.textForPosition(index + 1)} - ` + this.renderWinnersName(w)}
                            />
                        </div>
                    )
                })}
            </div>
        )
    }

    private renderWinnersName(winner: [string, number][]): string {
        let {
            players
        } = this.props

        let str: string[] = []

        for (let subWinner of winner) {
            let player = players.find(p => p.id === subWinner[0])!

            str.push(`${player.name}`)
        }

        return str.join(' и ')
    }

    private textForPosition(position: number): string {
        if (position === 1)
            return '🥇'
        if (position === 2)
            return '🥈'
        if (position === 3)
            return '🥉'

        return `🏆 #${position}`
    }
}