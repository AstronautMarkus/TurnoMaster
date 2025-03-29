import type React from "react"
import Navbar from "./Components/Navbar/Navbar"

const DefaultLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">

      <Navbar />
      
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

