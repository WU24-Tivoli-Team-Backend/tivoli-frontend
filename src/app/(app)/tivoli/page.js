'use client'

import React, { useEffect, useState } from 'react'
// import Image from 'next/image'
import GridPrinter from '@/components/tivoli/GridPrinter'
import { useFetch } from '@/hooks/useFetch'
import AmusementCard from '@/components/amusement/AmusementCard'
import Modal from '@/components/tivoli/Modal'
import UserProfile from '@/components/profile-information/UserProfile'
import Button from '@/components/Button'
import Header from '@/app/(app)/Header'
import '@/components/tivoli/tivoli-background.css'

const TivoliPage = () => {
    const backgroundImage = '/images/tivoli-bg2.png'

    const [activeCell, setActiveCell] = useState(null)
    const [message, setMessage] = useState(
        'Welcome to Tivoli! Click any area to explore.',
    )
    const [openModalId, setOpenModalId] = useState(null)
    const [lastVisitedCell, setLastVisitedCell] = useState(null)
    const [isMobile, setIsMobile] = useState(false)
    const [showUserProfile, setShowUserProfile] = useState(false)

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
        loading: amusementLoading,
        error: amusementError,
    } = useFetch(amusementsApiUrl)

    const openModal = id => {
        setOpenModalId(id)
    }

    const closeModal = () => {
        setOpenModalId(null)
        if (activeCell) {
            setLastVisitedCell(`${activeCell.x}-${activeCell.y}`)
        }
    }

    const handleUserProfile = () => {
        setShowUserProfile(!showUserProfile)
    }

    const getAmusementById = id => {
        if (!amusementData || !amusementData.data) return null
        return amusementData.data.find(amusement => amusement.id === id)
    }

    const specialCells =
        amusementData && amusementData.data
            ? amusementData.data.map((amusement, index) => {
                  const desktopCoordinates = [
                      { x: 1, y: 1 }, // index 0
                      { x: 3, y: 1 }, // index 1
                      { x: 2, y: 0 }, // index 2
                      { x: 2, y: 2 }, // index 3
                      { x: 4, y: 2 }, // index 4
                      { x: 1, y: 3 }, // index 5
                      { x: 3, y: 3 }, // index 6
                      { x: 1, y: 4 }, // index 7
                      { x: 4, y: 4 }, // index 8
                      { x: 2, y: 5 }, // index 9
                  ]

                  const mobileCoordinates = [
                      { x: 1, y: 0 }, // index 0
                      { x: 3, y: 0 }, // index 1
                      { x: 2, y: 0 }, // index 2
                      { x: 2, y: 1 }, // index 3
                      { x: 1, y: 2 }, // index 4
                      { x: 3, y: 2 }, // index 5
                      { x: 1, y: 3 }, // index 6
                      { x: 2, y: 3 }, // index 7
                      { x: 1, y: 4 }, // index 8
                      { x: 3, y: 4 }, // index 9
                  ]

                  let coord = isMobile
                      ? mobileCoordinates[index] || { x: 0, y: 0 }
                      : desktopCoordinates[index] || { x: 0, y: 0 }

                  if (coord.x === 0 && coord.y === 0) {
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

                      coord = alternativePositions[
                          index % alternativePositions.length
                      ] || { x: 1, y: 1 }
                  }

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

        const matchingCell = specialCells.find(
            cell => cell.x === cellInfo.x && cell.y === cellInfo.y,
        )

        const cellIdentifier = `${cellInfo.x}-${cellInfo.y}`

        if (cellInfo.hasContent) {
            setMessage(
                `You discovered "${getAmusementById(matchingCell?.amusementId)?.name || 'an attraction'}"!`,
            )

            if (
                matchingCell &&
                matchingCell.amusementId &&
                cellIdentifier !== lastVisitedCell
            ) {
                openModal(matchingCell.amusementId)
            }
        } else {
            setMessage('Click any area to explore.')
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
        <>
            <Header
                title="Tivoli"
                description="Explore the magical park and discover its games and attractions!"
            />
            <div className="min-h-screen">
                <div className="tivoli-container">
                    <div
                        className="tivoli-background-image"
                        style={{
                            backgroundImage: `url(${backgroundImage})`,
                        }}></div>

                    <div className="tivoli-gradient-overlay"></div>

                    <div className="tivoli-content-container">
                        <div className="flex flex-col items-center pt-2">
                            <div className="mb-2 px-2 w-full flex justify-center">
                                <div className="bg-white/80 rounded-full px-6 py-3 shadow-lg border border-purple-200">
                                    <p className="text-sm lg:text-base text-purple-800 font-medium text-center">
                                        {message}
                                    </p>
                                </div>
                            </div>

                            <div className="flex-1 flex items-center justify-center w-full px-1">
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
                            <div className="flex flex-col justify-center pb-4">
                                <Button onClick={handleUserProfile}>
                                    User profile
                                </Button>
                                {showUserProfile && <UserProfile />}
                            </div>
                        </div>

                        {openModalId && (
                            <Modal
                                isOpen={!!openModalId}
                                closeModal={closeModal}>
                                <AmusementCard
                                    amusement={getAmusementById(openModalId)}
                                />
                            </Modal>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default TivoliPage
