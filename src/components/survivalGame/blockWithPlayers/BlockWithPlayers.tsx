import * as React from "react";
import {TreeBlock} from "../block/TreeBlock";
import SurvivalGameNode from "../../../domain/entity/SurvivalGameNode";
import TextView from "../../../uikit/components/textView/TextView";
import MarginV from "../../../uikit/components/marginV/MarginV";
//const style = require('./BlockWithInputs.scss')

interface BlockWithPlayersProps {
    data: SurvivalGameNode
    onClick()
}

export class BlockWithPlayers extends React.PureComponent<BlockWithPlayersProps, {}> {
    render() {
        let {
            data,
            onClick
        } = this.props


        return (
            <div onClick={() => onClick()}>
                <TreeBlock >
                    <MarginV m={5}/>
                    <TextView align="center">
                        {data.firstPlayer}
                    </TextView>
                    <MarginV m={4}/>
                    <TextView align="center">
                        {this.isScoreSet() ? `${data.firstPlayerScore} : ${data.secondPlayerScore}` : '✏️'}
                    </TextView>
                    <MarginV m={4}/>
                    <TextView align="center">
                        {data.secondPlayer}
                    </TextView>
                    <MarginV m={5}/>
                </TreeBlock>
            </div>
        )
    }

    private isScoreSet(): boolean {
        let {
            data,
        } = this.props

        return data.firstPlayerScore > -1 && data.secondPlayerScore > -1
    }
}