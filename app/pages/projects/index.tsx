import { Suspense, useState } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getProjects from "app/projects/queries/getProjects"
// import SocialMediaProfilePage from "app/core/components/SocialMediaProfilePage"
import { ProjectCard } from "app/projects/components/ProjectCard"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import SearchBar from "app/core/components/SearchBar"
import { ScaleLoader } from "react-spinners"
import { Project } from "@prisma/client"

const ITEMS_PER_PAGE = 90

export const ProjectsList = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const userRole = useCurrentUser()?.role

  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ projects, hasMore }] = usePaginatedQuery(getProjects, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div className="flex flex-col space-y-2">
      <div dir="rtl" className="flex flex-col h-24 w-full p-1 items-center justify-center">
        <SearchBar setSearchTerm={setSearchTerm} searchTerm={searchTerm} />

        <div dir="rtl" className="flex w-full p-1 text-xl items-center justify-center">
          <p className="">نمونه کارهای آرپوت</p>
        </div>
      </div>

      <Suspense fallback={<ScaleLoader />}>
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-5 py-4">
          {projects
            .filter((project: Project) => {
              if (searchTerm === "") return project
              else if (project.name.toLowerCase().includes(searchTerm.toLowerCase())) return project
            })
            .map((project: Project) => (
              // <Suspense fallback={<ScaleLoader />}>
              <ProjectCard key={project.id} project={project} />
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
    // <div>
    //   <ul>
    //     {projects.map((project) => (
    //       <li key={project.id}>
    //         <Link href={Routes.ShowProjectPage({ projectId: project.id })}>
    //           <a>{project.name}</a>
    //         </Link>
    //       </li>
    //     ))}
    //   </ul>

    //   <button disabled={page === 0} onClick={goToPreviousPage}>
    //     صفحه قبل
    //   </button>
    //   <button disabled={!hasMore} onClick={goToNextPage}>
    //     صفحه بعد
    //   </button>
    // </div>
  )
}
const NewAction = () => (
  <Link href={Routes.NewProjectPage()}>
    <a className="bg-gradient-to-r btn btn-block from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out">
      نمونه کار جدید
    </a>
  </Link>
)
const ProjectsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>نمونه کار ها</title>
      </Head>

      <div className="pt-24">
        <Suspense fallback={<div>در حال بارگزاری...</div>}>
          <ProjectsList />
          {/* <SocialMediaProfilePage /> */}
        </Suspense>
      </div>
    </>
  )
}

ProjectsPage.authenticate = false
ProjectsPage.getLayout = (page) => <Layout>{page}</Layout>

export default ProjectsPage
