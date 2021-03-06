import * as React from 'react'
const style = require('./XButton.scss')

interface XButtonProps {
    onClick?()
}

export default class XButton extends React.Component<XButtonProps, {}> {
    render() {
        let { onClick } = this.props

        return (
            <div
                className={style.XButton}
                onClick={e => {
                    onClick ? onClick() : ''

                    e.stopPropagation()
                }}
            />
        )
    }
}
