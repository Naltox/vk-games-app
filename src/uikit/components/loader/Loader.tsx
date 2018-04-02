import * as React from 'react'
const style = require('./Loader.scss')

export default class Loader extends React.Component {
    render() {
        return (
            <div className={style.Loading}/>
        )
    }
}
