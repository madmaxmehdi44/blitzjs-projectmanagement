import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getLinkMenu from "app/link-menus/queries/getLinkMenu"
import updateLinkMenu from "app/link-menus/mutations/updateLinkMenu"
import { LinkMenuForm, FORM_ERROR } from "app/link-menus/components/LinkMenuForm"

export const EditLinkMenu = () => {
  const router = useRouter()
  const linkMenuId = useParam("linkMenuId", "number")
  const [linkMenu, { setQueryData }] = useQuery(
    getLinkMenu,
    { id: linkMenuId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateLinkMenuMutation] = useMutation(updateLinkMenu)

  return (
    <>
      <Head>
        <title>Edit LinkMenu {linkMenu.id}</title>
      </Head>

      <div>
        <h1>Edit LinkMenu {linkMenu.id}</h1>
        <pre>{JSON.stringify(linkMenu, null, 2)}</pre>

        <LinkMenuForm
          submitText="Update LinkMenu"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateLinkMenu}
          initialValues={linkMenu}
          onSubmit={async (values) => {
            try {
              const updated = await updateLinkMenuMutation({
                id: linkMenu.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowLinkMenuPage({ linkMenuId: updated.id }))
            } catch (error) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditLinkMenuPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditLinkMenu />
      </Suspense>

      <p>
        <Link href={Routes.LinkMenusPage()}>
          <a>LinkMenus</a>
        </Link>
      </p>
    </div>
  )
}

EditLinkMenuPage.authenticate = true
EditLinkMenuPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditLinkMenuPage
