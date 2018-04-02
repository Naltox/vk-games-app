import * as React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {ActionCreators} from "../../actionCreators/ActionCreators";
import Loader from "../../uikit/components/loader/Loader";
import {hot} from "react-hot-loader";


interface RootContainerStateProps {
    currentScreen: string
}

interface RootContainerProps {
    routingSchema: { [key: string] : React.ComponentClass}
}

class RootContainer extends React.Component<RootContainerProps & RootContainerStateProps, {}> {
    render() {

        let {
            currentScreen,
            routingSchema
        } = this.props


        const ScreenContainer = routingSchema[currentScreen]


        if (ScreenContainer)
            return <ScreenContainer/>


        return <Loader/>
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

const Component = connect<RootContainerStateProps, {}, RootContainerProps>(
    mapStateToProps,
    mapDispatchToProps
)(RootContainer)

export default hot(module)(Component)