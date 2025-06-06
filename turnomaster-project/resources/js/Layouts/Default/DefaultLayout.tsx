import type React from "react"
import Navbar from "./Components/Navbar/Navbar"
import Footer from "./Components/Footer/Footer"

const DefaultLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">

      <Navbar />
      
      <main className="flex-grow flex">
        {children}
      </main>

      <Footer />
    </div>
  )
}

export default DefaultLayout

