import React from 'react'

export default function MainCard({
  children,
  title,
  loading,
  gradientBg,
  maxWidthClassNames,
}: any) {
  return (
    <>
      {!loading ? (
        <div
          className={
            !maxWidthClassNames ? 'max-w-md md:max-w-xl' : maxWidthClassNames
          }
        >
          <div
            className={`card min-w-80 md:w-full bg-base-100 shadow-md overflow-visible ${
              gradientBg && 'bg-gradient-to-r from-n3blue to-n3green'
            } dark:bg-slate-600`}
          >
            <div className="card-body items-stretch items-center">
              <h2
                className={`card-title text-center text-3xl font-medium mb-2 ${
                  gradientBg && 'text-white'
                } dark:text-slate-300`}
              >
                {title}
              </h2>
              {children}
            </div>
          </div>
        </div>
      ) : (
        <button className="btn btn-square btn-ghost btn-disabled bg-transparent loading"></button>
      )}
    </>
  )
}

// className="dark:text-slate-300"
// dark:bg-slate-600
