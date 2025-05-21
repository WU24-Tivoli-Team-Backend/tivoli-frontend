'use client'

import React, { useEffect, useState } from 'react'
import Header from '@/app/(app)/Header'
import GridPrinter from '@/components/tivoli/GridPrinter'
import { useFetch } from '@/hooks/useFetch'
import AmusementCard from '@/components/amusement/AmusementCard'
import Button from '@/components/Button'
import Modal from '@/components/tivoli/Modal'

const GridDemo = () => {
    const [activeCell, setActiveCell] = useState(null)
    const [message, setMessage] = useState(
        'Click on any cell to move the avatar',
    )
    const amusementsApiUrl = `/api/amusements`
    const {
        data: amusementData,
        error: amusementError,
        loading: amusementLoading,
        refetch,
    } = useFetch(amusementsApiUrl)

    const [openModalId, setOpenModalId] = useState(null)
    const [lastVisitedCell, setLastVisitedCell] = useState(null)

    // Open the modal for a specific amusement card
    const openModal = id => {
        setOpenModalId(id)
    }

    // Close the modal
    const closeModal = () => {
        setOpenModalId(null)
        // When closing the modal, store the current cell's coordinates to prevent immediate re-triggering
        if (activeCell) {
            setLastVisitedCell(`${activeCell.x}-${activeCell.y}`)
        }
    }

    // Find amusement by id
    const getAmusementById = id => {
        if (!amusementData || !amusementData.data) return null
        return amusementData.data.find(amusement => amusement.id === id)
    }

    const specialCells = [
        {
            x: 1,
            y: 1,
            amusementId:
                amusementData && amusementData.data && amusementData.data[0]
                    ? amusementData.data[0].id
                    : null,
            content: amusementData &&
                amusementData.data &&
                amusementData.data[0] && (
                    <div
                        key={amusementData.data[0].id}
                        className="p-2 text-center bg-yellow-100 rounded-md w-full h-full flex items-center justify-center">
                        <button className="py-2 px-4 bg-blue-500 text-white rounded-lg">
                            {amusementData.data[0].name}
                        </button>
                    </div>
                ),
        },
        {
            x: 0,
            y: 2,
            amusementId:
                amusementData && amusementData.data && amusementData.data[1]
                    ? amusementData.data[1].id
                    : null,
            content: amusementData &&
                amusementData.data &&
                amusementData.data[1] && (
                    <div
                        key={amusementData.data[1].id}
                        className="p-2 text-center bg-green-100 rounded-md w-full h-full flex items-center justify-center">
                        <button className="py-2 px-4 bg-blue-500 text-white rounded-lg">
                            {amusementData.data[1].name}
                        </button>
                    </div>
                ),
        },
        {
            x: 2,
            y: 0,
            amusementId:
                amusementData && amusementData.data && amusementData.data[2]
                    ? amusementData.data[2].id
                    : null,
            content: amusementData &&
                amusementData.data &&
                amusementData.data[1] && (
                    <div
                        key={amusementData.data[2].id}
                        className="p-2 text-center bg-purple-100 rounded-md w-full h-full flex items-center justify-center">
                        <button className="py-2 px-4 bg-blue-500 text-white rounded-lg">
                            {amusementData.data[1].name}
                        </button>
                    </div>
                ),
        },
        {
            x: 4,
            y: 4,
            amusementId:
                amusementData && amusementData.data && amusementData.data[3]
                    ? amusementData.data[3].id
                    : null,
            content: amusementData &&
                amusementData.data &&
                amusementData.data[3] && (
                    <div
                        key={amusementData.data[3].id}
                        className="p-2 text-center bg-purple-100 rounded-md w-full h-full flex items-center justify-center">
                        <button className="py-2 px-4 bg-blue-500 text-white rounded-lg">
                            {amusementData.data[3].name}
                        </button>
                    </div>
                ),
        },
        {
            x: 2,
            y: 4,
            amusementId:
                amusementData && amusementData.data && amusementData.data[4]
                    ? amusementData.data[4].id
                    : null,
            content: amusementData &&
                amusementData.data &&
                amusementData.data[4] && (
                    <div
                        key={amusementData.data[3].id}
                        className="p-2 text-center bg-purple-100 rounded-md w-full h-full flex items-center justify-center">
                        <button className="py-2 px-4 bg-blue-500 text-white rounded-lg">
                            {amusementData.data[4].name}
                        </button>
                    </div>
                ),
        },
        {
            x: 1,
            y: 3,
            amusementId:
                amusementData && amusementData.data && amusementData.data[5]
                    ? amusementData.data[5].id
                    : null,
            content: amusementData &&
                amusementData.data &&
                amusementData.data[5] && (
                    <div
                        key={amusementData.data[3].id}
                        className="p-2 text-center bg-purple-100 rounded-md w-full h-full flex items-center justify-center">
                        <button className="py-2 px-4 bg-blue-500 text-white rounded-lg">
                            {amusementData.data[5].name}
                        </button>
                    </div>
                ),
        },
                {
            x: 0,
            y: 4,
            amusementId:
                amusementData && amusementData.data && amusementData.data[6]
                    ? amusementData.data[6].id
                    : null,
            content: amusementData &&
                amusementData.data &&
                amusementData.data[6] && (
                    <div
                        key={amusementData.data[3].id}
                        className="p-2 text-center bg-purple-100 rounded-md w-full h-full flex items-center justify-center">
                        <button className="py-2 px-4 bg-blue-500 text-white rounded-lg">
                            {amusementData.data[6].name}
                        </button>
                    </div>
                ),
        },
                      {
            x: 3,
            y: 2,
            amusementId:
                amusementData && amusementData.data && amusementData.data[7]
                    ? amusementData.data[7].id
                    : null,
            content: amusementData &&
                amusementData.data &&
                amusementData.data[7] && (
                    <div
                        key={amusementData.data[3].id}
                        className="p-2 text-center bg-purple-100 rounded-md w-full h-full flex items-center justify-center">
                        <button className="py-2 px-4 bg-blue-500 text-white rounded-lg">
                            {amusementData.data[7].name}
                        </button>
                    </div>
                ),
        },
                                        {
            x: 4,
            y: 0,
            amusementId:
                amusementData && amusementData.data && amusementData.data[8]
                    ? amusementData.data[8].id
                    : null,
            content: amusementData &&
                amusementData.data &&
                amusementData.data[8] && (
                    <div
                        key={amusementData.data[3].id}
                        className="p-2 text-center bg-purple-100 rounded-md w-full h-full flex items-center justify-center">
                        <button className="py-2 px-4 bg-blue-500 text-white rounded-lg">
                            {amusementData.data[8].name}
                        </button>
                    </div>
                ),
        },
    ]

    const handleCellActivated = cellInfo => {
        setActiveCell(cellInfo)

        // Find the special cell that matches the activated cell coordinates
        const matchingCell = specialCells.find(
            cell => cell.x === cellInfo.x && cell.y === cellInfo.y,
        )

        // Create a cell identifier string for comparing with lastVisitedCell
        const cellIdentifier = `${cellInfo.x}-${cellInfo.y}`

        if (cellInfo.hasContent) {
            setMessage(
                `Avatar reached a special cell at (${cellInfo.x}, ${cellInfo.y})!`,
            )

            // If the cell has an amusementId AND it's not the last visited cell, open the modal
            if (
                matchingCell &&
                matchingCell.amusementId &&
                cellIdentifier !== lastVisitedCell
            ) {
                openModal(matchingCell.amusementId)
            }
        } else {
            setMessage(`Avatar moved to cell (${cellInfo.x}, ${cellInfo.y})`)
            // Reset lastVisitedCell when moving to a non-content cell
            setLastVisitedCell(null)
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

                            {/* Modal moved outside the cell definition */}
                            {openModalId && (
                                <Modal
                                    isOpen={!!openModalId}
                                    closeModal={closeModal}>
                                    <AmusementCard
                                        amusement={getAmusementById(
                                            openModalId,
                                        )}
                                    />
                                </Modal>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GridDemo
