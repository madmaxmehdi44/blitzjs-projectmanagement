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
import getProject from "app/projects/queries/getProject"
import deleteProject from "app/projects/mutations/deleteProject"
// import { PlayPause } from "app/core/components/PlayPause"
// import MyPlyrVideo from "app/core/components/vidply"
import PlyrComponent from "app/core/components/vidply"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

export const Project = () => {
  // const videoElement = useRef(null)

  const router = useRouter()
  const projectId = useParam("projectId", "number")
  const [deleteProjectMutation] = useMutation(deleteProject)
  const [project] = useQuery(getProject, { id: projectId })
  const userRole = useCurrentUser()?.role

  return (
    <>
      <Head>
        <title>خدمات آرپوت | {project.name}</title>
      </Head>
      <div className="flex min-h-full items-center justify-center align-middle">
        {/* <div className=""></div> */}
        <div className="max-w-4xl mt-10 mb-5 p-2 shadow-lg shadow-violet-800  text-center  justify-center rounded-lg">
          <div className="rounded-lg min-w-full ">
            <h1 className="text-center text-2xl font-bold leading-relaxed tracking-widest rounded-lg shadow-lg   shadow-secondary  p-4 items-center justify-center align-middle">
              {project.name}
            </h1>

            <div
              className="text-2xl leading-relaxed tracking-widest
              indent-1 text-justify py-4 px-4 font-semibold
              drop-shadow shadow-sm shadow-black rounded-lg my-6"
            >
              <p
                className="font-normal text-2xl leading-relaxed tracking-widest
              indent-1 text-justify items-center align-text-bottom mb-4 px-2 prose"
                dir="rtl"
              >
                {project.short_description}
              </p>

              <div className="w-full p-0 overflow-hidden mx-auto border-violet-900 border-2  rounded-xl shadow-sm shadow-violet-800 ">
                <PlyrComponent video_url={project.video_url} />
              </div>
              <p
                className="text-2xl leading-relaxed tracking-widest
              indent-1 text-justify py-1 mt-4 px-4 font-semibold
              drop-shadow"
                dir="rtl"
              >
                {project.long_description}
              </p>
              <div className=" w-full mx-auto py-10  px-1  my-1 rounded-xl bg-black">
                <Image
                  src={project.image_url || ""}
                  alt={project.name}
                  width={"100%"}
                  height={"50%"}
                  layout="responsive"
                  className={"prose object-cover py-10  px-1 "}
                />

                <label htmlFor="my-modal-3" className="btn modal-bottom">
                  پروفایل
                </label>
              </div>
              <p
                className="font-normal text-2xl leading-relaxed tracking-widest
              indent-1 text-justify py-6 px-2"
                dir="rtl"
              >
                {project.short_description}
              </p>
            </div>
            {userRole === "ADMIN" ? (
              <>
                <Link href={Routes.EditProjectPage({ projectId: project.id })}>
                  <a className={"btn btn-secondary"}>ویرایش</a>
                </Link>
                <button
                  className="btn btn-error"
                  type="button"
                  onClick={async () => {
                    if (window.confirm("آیا مطمئن هستید؟")) {
                      await deleteProjectMutation({ id: project.id })
                      router.push(Routes.ProjectsPage())
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

const ShowProjectPage: BlitzPage = () => {
  return (
    <>
      <p className="text-2x justify-center items-center ">
        <Link href={Routes.ProjectsPage()}>
          <a>خدمات</a>
        </Link>
      </p>
      <Suspense fallback={"بارگزاری"}>
        <Project />
      </Suspense>
    </>
  )
}

ShowProjectPage.authenticate = false
ShowProjectPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowProjectPage
