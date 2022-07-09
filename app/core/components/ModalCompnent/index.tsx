import ForgotPasswordPage from "app/auth/pages/forgot-password"
import LoginPage from "app/auth/pages/login"
import SignupPage from "app/auth/pages/signup"
import { ProjectsList } from "app/pages/projects"
// import PlyrComponent from "../vidply"

export const ModalProjects = () => {
  return (
    <>
      <input type="checkbox" id="my-modal-2" className="modal-toggle" />
      <div className="modal cursor-pointer bg-red-400 bg-opacity-60 glass">
        <label className="modal-box w-11/12 max-w-5xl " htmlFor={""}>
          <ProjectsList />
          <div className="bottom-2 mx-auto modal-action">
            <label htmlFor="my-modal-2" className="btn">
              انصراف
            </label>
          </div>
        </label>
      </div>
    </>
  )
}
export const ModalLogin = () => {
  return (
    <>
      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="space-y-2 flex w-full flex-col items-center justify-center">
            <LoginPage />
            <div className="modal-action">
              <label htmlFor="my-modal-6" className="btn">
                انصراف
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const ModalSignup = () => {
  return (
    <>
      <input type="checkbox" id="my-modal-5" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="space-y-2 flex w-full flex-col items-center justify-center">
            <SignupPage />
            <div className="modal-action">
              <label htmlFor="my-modal-5" className="btn">
                انصراف
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export const ModalSettings = () => {
  return (
    <>
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="space-y-2 flex w-full flex-col items-center justify-center">
            <ForgotPasswordPage />
            <div className="modal-action">
              <label htmlFor="my-modal-4" className="btn">
                انصراف
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// export const ModalVideo = () => {
//   return (
//     <>
//       <input type="checkbox" id="my-modal-3" className="modal-toggle" />
//       <label htmlFor="my-modal-3" className="modal sm:modal-middle  cursor-pointer">
//         <label className="modal-box relative" htmlFor="">
//           {/* <label className="modal-box"> */}
//           <div className="space-y-2 flex w-full flex-col items-center justify-center">
//             <div className="w-full p-0 overflow-hidden mx-auto border-violet-900 border-2  rounded-xl shadow-sm shadow-violet-800 ">
//               <PlyrComponent />
//             </div>
//             <div className="modal-action">
//               <label htmlFor="my-modal-3" className="btn">
//                 انصراف
//               </label>
//             </div>
//           </div>
//           {/* </div> */}
//         </label>
//       </label>
//     </>
//   )
// }
export default function ModalIndex() {
  return (
    <>
      <ModalLogin />
      <ModalSignup />
      <ModalSettings />
      {/* <ModalVideo /> */}
      <ModalProjects />
    </>
  )
}
