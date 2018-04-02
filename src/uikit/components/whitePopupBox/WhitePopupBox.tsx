import * as React from 'react'
import OnclickOutside from "../onClickOutside/OnclickOutside";
const style = require('./WhitePopupBox.scss')

export interface WhitePopupBoxProps {
    width?: number
    height?: number
    onClose: () => void
}

export default class WhitePopupBox extends React.Component<WhitePopupBoxProps, {}> {
    render() {
        let {
            width,
            height,
            onClose,
            children
        } = this.props

        let modelStyle = {
            width: width || 450,
            height: height || ''
        }

        return (
            <div className={style.Wrap}>
                <div className={style.Back} onClick={() => onClose()}/>
                {/*<OnclickOutside onClick={onClose}>*/}
                    <div className={style.Modal} style={modelStyle}>
                        <div className={style.Body}>
                            {children}
                        </div>
                    </div>
                {/*</OnclickOutside>*/}
            </div>
        )
    }
}
