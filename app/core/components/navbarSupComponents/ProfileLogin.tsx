import { UserCircleIcon } from "@heroicons/react/solid"
import { Image } from "blitz"
import { useCurrentUser } from "../../hooks/useCurrentUser"

export default function ProfileLogin() {
  const currentUser = useCurrentUser()
  const online = "online"
  const offline = "offline"

  let userStatus = offline

  {
    currentUser ? (userStatus = online) : (userStatus = offline)
  }
  return (
    <>
      <label
        tabIndex={0}
        className={`bg-indigo-500 shadow-lg gap-5  shadow-indigo-500/50 btn btn-circle glass avatar ${userStatus} w-12 h-12  cursor-pointer hover:bg-teal-500`}
      >
        <UserCircleIcon />
      </label>
    </>
  )
}
