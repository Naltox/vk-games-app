import * as React from "react";

export const TableLine: React.SFC = props => {
    return (
        <tr>
            {props.children}
        </tr>
    )
}