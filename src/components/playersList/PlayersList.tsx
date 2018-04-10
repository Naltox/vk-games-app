import * as React from "react";
import Block from "../../uikit/components/block/Block";
import GamePlayer from "../../domain/entity/GamePlayer";
import Title from "../../uikit/components/title/Title";
const style = require('./PlayersList.scss')

interface PlayersListProps {
    players: GamePlayer[]
}

export const PlayersList: React.SFC<PlayersListProps> = props => {
    return (
        <div>
            {props.players.map((player, index) => {
                return (
                    <div className={style.Player} key={index}>
                        <Title text={' ∙ ' + player.name}/>
                    </div>
                )
            })}
        </div>
    )
}