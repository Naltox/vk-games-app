import * as React from "react";
import {TreeBlock} from "../block/TreeBlock";
import SurvivalGameNode from "../../../domain/entity/SurvivalGameNode";
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
                        {data.firstPlayer}
                    </div>
                    <div className={this.isScoreSet() ? '' : style.Edit}>
                        {this.isScoreSet() ? `${data.firstPlayerScore} : ${data.secondPlayerScore}` : '✏️'}
                    </div>
                    <div className={style.BottomWrap}>
                        {data.secondPlayer}
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