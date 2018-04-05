import * as React from 'react'
import PopupBox from "../../../uikit/components/popupBox/PopupBox";
import Flex from "../../../uikit/components/flex/Flex";
import Title from "../../../uikit/components/title/Title";
import MarginV from "../../../uikit/components/marginV/MarginV";
import TextField from "../../../uikit/components/input/textField/TextField";
import Block from "../../../uikit/components/block/Block";
import Button from "../../../uikit/components/input/button/Button";
import RadioInput from "../../../uikit/components/input/radioInput/RadioInput";
import HelpButton from "../../../uikit/components/helpButton/HelpButton";
import {ErrorPopup} from "../../errorPopup/ErrorPopup";
import {isFormValidationOk, notBlankString, positiveNumber, validateForm} from "../../../utils/FormValidation";
import DropDown from "../../../uikit/components/input/dropDown/DropDown";

export enum GameType {
    ForPoints,
    Survival,
}

export interface NewGameInfo {
    name: string
    type: string
    roundsNumber: number
    winnersCount: number
    maxPoints: number,
    playersCount: number
}

interface NewGamePopupProps {
    onClose()
    onSave(game: NewGameInfo)
    onHelp()
}

interface NewGamePopupState {
    name: string
    type: GameType
    roundsNumber: string
    winnersCount: string
    maxPoints: string
    playersCount: number

    showError: boolean
    errorText: string,

    nameErr: boolean
    roundsNumberErr: boolean
    winnersCountErr: boolean
    maxPointsErr: boolean
}

const PLAYERS_COUNT = ['4', '8', '16', '32', '64']

export default class NewGamePopup extends React.Component<NewGamePopupProps, NewGamePopupState> {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            type: GameType.ForPoints,
            roundsNumber: '',
            winnersCount: '',
            maxPoints: '',
            playersCount: 0,

            showError: false,
            errorText: '',

            nameErr: false,
            roundsNumberErr: false,
            winnersCountErr: false,
            maxPointsErr: false
        }
    }

    render() {
        let {
            onClose,
            onHelp
        } = this.props

        let {
            name,
            type,
            roundsNumber,
            winnersCount,
            maxPoints,

            showError,
            errorText,

            nameErr,
            roundsNumberErr,
            winnersCountErr,
            maxPointsErr
        } = this.state

        return (
            <div>
                <PopupBox
                    title="Новая игра"
                    onClose={onClose}
                    body={
                        <Flex direction="column">
                            <Title text="Название игры"/>
                            <MarginV m={15}/>
                            <TextField
                                value={name}
                                onChange={name => {
                                    this.setState({ name })
                                }}
                                placeholder="Название игры"
                                error={nameErr}
                            />

                            <MarginV m={20}/>

                            <Flex>
                                <Title text="Тип игры"/>
                                <HelpButton onClick={onHelp}/>
                            </Flex>
                            <MarginV m={15}/>
                            <RadioInput
                                titles={[
                                    'На очки',
                                    'Последний герой',
                                ]}
                                selected={type}
                                onChange={type => {
                                    this.setState({ type })}
                                }
                            />

                            <MarginV m={20}/>

                            {type == 0 ? this.renderPointsGameInputs() : this.renderSurvivalGameInputs()}

                        </Flex>
                    }
                    bottom={
                        <Block float="right">
                            <Button
                                text="Дальше"
                                minWidth={100}
                                onClick={this.onSave}
                            />
                        </Block>

                    }
                    width={500}
                />
                {showError ?
                    (<ErrorPopup errorText={errorText} onClose={this.closeError}/>) :
                <div/>}
            </div>
        )
    }

    private renderPointsGameInputs() {
        let {
            roundsNumber,
            winnersCount,
            maxPoints,

            roundsNumberErr,
            winnersCountErr,
            maxPointsErr
        } = this.state

        return (
            <div>
                <Title text="Количество раундов"/>
                <MarginV m={15}/>
                <TextField
                    value={roundsNumber}
                    onChange={roundsNumber => this.setState({ roundsNumber })}
                    placeholder="Количество раундов"
                    error={roundsNumberErr}
                />

                <MarginV m={20}/>

                <Title text="Количество призовых мест"/>
                <MarginV m={15}/>
                <TextField
                    value={winnersCount}
                    onChange={winnersCount => this.setState({ winnersCount })}
                    placeholder="Количество призовых мест"
                    error={winnersCountErr}
                />

                <MarginV m={20}/>

                <Title text="Максимальный балл"/>
                <MarginV m={15}/>
                <TextField
                    value={maxPoints}
                    onChange={maxPoints => this.setState({ maxPoints })}
                    placeholder="Максимальный балл"
                    error={maxPointsErr}
                />
            </div>
        )
    }

    private renderSurvivalGameInputs() {
        let {
            maxPoints,
            playersCount,

            maxPointsErr
        } = this.state

        return (
            <div>
                <Title text="Количество участников"/>
                <MarginV m={15}/>
                <DropDown
                    items={PLAYERS_COUNT}
                    placeholder="Количество участников"
                    width={450}
                    showUp={false}
                    error={false}
                    selectedIndex={playersCount}
                    onSelect={(playersCount) => this.setState({ playersCount })}
                />

                <MarginV m={20}/>

                <Title text="Максимальный балл"/>
                <MarginV m={15}/>
                <TextField
                    value={maxPoints}
                    onChange={maxPoints => this.setState({ maxPoints })}
                    placeholder="Максимальный балл"
                    error={maxPointsErr}
                />
            </div>
        )
    }

    private onSave = () => {
        let {
            name,
            type,
            roundsNumber,
            winnersCount,
            maxPoints,
            playersCount
        } = this.state

        let {
            onSave
        } = this.props

        let validation: any

        if (type === 0) {
            validation = validateForm(
                {
                    name: notBlankString,
                    roundsNumber: positiveNumber,
                    winnersCount: positiveNumber,
                    maxPoints: positiveNumber
                },
                this.state
            )
        }
        else {
            validation = validateForm(
                {
                    name: notBlankString,
                    maxPoints: positiveNumber
                },
                this.state
            )
        }

        this.setState(validation)

        if (isFormValidationOk(validation)) {
            onSave({
                name,
                type: this.typeToStr(type),
                roundsNumber: parseInt(roundsNumber, 10),
                winnersCount: parseInt(winnersCount, 10),
                maxPoints: parseInt(maxPoints, 10),
                playersCount: parseInt(PLAYERS_COUNT[playersCount], 10)
            })
        }

    }

    private typeToStr(type: GameType): string {
        switch (type) {
            case GameType.Survival:
                return 'survival'
            case GameType.ForPoints:
                return 'for_points'
        }
    }

    private showError(text: string) {
        this.setState({
            showError: true,
            errorText: text
        })
    }

    private closeError = () => {
        this.setState({
            showError: false,
            errorText: ''
        })
    }
}
