import * as React from 'react'
import PopupBox from "../../../uikit/components/popupBox/PopupBox";
import Flex from "../../../uikit/components/flex/Flex";
import MarginV from "../../../uikit/components/marginV/MarginV";
import TextField from "../../../uikit/components/input/textField/TextField";
import Block from "../../../uikit/components/block/Block";
import Button from "../../../uikit/components/input/button/Button";
import XButton from "../../../uikit/components/xButton/XButton";
import {notBlankString} from "../../../utils/FormValidation";

interface PlayersCreationPopupProps {
    minCount: number
    onClose()
    onSave(players: string[])
}

interface PlayersCreationPopupState {
    players: string[]
    errors: boolean[]
}

export default class PlayersCreationPopup extends React.Component<PlayersCreationPopupProps, PlayersCreationPopupState> {
    constructor(props) {
        super(props)

        this.state = {
            players: new Array(props.minCount).fill(''),
            errors: new Array(props.minCount).fill(false)
        }
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
                    body={
                        <Flex direction="column">
                            {this.renderPlayers()}
                            <Block>
                                <Block float="right">
                                    <a onClick={this.add}>
                                        Добавить
                                    </a>
                                </Block>
                            </Block>

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

    private renderPlayers() {
        let {
            players,
            errors
        } = this.state

        return players.map((player, index) => {
            return (
                <div key={index}>
                    <Flex align="center">
                        <TextField
                            value={player}
                            onChange={name => {
                                this.onPlayerNameText(name, index)
                            }}
                            placeholder="Имя участника"
                            error={errors[index]}
                        />
                        {this.renderRemoveButton(index)}

                    </Flex>
                    <MarginV m={15}/>
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
                <Block padding="10px 0px 10px 10px">
                    <XButton
                        onClick={() => {
                            this.remove(index)
                        }}
                    />
                </Block>
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
            errors
        } = this.state

        this.setState({
            players: [...players, ''],
            errors: [...errors, false]
        })
    }

    private remove = index => {
        let {
            players,
            errors
        } = this.state

        this.setState({
            players: players.filter((v, i) => i !== index),
            errors: errors.filter((v, i) => i !== index)
        })
    }

    private onSave = () => {
        let {
            players
        } = this.state

        let {
            onSave
        } = this.props

        let validationOk = true
        let errors: boolean[] = []

        for (let player of players) {
            let validation = notBlankString(player)
            errors.push(validation)

            if (validation)
                validationOk = false
        }

        this.setState({ errors })

        if (validationOk)
            onSave(players)
    }
}
