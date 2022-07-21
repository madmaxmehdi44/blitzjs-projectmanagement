import { Suspense, useState } from "react"
import {
  Head,
  Document,
  Link,
  usePaginatedQuery,
  useRouter,
  BlitzPage,
  Routes,
  Router,
} from "blitz"
import getLinkMenus from "app/link-menus/queries/getLinkMenus"

export function LinkMenusMobileList(props: { isNavOpen: any; setIsNavOpen: any }) {
  const { isNavOpen, setIsNavOpen } = props
  const [{ linkMenus, hasMore }] = usePaginatedQuery(getLinkMenus, {
    orderBy: { id: "asc" },
  })

  return (
    <>
      {/* <ul
          tabIndex={0}
          onClick={() => setIsNavOpen((prev: Boolean) => !prev)}
          className="p-1 mt-3 shadow menu menu-title min-w-max dropdown-content bg-base-100 rounded-box "
        > */}
      {linkMenus.map((linkMenu) => {
        //   const cssClassMobile = "text-xl md:text-sm lg:text-xl flex flex-col w-full z-50"
        return (
          <li>
            <div className="flex flex-col w-full">
              <Link key={linkMenu.id} href={`${linkMenu.urlLink}`}>
                <a >{linkMenu.name}</a>
              </Link>{" "}
            </div>
          </li>
        )
      })}
      {/* </ul> */}
    </>
  )
}

export default LinkMenusMobileList
