import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes, Image } from "blitz"
import { Suspense, useState } from "react"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { Service } from "@prisma/client"
import getServices from "app/services/queries/getServices"
import { ServiceCard } from "app/services/components/ServiceCard"
import ScaleLoader from "react-spinners/ScaleLoader"
// import { boolean } from "zod"
import SearchBar from "app/core/components/SearchBar"
// import PlyrComponent from "app/core/components/vidply"

const ITEMS_PER_PAGE = 99

// export const LoaDdd = () => {
//   return (
//     <>
//       <div className="border border-blue-300 shadow rounded-md p-4 max-w-xl w-full mx-auto">
//         <div className="animate-pulse flex space-x-4">
//           <div className="rounded-full bg-slate-700 h-10 w-10"></div>
//           <div className="flex-1 space-y-6 py-1">
//             <div className="h-2 bg-slate-700 rounded"></div>
//             <div className="space-y-3">
//               <div className="grid grid-cols-3 gap-4">
//                 <div className="h-2 bg-slate-700 rounded col-span-2"></div>
//                 <div className="h-2 bg-slate-700 rounded col-span-1"></div>
//               </div>
//               <div className="h-2 bg-slate-700 rounded"></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

export const ServicesList = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const userRole = useCurrentUser()?.role
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ services, hasMore }] = usePaginatedQuery(getServices, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } }, "", { scroll: false })
  const goToNextPage = () => router.push({ query: { page: page + 1 } }, "", { scroll: false })
  let recss = null
  return (
    <>
      <div className="flex flex-col space-y-2">
        <div dir="rtl" className="flex flex-col h-24 w-full p-1 items-center justify-center">
          <Suspense fallback={<ScaleLoader />}>
            <SearchBar setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
          </Suspense>
          <div dir="rtl" className="flex w-full p-1 text-xl items-center justify-center">
            <p className="">خدمات واقعیا افزوده آرپوت به شرح زیر است</p>
          </div>
        </div>

        <Suspense fallback={<ScaleLoader />}>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-5 py-4">
            {services
              .filter((service: Service) => {
                if (searchTerm === "") return service
                else if (service.name.toLowerCase().includes(searchTerm.toLowerCase()))
                  return service
              })
              .map((service: Service) => (
                // <Suspense fallback={<ScaleLoader />}>
                <ServiceCard key={service.id} service={service} />
                // </Suspense>
              ))}
          </div>

          <div className={page === 0 && !hasMore ? "hidden" : "btn-group justify-center"}>
            <button disabled={page === 0} onClick={goToPreviousPage} className={"btn btn-wide"}>
              صفحه قبل
            </button>
            <button disabled={!hasMore} onClick={goToNextPage} className={"btn btn-wide"}>
              صفحه بعد
            </button>
          </div>
          {userRole === "ADMIN" ? (
            <div className="flex justify-center  mb-10 items-center">
              <NewAction />
            </div>
          ) : null}
        </Suspense>
      </div>
    </>
  )
}

const NewAction = () => (
  <Link href={Routes.NewServicePage()}>
    <a className="bg-gradient-to-r btn btn-block from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out">
      سرویس جدید
    </a>
  </Link>
)

const ServicesPage: BlitzPage = (props) => {
  return (
    <>
      <Head>
        <title>خدمات</title>
      </Head>
      {/* <ModalVideo /> */}
      <Suspense fallback={<ScaleLoader />}>
        <ServicesList />
      </Suspense>
    </>
  )
}

// ServicesPage.authenticate = false
ServicesPage.getLayout = (page) => <Layout>{page}</Layout>

export default ServicesPage
