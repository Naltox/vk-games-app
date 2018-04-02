import * as React from "react";
import Block from "../../uikit/components/block/Block";
import GamePlayer from "../../domain/entity/GamePlayer";
import Title from "../../uikit/components/title/Title";
import MarginV from "../../uikit/components/marginV/MarginV";
import {SeparatorLine} from "../../uikit/components/separatorLine/SeparatorLine";
import Flex from "../../uikit/components/flex/Flex";

interface PlayersListProps {
    players: GamePlayer[]
}

export const PlayersList: React.SFC<PlayersListProps> = props => {
    return (
        <Block>
            {props.players.map((player, index) => {
                return (
                    <Block key={index}>
                        <MarginV m={7}/>
                        <Flex justify="center">
                            <Title text={' ∙ ' + player.name}/>
                        </Flex>
                        <MarginV m={7}/>
                        <SeparatorLine/>
                    </Block>
                )
            })}
        </Block>
    )
}