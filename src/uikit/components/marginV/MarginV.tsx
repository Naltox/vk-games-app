import * as React from 'react'

/**
 * Provides <div> with chosen height & 100% width
 *
 * Useful for vertical margins
 */

interface MarginVProps {
    m: number
}

export default class MarginV extends React.Component<MarginVProps, {}> {
    render() {
        let {m} = this.props

        let style = {
            marginTop: m,
            width: '100%'
        }

        return (
            <div style={style}>
                {this.props.children}
            </div>
        )
    }
}
