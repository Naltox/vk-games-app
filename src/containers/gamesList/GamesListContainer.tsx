import * as React from "react";
import {connect} from "react-redux";
import {ActionCreators} from "../../actionCreators/ActionCreators";
import {bindActionCreators} from "redux";
import BaseGame from "../../domain/entity/BaseGame";
import {NewGameInfo, default as NewGamePopup} from "../../components/gamesList/newGamePopup/NewGamePopup";
import {NoGames} from "../../components/gamesList/noGames/NoGames";
import PlayersCreationPopup from "../../components/gamesList/playersCreationPopup/PlayersCreationPopup";
import {GameTypesPopup} from "../../components/gamesList/gameTypesPopup/GameTypesPopup";
import Loader from "../../uikit/components/loader/Loader";
import Title from "../../uikit/components/title/Title";
import Button, {ButtonType} from "../../uikit/components/input/button/Button";
import GameForPoints from "../../domain/entity/GameForPoints";
import SurvivalGame from "../../domain/entity/SurvivalGame";
import {GamesList} from "../../components/gamesList/gamesList/GamesList";
const style = require('./GamesList.scss')

interface GamesListContainerProps {
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
        } = this.props


        if (!games) {
            return <Loader/>
        }

        return (
            <div className={style.GamesList}>
                <div className={style.Head}>
                    <div className={style.Title}>Игры</div>
                    <Button
                        text="Добавить игру"
                        onClick={this.openNewGamePopup}
                        type={ButtonType.Primary}
                    />
                </div>
                {this.renderGamesList()}
                {this.renderModals()}
            </div>
        )
    }

    private renderGamesList() {
        let {
            games
        } = this.props

        if (games!.length === 0) {
            return <NoGames onCreateGame={this.openNewGamePopup}/>
        }

        return (
            <GamesList
                games={games!}
                onDelete={id => this.deleteGame(id)}
                onOpen={game => this.openGameDashboard(game)}
            />
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