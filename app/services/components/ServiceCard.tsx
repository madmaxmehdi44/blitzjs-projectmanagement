import { Service } from "@prisma/client"
// import TestModals from "app/core/components/TestModals"
// import TestModalsButton from "app/core/components/TestModalsButton"
import { Image, Link } from "blitz"
import { useState } from "react"
import { ServiceCardDesc } from "./ServiceCardDesc"

export function ServiceCard(props: { service: Service }) {
  const [showModal, setShowModal] = useState(false)
  const { service } = props
  return (
    <>
      <ServiceCardDesc showModal={showModal} setShowModal={setShowModal} service={service} />
      {/* </div> */}
    </>
  )
}
