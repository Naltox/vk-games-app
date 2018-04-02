import * as React from 'react'
const style = require('./ProgressBar.scss')

interface ProgressBarProps {
    progress: number
}

export default class ProgressBar extends React.Component<ProgressBarProps, {}> {
    render() {
        return (
            <div className={style.ProgressBar}>
                <div style={{ width: this.props.progress+ '%' }}>
                    <div className={style.inner}/>
                </div>
            </div>
        )
    }
}
