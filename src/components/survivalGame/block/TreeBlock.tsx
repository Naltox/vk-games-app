import * as React from "react";
const style = require('./TreeBlock.scss')

export class TreeBlock extends React.Component<{}, {}> {
    render() {
        return (
            <div className={style.TreeBlock}>
                {this.props.children}
            </div>
        )
    }
}