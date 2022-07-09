import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getLinkMenu from "app/link-menus/queries/getLinkMenu"
import deleteLinkMenu from "app/link-menus/mutations/deleteLinkMenu"

export const LinkMenu = () => {
  const router = useRouter()
  const linkMenuId = useParam("linkMenuId", "number")
  const [deleteLinkMenuMutation] = useMutation(deleteLinkMenu)
  const [linkMenu] = useQuery(getLinkMenu, { id: linkMenuId })

  return (
    <>
      <Head>
        <title>LinkMenu {linkMenu.id}</title>
      </Head>

      <div>
        <h1>LinkMenu {linkMenu.id}</h1>
        <pre>{JSON.stringify(linkMenu, null, 2)}</pre>

        <Link href={Routes.EditLinkMenuPage({ linkMenuId: linkMenu.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteLinkMenuMutation({ id: linkMenu.id })
              router.push(Routes.LinkMenusPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowLinkMenuPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.LinkMenusPage()}>
          <a>LinkMenus</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <LinkMenu />
      </Suspense>
    </div>
  )
}

ShowLinkMenuPage.authenticate = true
ShowLinkMenuPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowLinkMenuPage
