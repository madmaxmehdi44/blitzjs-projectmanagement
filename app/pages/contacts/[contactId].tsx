import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getContact from "app/contacts/queries/getContact"
import deleteContact from "app/contacts/mutations/deleteContact"

export const Contact = () => {
  const router = useRouter()
  const contactId = useParam("contactId", "number")
  const [deleteContactMutation] = useMutation(deleteContact)
  const [contact] = useQuery(getContact, { id: contactId })

  return (
    <>
      <Head>
        <title>Contact {contact.id}</title>
      </Head>

      <div>
        <h1>تماس با ما {contact.id}</h1>
        <pre>{JSON.stringify(contact, null, 2)}</pre>

        <Link href={Routes.EditContactPage({ contactId: contact.id })}>
          <a>ویرایش</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteContactMutation({ id: contact.id })
              router.push(Routes.ContactsPage())
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

const ShowContactPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.ContactsPage()}>
          <a>تماس با ما</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Contact />
      </Suspense>
    </div>
  )
}

ShowContactPage.authenticate = true
ShowContactPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowContactPage
