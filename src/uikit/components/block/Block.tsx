import * as React from 'react'

interface BlockProps {
    width?: number
    height?: number|string
    padding?: number|string
    float?: 'left'|'right'
    onClick?()
    wh100?: boolean
    flexShrink?: number
    overflow?: "auto" | "hidden" | "scroll" | "visible" | "inherit"
}

export default class Block extends React.Component<BlockProps, {}> {
    render() {
        let {
            width,
            padding,
            float,
            onClick,
            wh100,
            flexShrink,
            height,
            overflow
        } = this.props



        let style = {
            width,
            padding,
            float,
            flexShrink,
            height,
            overflow,
            ...(
                wh100 ? {
                    width: '100%',
                    height: '100%'
                } : {}
            ),
            boxSizing: 'border-box'
        } as React.CSSProperties

        return (
            <div style={style} onClick={() => onClick ? onClick() : ''}>
                {this.props.children}
            </div>
        )
    }
}
