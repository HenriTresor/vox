import Home from "@/components/Home/Views/Home"
import AboutUs from "@/components/Home/Views/about"
import Footer from "@/components/views/LandingPage/Footer"
import NavBar from "@/components/views/LandingPage/NavBar"

const Page = () => {
  return (
    <>
      <NavBar />
      <Home />
      <AboutUs />
      <Footer />
    </>
  )
}

export default Page