import { Project } from "@prisma/client"
// import TestModalsButton from "app/core/components/TestModalsButton"
import { Image, Link, Router, Routes } from "blitz"

export function ProjectCardDesc(props: { project: Project; setShowModal?: any; showModal?: any }) {
  const { setShowModal, showModal, project } = props
  const myroute = Routes.ShowProjectPage({ projectId: project.id })
  let serv = project ? (
    <>
      <div className="card w-96 md:w-75  bg-base-100 shadow-2xl" dir="rtl">
        <figure>
          <Image
            className="cursor-pointer object-cover object-center w-full transition-all scale-110 lg:h-48 md:h-36 duration-400 hover:scale-100"
            src={`${project.image_url}`}
            alt={project.name}
            width={450}
            height={250}
            onClick={() => Router.push(`projects/${project.id}`)}
          />
          {/* <TestModalsButton
            showModal={showModal}
            setShowModal={setShowModal}
            image_url={project.image_url}
            title={project.name}
            button1={
              <Link href={Routes.ShowProjectPage({ projectId: project.id })}>
                <a>{project.name.split(" ")[0]}...</a>
              </Link>
            }
            button2={"انصراف"}
          /> */}
        </figure>

        <div className="card-body" dir="rtl">
          <h2 className="card-title">{project.name}</h2>
          <p className="card-compact">{project.long_description?.slice(0, 150)} ...</p>
          <div className="card-actions justify-end">
            <Link href={Routes.ShowProjectPage({ projectId: project.id })}>
              <a className="btn btn-block btn-warning  hover:scale-105 rounded-xl animate-pulse">
                بیشتر
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  ) : null
  return serv
}
