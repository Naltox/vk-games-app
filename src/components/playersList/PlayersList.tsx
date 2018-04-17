import * as React from "react";
import GamePlayer from "../../domain/entity/GamePlayer";
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
                        <span className={style.Square}> ▪ </span><span className={style.Name}>{player.name}</span>
                    </div>
                )
            })}
        </div>
    )
}