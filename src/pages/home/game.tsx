import { useState } from 'react'
import { Flex, SegmentedControl } from '@mantine/core'
import { info } from 'utils/alert'

import { CButton, Chessboard, CountDisplay, Navbar } from 'components'

import { numRookCaptures } from './logic'

interface GameProps { }
interface Option {
  label: string
  value: string
}

const Game = (props: GameProps) => {
  const isAccess = true

  const initialChessboardData = [
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '']
  ]

  const [chessboardData, setChessboardData] = useState(initialChessboardData)
  const [selectedValue, setSelectedValue] = useState('♖')
  const [selectedLabel, setSelectedLabel] = useState('♖')

  const options: Option[] = [
    { label: '♖', value: '♖' },
    { label: '♟', value: '♟' },
    { label: '♗', value: '♗' },
    { label: '🗑️', value: '' }
  ]

  const handleSegmentChange = (selectedValue: string) => {
    const selectedOption = options.find(option => option.value === selectedValue)

    if (selectedOption) {
      setSelectedValue(selectedOption.value)
      setSelectedLabel(selectedOption.label)
    }
  }

  const handleClick = () => {
    const clearedChessboard = Array.from({ length: 8 }, () => new Array(8).fill(''))

    setChessboardData(clearedChessboard)
  }

  const handleCellClick = (value: string, rowIndex: number, colIndex: number) => {
    if (chessboardData[colIndex][rowIndex] !== '' && value !== '') {
      info('Cell is already occupied. Cannot place an item here.')
      return
    }
    if (value === '♖' && chessboardData.some(row => row.includes('♖'))) {
      info('A ♖ is already present on the chessboard.')
      return
    }

    const updatedChessboardData = [...chessboardData]

    updatedChessboardData[colIndex][rowIndex] = value

    setChessboardData(updatedChessboardData)
  }

  const rookCaptures = numRookCaptures(chessboardData)

  return (
    <>
      <Navbar />
      <Flex w="100%" h="90vh" align="center" justify="center" direction="column" gap="30px">
        <CountDisplay count={rookCaptures} />
        <Chessboard boardData={chessboardData} onCellClick={handleCellClick} selectedValue={selectedValue} />
        <CButton onClick={handleClick} label="Clear All" />
        <SegmentedControl data={options} onChange={handleSegmentChange} />
      </Flex>
    </>
  )
}

export default Game;