import * as React from "react";
const style = require('./Table.scss')

export const TableCell: React.SFC = props => {
    return (
        <td  className={style.Item}>
            {props.children}
        </td>
    )
}