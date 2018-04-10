import * as React from "react";
import {TreeBlock} from "../block/TreeBlock";
import {VS} from "../vs/VS";
const style = require('./BlockEmpty.scss')

export const BlockEmpty: React.SFC = props => {
    return (
        <TreeBlock>
            <div className={style.ContentWrap}>
                <VS/>
            </div>
        </TreeBlock>
    )
}