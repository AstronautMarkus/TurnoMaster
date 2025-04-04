import type React from "react"
import Navbar from "./Components/Navbar/Navbar"
import Footer from "./Components/Footer/Footer"

const DefaultLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">

      <Navbar />
      
      <main className="flex-grow flex bg-gradient-to-b from-gray-100 to-gray-300">
        {children}
      </main>

      <Footer />
    </div>
  )
}

export default DefaultLayout

