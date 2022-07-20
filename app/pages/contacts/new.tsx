import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createContact from "app/contacts/mutations/createContact"
import { ContactForm, FORM_ERROR } from "app/contacts/components/ContactForm"

const NewContactPage: BlitzPage = () => {
  const router = useRouter()
  const [createContactMutation] = useMutation(createContact)

  return (
    <div dir="rtl">
      <h1>ارسال پیام</h1>

      <ContactForm
        submitText="ارسال"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateContact}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const contact = await createContactMutation(values)
            // router.push(Routes.ShowContactPage())
            router.push(Routes.Home({ contactId: contact.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.ContactsPage()}>
          <a>Contacts</a>
        </Link>
      </p>
    </div>
  )
}

NewContactPage.authenticate = false
NewContactPage.getLayout = (page) => <Layout title={"Create New Contact"}>{page}</Layout>

export default NewContactPage
