import * as React from 'react'
import {combine, styleIf} from "../../../utils/style";
const style = require('./RadioInput.scss')

interface RadioInputProps {
    titles: string[]
    selected: number
    onChange(selected: number)
}

export default class RadioInput extends React.Component<RadioInputProps, {}> {
    render() {
        return (
            <div className={style.RadioInput}>
                {this.renderRadios()}
            </div>
        )
    }

    private renderRadios() {
        let {
            titles,
            selected,
            onChange
        } = this.props

        return titles.map((title, index) => {
            return (
                <div className={style.item} key={index}>
                    {this.renderRadio(
                        title,
                        index === selected,
                        () => onChange(index)
                    )}
                </div>
            )
        })
    }

    private renderRadio(title: string, checked: boolean, onClick: () => void) {

        let className = combine(
            style.Radio,
            styleIf(checked, style.Radio_checked)
        )

        return (
            <div className={className} onClick={onClick}>
                <span className={style.circle}>
                    <span className={style.inCircle}/>
                </span>

                <span className={style.title}>{title}</span>
            </div>
        )
    }
}

