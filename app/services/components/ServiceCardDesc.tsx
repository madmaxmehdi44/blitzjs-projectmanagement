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
          <h2 className="card-title">{service.name}</h2>
          <p className="card-compact">{service.long_description?.slice(0, 150)} ...</p>
          <div className="card-actions justify-end">
            <Link href={Routes.ShowServicePage({ serviceId: service.id })}>
              <a className="btn btn-block btn-warning  hover:scale-105 rounded-xl animate-pulse">
                ادامه...
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  ) : null
  return serv
}
