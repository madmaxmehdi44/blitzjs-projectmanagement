import { Service } from "@prisma/client"
// import TestModalsButton from "app/core/components/TestModalsButton"
import { Image, Link, Router, Routes } from "blitz"

export function ServiceCardDesc(props: { service: Service; setShowModal?: any; showModal?: any }) {
  const { setShowModal, showModal, service } = props
  const myroute = Routes.ShowServicePage({ serviceId: service.id })
  let serv = service ? (
    <>
      <div
        className="card cursor-pointer shadow-md hover:shadow-2xl w-full"
        dir="rtl"
        onClick={() => Router.push(`services/${service.id}`)}
      >
        <figure>
          <Image
            className="object-cover object-center w-full transition-all scale-110 lg:h-48 md:h-36 duration-400 hover:scale-100"
            src={`${service.image_url}`}
            alt={service.name}
            width={450}
            height={250}
          />
          {/* <TestModalsButton
            showModal={showModal}
            setShowModal={setShowModal}
            image_url={service.image_url}
            title={service.name}
            button1={
              <Link href={Routes.ShowServicePage({ serviceId: service.id })}>
                <a>{service.name.split(" ")[0]}...</a>
              </Link>
            }
            button2={"انصراف"}
          /> */}
        </figure>

        <div className="card-body" dir="rtl">
          <h2 className="card-title text-secondary">{service.name}</h2>
          <p className="card-compact  text-primary-content">{service.long_description?.slice(0, 180)} ...</p>
          <div className="card-actions bg-gray-50 ">
            <div className="justify-evenly flex gap-2 px-1 py-0.5 w-full">
              <Link href={Routes.ShowServicePage({ serviceId: service.id })}>
                <a className="w-5 h-5 btn-error  shadow-inner  hover:shadow-violet-700 mask mask-heart hover:scale-105  hover:animate-bounce"></a>
              </Link>
              <Link href={Routes.ShowServicePage({ serviceId: service.id })}>
                <a  className="relative w-5 h-5 btn-secondary shadow-inner  hover:shadow-violet-700 mask mask-hexagon hover:animate-spin">
                  <p className="absolute mx-auto text-center">....</p>
                </a>
              </Link>
              <Link href={Routes.ShowServicePage({ serviceId: service.id })}>
                <a className="w-5 h-5 btn-warning mask mask-star-2 hover:scale-105 shadow-inner  hover:shadow-violet-700  animate-pulse"></a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null
  return serv
}
