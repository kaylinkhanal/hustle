import React from 'react'

const CheckboxBackground = () => {
  return (
    (<div className="fixed inset-0 z-0 opacity-5">
      <div className="absolute inset-0 grid grid-cols-6 gap-4 p-4">
        {Array(48).fill(null).map((_, index) => (
          <div key={index} className="w-full h-full">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9 11L12 14L20 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round" />
              <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="2"
                stroke="currentColor"
                strokeWidth="2" />
            </svg>
          </div>
        ))}
      </div>
    </div>)
  );
}

export default CheckboxBackground

