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
import {
    combineValidator, lessThan, notBlankString, positiveNumber,
    validateFormByOne, ValidationRules
} from "../../../utils/FormValidation";
import DropDown from "../../../uikit/components/input/dropDown/DropDown";
import Timer = NodeJS.Timer;
import {CreateRef} from "../../../utils/React";
import Tooltip from "../../../uikit/components/tooltip/Tooltip";

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

    nameErr: boolean
    roundsNumberErr: boolean
    winnersCountErr: boolean
    maxPointsErr: boolean

    showRoundsNumberTooltip: boolean
    showWinnersCountTooltip: boolean
    showMaxPointsCountTooltip: boolean
}

const PLAYERS_COUNT = ['4', '8', '16', '32', '64']

const CLOSED_TOOLTIPS_STATE = {
    showRoundsNumberTooltip: false,
    showWinnersCountTooltip: false,
    showMaxPointsCountTooltip: false
}

const NO_ERRORS_STATE = {
    nameErr: false,
    roundsNumberErr: false,
    winnersCountErr: false,
    maxPointsErr: false,
}


export default class NewGamePopup extends React.Component<NewGamePopupProps, NewGamePopupState> {
    private errorTimeout: Timer
    private tooltipsTimeout: Timer

    private nameRef = CreateRef()
    private roundsNumberRef = CreateRef()
    private winnersCountRef = CreateRef()
    private maxPointsRef = CreateRef()

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            type: GameType.ForPoints,
            roundsNumber: '',
            winnersCount: '',
            maxPoints: '',
            playersCount: 0,

            nameErr: false,
            roundsNumberErr: false,
            winnersCountErr: false,
            maxPointsErr: false,

            showRoundsNumberTooltip: false,
            showWinnersCountTooltip: false,
            showMaxPointsCountTooltip: false
        }



    }

    componentWillUnmount() {
        clearTimeout(this.errorTimeout)
        clearTimeout(this.tooltipsTimeout)
    }

    render() {
        let {
            onClose,
            onHelp
        } = this.props

        let {
            name,
            type,

            nameErr,
        } = this.state

        return (
            <div>
                <PopupBox
                    title="Новая игра"
                    onClose={onClose}
                    closeFromOutside={!this.haveAnyData()}
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
                                inputRef={this.nameRef}
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
            maxPointsErr,

            showRoundsNumberTooltip,
            showWinnersCountTooltip,
            showMaxPointsCountTooltip
        } = this.state

        return (
            <div>
                <Tooltip show={showRoundsNumberTooltip}>
                    Количество раундов не может быть больше ста
                </Tooltip>
                <Title text="Количество раундов"/>
                <MarginV m={15}/>
                <TextField
                    value={roundsNumber}
                    onChange={roundsNumber => this.setState({ roundsNumber })}
                    placeholder="Количество раундов"
                    error={roundsNumberErr}
                    inputRef={this.roundsNumberRef}
                />

                <MarginV m={20}/>

                <Tooltip show={showWinnersCountTooltip}>
                    Количество призовых мест не может быть больше ста
                </Tooltip>
                <Title text="Количество призовых мест"/>
                <MarginV m={15}/>
                <TextField
                    value={winnersCount}
                    onChange={winnersCount => this.setState({ winnersCount })}
                    placeholder="Количество призовых мест"
                    error={winnersCountErr}
                    inputRef={this.winnersCountRef}
                />

                <MarginV m={20}/>

                <Tooltip show={showMaxPointsCountTooltip}>
                    Максимальный балл не может быть больше ста
                </Tooltip>
                <Title text="Максимальный балл"/>
                <MarginV m={15}/>
                <TextField
                    value={maxPoints}
                    onChange={maxPoints => this.setState({ maxPoints })}
                    placeholder="Максимальный балл"
                    error={maxPointsErr}
                    inputRef={this.maxPointsRef}
                />
            </div>
        )
    }

    private renderSurvivalGameInputs() {
        let {
            maxPoints,
            playersCount,

            maxPointsErr,

            showMaxPointsCountTooltip
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

                <Tooltip show={showMaxPointsCountTooltip}>
                    Максимальный балл не может быть больше ста
                </Tooltip>
                <Title text="Максимальный балл"/>
                <MarginV m={15}/>
                <TextField
                    value={maxPoints}
                    onChange={maxPoints => this.setState({ maxPoints })}
                    placeholder="Максимальный балл"
                    error={maxPointsErr}
                    inputRef={this.maxPointsRef}
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


        let validationRules: ValidationRules

        if (type === 0) {
            validationRules = {
                name: notBlankString,
                roundsNumber: combineValidator(
                    positiveNumber,
                    lessThan(100, () => this.setState({ showRoundsNumberTooltip: true }))
                ),
                winnersCount: combineValidator(
                    positiveNumber,
                    lessThan(100, () => this.setState({ showWinnersCountTooltip: true}))
                ),
                maxPoints: combineValidator(
                    positiveNumber,
                    lessThan(100, () => this.setState({ showMaxPointsCountTooltip: true }))
                )
            }
        }
        else {
            validationRules = {
                name: notBlankString,
                maxPoints: combineValidator(
                    positiveNumber,
                    lessThan(100, () => this.setState({ showMaxPointsCountTooltip: true }))
                )
            }
        }

        let inputWithError = validateFormByOne(validationRules, this.state)

        if (!inputWithError) {
            onSave({
                name,
                type: this.typeToStr(type),
                roundsNumber: parseInt(roundsNumber, 10),
                winnersCount: parseInt(winnersCount, 10),
                maxPoints: parseInt(maxPoints, 10),
                playersCount: parseInt(PLAYERS_COUNT[playersCount], 10)
            })

            return
        }

        this.setState({
            [inputWithError + 'Err']: true
        } as any)

        this[inputWithError + 'Ref'].current.focus()

        this.errorTimeout = global.setTimeout(() => {
            this.setState(NO_ERRORS_STATE)
        }, 500)

        this.tooltipsTimeout = global.setTimeout(() => {
            this.setState(CLOSED_TOOLTIPS_STATE)
        }, 1000)
    }

    private typeToStr(type: GameType): string {
        switch (type) {
            case GameType.Survival:
                return 'survival'
            case GameType.ForPoints:
                return 'for_points'
        }
    }

    private haveAnyData(): boolean {
        let {
            name,
            roundsNumber,
            winnersCount,
            maxPoints
        } = this.state

        return (
            notBlankString(name) ||
            notBlankString(roundsNumber) ||
            notBlankString(winnersCount) ||
            notBlankString(maxPoints)
        )
    }
}
