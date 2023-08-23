import React from 'react'

interface CButtonProps {
  onClick: () => void
  label: string
}

const CButton: React.FC<CButtonProps> = ({ onClick, label }) => (
    <button className="buttonStyle" onClick={onClick}>
      {label}
    </button>
  )

export default CButton
