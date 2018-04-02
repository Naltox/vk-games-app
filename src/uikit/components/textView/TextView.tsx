import * as React from 'react'
const style = require('./TextView.scss')

interface TextViewProps {
    fontSize?: number
    align?: 'center' | 'left' | 'right'
    nowrap?: boolean
}

export default class TextView extends React.PureComponent<TextViewProps, {}> {
    render() {
        let {
            fontSize,
            align,
            nowrap
        } = this.props

        return (
            <div
                className={style.TextView}
                style={{
                    fontSize,
                    textAlign: align,
                    ...{
                        ...nowrap ? {
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden'
                        } : {}
                    }
                }}
            >
                {this.props.children}
            </div>
        )
    }
}
