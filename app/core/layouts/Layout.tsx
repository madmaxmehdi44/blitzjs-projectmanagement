import { ReactNode } from "react"
import { Head, RedirectAuthenticatedTo, RedirectAuthenticatedToFn, RouteUrlObject } from "blitz"
// import { Header } from "../components/Header"
import NavBar from "../components/NavBar"
import ModalIndex from "../components/ModalCompnent"
import Footer from "../components/Footer"

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
      <ModalIndex />
      <NavBar />
      <div className="">{children}</div>
      <div>
        <Footer />
      </div>
    </>
  )
}

export default Layout
