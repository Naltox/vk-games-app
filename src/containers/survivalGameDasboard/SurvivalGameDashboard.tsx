import * as React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {ActionCreators} from "../../actionCreators/ActionCreators";
import {hot} from "react-hot-loader";
import Block from "../../uikit/components/block/Block";
import Flex from "../../uikit/components/flex/Flex";
import Title from "../../uikit/components/title/Title";
import Button from "../../uikit/components/input/button/Button";
import MarginV from "../../uikit/components/marginV/MarginV";
import ProgressBar from "../../uikit/components/progressBar/ProgressBar";
import SurvivalGame from "../../domain/entity/SurvivalGame";
import Loader from "../../uikit/components/loader/Loader";
import TreeView from "../../components/survivalGame/treeView/TreeView";
import {BlockWithInputs} from "../../components/survivalGame/blockWithInputs/BlockWithInputs";
import {BlockEmpty} from "../../components/survivalGame/blockEmpty/BlockEmpty";
import {isBlankString} from "../../utils/FormValidation";
import {ScorePopup} from "../../components/survivalGame/scorePopup/ScorePopup";
import SurvivalGameNode from "../../domain/entity/SurvivalGameNode";
import TabBar from "../../uikit/components/tabBar/TabBar";
import {PlayersList} from "../../components/playersList/PlayersList";
import GamePlayer from "../../domain/entity/GamePlayer";
import TextView from "../../uikit/components/textView/TextView";
import {BlockWithPlayers} from "../../components/survivalGame/blockWithPlayers/BlockWithPlayers";

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
                <Block wh100={true} padding="50px 50px 50px 50px">
                    {this.renderSetup()}
                </Block>
            )
        }

        if (this.isDone()) {
            return (
                <Block wh100={true} padding="50px 50px 50px 50px">
                    {this.renderHead()}
                    <MarginV m={20}/>
                    <TabBar
                        tabs={[
                            this.renderWinner(),
                            <div>
                                <MarginV m={15}/>
                                <Block height="calc(100vh - 200px)" overflow="scroll">
                                    {this.renderTree()}
                                </Block>
                            </div>,
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
                </Block>
            )
        }

        return (
            <Block wh100={true} padding="50px 50px 50px 50px">
                {this.renderHead()}
                <MarginV m={20}/>
                <TabBar
                    tabs={[
                        <div>
                            <MarginV m={15}/>
                            <Block height="calc(100vh - 200px)" overflow="scroll">
                                {this.renderTree()}
                            </Block>
                        </div>,
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
            </Block>
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
                <Block>
                    <Flex align="center" justify="space-between">
                        <Block width={200}>
                            <Title text={`Игра: "${game.name}"`}/>
                        </Block>
                        {this.isDone() ? <Title text="Завершена"/> : <div/>}
                        <Block width={200}>
                            <Block float="right">
                                <Button
                                    text="Назад"
                                    onClick={this.back}
                                />
                            </Block>
                        </Block>
                    </Flex>
                </Block>

                <MarginV m={15}/>

                <Block height="calc(100vh - 150px)" overflow="scroll">
                    {this.renderTree()}
                </Block>

                {
                    data.length == 0 ? (
                        <Block float="right">
                            <Button
                                text="Начать игру"
                                onClick={() => this.start()}
                            />
                        </Block>
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
            players.push(new GamePlayer('', 0, node.firstPlayer))
            players.push(new GamePlayer('', 0, node.secondPlayer))
        })

        return (
            <Block>
                <MarginV m={10}/>
                <PlayersList players={players}/>
            </Block>
        )
    }

    private renderHead() {
        let {
            game,
        } = this.props

        return (
            <Block>
                <Flex align="center" justify="space-between">
                    <Block width={200}>
                        <Title text={`Игра: "${game.name}"`}/>
                    </Block>
                    {this.isDone() ? <Title text="Завершена"/> : <div/>}
                    <Block width={200}>
                        <Block float="right">
                            <Button
                                text="Назад"
                                onClick={this.back}
                            />
                        </Block>
                    </Block>
                </Flex>

                {this.isDone() ? <div/> : (
                    <Flex justify="center">
                        <Block width={300}>
                            <Flex align="center" direction="column">
                                <Title text={'тур: ' + this.getRoundNum() + ' / ' + this.totalStagesNum()}/>
                                <MarginV m={7}/>
                                <ProgressBar progress={this.getRoundNum() / this.totalStagesNum() * 100}/>
                            </Flex>
                        </Block>
                    </Flex>
                )}
            </Block>
        )
    }

    private renderTree() {

        let {
            game
        } = this.props

        return (
            <TreeView
                blockWidth={140}
                blockHeight={79}
                firstLineItemsCount={game.playersCount / 2}
                block={this.renderBlock}
                blocksOffset={25}
                linesOffset={70}
            />
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

        // return (
        //     <div onClick={() => this.onBlockClick(blockInfo!)}>
        //         <TreeBlock>
        //             <MarginV m={13}/>
        //             <Title text={blockInfo.firstPlayer + ' ' + blockInfo.firstPlayerScore}/>
        //             <VS/>
        //             <MarginV m={13}/>
        //             <Title text={blockInfo.secondPlayer + ' ' + blockInfo.secondPlayerScore}/>
        //         </TreeBlock>
        //     </div>
        // )

        console.log(123)
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

            if (isBlankString(f) || isBlankString(s))
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
        return (
            <Block>
                <MarginV m={35}/>
                <TextView fontSize={125} align="center" nowrap={true}>
                    🥇 {this.getWinner()}
                </TextView>
            </Block>
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