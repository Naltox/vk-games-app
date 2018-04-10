import * as React from "react";
import {combine, styleIf} from "../../../uikit/utils/style";
const style = require('./ScoreSelector.scss')

interface ScoreSelectorProps {
    maxScore: number
    selectedScore: number
    onChange(score: number)
}

export default class ScoreSelector extends React.Component<ScoreSelectorProps, {}> {
    render() {
        let {
            selectedScore,
            onChange
        } = this.props

        return (
            <div className={style.ScoreSelector}>
                {this.generateScores().map((score, index) => {

                    let itemClass = combine(
                        style.Item,
                        styleIf(index === selectedScore, style.Item_active)
                    )


                    return (
                        <div
                            className={itemClass}
                            key={index}
                            onClick={() => onChange(index)}
                        >
                            {score}
                        </div>
                    )
                })}
            </div>
        )
    }

    private generateScores() {
        let {
            maxScore
        } = this.props


        let arr: number[] = []

        for (let i = 0; i <= maxScore; i++)
            arr.push(i)

        return arr
    }
}
