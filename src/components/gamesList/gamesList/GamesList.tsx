import * as React from "react";
import BaseGame from "../../../domain/entity/BaseGame";
import Title from "../../../uikit/components/title/Title";
import XButton from "../../../uikit/components/xButton/XButton";
const style = require('./GamesList.scss')

interface GamesListProps {
    games: BaseGame[]

    onDelete(gameId: string)
    onOpen(game: BaseGame)
}

export const GamesList: React.SFC<GamesListProps> = props => {
    let {
        games,

        onDelete,
        onOpen
    } = props

    return (
        <div className={style.List}>
            {games.map((game, index) => {
                return (
                    <div className={style.Line} onClick={() => onOpen(game)} key={index}>
                        <Title text={game.name}/>
                        <XButton onClick={() => onDelete(game.id)}/>
                    </div>
                )
            })}
        </div>
    )
}