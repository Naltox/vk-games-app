import * as React from 'react'
import Flex from "../../../uikit/components/flex/Flex";
import Title from "../../../uikit/components/title/Title";
import Button, {ButtonType} from "../../../uikit/components/input/button/Button";
import MarginV from "../../../uikit/components/marginV/MarginV";

interface NoGamesProps {
    onCreateGame: () => void
}

export const NoGames: React.SFC<NoGamesProps> = props => {
    return (
        <Flex align="center" justify="center" direction="column">
            <Title text="Пока нет созданных игр"/>
            <MarginV m={10}/>
            <Button
                text="Создать игру"
                type={ButtonType.BigPrimary}
                onClick={props.onCreateGame}
            />
        </Flex>
    )
}