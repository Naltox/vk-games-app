import * as React from "react";
import {TreeBlock} from "../block/TreeBlock";
import SurvivalGameNode from "../../../domain/entity/SurvivalGameNode";
import TextView from "../../../uikit/components/textView/TextView";
const style = require('./BlockWithPlayers.scss')

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
            <div className={style.Block} onClick={() => onClick()}>
                <TreeBlock>
                    <div className={style.TopWrap}>
                        {/*<TextView align="center" nowrap={true}>*/}
                            {data.firstPlayer}
                        {/*</TextView>*/}
                    </div>
                    <div className={this.isScoreSet() ? '' : style.Edit}>
                        {/*<TextView align="center" nowrap={true}>*/}
                        {this.isScoreSet() ? `${data.firstPlayerScore} : ${data.secondPlayerScore}` : '✏️'}
                        {/*</TextView>*/}
                    </div>
                    <div className={style.BottomWrap}>
                        {/*<TextView align="center" nowrap={true}>*/}
                            {data.secondPlayer}
                        {/*</TextView>*/}
                    </div>
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