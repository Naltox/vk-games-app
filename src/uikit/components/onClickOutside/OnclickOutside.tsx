import * as React from 'react'

interface ClickOnclickOutside {
    onClick(e: Event)
}

export default class OnclickOutside extends React.Component<ClickOnclickOutside, {}> {
    private container: HTMLElement

    constructor(props) {
        super(props)

        this.getContainer = this.getContainer.bind(this)
    }

    getContainer(ref) {
        this.container = ref
    }

    render() {
        const {
            children,
            onClick,
            ...props
        } = this.props

        return (
            <div
                {...props}
                ref={this.getContainer}
            >
                {children}
            </div>
        )
    }

    componentDidMount() {
        document.addEventListener('click', this.handle, true)
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handle, true)
    }

    handle = e => {
        const { onClick } = this.props
        const el = this.container


        console.log(e)


        if (!el.contains(e.target)) onClick(e)
    }
}