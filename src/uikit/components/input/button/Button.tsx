import * as React from 'react'
import {combine, styleSwitch} from "../../../utils/style";
const style = require('./Button.scss')

interface ButtonProps {
    text: string
    disabled?: boolean
    onClick?: () => void
    minWidth?: number
    type?: ButtonType
    selected?: boolean
    offsetRight?: number
}
export enum ButtonType {
    Light,
    Primary,
    BigLight,
    BigPrimary
}

export default class Button extends React.Component<ButtonProps, {}> {
    render() {
        let {
            text,
            disabled,
            minWidth,
            type,
            selected,
            offsetRight,
            onClick
        } = this.props

        let className: string[] = [style.Button]

        if (disabled)
            className.push(style['Button--disabled'])

        if (selected)
            className.push(style.selected)

        let typeStyle = styleSwitch(
            type || ButtonType.Primary,
            {
                [ButtonType.Light]: style['Button--light'],
                [ButtonType.Primary]: style['Button--primary'],
                [ButtonType.BigLight]: style['Button--big_light'],
                [ButtonType.BigPrimary]: style['Button--big_primary'],
            }
        )

        className.push(typeStyle)

        return (
            <button
                disabled={disabled}
                onClick={ () => onClick ? onClick() : '' }
                className={combine(...className)}
                style={{
                    minWidth : minWidth ? minWidth : 55,
                    marginRight: offsetRight || 0
                }}
            >
                {text}
            </button>
        )
    }
}

