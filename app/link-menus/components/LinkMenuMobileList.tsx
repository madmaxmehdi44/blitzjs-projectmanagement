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
  //   const [seletedMobileLink, setSeletedMobileLink] = useState(0)
  const { isNavOpen, setIsNavOpen } = props
  const [{ linkMenus, hasMore }] = usePaginatedQuery(getLinkMenus, {
    orderBy: { id: "asc" },
  })

  return (
    <>
      {linkMenus.map((linkMenu) => {
        return (
          <li className="flex flex-col ">
            <Link key={linkMenu.id} href={`${linkMenu.urlLink}`}>
              <a onClick={() => setIsNavOpen(false)} className="w-full hover:bg-purple-600">
                {linkMenu.name}
              </a>
            </Link>
          </li>
        )
      })}
      {/* </ul> */}
    </>
  )
}

export default LinkMenusMobileList
