import * as React from "react";
const style = require('./TreeView.scss')

type Point = { x: number, y: number }

interface TreeViewProps {
    blockWidth: number
    blockHeight: number
    firstLineItemsCount: number
    block: (line: number, blockIndex: number) => React.ReactNode
    blocksOffset: number
    linesOffset: number
}


export default class TreeView extends React.Component<TreeViewProps, {}> {
    private coordinates: { [key: string]: Point } = {}

    render() {

        let blocks = this.renderBlocks()
        let lines = this.renderLines()

        return (
            <div className={style.TreeView}>
                {lines}
                {blocks}
            </div>
        )
    }

    private renderBlock(lineIndex: number, blockIndex: number, x: number, y: number) {
        let {
            block
        } = this.props


        return(
            <div style={{ top: y, left: x, position: 'absolute'}} key={`${lineIndex}_${blockIndex}`}>
                {block(
                    lineIndex,
                    blockIndex
                )}
            </div>
        )
    }

    private renderBlocks() {
        let {
            firstLineItemsCount,
            blockWidth,
            blockHeight,
            blocksOffset,
            linesOffset
        } = this.props


        let blocks: React.ReactNode[] = []

        let blocksInLine = firstLineItemsCount

        const totalLinesCount = Math.log2(firstLineItemsCount * 2)

        for (let lineIndex = 0; lineIndex < totalLinesCount; lineIndex++) {
            for (let index = 0; index < blocksInLine; index++) {

                let x = lineIndex * (blockWidth + linesOffset)
                let y = index * (blockHeight + blocksOffset) + (blockHeight * lineIndex)


                this.setBlockCoordinate(lineIndex, index, { x, y })

                if (this.getBlockCoordinate(lineIndex - 1, index)) {
                    let prevI = index == 0 ? 0 : 2 * index

                    let f = this.getBlockCoordinate(lineIndex - 1, prevI)
                    let s = this.getBlockCoordinate(lineIndex - 1, prevI + 1)

                    y = (f!.y + s!.y) / 2

                    this.setBlockCoordinate(lineIndex, index, { x, y })
                }


                blocks.push(
                    this.renderBlock(
                        lineIndex,
                        index,
                        x,
                        y
                    )
                )
            }

            blocksInLine = blocksInLine / 2
        }

        return blocks
    }

    private renderLines() {
        let {
            firstLineItemsCount,
            blockWidth,
            blockHeight,
            blocksOffset,
            linesOffset
        } = this.props

        let lines: React.ReactNode[] = []

        let blocksInLine = firstLineItemsCount

        const totalLinesCount = Math.log2(firstLineItemsCount * 2)


        for (let i = 0; i < totalLinesCount; i++) {

            for (let j = 0; j < blocksInLine; j++) {

                let f = this.getBlockCoordinate(i, j)
                let s = this.getBlockCoordinate(i + 1, ~~(j / 2))

                if (!s || !f)
                    continue

                if ((j % 2) === 0) {
                    lines.push(
                        <line
                            key={`line_sep_${i}_${j}`}
                            x1={s.x - 40}
                            y1={s.y + blockHeight / 2}
                            x2={s.x}
                            y2={s.y + blockHeight / 2}
                            style={{ stroke: '#2A5885', strokeWidth: '2'}}
                        />
                    )
                }

                lines.push(
                    <line
                        key={`line_${i}_${j}`}
                        x1={f.x + blockWidth}
                        y1={f.y + blockHeight / 2}
                        x2={s.x - 40}
                        y2={s.y + blockHeight / 2}
                        style={{ stroke: '#2A5885', strokeWidth: '2'}}
                    />
                )
            }

            blocksInLine = blocksInLine / 2
        }

        return (
            <svg
                height={firstLineItemsCount * ( blockHeight + blocksOffset )}
                width={totalLinesCount * ( blockWidth + linesOffset )}
                style={{position: 'relative', top: 0, left: 0}}
            >
                {lines}
            </svg>
        )
    }

    private getBlockCoordinate(line: number, block: number): Point|undefined {
        return this.coordinates[`${line}_${block}`]
    }

    private setBlockCoordinate(line: number, block: number, point: Point) {
        this.coordinates[`${line}_${block}`] = point
    }
}
