import * as React from "react";
import Title from "../../../uikit/components/title/Title";
import ScoreSelector from "../scoreSelector/ScoreSelector";
import Button from "../../../uikit/components/input/button/Button";
import GamePlayer from "../../../domain/entity/GamePlayer";
import GameForPoints from "../../../domain/entity/GameForPoints";
const style = require('./RoundScore.scss')

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
            <div className={style.RoundWrap}>
                <div className={style.RoundTitle}>
                    <Title text={`Раунд ${roundNumber}, очки:`}/>
                </div>

                <div className={style.ScoreList}>
                    {players.map((player, index) => {
                        return (
                            <div key={index} className={style.ScoreLine}>
                                <div className={style.PlayerName}>
                                    <Title text={player.name}/>
                                </div>
                                <ScoreSelector
                                    maxScore={game.maxPoints}
                                    selectedScore={score[player.id] || 0}
                                    onChange={score => onScoreChange(player.id, score)}
                                />
                            </div>
                        )
                    })}
                </div>
                <div className={style.NextRoundButton}>
                    <Button
                        text="Следующий раунд"
                        onClick={onSaveScore}
                    />
                </div>
            </div>
        )
    }
}