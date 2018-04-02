import * as React from "react";
import Block from "../../../uikit/components/block/Block";
import MarginV from "../../../uikit/components/marginV/MarginV";
import Flex from "../../../uikit/components/flex/Flex";
import BigTitle from "../../../uikit/components/bigTitle/BigTitle";
import GamePlayer from "../../../domain/entity/GamePlayer";

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
            <Block padding={25} height="calc(100vh - 200px)" overflow="scroll">
                <Flex justify="center" direction="column">
                    {winners.map((w, index) => {
                        return (
                            <Block key={index}>
                                <BigTitle
                                    text={`${this.textForPosition(index + 1)} - ` + this.renderWinnersName(w)}
                                />
                                <MarginV m={10}/>
                            </Block>
                        )
                    })}
                </Flex>
            </Block>
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