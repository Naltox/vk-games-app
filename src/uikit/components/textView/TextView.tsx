import * as React from 'react'
const style = require('./TextView.scss')

interface TextViewProps {
    fontSize?: number
    align?: 'center' | 'left' | 'right'
}

export default class TextView extends React.PureComponent<TextViewProps, {}> {
    render() {
        let {
            fontSize,
            align
        } = this.props

        return (
            <div className={style.TextView} style={{ fontSize, textAlign: align }}>
                {this.props.children}
            </div>
        )
    }
}
