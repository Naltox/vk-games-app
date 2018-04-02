import * as React from 'react'
import Button, {ButtonType} from "../input/button/Button";
import {ReactNode} from "react";
import OnclickOutside from "../onClickOutside/OnclickOutside";
const style = require('./PopupBox.scss')

export interface PopupBoxProps {
    title: string,
    onClose: () => void,
    body: ReactNode,
    bottom?: ReactNode,
    width?: number
}

export default class PopupBox extends React.Component<PopupBoxProps, {}> {
    render() {
        let {
            title,
            onClose,
            body,
            bottom,
            width
        } = this.props

        return (
            <div className={style.QuoteCreationModal}>
                <div className={style.Back} onClick={() => onClose()}/>
                {/*<OnclickOutside onClick={onClose}>*/}
                    <div className={style.Modal} style={{ width: width || 456}}>
                        <div className={style.Head}>
                            <div className={style.Title}>{title}</div>
                            <div className={style.Close} onClick={() => onClose()}/>
                        </div>
                        <div className={style.Body}>
                            {body}
                        </div>

                        {bottom ? (
                            <div className={style.Buttons}>
                                {bottom}
                            </div>
                        ) : (
                            <div/>
                        )}
                    </div>
                {/*</OnclickOutside>*/}
            </div>
        )
    }
}
