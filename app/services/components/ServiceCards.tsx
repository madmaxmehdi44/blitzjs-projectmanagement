import { Suspense } from "react"
import { ServiceCard } from "./ServiceCard"

export function ServiceCards(props): JSX.Element {
  return (
    <>
      {/* <div className="flex flex-wrap items-center justify-center bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500"> */}
      <div className="flex flex-wrap items-center justify-center">
        {/* <Suspense fallback="loading .... service card"> */}
        <div className="w-11/12 h-5/6 md:w-9/12 md:h-5/6">{/* <ServiceCard /> */}</div>
        {/* <div className="">
          <ServiceCard />
          </div>
          <div className="">
          <ServiceCard />
          </div>
          <div className="">
          <ServiceCard />
          </div>
          <div className="">
          <ServiceCard />
          </div>
          <div className="">
          <ServiceCard />
          </div>
          <div className="">
          <ServiceCard />
          </div> */}
        {/* </Suspense> */}
        {/* <Suspense fallback="loading .... service card">
          <ServiceCard />
        </Suspense>
        <Suspense fallback="loading .... service card">
          <ServiceCard />
        </Suspense>
        <Suspense fallback="loading .... service card">
          <ServiceCard />
        </Suspense>
        <Suspense fallback="loading .... service card">
          <ServiceCard />
        </Suspense> */}
      </div>
    </>
  )
}
