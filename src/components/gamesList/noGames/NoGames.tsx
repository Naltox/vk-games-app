import * as React from 'react'
import Title from "../../../uikit/components/title/Title";
import Button, {ButtonType} from "../../../uikit/components/input/button/Button";
const style = require('./NoGames.scss')

interface NoGamesProps {
    onCreateGame()
}

export const NoGames: React.SFC<NoGamesProps> = props => {
    return (
        <div className={style.NoGamesWrap}>
            <div className={style.SadFace}>☹️</div>
            <Title text="Пока нет созданных игр"/>
        </div>
    )
}