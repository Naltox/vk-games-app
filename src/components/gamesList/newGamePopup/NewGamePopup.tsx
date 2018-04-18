import * as React from 'react'
import PopupBox from "../../../uikit/components/popupBox/PopupBox";
import Title from "../../../uikit/components/title/Title";
import TextField from "../../../uikit/components/input/textField/TextField";
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
const style = require('./NewGamePopup.scss')

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

    private keyUpListener = event => {
        if (event.keyCode == 13)
            this.onSave()
    }

    componentWillUnmount() {
        clearTimeout(this.errorTimeout)
        clearTimeout(this.tooltipsTimeout)

        document.removeEventListener('keyup', this.keyUpListener)
    }

    componentDidMount() {
        document.addEventListener('keyup', this.keyUpListener)
        this.nameRef.current.focus()
    }

    render() {
        let {
            onClose,
        } = this.props

        let {
        } = this.state

        return (
            <div>
                <PopupBox
                    title="Новая игра"
                    onClose={onClose}
                    closeFromOutside={!this.haveAnyData()}
                    body={this.renderFormBody()}
                    bottom={this.renderModalBottom()}
                    width={500}
                />
            </div>
        )
    }

    private renderFormBody() {
        let {
            onHelp
        } = this.props

        let {
            name,
            type,

            nameErr,
        } = this.state

        return (
            <div>
                <div className={style.InputBlock}>
                    <Title text="Название игры"/>

                    <div className={style.InputWrap}>
                        <TextField
                            value={name}
                            onChange={name => {
                                this.setState({ name })
                            }}
                            placeholder=""
                            error={nameErr}
                            inputRef={this.nameRef}
                        />
                    </div>
                </div>

                <div className={style.InputBlock}>
                    <div className={style.GameTypeLine}>
                        <Title text="Тип игры"/>
                        <HelpButton onClick={onHelp}/>
                    </div>
                    <div className={style.InputWrap}>
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
                    </div>
                </div>

                {type == 0 ? this.renderPointsGameInputs() : this.renderSurvivalGameInputs()}

            </div>
        )
    }

    private renderModalBottom() {
        return (
            <div className={style.NextButtonWrap}>
                <Button
                    text="Дальше"
                    minWidth={100}
                    onClick={this.onSave}
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
                <div className={style.InputBlock}>
                    <Tooltip show={showRoundsNumberTooltip}>
                        Количество раундов не может быть больше ста
                    </Tooltip>
                    <Title text="Количество раундов"/>
                    <div className={style.InputWrap}>
                        <TextField
                            value={roundsNumber}
                            onChange={roundsNumber => this.setState({ roundsNumber })}
                            placeholder=""
                            error={roundsNumberErr}
                            inputRef={this.roundsNumberRef}
                        />
                    </div>
                </div>

                <div className={style.InputBlock}>
                    <Tooltip show={showWinnersCountTooltip}>
                        Количество призовых мест не может быть больше ста
                    </Tooltip>
                    <Title text="Количество призовых мест"/>
                    <div className={style.InputWrap}>
                        <TextField
                            value={winnersCount}
                            onChange={winnersCount => this.setState({ winnersCount })}
                            placeholder=""
                            error={winnersCountErr}
                            inputRef={this.winnersCountRef}
                        />
                    </div>
                </div>

                <div className={style.InputBlock}>
                    <Tooltip show={showMaxPointsCountTooltip}>
                        Максимальный балл не может быть больше ста
                    </Tooltip>
                    <Title text="Максимальный балл"/>
                    <div className={style.InputWrap}>
                        <TextField
                            value={maxPoints}
                            onChange={maxPoints => this.setState({ maxPoints })}
                            placeholder=""
                            error={maxPointsErr}
                            inputRef={this.maxPointsRef}
                        />
                    </div>
                </div>
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
                <div className={style.InputBlock}>
                    <Title text="Количество участников"/>
                    <div className={style.InputWrap}>
                        <DropDown
                            items={PLAYERS_COUNT}
                            placeholder=""
                            width={450}
                            showUp={false}
                            error={false}
                            selectedIndex={playersCount}
                            onSelect={(playersCount) => this.setState({ playersCount })}
                        />
                    </div>
                </div>

                <div className={style.InputBlock}>
                    <Tooltip show={showMaxPointsCountTooltip}>
                        Максимальный балл не может быть больше ста
                    </Tooltip>
                    <Title text="Максимальный балл"/>
                    <div className={style.InputWrap}>
                        <TextField
                            value={maxPoints}
                            onChange={maxPoints => this.setState({ maxPoints })}
                            placeholder=""
                            error={maxPointsErr}
                            inputRef={this.maxPointsRef}
                        />
                    </div>
                </div>
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
        }, 1500)
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
