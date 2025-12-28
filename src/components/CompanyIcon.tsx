import React from 'react'

const CompanyIcon = () => {
  return (
    <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span className="text-primary-foreground text-xs font-bold">DW</span>
        </div>
        <span className="font-bold text-xl"></span>
    </div>
  )
}

export default CompanyIcon