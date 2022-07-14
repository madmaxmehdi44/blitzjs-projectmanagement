import { ReactNode } from "react"
import { Head } from "blitz"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import { Header } from "../components/Header"
import { BlitzLayout } from "./Layout"
import ModalIndex from "../components/ModalCompnent"
// import { BlitzLayout } from "./Layout"

type LayoutProps = {
  title?: string
  heading: string
  children: ReactNode
}

const AuthLayout: BlitzLayout<{ title?: string; heading: string; children?: React.ReactNode }> = ({
  title,
  heading,
  children,
}) => {
  return 
    <>{
      <Head>
        <title>{title || "ProjectManagement"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      // {/* <Header /> */}
      <ModalIndex />

      <NavBar />
      <div className="">{children}</div>
      <div>
        <Footer />
      </div>}
    </>
  
}

export default AuthLayout
