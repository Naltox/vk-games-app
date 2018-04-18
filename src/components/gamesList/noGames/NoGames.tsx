import * as React from 'react'
import Title from "../../../uikit/components/title/Title";
const style = require('./NoGames.scss')

export const NoGames: React.SFC = props => {
    return (
        <div className={style.NoGamesWrap}>
            <div className={style.SadFace}>☹️</div>
            <Title text="Пока нет созданных игр"/>
        </div>
    )
}