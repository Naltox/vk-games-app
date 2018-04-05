import * as React from 'react'
const style = require('./BigTitle.scss')

interface BigTitleProps {
    text: string
}

export default class BigTitle extends React.Component<BigTitleProps, {}> {
    render() {
        return (
            <div className={style.BigTitle}>
                {this.props.text}
            </div>
        )
    }
}
