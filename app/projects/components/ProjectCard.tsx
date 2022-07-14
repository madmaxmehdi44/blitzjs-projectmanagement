import { Project } from "@prisma/client"
// import TestModals from "app/core/components/TestModals"
// import TestModalsButton from "app/core/components/TestModalsButton"
import { Image, Link } from "blitz"
import { useState } from "react"
import { ProjectCardDesc } from "./ProjectCardDesc"

export function ProjectCard(props: { project: Project }) {
  const [showModal, setShowModal] = useState(false)
  const { project } = props
  return (
    <>
      <ProjectCardDesc showModal={showModal} setShowModal={setShowModal} project={project} />
      {/* </div> */}
    </>
  )
}
