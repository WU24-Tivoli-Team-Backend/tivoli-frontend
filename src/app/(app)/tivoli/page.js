'use client'

import React, { useState } from 'react'
import Header from '@/app/(app)/Header'
import GridPrinter from '@/components/tivoli/GridPrinter'
import { useFetch } from '@/hooks/useFetch'
import AmusementCard from '@/components/amusement/AmusementCard'
import Modal from '@/components/tivoli/Modal'

const GridDemo = () => {
    const [activeCell, setActiveCell] = useState(null)
    const [message, setMessage] = useState(
        'Click on any cell to move the avatar',
    )
    const amusementsApiUrl = `/api/amusements`
    const {
        data: amusementData,
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

   const specialCells = amusementData && amusementData.data 
  ? amusementData.data.map((amusement, index) => {
      // Define coordinates for each amusement based on index
      const coordinates = [
        { x: 1, y: 1 },  // index 0
        { x: 0, y: 2 },  // index 1
        { x: 2, y: 0 },  // index 2
        { x: 4, y: 4 },  // index 3
        { x: 2, y: 4 },  // index 4
        { x: 1, y: 3 },  // index 5
        { x: 0, y: 4 },  // index 6
        { x: 3, y: 2 },  // index 7
        { x: 4, y: 0 }   // index 8
      ]
      
      // Get the coordinates for current index
      const { x, y } = coordinates[index] || { x: 0, y: 0 }
      
      // Create the cell object
      return {
        x,
        y,
        amusementId: amusement ? amusement.id : null,
        content: amusement && (
          <div
            key={amusement.id}
            className="p-2 text-center bg-purple-100 rounded-md w-full h-full flex items-center justify-center"
          >
            <button className="py-2 px-4 bg-blue-500 text-white rounded-lg">
              {amusement.name}
            </button>
          </div>
        )
      }
    })
  : []

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
