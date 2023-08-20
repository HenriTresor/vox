'use client'
import Home from "@/components/Home/Views/Home"
import AboutUs from "@/components/Home/Views/about"
import { Button } from "@/components/ui/button"
import Footer from "@/components/views/LandingPage/Footer"
import NavBar from "@/components/views/LandingPage/NavBar"
import { AuthContext } from "@/context/AuthContext"
import { useContext } from "react"

const Page = () => {
  const { authenticated, user } = useContext(AuthContext)
  return (
    <>
      {(user && !user?.verifiedAccount) && (
        <div className="w-full sticky top-0 left-0 h-auto bg-red-500 p-2 z-40 align-center text-white text-center">
          Your account is not verified. <Button size='sm' variant={'default'}>click to verify</Button>
        </div>
      )}
      <NavBar />
      <Home />
      <AboutUs />
      <Footer />
    </>
  )
}

export default Page