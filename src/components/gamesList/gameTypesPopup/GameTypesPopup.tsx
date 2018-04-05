import * as React from 'react'
import Title from "../../../uikit/components/title/Title";
import MarginV from "../../../uikit/components/marginV/MarginV";
import WhitePopupBox from "../../../uikit/components/whitePopupBox/WhitePopupBox";
import BigTitle from "../../../uikit/components/bigTitle/BigTitle";
import TextView from "../../../uikit/components/textView/TextView";

interface GameTypesPopupProps {
    onClose()
}

export const GameTypesPopup: React.SFC<GameTypesPopupProps> = props => {
    return (
        <WhitePopupBox
            width={500}
            height={550}
            onClose={props.onClose}
        >
            <BigTitle text="Типы игр"/>
            <MarginV m={15}/>
            <Title text="Последний герой"/>
            <MarginV m={10}/>

            <TextView>
                В этом команды или игроки распределяются на пары (из этого следует, что их должно быть четное количество).
                <br/>
                <br/>
                Затем после каждого этапа проигравшая сторона в паре выбывает, а оставшиеся участники образуют новую пару.
                <br/>
                <br/>
                Игру длится до тех пор, пока не останется один игрок или команда.
            </TextView>

            <MarginV m={20}/>

            <Title text="На очки"/>
            <MarginV m={10}/>
            <TextView>
                Каждый игрок или команда соревнуются в каком-то виде деятельности указанное число раундов.
                <br/>
                <br/>
                По завершению каждого раунда игрок или команда получают "очки", по заваршении последнего раунда полученные очки суммируются и строится таблица показывающая результаты.
                <br/>
                <br/>
                Таким образом, отсортировав результаты по убыванию мы получим N победителей.
            </TextView>

        </WhitePopupBox>
    )
}