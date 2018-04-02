import * as React from "react";
import {TreeBlock} from "../block/TreeBlock";
import MarginV from "../../../uikit/components/marginV/MarginV";
import {VS} from "../vs/VS";

export const BlockEmpty: React.SFC = props => {
    return (
        <TreeBlock>
            <MarginV m={25}/>
            <VS/>
            <MarginV m={25}/>
        </TreeBlock>
    )
}