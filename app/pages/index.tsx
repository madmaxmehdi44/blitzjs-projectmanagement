import { Suspense } from "react"
import { Image, Link, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import logo from "public/logo.png"
import { CustomLink } from "app/core/components/CustomLink"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const user = useCurrentUser()
  return (
    <div className="flex justify-center my-4">{user && <div>Logged in as {user.email}.</div>}</div>
  )
}

const Home: BlitzPage = () => {
  return (
    <>
      <header className="relative  flex items-start justify-start w-screen min-h-screen  overflow-hidden">
        <div className="relative z-30 flex flex-wrap mx-8 my-8 items-center justify-center gap-8">
          <label
            htmlFor="my-modal-2"
            className="relative btn n modal-button btn-secondary btn-block z-30  text-2xl  bg-opacity-40 rounded-x2"
          >
            خدمات واقعیت افزوده آرپوت
          </label>
          <div className="relative btn btn-secondary  z-30 btn-block  text-2xl  bg-opacity-40 rounded-x2">
            نمونه کارهای تیم آرپوت
          </div>
        </div>
        <video
          className="absolute z-10 w-auto min-w-full min-h-screen inset-0 max-w-none"
          src={"/video1.mp4"}
          typeof="video/mp4"
          autoPlay
          muted
          loop
        ></video>
      </header>
      {/* <footer>
        <a href="https://arput.com" target="_blank" rel="noopener noreferrer">
          Powered by ARPut.com
        </a>
      </footer> */}
    </>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
{
  /* <Suspense fallback="Loading User Info...">
        <UserInfo />
      </Suspense>
      <div className="flex justify-center">
        <CustomLink href="/projects">Manage Projects</CustomLink>
      </div>
    </>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>
Home.authenticate = true

export default Home */
}
