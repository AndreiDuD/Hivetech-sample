import React from 'react'

const info = () => {
  return (
    <div className='relative'>
    <div
        className="absolute right-12 -mt-2 w-40 h-30 p-2 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
        role="alert"
      >
        <span className="sr-only">Info</span>
        <div>
          <span className="font-medium">Calendar task map:</span>
          <ul className="mt-1.5 ml-4 list-disc list-inside">
            <li className="text-red-500">BDO task</li>
            <li className="text-blue-500">Hivetech task</li>
            <li className="text-green-500">Payroll task</li>
          </ul>
        </div>
      </div>
      </div>
  )
}

export default info