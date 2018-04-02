import * as React from "react";
import Block from "../../../uikit/components/block/Block";
import MarginV from "../../../uikit/components/marginV/MarginV";
import Title from "../../../uikit/components/title/Title";
import Flex from "../../../uikit/components/flex/Flex";
import ScoreSelector from "../scoreSelector/ScoreSelector";
import {SeparatorLine} from "../../../uikit/components/separatorLine/SeparatorLine";
import Button from "../../../uikit/components/input/button/Button";
import GamePlayer from "../../../domain/entity/GamePlayer";
import GameForPoints from "../../../domain/entity/GameForPoints";

interface RoundScoreProps {
    game: GameForPoints
    players: GamePlayer[]
    roundNumber: number
    score: { [key: string] : number }

    onSaveScore()
    onScoreChange(playerId: string, score: number)
}

export class RoundScore extends React.Component<RoundScoreProps, {}> {
    render() {
        let {
            roundNumber,
            players,
            game,
            score,

            onScoreChange,
            onSaveScore
        } = this.props

        return (
            <Block wh100={true}>
                <MarginV m={20}/>
                <Title text={`Раунд ${roundNumber}, очки:`}/>
                <MarginV m={20}/>

                <div style={{height: 'calc(100vh - 313px)', overflow: 'scroll'}}>
                    {players.map((player, index) => {
                        return (
                            <Block key={index}>
                                <Flex justify="space-between" align="center">
                                    <Block width={200} flexShrink={0}>
                                        <Title text={player.name}/>
                                    </Block>
                                    <ScoreSelector
                                        maxScore={game.maxPoints}
                                        selectedScore={score[player.id] || 0}
                                        onChange={score => onScoreChange(player.id, score)}
                                    />
                                </Flex>
                                <SeparatorLine/>
                            </Block>
                        )
                    })}
                </div>

                <MarginV m={20}/>

                <Block float="right">
                    <Button
                        text="Следующий раунд"
                        onClick={onSaveScore}
                    />
                </Block>
            </Block>
        )
    }
}