import * as React from 'react'
import Title from "../../../uikit/components/title/Title";
import Button, {ButtonType} from "../../../uikit/components/input/button/Button";
const style = require('./NoGames.scss')

interface NoGamesProps {
    onCreateGame()
}

export const NoGames: React.SFC<NoGamesProps> = props => {
    return (
        <div>
            <Title text="Пока нет созданных игр"/>
            <div className={style.CreateGame}>
                <Button
                    text="Создать игру"
                    type={ButtonType.BigPrimary}
                    onClick={props.onCreateGame}
                />
            </div>
        </div>
    )
}