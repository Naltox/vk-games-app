import * as React from 'react'
import {combine, styleIf, styleSwitch} from "../../../utils/style";
const style = require('./TextField.scss')

interface ButtonProps {
    value: string
    onChange(value: string)
    placeholder?: string
    error?: boolean
    height?: number
    inputRef?: any
}

export default class TextField extends React.Component<ButtonProps, {}> {
    render() {
        let {
            value,
            onChange,
            placeholder,
            error,
            height,
            inputRef
        } = this.props


        let className = combine(style.TextField, styleIf(!!error, style.TextField_error))

        return (
            <input
                style={{ height }}
                className={className}
                type="text"
                value={value}
                placeholder={placeholder || ''}
                onChange={e => onChange(e.target.value)}
                ref={inputRef}
            />
        )
    }
}

