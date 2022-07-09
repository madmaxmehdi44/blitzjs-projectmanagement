import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createLinkMenu from "app/link-menus/mutations/createLinkMenu"
import { LinkMenuForm, FORM_ERROR } from "app/link-menus/components/LinkMenuForm"

const NewLinkMenuPage: BlitzPage = () => {
  const router = useRouter()
  const [createLinkMenuMutation] = useMutation(createLinkMenu)

  return (
    <div>
      <h1>Create New LinkMenu</h1>

      <LinkMenuForm
        submitText="Create LinkMenu"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateLinkMenu}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const linkMenu = await createLinkMenuMutation(values)
            router.push(Routes.ShowLinkMenuPage({ linkMenuId: linkMenu.id }))
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.LinkMenusPage()}>
          <a>LinkMenus</a>
        </Link>
      </p>
    </div>
  )
}

NewLinkMenuPage.authenticate = true
NewLinkMenuPage.getLayout = (page) => <Layout title={"Create New LinkMenu"}>{page}</Layout>

export default NewLinkMenuPage
