import { useAuth } from "../context/authContext";
import "./style.css"

export default function ProfilePhoto() {

  const { user } = useAuth()

  return (
    <>
      <section className="avatars me-2 md-me-3">
        <img referrerPolicy="no-referrer" src={user.photoURL || null} alt="profile" />
      </section>
    </>
  )
}