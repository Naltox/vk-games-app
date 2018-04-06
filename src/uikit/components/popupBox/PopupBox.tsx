import * as React from 'react'
import {ReactNode} from "react";
const style = require('./PopupBox.scss')

interface PopupBoxProps {
    title: string,
    onClose(),
    body: ReactNode,
    bottom?: ReactNode,
    width?: number
}

export default class PopupBox extends React.Component<PopupBoxProps, {}> {
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
            onClose,
            body,
            bottom,
            width
        } = this.props

        return (
            <div className={style.QuoteCreationModal}>
                <div className={style.Back} onClick={() => onClose()}/>
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
