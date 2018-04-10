import * as React from 'react'
import PopupBox from "../../../uikit/components/popupBox/PopupBox";
import Button from "../../../uikit/components/input/button/Button";
import Title from "../../../uikit/components/title/Title";
import ScoreSelector from "../../pointsGame/scoreSelector/ScoreSelector";
const style = require('./ScorePopup.scss')

interface ScorePopupProps {
    firstPlayer: string
    secondPlayer: string

    maxScore: number

    onClose()
    onSave(firstPlayerScore: number, secondPlayerScore: number)
}

interface ScorePopupState {
    firstPlayerScore: number
    secondPlayerScore: number
}

export class ScorePopup extends React.Component<ScorePopupProps, ScorePopupState> {
    constructor(props) {
        super(props)
        
        this.state = {
            firstPlayerScore: 0,
            secondPlayerScore: 0
        }
    }
    
    render() {
        let {
            maxScore,

            firstPlayer,
            secondPlayer,

            onClose,
            onSave
        } = this.props

        let {
            firstPlayerScore,
            secondPlayerScore
        } = this.state
        
        return (
            <PopupBox
                title="Счет"
                onClose={onClose}
                closeFromOutside={true}
                body={
                    <div>
                        <Title text={firstPlayer + ':'}/>
                        <div className={style.ScoreSelectorWrap}>
                            <ScoreSelector
                                maxScore={maxScore}
                                selectedScore={firstPlayerScore}
                                onChange={firstPlayerScore => this.setState({ firstPlayerScore })}
                            />
                        </div>

                        <Title text={secondPlayer + ':'}/>
                        <div className={style.ScoreSelectorWrap}>
                            <ScoreSelector
                                maxScore={maxScore}
                                selectedScore={secondPlayerScore}
                                onChange={secondPlayerScore => this.setState({ secondPlayerScore })}
                            />
                        </div>
                    </div>
                }
                bottom={
                    <div className={style.SaveButtonWrap}>
                        <Button
                            text="Сохранить"
                            minWidth={100}
                            onClick={() => onSave(firstPlayerScore, secondPlayerScore)}
                        />
                    </div>
                }
            />
        )
    }
}