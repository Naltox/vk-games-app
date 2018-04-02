import * as React from "react";
const style = require('./TreeBlock.scss')

export class TreeBlock extends React.Component<{}, {}> {
    render() {
        return (
            <div className={style.TreeBlock} style={{ width: 140 }}>
                {this.props.children}
            </div>
        )
    }
}