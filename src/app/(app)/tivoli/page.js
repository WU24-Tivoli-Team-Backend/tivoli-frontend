'use client'

import React, { useEffect, useState } from 'react'
import GridPrinter from '@/components/tivoli/GridPrinter'
import { useFetch } from '@/hooks/useFetch'
import AmusementCard from '@/components/amusement/AmusementCard'
import Modal from '@/components/tivoli/Modal'

const TivoliPage = () => {
    const [activeCell, setActiveCell] = useState(null)
    const [message, setMessage] = useState(
        'Welcome to Tivoli! Click any area to explore.',
    )
    const [openModalId, setOpenModalId] = useState(null)
    const [lastVisitedCell, setLastVisitedCell] = useState(null)
    const [isMobile, setIsMobile] = useState(false)

    // Detect device type
    useEffect(() => {
        const checkDeviceType = () => {
            const width = window.innerWidth
            setIsMobile(width < 768)
        }

        checkDeviceType()
        window.addEventListener('resize', checkDeviceType)
        return () => window.removeEventListener('resize', checkDeviceType)
    }, [])

    const amusementsApiUrl = `/api/amusements`
    const {
        data: amusementData,
    } = useFetch(amusementsApiUrl)

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
    // Define special cells with better distribution for both mobile and desktop
    const specialCells =
        amusementData && amusementData.data
            ? amusementData.data.map((amusement, index) => {
                  // Desktop coordinates (5x6 grid) - avoid 0,0
                  const desktopCoordinates = [
                      { x: 1, y: 1 }, // index 0
                      { x: 3, y: 1 }, // index 1
                      { x: 2, y: 0 }, // index 2 - moved from 0,2 to 2,0
                      { x: 2, y: 2 }, // index 3
                      { x: 4, y: 2 }, // index 4
                      { x: 1, y: 3 }, // index 5
                      { x: 3, y: 3 }, // index 6
                      { x: 1, y: 4 }, // index 7 - moved from 0,4 to 1,4
                      { x: 4, y: 4 }, // index 8
                      { x: 2, y: 5 }, // index 9
                  ]

                  // Mobile coordinates (4x5 grid) - avoid 0,0
                  const mobileCoordinates = [
                      { x: 1, y: 0 }, // index 0
                      { x: 3, y: 0 }, // index 1
                      { x: 2, y: 0 }, // index 2 - moved from 0,1 to 2,0
                      { x: 2, y: 1 }, // index 3
                      { x: 1, y: 2 }, // index 4
                      { x: 3, y: 2 }, // index 5
                      { x: 1, y: 3 }, // index 6 - moved from 0,3 to 1,3
                      { x: 2, y: 3 }, // index 7
                      { x: 1, y: 4 }, // index 8
                      { x: 3, y: 4 }, // index 9
                  ]

                  // Get coordinates for current index based on device
                  let coord = isMobile
                      ? mobileCoordinates[index] || { x: 0, y: 0 }
                      : desktopCoordinates[index] || { x: 0, y: 0 }

                  // If coordinates are 0,0 (top-left corner), reassign to alternative positions
                  if (coord.x === 0 && coord.y === 0) {
                      // Alternative positions that avoid 0,0
                      const alternativePositions = isMobile
                          ? [
                                { x: 3, y: 1 },
                                { x: 0, y: 4 },
                                { x: 2, y: 4 },
                                { x: 0, y: 2 },
                            ]
                          : [
                                { x: 4, y: 0 },
                                { x: 0, y: 5 },
                                { x: 4, y: 5 },
                                { x: 3, y: 0 },
                            ]

                      // Use a fallback position based on the amusement index
                      coord = alternativePositions[
                          index % alternativePositions.length
                      ] || { x: 1, y: 1 }
                  }

                  // Create the cell object
                  return {
                      x: coord.x,
                      y: coord.y,
                      amusementId: amusement ? amusement.id : null,
                      content: amusement && (
                          <div className="w-full h-full flex items-center justify-center p-1">
                              <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-lg px-2 py-1 text-xs font-bold shadow-lg transform hover:scale-105 transition-transform max-w-full">
                                  <span
                                      className="block"
                                      style={{
                                          overflow: 'hidden',
                                          textOverflow: 'ellipsis',
                                          whiteSpace: 'nowrap',
                                          maxWidth: '120px',
                                      }}>
                                      {amusement.name}
                                  </span>
                              </div>
                          </div>
                      ),
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
                `You discovered "${getAmusementById(matchingCell?.amusementId)?.name || 'an attraction'}"!`,
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
            setMessage('Click any area to explore.')
            // Reset lastVisitedCell when moving to a non-content cell
            setLastVisitedCell(null)
        }
    }

    if (amusementLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl font-semibold text-gray-800">
                    Loading the magical park...
                </div>
            </div>
        )
    }

    if (amusementError) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl font-semibold text-red-600">
                    Unable to load park attractions
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="flex flex-col items-center pt-8">
                {/* Status Message */}
                <div className="mb-4">
                    <div className="bg-white rounded-full px-6 py-3 shadow-lg border border-purple-200">
                        <p className="text-sm lg:text-base text-purple-800 font-medium text-center">
                            {message}
                        </p>
                    </div>
                </div>

                {/* Main Grid */}
                <div className="flex-1 flex items-center justify-center">
                    <GridPrinter
                        rows={6}
                        cols={5}
                        mobileRows={5}
                        mobileCols={4}
                        specialCells={specialCells}
                        onCellActivated={handleCellActivated}
                        avatarImage="/avatar-placeholder.png"
                    />
                </div>
            </div>

            {/* Modal for attraction details */}
            {openModalId && (
                <Modal isOpen={!!openModalId} closeModal={closeModal}>
                    <AmusementCard amusement={getAmusementById(openModalId)} />
                </Modal>
            )}
        </div>
    )
}

export default TivoliPage
