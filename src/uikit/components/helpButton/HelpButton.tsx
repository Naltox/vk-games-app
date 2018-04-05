import * as React from 'react'
const style = require('./Help.scss')

interface HelpButtonProps {
    onClick?()
}

export default class HelpButton extends React.Component<HelpButtonProps, {}> {
    render() {
        let { onClick } = this.props

        return (
            <div
                className={style.Help}
                onClick={() => onClick ? onClick() : ''}
            />
        )
    }
}
