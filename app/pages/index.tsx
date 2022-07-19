// import { Suspense, useState } from "react"
import { Image, Link, BlitzPage, useMutation, Routes } from "blitz"
// import { useCurrentUser } from "app/core/hooks/useCurrentUser"
// import logout from "app/auth/mutations/logout"
// import logo from "public/logo.png"
// import Hero from "../core/components/Hero"
// import Pricing from "app/core/components/Pricing"
// import IntroPage from "app/core/components/IntroPage"
// import TestModals from "app/core/components/TestModals"
import Layout from "app/core/layouts/Layout"
import NavBar from "app/core/components/NavBar"
import AuthLayout from "app/core/layouts/AuthLayout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
let ggg = false

const Home: BlitzPage = (props) => {
  const currentUser = useCurrentUser()
  ggg = !currentUser ? true : false

  return (
    <>
      <div className="relative  flex items-start justify-start w-full h-screen  overflow-hidden">
        {/* <div className="relative z-30 flex flex-wrap mx-8 my-8 items-center justify-center gap-8">
          <label
            htmlFor="my-modal-2"
            className="relative btn n modal-button btn-secondary btn-block z-30  text-2xl  bg-opacity-40 rounded-x2"
          >
            خدمات واقعیت افزوده آرپوت
          </label>
          <div className="relative btn btn-secondary  z-30 btn-block  text-2xl  bg-opacity-40 rounded-x2">
            نمونه کارهای تیم آرپوت
          </div>
        </div> */}
        <video
          className="absolute z-10 w-auto min-w-full min-h-screen inset-0 max-w-none"
          src={"/video1.mp4"}
          typeof="video/mp4"
          autoPlay
          muted
          loop
        ></video>
      </div>
      {/* <footer>
        <a href="https://arput.com" target="_blank" rel="noopener noreferrer">
          Powered by ARPut.com
        </a>
      </footer> */}
    </>
  )
}

Home.getLayout = (page) =>
  ggg ? (
    <AuthLayout title="Home" heading={""}>
      {page}
    </AuthLayout>
  ) : (
    <Layout title="Home">{page}</Layout>
  )
Home.suppressFirstRenderFlicker = true
Home.authenticate = false

export default Home
