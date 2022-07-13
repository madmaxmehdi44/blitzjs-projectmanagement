import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getService from "app/services/queries/getService"
import updateService from "app/services/mutations/updateService"
import { ServiceForm, FORM_ERROR } from "app/services/components/ServiceForm"

export const EditService = () => {
  const router = useRouter()
  const serviceId = useParam("serviceId", "number")
  const [service, { setQueryData }] = useQuery(
    getService,
    { id: serviceId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateServiceMutation] = useMutation(updateService)

  return (
    <>
      <Head>
        <title>ویرایش سرویس شماره: {service.id}</title>
      </Head>

      <div className="flex flex-col ">
        {/* <h1>ویرایش سرویس {service.id}</h1> */}
        {/* <pre>{JSON.stringify(service, null, 2)}</pre> */}

        <ServiceForm
          submitText="به روزرسانی"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateService}
          initialValues={service}
          onSubmit={async (values) => {
            try {
              const updated = await updateServiceMutation({
                id: service.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowServicePage({ serviceId: updated.id }))
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

const EditServicePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditService />
      </Suspense>
    </div>
  )
}

EditServicePage.authenticate = true
EditServicePage.getLayout = (page) => <Layout>{page}</Layout>

export default EditServicePage
