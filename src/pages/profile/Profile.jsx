import { useAuth } from "../../context/";
import "./profile.css";

export const Profile = () => {
  const { authData, handleLogout } = useAuth();

  return (
    <>
      <main>
        <div className="user--container">
          <h1 className="heading--3 text--center">My Account</h1>
          <div className="avatar--container">
            <img
              src="https://randomuser.me/api/portraits/men/41.jpg"
              alt={`${authData.userData.firstName} ${authData.userData.lastName}`}
              className="avatar avatar--circle avatar--xl"
            />
          </div>

          {authData.isLoggedIn ? (
            <div>
              <p className="username text--center">
                {`${authData.userData.firstName} ${authData.userData.lastName}`}
              </p>
              <div className="email--container">
                <p className="email--label">Email</p>
                <p className="email--content">{authData.userData.email}</p>
              </div>
              <div className="m-t-1 m-h-1 text--center">
                <button className="btn btn--primary" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          ) : (
            "Not Logged In"
          )}
        </div>
      </main>
    </>
  );
};
