import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import getLinkMenus from "app/link-menus/queries/getLinkMenus"

// const ITEMS_PER_PAGE = 100
export function LinkMenusList() {
  const [{ linkMenus, hasMore }] = usePaginatedQuery(getLinkMenus, {
    orderBy: { id: "desc" },
    // skip: ITEMS_PER_PAGE * page,
    // take: ITEMS_PER_PAGE,
  })

  const catchLastId = linkMenus[0]?.id

  return (
    <div className="btn-group" >
      {linkMenus.map((linkMenu) => {
        let cssClass = "text-xl btn md:text-sm lg:text-xl"
        // const cssClassMobile = "text-xl md:text-sm lg:text-xl flex flex-col w-full z-50"
        linkMenu.id === 1
          ? (cssClass = "text-xl rounded-full btn bg-violet-500 glass md:text-sm lg:text-xl")
          : linkMenu.id === catchLastId
          ? (cssClass =
              "text-xl rounded-full btn bg-green-700 glass hover:btn-warning btn-error md:text-sm lg:text-xl")
          : (cssClass = "text-xl btn md:text-sm lg:text-xl")

        return (
          <>
            <Link key={linkMenu.id} href={`${linkMenu.urlLink}`}>
              <a  className={cssClass}>{linkMenu.name}</a>
            </Link>
          </>
        )
      })}
    </div>

    //   {/* <button disabled={page === 0} onClick={goToPreviousPage}>
    //   </button>
    //   <button disabled={!hasMore} onClick={goToNextPage}>
    //   </button> */}
  )
}

// const LinkMenusPage = () => {
//   // const rawData= props
//   return (
//     <>
//       <Suspense fallback={<div>Loading...</div>}>
//         <LinkMenusList />
//       </Suspense>
//     </>
//   )
// }

// LinkMenusPage.authenticate = false

export default LinkMenusList
