import * as React from 'react'


export interface FlexProps {
    align?: 'center' | 'start' | 'end',
    justify?: 'center' | 'space-around' | 'space-between',
    direction?: 'row' | 'column'
}

export default class Flex extends React.Component<FlexProps, {}> {
    render() {
        let {
            align,
            justify,
            direction
        } = this.props

        let style = {
            display: 'flex',
            alignItems: align || 'stretch',
            justifyContent: justify || 'flex-start',
            flexDirection: direction || 'row'
        }

        return (
            <div style={style as any}>
                {this.props.children}
            </div>
        )
    }
}
