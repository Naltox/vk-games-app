import * as React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {ActionCreators} from "../../actionCreators/ActionCreators";
import {hot} from "react-hot-loader";
import Title from "../../uikit/components/title/Title";
import TreeView from "../../components/survivalGame/treeView/TreeView";
import Block from "../../uikit/components/block/Block";
import TextField from "../../uikit/components/input/textField/TextField";
import MarginV from "../../uikit/components/marginV/MarginV";
import DropDown from "../../uikit/components/input/dropDown/DropDown";
const style = require('./TreeTest.scss')


const BLOCK_HEIGHT = 55
const BLOCK_WIDTH = 100


const positions: any = {}



const NUM = 64 / 2


const data = [
    ['0', '1', '2', '3', '4', '5', '6', '7'],

    ['0', '1', '2', '3'],
    //
    ['0', '1'],

    ['0']
]

class Lol extends React.Component<{}, {  lol: any }> {
    state = {lol: ''}
    render() {
        return (
            <TextField value={this.state.lol} onChange={v => {
                this.setState({
                    lol: v
                })
            }} placeholder="Участник" height={30}/>
        )
    }
}

class TreeTestContainer extends React.Component<{}, {  players: any }> {
    constructor(props) {
        super(props)

        this.state = {
            players: {}
        }
    }

    render() {

        // return (
        //     // In this case we rerendering TreeView for every input,
        //     // but
        //     <TreeView
        //         blockWidth={178}
        //         blockHeight={93}
        //         firstLineItemsCount={2}
        //         block={this.test}
        //     />
        // )


        return (
            <DropDown
                items={['1', '2']}
                placeholder={'dwd'}
                width={100}
                showUp={false}
                error={false}
                selectedIndex={null}
                onSelect={() => {}}
            />
        )
    }

    private test = (line, blockIndex) => {
        let {
            players
        } = this.state

        if (line === 0 ) {
            return (
                <div className={style.Box}>
                    {/*<TextField value={players[`${line}_${blockIndex}_1`] || ''} onChange={v => {*/}
                        {/*console.log(this.state)*/}
                        {/*this.setState({*/}
                            {/*players: {...this.state.players, [`${line}_${blockIndex}_1`]: v}*/}
                        {/*})*/}
                    {/*}} placeholder="Участник" height={30}/>*/}

                    <Lol/>
                    <div className={style.VS}>VS</div>
                    <TextField value={players[`${line}_${blockIndex}_2`] || ''} onChange={v => {
                        this.setState({
                            players: {...this.state.players, [`${line}_${blockIndex}_2`]: v}
                        })
                    }} placeholder="Участник" height={30}/>
                </div>
            )
        }


        return (
            <div className={style.Box} style={{width: 168}}>
                <MarginV m={30}/>
                <div className={style.VS}>VS</div>
                <MarginV m={30}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentScreen: state.root.currentScreen
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        ...ActionCreators.rootAC.getCreators(),
    }, dispatch)
}

const Component = connect<{}, {}, {}>(
    mapStateToProps,
    mapDispatchToProps
)(TreeTestContainer)

export default hot(module)(Component)