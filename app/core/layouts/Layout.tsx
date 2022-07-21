import { ReactNode } from "react"
import {
  Head,
  RedirectAuthenticatedTo,
  RedirectAuthenticatedToFn,
  Routes,
  RouteUrlObject,
} from "blitz"
// import { Header } from "../components/Header"
import NavBar, { NavBar2 } from "../components/NavBar"
import ModalIndex from "../components/ModalCompnent"
import Footer from "../components/Footer"
import { Header } from "../components/Header"

export type BlitzLayout<P = {}> = React.ComponentType<P> & {
  authenticate?: boolean | { redirectTo?: string | RouteUrlObject }
  redirectAuthenticatedTo?: RedirectAuthenticatedTo | RedirectAuthenticatedToFn
}
// type LayoutProps = {
//   title?: string
//   children: ReactNode
// }

const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <>
      <Head>
        <title>{title || "ProjectManagement"}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
      </Head>
      {/* <ModalIndex /> */}
      <div className="flex flex-col h-screen  justify-between">
        <header className=" ">
          <NavBar />
        </header>
        <main className="mb-auto no-scrollbar overflow-scroll pb-16">{children}</main>
        <footer className="bg-blue-500 "><Footer /></footer>
      </div>
      {/* <NavBar />
        <div className="max-h-screen no-scrollbar overflow-scroll">{children}</div>
        <Footer /> */}
    </>
  )
}
Layout.redirectAuthenticatedTo = Routes.Home()
export default Layout
