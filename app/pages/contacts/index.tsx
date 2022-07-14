import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getContacts from "app/contacts/queries/getContacts"

const ITEMS_PER_PAGE = 100

export const ContactsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ contacts, hasMore }] = usePaginatedQuery(getContacts, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <Link href={Routes.ShowContactPage({ contactId: contact.id })}>
              <a>{contact.name}</a>
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

const ContactsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Contacts</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewContactPage()}>
            <a>Create Contact</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <ContactsList />
        </Suspense>
      </div>
    </>
  )
}

ContactsPage.authenticate = true
ContactsPage.getLayout = (page) => <Layout>{page}</Layout>

export default ContactsPage
