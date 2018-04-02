import * as React from "react";
const style = require('./Table.scss')

export const TableHeadItem: React.SFC = props => {
    return (
        <th className={style.Item}>
            <div className={style.Content}>
                {props.children}
            </div>
        </th>
    )
}