import React from 'react'

const StyledButton = ({ label, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="border-2 rounded-xl px-4 py-2 font-medium cursor-pointer 
             bg-gradient-to-r from-blue-500 to-purple-500 text-white 
             hover:from-purple-500 hover:to-orange-500 hover:border-orange-500
             shadow-lg duration-300"
        >
            {label}
        </button>
    )
}

export default StyledButton