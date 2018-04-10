import * as React from 'react'
const style = require('./TabBar.scss')

interface TabBarProps {
    tabs: React.ReactNode[]
    tabsOptions: { name: string, side?: 'left'|'right' }[]
    currentTab: number
    onChange(tab: number)
}

export default class TabBar extends React.Component<TabBarProps, {}> {
    render() {
        let {
            currentTab,
            tabs
        } = this.props

        return (
            <div>
                <div className={style.Head}>
                    <div className={style.Left}>
                        {this.renderLeftSideTabs()}
                    </div>
                    <div className={style.Right}>
                        {this.renderRightSideTabs()}
                    </div>
                </div>
                {tabs[currentTab]}
            </div>
        )
    }

    private renderLeftSideTabs() {
        let {
            currentTab,
            tabsOptions,
            onChange
        } = this.props

        return tabsOptions.map((tabName, i) => {
            if (tabName.side != 'left')
                return null

            let isActive = currentTab == i

            let className = style.TabName + ' ' + (isActive == true ? style.TabName_active : '')

            return (
                <div
                    className={className}
                    key={`left${i}`}
                    onClick={() => {
                        onChange(i)
                    }}
                >
                    {tabName.name}
                </div>
            )
        }).filter(t => t != null)
    }

    private renderRightSideTabs() {
        let {
            currentTab,
            tabsOptions,
            onChange
        } = this.props

        return tabsOptions.map((tabName, i) => {
            if (tabName.side == 'left')
                return null

            let isActive = currentTab == i

            if (!tabName.name)
                return (
                    <div
                        key={`right${i}`}
                    >
                        {this.props.tabs[tabsOptions.indexOf(tabName)]}
                    </div>
                )

            return (
                <div
                    className={style.TabName + ' ' + (isActive == true ? style.TabName_active : '')}
                    key={`right${i}`}
                    onClick={() => {
                        onChange(i)
                    }}
                >
                    {tabName.name}
                </div>
            )
        }).filter(t => t != null)
    }
}