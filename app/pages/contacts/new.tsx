import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createContact from "app/contacts/mutations/createContact"
import { ContactForm, FORM_ERROR } from "app/contacts/components/ContactForm"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

const NewContactPage: BlitzPage = () => {
  const router = useRouter()
  const [createContactMutation] = useMutation(createContact)
  const userRole = useCurrentUser()?.role
  return (
    <div className="flex flex-col  border-opacity-50 items-center justify-center " dir="rtl">
      <h1 className="flex justify-center">ارسال پیام</h1>

      <ContactForm
        className="form-control w-11/12 md:w-3/6 "
        submitText="ارسال پیام"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateContact}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const contact = await createContactMutation(values)
            alert("پیام شما با موفقیت ارسال شد.در اولین فرصت با شما تماس خواهیم گرفت")
            router.push(Routes.Home())
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />
      {userRole === "ADMIN" ? (
        <p>
          <Link href={Routes.ContactsPage()}>
            <a className="btn btn-block btn-error ">جعبه پیام ها</a>
          </Link>
        </p>
      ) : null}
    </div>
  )
}

NewContactPage.authenticate = false
NewContactPage.getLayout = (page) => <Layout title={"Create New Contact"}>{page}</Layout>

export default NewContactPage
