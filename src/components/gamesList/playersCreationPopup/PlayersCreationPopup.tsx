import * as React from 'react'
import PopupBox from "../../../uikit/components/popupBox/PopupBox";
import TextField from "../../../uikit/components/input/textField/TextField";
import Button from "../../../uikit/components/input/button/Button";
import XButton from "../../../uikit/components/xButton/XButton";
import {notBlankString} from "../../../utils/FormValidation";
import Timer = NodeJS.Timer;
import {CreateRef} from "../../../utils/React";
const style = require('./PlayersCreationPopup.scss')

interface PlayersCreationPopupProps {
    minCount: number
    onClose()
    onSave(players: string[])
}

interface PlayersCreationPopupState {
    players: string[]
    refs: any[]

    errorIndex: number|null
}

export default class PlayersCreationPopup extends React.Component<PlayersCreationPopupProps, PlayersCreationPopupState> {
    private errorTimeout: Timer

    private modalRef = CreateRef()

    constructor(props) {
        super(props)

        this.state = {
            players: new Array(props.minCount).fill(''),
            refs: new Array(props.minCount).fill(0).map(CreateRef),
            errorIndex: null
        }
    }

    private keyUpListener = event => {
        if (event.keyCode == 13)
            this.onSave()
    }

    componentWillUnmount() {
        clearTimeout(this.errorTimeout)

        document.removeEventListener('keyup', this.keyUpListener)
    }

    componentDidMount() {
        document.addEventListener('keyup', this.keyUpListener)
    }

    render() {
        let {
            onClose
        } = this.props

        let {

        } = this.state

        return (
            <div>
                <PopupBox
                    title="Участники игры"
                    onClose={onClose}
                    closeFromOutside={false}
                    body={
                        <div>
                            {this.renderPlayers()}
                            <div className={style.FloatRight}>
                                <a onClick={this.add}>
                                    Добавить
                                </a>
                            </div>
                        </div>
                    }
                    bottom={
                        <div className={style.FloatRight}>
                            <Button
                                text="Дальше"
                                minWidth={100}
                                onClick={this.onSave}
                            />
                        </div>

                    }
                    width={500}
                    modalRef={this.modalRef}
                />
            </div>
        )
    }

    private renderPlayers() {
        let {
            players,
            errorIndex,
            refs
        } = this.state

        return players.map((player, index) => {
            return (
                <div className={style.PlayerWrap} key={index}>
                    <TextField
                        value={player}
                        onChange={name => {
                            this.onPlayerNameText(name, index)
                        }}
                        placeholder="Имя участника"
                        error={index === errorIndex}
                        inputRef={refs[index]}
                    />
                    {this.renderRemoveButton(index)}
                </div>
            )
        })
    }

    private renderRemoveButton(index: number) {
        let {
            players
        } = this.state

        let {
            minCount
        } = this.props

        if (players.length > minCount)
            return (
                <div className={style.RemoveButtonWrap}>
                    <XButton
                        onClick={() => {
                            this.remove(index)
                        }}
                    />
                </div>
            )

        return <div/>
    }

    private onPlayerNameText(newText: string, index: number) {
        let {players} = this.state

        let newPlayers = [...players]

        newPlayers[index] = newText

        this.setState({
            players: newPlayers
        })
    }

    private add = () => {
        let {
            players,
            refs
        } = this.state

        this.setState({
            players: [...players, ''],
            refs: [...refs, CreateRef()]
        })
    }

    private remove = index => {
        let {
            players,
            refs
        } = this.state

        this.setState({
            players: players.filter((v, i) => i !== index),
            refs: refs.filter((v, i) => i !== index)
        })
    }

    private onSave = () => {
        let {
            players
        } = this.state

        let {
            onSave,
        } = this.props

        let validationOk = true

        let i = 0

        for (let player of players) {
            let validation = !notBlankString(player)

            if (validation && validationOk) {
                let input = this.state.refs[i].current

                this.scrollTo(
                    this.modalRef.current,
                    input.offsetTop,
                    100,
                    () => {
                        input.focus()
                    }
                )

                this.setState({ errorIndex: i })
            }

            if (validation)
                validationOk = false

            i++
        }

        if (validationOk) {
            onSave(players)
            return
        }

        this.errorTimeout = global.setTimeout(() => {
            this.setState({ errorIndex: null })
        }, 500)
    }

    private scrollTo(element: HTMLElement, to: number, duration: number, cb?: () => void) {
        if (duration <= 0) {
            cb && cb()
            return
        }

        let difference = to - element.scrollTop
        let perTick = difference / duration * 10

        setTimeout(() => {
            element.scrollTop = element.scrollTop + perTick

            if (element.scrollTop == to) {
                cb && cb()
                return
            }

            this.scrollTo(element, to, duration - 10, cb)
        }, 10)
    }
}
