import * as React from 'react'
import ReactDOM = require('react-dom');

const style = require('./DropDown.scss')


interface DropDownProps {
    items: string[]
    onSelect(index: number, val: string)
    placeholder: string
    width: number
    showUp: boolean
    error: boolean
    selectedIndex: number|null
}

export default class DropDown extends React.Component<DropDownProps, any> {
    constructor(props) {
        super(props)

        this.state = {
            selectedIndex: props.selectedIndex !== null ? props.selectedIndex : (props.placeholder ? null : 0),
            isOpen: false,
            animated: false,
            placeholder: props.placeholder || null,
            itemsLength: props.items.length,
            showUp: props.showUp || false
        }

        this._handleClick = this._handleClick.bind(this)
    }

    _renderDesktopSelect(listClass, items, width) {
        return (
            <div className={listClass} style={{width: width + 20}}>
                {items.map((item, index) => {
                    return this._renderItem(item, index)
                })}
            </div>
        )
    }

    componentWillMount() {
        document.addEventListener('click', this._handleClick, false)
    }

    componentWillUnmount() {
        document.removeEventListener('click', this._handleClick, false)
    }

    _handleClick(e) {
        if (!ReactDOM.findDOMNode(this).contains(e.target))
            this.setState({ isOpen: false })
    }


    _renderItem(name, index) {
        return (
            <div
                className={style["DropDownList__item"]}
                key={index}
                onClick={() => {
                    this._select(index)
                }}
            >
                {name}
            </div>
        )
    }

    _openList() {
        this.setState({ isOpen: true, animated: true })
    }

    _select(index) {
        this.setState({ selectedIndex: index, isOpen: false })
        this.props.onSelect(index, this.props.items[index])
    }


    render() {
        const {
            items,
            error
        } = this.props

        const {
            isOpen,
            animated,
            showUp
        } = this.state


        const width = this.props.width - 22 || 300

        let listClass = style['DropDownList__list']
        let wrapperClass = style['DropDownList__wrap']

        if (showUp)
            listClass+= ' ' + style['up']

        let inputClass = style["DropDownList"] //+ ' ' + (error ? mainStyle.errorInput : 'input')

        if (items.length == 0) {
            listClass += ' ' + style['closed']
        }
        else if (isOpen) {
            inputClass += ' ' + style['DropDownList__open']
            listClass += ' ' + style['open']
            wrapperClass += '' + style[' open']

            if (showUp)
                wrapperClass += ' ' + style['up']
        }


        if (!isOpen && animated) {
            listClass +=  ' ' + style['close']
        } else if (!isOpen && !animated) {
            listClass += ' ' + style['closed']
        }

        let content

        if (this.state.placeholder && this.state.selectedIndex === null) {
            content = this.state.placeholder
        }
        else {
            let item = items[ Math.min( this.state.selectedIndex || 0, items.length - 1 ) ]
            if (typeof item == 'undefined') {
                content = ""
            } else {
                content = items[ Math.min( this.state.selectedIndex || 0, items.length-1 ) ]
            }
        }


        let mainBlockInputStyle = {
            width: width,
            backgroundPosition: `${width}px 13px`
        }

        return (
            <div className={wrapperClass}>
                <input
                    className={inputClass}
                    type="text"
                    value={content != this.state.placeholder ? content : ""}
                    placeholder={content == this.state.placeholder ? content : undefined}
                    onClick={() => this._openList()}
                    style={mainBlockInputStyle}
                    onChange={() => {}}
                />
                { this._renderDesktopSelect(listClass, items, width) }
            </div>
        )
    }
}
