import { Suspense } from "react"
import {
  Head,
  Link,
  useRouter,
  useQuery,
  useParam,
  BlitzPage,
  useMutation,
  Routes,
  Image,
} from "blitz"
import Layout from "app/core/layouts/Layout"
import getService from "app/services/queries/getService"
import deleteService from "app/services/mutations/deleteService"
// import { PlayPause } from "app/core/components/PlayPause"
// import MyPlyrVideo from "app/core/components/vidply"
import PlyrComponent from "app/core/components/vidply"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { ScaleLoader } from "react-spinners"

export const Service = () => {
  // const videoElement = useRef(null)

  const router = useRouter()
  const serviceId = useParam("serviceId", "number")
  const [deleteServiceMutation] = useMutation(deleteService)
  const [service] = useQuery(getService, { id: serviceId })
  const userRole = useCurrentUser()?.role

  return (
    <>
      <Head>
        <title>خدمات آرپوت | {service.name}</title>
      </Head>
      <div className="flex min-h-full items-center justify-center align-middle">
        {/* <div className=""></div> */}
        <div className="flex w-full mt-3 mb-5 p-4 shadow-lg shadow-violet-800  text-center  justify-center rounded-lg">
          <div className="rounded-lg min-w-full  ">
            <div className="w-full flex shadow-md justify-between px-2  shadow-secondary    ">
              <div className="flex items-center justify-center shadow-inner shadow-red-900">
                <Link href={Routes.ServicesPage()}>
                  <a className="btn btn-info mask mask-triangle-3  rounded-full">
                    <h1 className="text-center text-xs  items-center justify-center ">
                      بازگشت
                    </h1>
                  </a>
                </Link>
              </div>
              <div>
                <p className="text-center text-2xl    items-center justify-center ">
                  {service.name}
                </p>
              </div>
              <div>
                <p className="text-center text-xs  leading-relaxed items-center justify-center ">
                  {service.createdAt.getFullYear()}
                  {service.createdAt.getMonth()}
                  {service.createdAt.getDay()}
                </p>
                <p className="text-center text-1xl font-bold leading-relaxed rounded-b-lg items-center justify-center ">
                </p>
                <p className="text-center text-xs  leading-relaxed items-center justify-center ">
                </p>
              </div>
            </div>

            <div
              className="text-clip leading-relaxed indent-1 text-justify py-4 px-4 font-semibold
              drop-shadow shadow-sm shadow-black my-1"
            >
              <div className="w-[80%] md:w-[45%] p-0 overflow-hidden mx-auto border-violet-900 border-2  rounded-xl shadow-sm shadow-violet-800 ">
                <Suspense fallback={<ScaleLoader />}>
                  <PlyrComponent video_url={service.video_url} />
                </Suspense>
              </div>

              <p className="p-2 text-primary-content text-justify  mb-4 px-4" dir="rtl">
                {service.short_description}
              </p>

              <p
                className="text-md leading-relaxed text-primary-content
              indent-1 text-justify py-1 mt-4 px-4 
              drop-shadow"
                dir="rtl"
              >
                {service.long_description}
              </p>
              <div className="w-[80%] md:w-[45%] p-0 overflow-hidden mx-auto border-violet-900 border-2  rounded-xl shadow-sm shadow-violet-800 ">
                <Image
                  src={service.image_url || ""}
                  alt={service.name}
                  width={"100%"}
                  height={"100%"}
                  layout="responsive"
                  className={" prose object-cover"}
                />
                {/* 
                <label htmlFor="my-modal-3" className="btn modal-bottom">
                  پروفایل
                </label> */}
              </div>
            </div>
            {userRole === "ADMIN" ? (
              <>
                <Link href={Routes.EditServicePage({ serviceId: service.id })}>
                  <a className={"btn btn-secondary"}>ویرایش</a>
                </Link>
                <button
                  className="btn btn-error"
                  type="button"
                  onClick={async () => {
                    if (window.confirm("آیا مطمئن هستید؟")) {
                      await deleteServiceMutation({ id: service.id })
                      router.push(Routes.ServicesPage())
                    }
                  }}
                  style={{ marginLeft: "0.5rem" }}
                >
                  حذف
                </button>
              </>
            ) : null}
            {/* <button className="btn btn-primary">Get Started</button> */}
          </div>
        </div>
      </div>
    </>
  )
}

const ShowServicePage: BlitzPage = () => {
  return (
    <>
      <Suspense fallback={"بارگزاری"}>
        <Service />
      </Suspense>
    </>
  )
}

ShowServicePage.authenticate = false
ShowServicePage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowServicePage
