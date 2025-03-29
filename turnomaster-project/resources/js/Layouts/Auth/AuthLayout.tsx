import type React from "react"

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-100">
      <main className="w-full max-w-md p-6 bg-white rounded shadow-md">{children}</main>
    </div>
  )
}

export default AuthLayout

