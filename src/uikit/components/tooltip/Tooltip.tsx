import * as React from 'react'
import {combine} from "../../utils/style";
const style = require('./Tooltip.scss')

export default class Tooltip extends React.PureComponent<{ show: boolean }, {}> {
    render() {

        let {
            show,
            children
        } = this.props

        let className = combine(style.Tooltip, show ? style.Tooltip_active : '')

        return (
            <div>
                <div className={className}>
                    {children}
                </div>
            </div>
        )
    }
}
