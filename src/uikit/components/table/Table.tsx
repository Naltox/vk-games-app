import * as React from 'react'
import Block from "../block/Block";
const style = require('./Table.scss')

interface TableProps {
    head: React.ReactNode[]
    body: React.ReactNode[]
}

export default class Table extends React.Component<TableProps, {}> {
    render() {
        return (
            <div>
                <table className={style.Table}>
                    <thead>
                        <tr>
                            {this.props.head}
                        </tr>
                    </thead>

                    <tbody>
                        {this.props.body}
                    </tbody>
                </table>
            </div>
        )
    }
}
