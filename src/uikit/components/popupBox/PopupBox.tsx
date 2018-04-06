import * as React from 'react'
import {ReactNode} from "react";
import {ErrorPopup} from "../../../components/errorPopup/ErrorPopup";
const style = require('./PopupBox.scss')

interface PopupBoxProps {
    title: string
    body: ReactNode
    bottom?: ReactNode
    width?: number
    closeFromOutside?: boolean

    onClose()
}

interface PopupBoxState {
    showCloseConfirm: boolean
}

export default class PopupBox extends React.Component<PopupBoxProps, PopupBoxState> {
    private keyUpListener = event => {
        if (event.keyCode == 27)
            this.props.onClose()
    }

    componentDidMount() {
        document.addEventListener('keyup', this.keyUpListener)
    }

    componentWillUnmount() {
        document.removeEventListener('keyup', this.keyUpListener)
    }

    render() {
        let {
            title,
            body,
            bottom,
            width,
            closeFromOutside,

            onClose
        } = this.props

        return (
            <div className={style.QuoteCreationModal}>
                <div className={style.Back} onClick={() => closeFromOutside ? onClose() : ''}/>
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
            </div>
        )
    }
}
