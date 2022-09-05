const Profile = ({ currentUser }) => {
  return (
    <div>
      <div className="profile-user">
        <h2>{currentUser.username}</h2>
        <img src={currentUser.image} />
      </div>
      <div className="library-card"></div>
    </div>
  )
}
export default Profile
