import React, { Suspense } from 'react'

const layout = ({children}) => {
  return (
    <Suspense>
        <div>
            {children}
        </div>
    </Suspense>
  )
}

export default layout