import * as React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {ActionCreators} from "../../actionCreators/ActionCreators";
import Title from "../../uikit/components/title/Title";
import Button from "../../uikit/components/input/button/Button";
import Block from "../../uikit/components/block/Block";
import Loader from "../../uikit/components/loader/Loader";
import Flex from "../../uikit/components/flex/Flex";
import MarginV from "../../uikit/components/marginV/MarginV";
import GamePlayer from "../../domain/entity/GamePlayer";
import TabBar from "../../uikit/components/tabBar/TabBar";
import {PlayersList} from "../../components/playersList/PlayersList";
import GameRoundScore from "../../domain/entity/GameRoundScore";
import ProgressBar from "../../uikit/components/progressBar/ProgressBar";
import GameForPoints from "../../domain/entity/GameForPoints";
import Table from "../../uikit/components/table/Table";
import {ResultsBoard} from "../../components/pointsGame/resultsBoard/ResultsBoard";
import {RoundScore} from "../../components/pointsGame/roundScore/RoundScore";
import {TableHeadItem} from "../../uikit/components/table/TableHeadItem";
import {TableLine} from "../../uikit/components/table/TableLine";
import {TableCell} from "../../uikit/components/table/TableCell";
import {PointsGameTableItem} from "../../actionCreators/PointsGameDashboardAC";

interface GameForPointsDashboardStateProps {
    dashboardGameId: string
    game: GameForPoints
    players: GamePlayer[]
    score: GameRoundScore[]
    tableData: PointsGameTableItem[]
}

interface GameForPointsDashboardDispatchProps {
    openGamesScreen()
    loadGame(gameId: string)
    loadPlayers(gameId: string)
    loadScore(gameId: string)
    addScore(gameId: string, score: GameRoundScore[])
    resetDashboard()
    loadTableData(gameId: string)
}

interface GameForPointsDashboardState {
    currentTab: number

    score: { [key: string] : number }
}

class GameForPointsDashboard extends React.Component<GameForPointsDashboardDispatchProps & GameForPointsDashboardStateProps, GameForPointsDashboardState> {
    constructor(props) {
        super(props)

        this.state = {
            currentTab: 0,

            score: { }
        }
    }

    componentDidMount() {
        let {
            dashboardGameId,
            loadGame,
            loadPlayers,
            loadScore,
            loadTableData
        } = this.props

        loadGame(dashboardGameId)
        loadPlayers(dashboardGameId)
        loadScore(dashboardGameId)
        loadTableData(dashboardGameId)
    }

    componentWillReceiveProps(nextProps: GameForPointsDashboardStateProps) {
        if (nextProps.players) {
            let score = { }

            for (let player of nextProps.players) {
                score[player.id] = 0
            }

            this.setState({
                score
            })
        }
    }

    render() {
        let {
            game,
            players,
            score,
            tableData
        } = this.props

        let {
            currentTab,
        } = this.state

        if (!game || !players || !score || !tableData)
            return <Loader/>

        if (!this.isDone())
            return (
                <Block wh100={true} padding="50px 50px 50px 50px">
                    {this.renderHead()}
                    <TabBar
                        tabs={[
                            this.renderCurrentRound(),

                            <Block overflow="scroll" padding="0px 0px 15px 0px" height="calc(100vh - 200px)">
                                <Table
                                    head={this.renderTableHead()}

                                    body={this.renderTableBody()}
                                />
                            </Block>,


                            this.renderPlayers(),


                        ]}
                        tabsOptions={[
                            { name: 'Текущий раунд', side: 'left' },
                            { name: 'Турнирная таблица', side: 'left' },
                            { name: 'Участники', side: 'right' }
                        ]}
                        currentTab={currentTab}
                        onChange={this.onTabChange}
                    />
                </Block>
            )

        return (
            <Block wh100={true} padding="50px 50px 50px 50px">
                {this.renderHead()}
                <MarginV m={20}/>
                <TabBar
                    tabs={[
                        <ResultsBoard
                            winners={this.getWinners()}
                            players={this.props.players}
                        />,
                        <Block overflow="scroll" padding="0px 0px 15px 0px" height="calc(100vh - 200px)">
                            <Table
                                head={this.renderTableHead()}

                                body={this.renderTableBody()}
                            />
                        </Block>,
                        this.renderPlayers(),
                    ]}
                    tabsOptions={[
                        { name: 'Результаты', side: 'left' },
                        { name: 'Турнирная таблица', side: 'left' },
                        { name: 'Участники', side: 'right' }
                    ]}
                    currentTab={currentTab}
                    onChange={this.onTabChange}
                />
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
                                onClick={() => {
                                    this.props.resetDashboard()
                                    this.props.openGamesScreen()
                                }}
                            />
                        </Block>
                    </Block>
                </Flex>

                {this.isDone() ? <div/> : (
                    <Flex justify="center">
                        <Block width={300}>
                            <Flex align="center" direction="column">
                                <Title text={'раунд: ' + this.getRoundNum() + ' / ' + game.roundsNumber}/>
                                <MarginV m={7}/>
                                <ProgressBar progress={this.getRoundNum() / game.roundsNumber * 100}/>
                            </Flex>
                        </Block>
                    </Flex>
                )}
            </Block>
        )
    }

    private renderCurrentRound() {
        let {
            game,
            players,
        } = this.props

        let {
            score

        } = this.state

        return (
            <RoundScore
                game={game}
                players={players}
                roundNumber={this.getRoundNum()}
                score={score}

                onSaveScore={this.saveScore}
                onScoreChange={this.scoreChange}
            />
        )
    }

    private renderPlayers() {
        let {
            players
        } = this.props

        return (
            <Block>
                <MarginV m={10}/>
                <PlayersList players={players}/>
            </Block>
        )
    }

    private getRoundNum() {
        let {
            score
        } = this.props

        if (score.length === 0)
            return 1

        return score[score.length - 1].roundNumber + 1
    }

    private isDone(): boolean {
        let {
            score,
            game
        } = this.props

        if (score.length === 0)
            return false

        return score[score.length - 1].roundNumber == game.roundsNumber
    }

    private scoreChange = (playerId: string, newScore: number) => {
        let {
            score
        } = this.state

        this.setState({
            score: { ...score, [playerId]: newScore }
        })
    }

    private saveScore = () => {
        let {
            score
        } = this.state

        let {
            dashboardGameId,
            addScore,
            loadTableData
        } = this.props

        let roundScore: GameRoundScore[] = []

        for (let key in score) {
            roundScore.push(new GameRoundScore(
                '',
                dashboardGameId,
                key,
                this.getRoundNum(),
                score[key]
            ))
        }

        addScore(dashboardGameId, roundScore)
        loadTableData(dashboardGameId)
    }

    private onTabChange = tab => {
        this.setState({ currentTab: tab })
    }

    private getWinners(): [string, number][][] {
        let {
            game,
            score
        } = this.props

        let points = {}

        for (let roundScore of score) {
            if (!points[roundScore.playerId])
                points[roundScore.playerId] = roundScore.score
            else
                points[roundScore.playerId] += roundScore.score
        }

        let sortedPlayers: [string, number][] = []

        for (let id in points) {
            sortedPlayers.push([id, points[id]])
        }

        sortedPlayers = sortedPlayers.sort((a, b) => b[1] - a[1])


        let winners: [string, number][][] = []

        let i = 0

        while (i < sortedPlayers.length) {
            if (i === sortedPlayers.length - 1 || sortedPlayers[i][1] !== sortedPlayers[i + 1][1]) {
                winners.push([sortedPlayers[i]])
                i++
            }
            else {
                let val = sortedPlayers[i][1]
                let ar: [string, number][] = [sortedPlayers[i]]

                while (sortedPlayers[i + 1] && sortedPlayers[i + 1][1] === val) {
                    ar.push(sortedPlayers[i + 1])
                    i += 1
                }

                i++

                winners.push(ar)
            }
        }

        return winners.slice(0, game.winnersCount)
    }

    private renderTableBody() {
        let {
            tableData,
            game
        } = this.props


        let rows: React.ReactNode[] = []

        let lineIndex = 0

        for (let data of tableData) {
            let row: React.ReactNode[] = []

            row.push(
                <TableCell key="cell_0">{data.player.name}</TableCell>
            )

            let i = 1
            for (let score of data.score) {
                row.push(
                    <TableCell key={`cell_${i}`}>{score.score}</TableCell>
                )
                i++
            }

            if (row.length < game.roundsNumber + 1) {
                for (let i = row.length; i <= game.roundsNumber; i++) {
                    row.push(
                        <TableCell key={`cell_${i}`}>-</TableCell>
                    )
                }
            }

            console.log('\n')

            rows.push(<TableLine key={`line_${lineIndex}`}>{row}</TableLine>)
            lineIndex++
        }

        return rows
    }

    private renderTableHead() {
        let {
            game
        } = this.props


        let roundNames: React.ReactNode[] = []

        for (let i = 0; i < game.roundsNumber; i++) {
            roundNames.push(
                <TableHeadItem key={`head_${i + 1}`}>
                    {`Раунд - ${i + 1}`}
                </TableHeadItem>
            )
        }

        return [
            <TableHeadItem key="head_0">
                Участник
            </TableHeadItem>,
            ...roundNames
        ]
    }
}

function mapStateToProps(state) {
    return {
        dashboardGameId: state.root.dashboardGameId,
        game: state.pointsGameDashboard.game,
        players: state.pointsGameDashboard.players,
        score: state.pointsGameDashboard.score,
        tableData: state.pointsGameDashboard.tableData
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        ...ActionCreators.rootAC.getCreators(),
        ...ActionCreators.routingAC.getCreators(),
        ...ActionCreators.pointsGameDashboard.getCreators()
    }, dispatch)
}

export default connect<GameForPointsDashboardStateProps, GameForPointsDashboardDispatchProps, {}>(
    mapStateToProps,
    mapDispatchToProps
)(GameForPointsDashboard)