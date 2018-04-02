import * as React from 'react'
const style = require('./Title.scss')

export interface TitleProps {
    text: string
}

export default class Title extends React.Component<TitleProps, {}> {
    render() {
        return (
            <div className={style.Title}>
                {this.props.text}
            </div>
        )
    }
}
