import Home from "@/components/Home/Views/Home"
import AboutUs from "@/components/Home/Views/about"
import NavBar from "@/components/views/LandingPage/NavBar"

const Page = () => {
  return (
    <>
      <NavBar />
      <Home />
      <AboutUs />
    </>
  )
}

export default Page