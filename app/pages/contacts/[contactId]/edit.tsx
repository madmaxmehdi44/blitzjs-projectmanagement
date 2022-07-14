import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getContact from "app/contacts/queries/getContact"
import updateContact from "app/contacts/mutations/updateContact"
import { ContactForm, FORM_ERROR } from "app/contacts/components/ContactForm"

export const EditContact = () => {
  const router = useRouter()
  const contactId = useParam("contactId", "number")
  const [contact, { setQueryData }] = useQuery(
    getContact,
    { id: contactId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateContactMutation] = useMutation(updateContact)

  return (
    <>
      <Head>
        <title>Edit Contact {contact.id}</title>
      </Head>

      <div>
        <h1>Edit Contact {contact.id}</h1>
        <pre>{JSON.stringify(contact, null, 2)}</pre>

        <ContactForm
          submitText="Update Contact"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateContact}
          initialValues={contact}
          onSubmit={async (values) => {
            try {
              const updated = await updateContactMutation({
                id: contact.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowContactPage({ contactId: updated.id }))
            } catch (error: any) {
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

const EditContactPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditContact />
      </Suspense>

      <p>
        <Link href={Routes.ContactsPage()}>
          <a>Contacts</a>
        </Link>
      </p>
    </div>
  )
}

EditContactPage.authenticate = true
EditContactPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditContactPage
