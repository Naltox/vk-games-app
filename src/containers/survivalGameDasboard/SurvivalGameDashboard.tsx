import * as React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {ActionCreators} from "../../actionCreators/ActionCreators";
import {hot} from "react-hot-loader";
import Title from "../../uikit/components/title/Title";
import Button from "../../uikit/components/input/button/Button";
import ProgressBar from "../../uikit/components/progressBar/ProgressBar";
import SurvivalGame from "../../domain/entity/SurvivalGame";
import Loader from "../../uikit/components/loader/Loader";
import TreeView from "../../components/survivalGame/treeView/TreeView";
import {BlockWithInputs} from "../../components/survivalGame/blockWithInputs/BlockWithInputs";
import {BlockEmpty} from "../../components/survivalGame/blockEmpty/BlockEmpty";
import {notBlankString} from "../../utils/FormValidation";
import {ScorePopup} from "../../components/survivalGame/scorePopup/ScorePopup";
import SurvivalGameNode from "../../domain/entity/SurvivalGameNode";
import TabBar from "../../uikit/components/tabBar/TabBar";
import {PlayersList} from "../../components/playersList/PlayersList";
import GamePlayer from "../../domain/entity/GamePlayer";
import {BlockWithPlayers} from "../../components/survivalGame/blockWithPlayers/BlockWithPlayers";
import BigTitle from "../../uikit/components/bigTitle/BigTitle";
const style = require('./SurvivalGameDashboard.scss')

interface SurvivalGameDashboardStateProps {
    dashboardGameId: string
    game: SurvivalGame
    data: SurvivalGameNode[]
}

interface SurvivalGameDashboardDispatchProps {
    openGamesScreen()
    loadGame(gameId: string)
    loadData(gameId: string)
    setScore(
        gameId: string,
        stage: number,
        gameIndex: number,
        firstPlayerScore: number,
        secondPlayerScore: number
    )
    addStage(
        gameId: string,
        stageData: SurvivalGameNode[]
    )
    resetDashboard()
}

interface SurvivalGameDashboardState {
    players: any

    currentTab: number

    scoreSelectingNode: Node|null
}

type Node = {
    index: number
    stageNumber: number
    firstPlayer: string
    secondPlayer: string
    firstPlayerScore: number
    secondPlayerScore: number
}

class SurvivalGameDashboard extends React.Component<SurvivalGameDashboardDispatchProps & SurvivalGameDashboardStateProps, SurvivalGameDashboardState> {
    constructor(props) {
        super(props)

        this.state = {
            players: {},

            currentTab: 0,
            scoreSelectingNode: null
        }
    }

    componentDidMount() {
        let {
            dashboardGameId,
            loadGame,
            loadData
        } = this.props

        loadGame(dashboardGameId)
        loadData(dashboardGameId)
    }

    render() {

        let {
            game,
            data
        } = this.props

        let {
            currentTab
        } = this.state

        if (!game || !data)
            return <Loader/>


        if (data.length === 0) {
            return (
                <div className={style.ContentWrap}>
                    {this.renderSetup()}
                </div>
            )
        }

        if (this.isDone()) {
            return (
                <div className={style.ContentWrap}>
                    {this.renderHead()}
                    <TabBar
                        tabs={[
                            this.renderWinner(),
                            this.renderTableTab(),
                            this.renderPlayers(),
                        ]}
                        tabsOptions={[
                            { name: 'Результат', side: 'left' },
                            { name: 'Турнирная таблица', side: 'left' },
                            { name: 'Участники', side: 'right' }
                        ]}
                        currentTab={currentTab}
                        onChange={this.onTabChange}
                    />

                    {this.renderScorePopup()}
                </div>
            )
        }

        return (
            <div className={style.ContentWrap}>
                {this.renderHead()}
                <TabBar
                    tabs={[
                        this.renderTableTab(),
                        this.renderPlayers(),
                    ]}
                    tabsOptions={[
                        { name: 'Турнирная таблица', side: 'left' },
                        { name: 'Участники', side: 'right' }
                    ]}
                    currentTab={currentTab}
                    onChange={this.onTabChange}
                />

                {this.renderScorePopup()}
            </div>
        )
    }

    private renderTableTab() {
        return (
            <div className={style.TableTab}>
                {this.renderTree()}
            </div>
        )
    }

    private renderScorePopup() {
        let {game} = this.props

        let {scoreSelectingNode} = this.state

        if (scoreSelectingNode)
            return (
                <ScorePopup
                    firstPlayer={scoreSelectingNode.firstPlayer}
                    secondPlayer={scoreSelectingNode.secondPlayer}
                    maxScore={game.maxPoints}
                    onSave={(f, s) => {
                        this.setScore(
                            scoreSelectingNode!.stageNumber,
                            scoreSelectingNode!.index,
                            f,
                            s
                        )
                    }}
                    onClose={() => this.setState({scoreSelectingNode: null})}
                />
            )

        return <div/>
    }

    private renderSetup() {
        let {
            game,
            data,
        } = this.props

        return (
            <div>
                <div className={style.HeaderTopWrap}>
                    <div className={style.Item}>
                        <div className={style.Title}>
                            {`Игра: "${game.name}"`}
                        </div>
                    </div>
                    <div className={style.Item}>
                        <a className={style.BackButton} onClick={this.back}>
                            Назад к списку игр
                        </a>
                    </div>
                </div>

                <div className={style.SetupTreeWrap}>
                    {this.renderTree()}
                </div>

                {
                    data.length == 0 ? (
                        <div className={style.StartGame}>
                            <Button
                                text="Начать игру"
                                onClick={() => this.start()}
                            />
                        </div>
                    ) : <div/>
                }
            </div>
        )
    }

    private renderPlayers() {
        let {
            data
        } = this.props

        let nodes = data.filter(node => node.stageNumber === 0)

        let players: GamePlayer[] = []

        nodes.forEach(node => {
            players.push(new GamePlayer('', 0, node.firstPlayer, 0))
            players.push(new GamePlayer('', 0, node.secondPlayer, 0))
        })

        return (
            <div className={style.PlayersTab}>
                <PlayersList players={players}/>
            </div>
        )
    }

    private renderHead() {
        let {
            game,
        } = this.props

        return (
            <div className={style.Head}>
                <div className={style.HeaderTopWrap}>
                    <div className={style.Item}>
                        <div className={style.Title}>
                            {`Игра: "${game.name}"`}
                        </div>
                    </div>
                    {
                        this.isDone() ? <Title text="Завершена"/> :
                            <div className={style.ProgressWrap}>
                                <Title text={'тур: ' + this.getRoundNum() + ' / ' + this.totalStagesNum()}/>
                                <div className={style.ProgressBar}>
                                    <ProgressBar progress={this.getRoundNum() / this.totalStagesNum() * 100}/>
                                </div>
                            </div>
                    }
                    <div className={style.Item}>
                        <div className={style.BackButton}>
                            <a className={style.BackButton} onClick={this.back}>
                                Назад к списку игр
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    private renderTree() {

        let {
            game
        } = this.props

        return (
            <div className={style.TreeWrap}>
                <TreeView
                    blockWidth={140}
                    blockHeight={79}
                    firstLineItemsCount={game.playersCount / 2}
                    block={this.renderBlock}
                    blocksOffset={25}
                    linesOffset={70}
                />
            </div>
        )
    }

    private isDone(): boolean {
        let {
            data
        } = this.props

        let stagesNum = this.totalStagesNum()

        let lastNode = data.find(node => node.stageNumber === stagesNum - 1)

        return !!lastNode && lastNode.firstPlayerScore > -1 && lastNode.secondPlayerScore > -1
    }

    private getRoundNum(): number {
        let {
            data
        } = this.props

        let stagesCount = this.totalStagesNum()


        for (let i = 0; i < stagesCount; i++) {
            if (!this.isStageClear(data, i))
                return i + 1
        }

        return 1
    }

    private totalStagesNum() {
        let {
            game
        } = this.props

        return Math.log2(game.playersCount)
    }

    private renderBlock = (line, blockIndex) => {
        let {
            players,

        } = this.state

        let {
            data
        } = this.props

        if (data.length === 0 && line === 0 ) {
            return (
                <BlockWithInputs
                    firstPlayer={players[`${blockIndex}_${0}`] || ''}
                    secondPlayer={players[`${blockIndex}_${1}`] || ''}
                    onChange={(player: number, value: string) => {
                        this.setState({
                            players: {...players, [`${blockIndex}_${player}`]: value }
                        })
                    }}
                />
            )
        }
        else if (data.length === 0)
            return <BlockEmpty/>


        let blockInfo = data.find(node => node.stageNumber === line && node.index === blockIndex)

        if (!blockInfo)
            return <BlockEmpty/>

        return (
            <BlockWithPlayers
                data={blockInfo}
                onClick={() => this.onBlockClick(blockInfo!)}
            />
        )
    }

    private onBlockClick(blockInfo: SurvivalGameNode) {
        if (
            blockInfo.secondPlayerScore > -1 ||
            blockInfo.firstPlayerScore > -1
        )
            return

        this.setState({ scoreSelectingNode: blockInfo })
    }

    private start() {
        if (!this.validateNames())
            return

        let {
            game,
            addStage
        } = this.props

        let {
            players
        } = this.state

        let nodesCount = game.playersCount / 2

        let nodes: SurvivalGameNode[] = []

        for (let i = 0; i < nodesCount; i++) {
            nodes.push(new SurvivalGameNode(
                '',
                game.id,
                i,
                0,
                players[`${i}_${0}`],
                players[`${i}_${1}`],
                -1,
                -1
            ))
        }

        addStage(game.id, nodes)
    }

    private validateNames(): boolean {
        let {
            game,
        } = this.props

        let {
            players
        } = this.state

        let nodesCount = game.playersCount / 2

        for (let i = 0; i < nodesCount; i++) {

            let f = players[`${i}_${0}`] || ''
            let s = players[`${i}_${1}`] || ''

            if (!notBlankString(f) || !notBlankString(s))
                return false
        }

        return true
    }

    private setScore(round: number, index: number, firstPlayer: number, secondPlayer: number) {
        let {
            setScore,
            addStage,
            game,
            data
        } = this.props

        let copy = [...data]

        setScore(
            game.id,
            round,
            index,
            firstPlayer,
            secondPlayer
        )

        this.setState({ scoreSelectingNode: null })

        let node = copy.find(n => n.stageNumber === round && n.index === index)!
        node.firstPlayerScore = firstPlayer
        node.secondPlayerScore = secondPlayer

        if (this.isStageClear(copy, round) && round !== this.totalStagesNum() - 1) {
            let nextScoreGames: SurvivalGameNode[] = []

            let gamesInNextStage = this.gamesInStage(round + 1)

            for (let i = 0; i < gamesInNextStage; i++) {
                let prevI = index == 0 ? 0 : 2 * i

                let f = copy.find(n => n.stageNumber === round && n.index === prevI)!
                let s = copy.find(n => n.stageNumber === round && n.index === prevI + 1)!

                nextScoreGames.push(
                    new SurvivalGameNode(
                        '',
                        game.id,
                        i,
                        round + 1,
                        f.firstPlayerScore  > f.secondPlayerScore ? f.firstPlayer : f.secondPlayer,
                        s.firstPlayerScore  > s.secondPlayerScore ? s.firstPlayer : s.secondPlayer,
                        -1,
                        -1
                    )
                )

            }
            addStage(game.id, nextScoreGames)
        }
    }

    private isStageClear(data: SurvivalGameNode[], stage: number): boolean {
        let {
            game,
        } = this.props

        let gamesInStage = (game.playersCount / 2) / Math.pow(2, stage)

        let isClear = true
        let count = 0

        for (let item of data) {
            if (item.stageNumber === stage) {
                count++
                if (item.firstPlayerScore === -1 || item.secondPlayerScore === -1)
                    isClear = false
            }
        }

        return isClear && (count === gamesInStage)
    }

    private gamesInStage(stage: number) {
        let {
            game
        } = this.props

        return (game.playersCount / 2) / Math.pow(2, stage)
    }

    private onTabChange = tab => {
        this.setState({ currentTab: tab })
    }

    private back = () => {
        let {
            resetDashboard,
            openGamesScreen
        } = this.props

        resetDashboard()
        openGamesScreen()
    }

    private getWinner() {
        let {
            data
        } = this.props

        let stagesNum = this.totalStagesNum()

        let node = data.find(node => node.stageNumber === stagesNum - 1)!

        if (node.firstPlayerScore > node.secondPlayerScore)
            return node.firstPlayer

        return node.secondPlayer
    }

    private renderWinner() {
        // return (
        //     <div className={style.WinnerWrap}>
        //         🥇 {this.getWinner()}
        //     </div>
        // )


        return (
            <div className={style.WinnerWrap}>
                <BigTitle text={`🥇 ${this.getWinner()}`}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        dashboardGameId: state.root.dashboardGameId,
        game: state.survivalGameDashboard.game,
        data: state.survivalGameDashboard.data
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        ...ActionCreators.rootAC.getCreators(),
        ...ActionCreators.routingAC.getCreators(),
        ...ActionCreators.survivalGameDashboard.getCreators(),
    }, dispatch)
}

const Component = connect<SurvivalGameDashboardStateProps, SurvivalGameDashboardDispatchProps, {}>(
    mapStateToProps,
    mapDispatchToProps
)(SurvivalGameDashboard)

export default hot(module)(Component)