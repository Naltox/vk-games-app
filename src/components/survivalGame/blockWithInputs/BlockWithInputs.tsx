import * as React from "react";
import TextField from "../../../uikit/components/input/textField/TextField";
import {TreeBlock} from "../block/TreeBlock";
const style = require('./BlockWithInputs.scss')

interface BlockWithInputsProps {
    firstPlayer: string
    secondPlayer: string

    onChange(player: number, value: string)
}

export class BlockWithInputs extends React.Component<BlockWithInputsProps, {}> {
    render() {
        let {
            firstPlayer,
            secondPlayer,
            onChange
        } = this.props

        return (
            <TreeBlock>
                <TextField
                    value={firstPlayer}
                    onChange={v => {
                        onChange(0, v)
                    }}
                   placeholder="Участник"
                   height={22}
                />
                <div className={style.VS}>VS</div>
                <TextField
                    value={secondPlayer}
                    onChange={v => {
                        onChange(1, v)
                    }}
                    placeholder="Участник"
                    height={22}
                />
            </TreeBlock>
        )
    }
}