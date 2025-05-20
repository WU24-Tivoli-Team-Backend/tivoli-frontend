'use client'

import React, { useState } from 'react'
import Header from '@/app/(app)/Header'
import GridPrinter from '@/components/tivoli/GridPrinter'

const GridDemo = () => {
    const [activeCell, setActiveCell] = useState(null)
    const [message, setMessage] = useState(
        'Click on any cell to move the avatar',
    )

    const specialCells = [
        {
            x: 1,
            y: 1,
            content: (
                <div className="p-2 text-center bg-yellow-100 rounded-md w-full h-full flex items-center justify-center">
                    <span className="text-sm">Center Cell</span>
                </div>
            ),
        },
        {
            x: 0,
            y: 2,
            content: (
                <div className="p-2 text-center bg-green-100 rounded-md w-full h-full flex items-center justify-center">
                    <span className="text-sm">Bottom Left</span>
                </div>
            ),
        },
        {
            x: 2,
            y: 0,
            content: (
                <div className="p-2 text-center bg-purple-100 rounded-md w-full h-full flex items-center justify-center">
                    <span className="text-sm">Top Right</span>
                </div>
            ),
        },
    ]

    const handleCellActivated = cellInfo => {
        setActiveCell(cellInfo)

        if (cellInfo.hasContent) {
            setMessage(
                `Avatar reached a special cell at (${cellInfo.x}, ${cellInfo.y})!`,
            )
        } else {
            setMessage(`Avatar moved to cell (${cellInfo.x}, ${cellInfo.y})`)
        }
    }

    return (
        <>
            <Header title="Tivoli!" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="mb-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                    Grid Navigation System
                                </h2>
                                <p className="text-gray-600">
                                    Click on any cell to move the avatar. When
                                    the avatar reaches a cell with content, it
                                    will trigger an event.
                                </p>
                                <div className="mt-4 p-4 bg-blue-50 rounded-md">
                                    <p className="text-sm text-blue-800">
                                        {message}
                                    </p>
                                </div>
                            </div>

                            <div className="flex justify-center">
                                <GridPrinter
                                    rows={5}
                                    cols={5}
                                    specialCells={specialCells}
                                    onCellActivated={handleCellActivated}
                                    avatarImage="/avatar-placeholder.png"
                                />
                            </div>

                            {activeCell && activeCell.hasContent && (
                                <div className="mt-6 p-4 bg-gray-50 rounded-md">
                                    <h3 className="text-lg font-medium text-gray-700 mb-2">
                                        Cell Information
                                    </h3>
                                    <p className="text-gray-600">
                                        Position: ({activeCell.x},{' '}
                                        {activeCell.y})
                                    </p>
                                    <p className="text-gray-600">
                                        Has special content:{' '}
                                        {activeCell.hasContent ? 'Yes' : 'No'}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GridDemo
