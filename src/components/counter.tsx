import React from 'react'

interface CountDisplayProps {
  count: number
}

const CountDisplay: React.FC<CountDisplayProps> = ({ count }) => {
  const containerStyle = {
    backgroundColor: '#68FD8F',
    color: 'black',
    padding: '10px',
    borderRadius: '10px',
    fontSize: '24px'
  }

  return <div style={containerStyle}>Count: {count}</div>
}

export default CountDisplay
