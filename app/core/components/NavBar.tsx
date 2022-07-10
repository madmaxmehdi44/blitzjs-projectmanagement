import Link from "next/link"
import { Image, Routes, useMutation } from "blitz"
import { Suspense } from "react"
import { useCurrentUser } from "../hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import ProfileLogin from "./navbarSupComponents/ProfileLogin"
import { SkewLoader, ScaleLoader } from "react-spinners"
import { useEffect } from "react"
import { themeChange } from "theme-change"
import { SunIcon, MoonIcon, MenuIcon, LockClosedIcon, XCircleIcon } from "@heroicons/react/solid"
// import ModalIndex from "./ModalCompnent"
import LinkMenusList from "app/link-menus/components/LinkMenuList"
import { Button } from "./Button"

const MobileProfileLogin = () => {
  return (
    <>
      <MenuIcon
        tabIndex={0}
        className={`bg-indigo-500 shadow-lg shadow-indigo-500/50 btn btn-circle glass avatar w-12 h-12 cursor-pointer hover:bg-teal-500`}
      />
    </>
  )
}
const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <button
          className="btn btn-warning btn-wide"
          onClick={async () => {
            await logoutMutation()
          }}
        >
          خروج
          {/* <code className="text-sm flex gap-1">
            {currentUser.name}
            <span className="badge badge-secondary">{currentUser.role}</span>
          </code> */}
        </button>
      </>
    )
  } else {
    return (
      <>
        <Link href={Routes.LoginPage()}>
          <a className="btn btn-primary btn-wide">ورود </a>
        </Link>
      </>
    )
  }
}
export function ToggleTheme() {
  return (
    <label className="swap swap-rotate bg-zinc-500 shadow-lg shadow-zinc-500/50 btn btn-circle glass  avatar w-12 h-12 cursor-pointer hover:bg-teal-500 ">
      {/* <!-- this hidden checkbox controls the state --> */}
      <input type="checkbox" />

      {/* <!-- sun icon --> */}
      <SunIcon
        className="swap-on fill-current w-12 h-12 text-yellow-200 rounded-full glass"
        data-toggle-theme="acid,forest"
        data-act-class="ACTIVECLASS"
      />
      {/* <!-- moon icon --> */}
      <MoonIcon
        className="swap-off fill-current w-12 h-12  text-stone-200 rounded-full glass"
        data-toggle-theme="forest,acid"
        data-act-class="ACTIVECLASS"
      />
      {/* <!-- moon icon --> */}
    </label>
  )
}

export function MobileNavigation() {
  return (
    <>
      <label className="btn btn-circle glass shadow-lg w-12 h-12 cursor-pointer hover:bg-teal-500">
        {/* <!-- this hidden checkbox controls the state --> */}
        {/* <input type="checkbox" /> */}

        <MenuIcon className="fill-current w-12 h-12 rounded-full glass text-slate-900" />

        {/* <XCircleIcon className="swap-on fill-current w-12 h-12   rounded-full glass text-slate-900" /> */}
      </label>
    </>
  )
}
export const NavBar = () => {
  useEffect(() => {
    themeChange(false)
    // 👆 false parameter is required for react project
  }, [])
  return (
    <>
      {/* <UserInfo /> */}
      <div
        className="sticky bg-opacity-20  glass top-0 z-50 navbar   items-center justify-center "
        dir="rtl"
      >
        {/* mobil nav */}
        <div className="flex md:hidden">
          <label dir="rtl" className="dropdown">
            <Suspense fallback={<ScaleLoader />}>
              <MobileProfileLogin />
            </Suspense>

            <ul
              tabIndex={0}
              className="p-1 mt-3 shadow menu menu-title min-w-max dropdown-content bg-base-100 rounded-box "
            >
              <LinkMenusList />
            </ul>
          </label>
        </div>
        {/* end  mobil nav */}

        <div className="navbar-start">
          <div className="flex flex-row space-x-2">
            <label tabIndex={0} className="mx-1">
              <Suspense fallback={<ScaleLoader />}>
                <ToggleTheme />
              </Suspense>
            </label>

            <label tabIndex={0} className="dropdown dropdown-content">
              <Suspense fallback={<ScaleLoader />}>
                <ProfileLogin />
              </Suspense>
              {/* <div className="navbar-center hidden lg:flex"></div> */}

              <ul
                tabIndex={0}
                className="p-1 mt-3 min-w-max shadow menu menu-normal dropdown-content bg-base-100 rounded-box "
              >
                <li>
                  <label htmlFor="my-modal-4">پروفایل</label>
                </li>
                <li>
                  <label htmlFor="my-modal-5">ثبت نام</label>
                </li>
                <li>
                  <Suspense fallback={"loading..."}>
                    <UserInfo />
                  </Suspense>
                </li>
              </ul>
            </label>
            {/* </div> */}
            {/* <div className="absolute top-1 right-28 hidden p-1 md:flex"> */}
            {/* <Suspense fallback={<SkewLoader />}>
            <Links />
          </Suspense> */}
            {/* </div> */}
          </div>
        </div>

        <div className="navbar-center">
          <div className="hidden md:flex">
            <Suspense fallback={<SkewLoader />}>
              <LinkMenusList />
            </Suspense>
          </div>
        </div>
        <div className="navbar-end">
          <a className="btn btn-secondary  btn-circle blur-[1px] hover:blur-none">آرپوت</a>
        </div>
      </div>
    </>
  )
}
export default NavBar
