import * as React from "react";
import {connect} from "react-redux";
import {ActionCreators} from "../../actionCreators/ActionCreators";
import {bindActionCreators} from "redux";
import BaseGame from "../../domain/entity/BaseGame";
import {NewGameInfo, default as NewGamePopup} from "../../components/gamesList/newGamePopup/NewGamePopup";
import Block from "../../uikit/components/block/Block";
import {NoGames} from "../../components/gamesList/noGames/NoGames";
import PlayersCreationPopup from "../../components/gamesList/playersCreationPopup/PlayersCreationPopup";
import {GameTypesPopup} from "../../components/gamesList/gameTypesPopup/GameTypesPopup";
import Loader from "../../uikit/components/loader/Loader";
import Title from "../../uikit/components/title/Title";
import Flex from "../../uikit/components/flex/Flex";
import Button, {ButtonType} from "../../uikit/components/input/button/Button";
import {SeparatorLine} from "../../uikit/components/separatorLine/SeparatorLine";
import MarginV from "../../uikit/components/marginV/MarginV";
import XButton from "../../uikit/components/xButton/XButton";
import GameForPoints from "../../domain/entity/GameForPoints";
import SurvivalGame from "../../domain/entity/SurvivalGame";
const style = require('./GamesList.scss')

export interface GamesListContainerProps {
    games?: BaseGame[]
}

interface GamesListContainerDispatchProps {
    loadGames()
    addGameForPoints(gameInfo: NewGameInfo, players: string[])
    addSurvivalGame(gameInfo: NewGameInfo)
    removeGame(gameId: string)
    openPointsGameDashboard(gameId: string)
    opeSurvivalGameDashboard(gameId: string)
}

interface GamesListContainerState {
    modalsStack: (() => React.ReactNode)[]

    newGameInfo: NewGameInfo|null

    newGamePLayers: string[]|null
}

class GamesListContainer extends React.Component<GamesListContainerProps & GamesListContainerDispatchProps, GamesListContainerState> {
    constructor(props) {
        super(props)

        this.state = {
            modalsStack: [],

            newGameInfo: null,

            newGamePLayers: null
        }
    }

    componentWillMount() {
        this.props.loadGames()
    }

    render() {
        let {
            games,
            openPointsGameDashboard
        } = this.props


        if (!games) {
            return <Loader/>
        }

        if (games.length === 0)
            return (
                <Block padding={10}>
                    <NoGames onCreateGame={this.openNewGamePopup}/>
                    {this.renderModals()}
                </Block>
            )

        return (
            <div className={style.GamesList}>
                <Flex justify="space-between" align="center">
                    <Title text="Игры"/>
                    <Button
                        text="Добавить игру"
                        onClick={this.openNewGamePopup}
                        type={ButtonType.Primary}
                    />
                </Flex>
                <MarginV m={20}/>
                <SeparatorLine/>
                <MarginV m={20}/>
                <div className={style.List}>
                    {games.map((game, index) => {
                        return (
                            <Block key={index} onClick={() => this.openGameDashboard(game)}>
                                <Block padding={10}>
                                    <Flex justify="space-between">
                                        <Title text={game.name}/>
                                        <XButton onClick={() => {
                                            this.deleteGame(game.id)
                                        }}/>
                                    </Flex>
                                </Block>
                                <MarginV m={20}/>
                            </Block>
                        )
                    })}
                </div>
                {this.renderModals()}
            </div>
        )
    }

    private openGameDashboard(game: BaseGame) {
        let {
            openPointsGameDashboard,
            opeSurvivalGameDashboard
        } = this.props

        if (game instanceof GameForPoints)
            openPointsGameDashboard(game.id)
        if (game instanceof SurvivalGame)
            opeSurvivalGameDashboard(game.id)
    }

    private renderGameTypesPopup = () => {
        return <GameTypesPopup onClose={this.modalsPop}/>
    }

    private openGameTypesPopup = () => {
        this.modalsPush(this.renderGameTypesPopup)
    }

    private openNewGamePopup = () => {
        this.modalsPush(this.renderNewGamePopup)
    }

    private renderNewGamePopup = () => {
        return (
            <NewGamePopup
                onClose={this.modalsPop}
                onHelp={this.openGameTypesPopup}
                onSave={newGameInfo => {
                    if (newGameInfo.type === 'for_points') {
                        this.setState({ newGameInfo })
                        this.modalsPop(() => {
                            this.openPlayersPopup()
                        })
                    }
                    else if (newGameInfo.type === 'survival') {
                        this.props.addSurvivalGame(newGameInfo)
                        this.modalsPop()
                    }
                }}
            />
        )
    }

    private openPlayersPopup = () => {
        this.modalsPush(this.renderPlayersPopup)
    }

    private renderPlayersPopup = () => {
        let {
            newGameInfo
        } = this.state

        return (
            <PlayersCreationPopup
                onClose={this.modalsPop}
                onSave={players => {
                    this.props.addGameForPoints(
                        this.state.newGameInfo!,
                        players
                    )
                    this.modalsPop()
                }}
                minCount={newGameInfo!.winnersCount > 2 ? newGameInfo!.winnersCount : 2}
            />
        )
    }

    private renderModals() {
        let {modalsStack} = this.state

        return modalsStack.map((modal, index) => {
            return (
                <div key={index}>
                    {modal()}
                </div>
            )
        })
    }

    private modalsPush(modal: () => React.ReactNode) {
        let {modalsStack} = this.state

        this.setState({
            modalsStack: [...modalsStack, modal]
        })
    }

    private modalsPop = (cb?) => {
        let {modalsStack} = this.state

        this.setState({
            modalsStack: modalsStack.slice(0, -1)
        }, cb)
    }

    private deleteGame(gameId) {
        this.props.removeGame(gameId)
    }
}

function mapStateToProps(state) {
    return {
        games: state.root.games
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        ...ActionCreators.rootAC.getCreators(),
        ...ActionCreators.routingAC.getCreators()
    }, dispatch)
}

export default connect<GamesListContainerProps, GamesListContainerDispatchProps, {}>(
    mapStateToProps,
    mapDispatchToProps
)(GamesListContainer)