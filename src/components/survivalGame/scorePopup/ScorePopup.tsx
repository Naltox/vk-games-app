import * as React from 'react'
import PopupBox from "../../../uikit/components/popupBox/PopupBox";
import Flex from "../../../uikit/components/flex/Flex";
import Block from "../../../uikit/components/block/Block";
import Button from "../../../uikit/components/input/button/Button";
import Title from "../../../uikit/components/title/Title";
import ScoreSelector from "../../pointsGame/scoreSelector/ScoreSelector";
import MarginV from "../../../uikit/components/marginV/MarginV";

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
                    <Block>
                        <Title text={firstPlayer + ':'}/>
                        <Flex justify="center">
                            <ScoreSelector
                                maxScore={maxScore}
                                selectedScore={firstPlayerScore}
                                onChange={firstPlayerScore => this.setState({ firstPlayerScore })}
                            />
                        </Flex>

                        <MarginV m={25}/>
                        <Title text={secondPlayer + ':'}/>
                        <Flex justify="center">
                            <ScoreSelector
                                maxScore={maxScore}
                                selectedScore={secondPlayerScore}
                                onChange={secondPlayerScore => this.setState({ secondPlayerScore })}
                            />
                        </Flex>
                    </Block>
                }
                bottom={
                    <Block float="right">
                        <Button
                            text="Сохранить"
                            minWidth={100}
                            onClick={() => onSave(firstPlayerScore, secondPlayerScore)}
                        />
                    </Block>
                }
            />
        )
    }
}