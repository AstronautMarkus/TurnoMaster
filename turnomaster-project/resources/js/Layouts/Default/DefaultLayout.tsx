import type React from "react"

const DefaultLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">

      <header className="bg-blue-600 text-white p-4">
        <nav className="container mx-auto">
          <h1 className="text-lg font-bold">My App</h1>
        </nav>
      </header>


      <main className="flex-grow flex">{children}</main>

      <footer className="bg-gray-800 text-white p-4">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} My App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default DefaultLayout

