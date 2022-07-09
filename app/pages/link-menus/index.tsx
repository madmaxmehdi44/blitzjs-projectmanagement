import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getLinkMenus from "app/link-menus/queries/getLinkMenus"

const ITEMS_PER_PAGE = 100

export const LinkMenusList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ linkMenus, hasMore }] = usePaginatedQuery(getLinkMenus, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {linkMenus.map((linkMenu) => (
          <li key={linkMenu.id}>
            <Link href={Routes.ShowLinkMenuPage({ linkMenuId: linkMenu.id })}>
              <a>{linkMenu.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const LinkMenusPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>LinkMenus</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewLinkMenuPage()}>
            <a>Create LinkMenu</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <LinkMenusList />
        </Suspense>
      </div>
    </>
  )
}

LinkMenusPage.authenticate = true
LinkMenusPage.getLayout = (page) => <Layout>{page}</Layout>

export default LinkMenusPage
