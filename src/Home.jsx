import React, { useEffect, useState } from "react";

export const Home = () => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    fetch("https://602e7c2c4410730017c50b9d.mockapi.io/users")
      .then((Res) => {
        if (Res.ok) {
          setError(false);
        } else {
          setError(true);
        }
        return Res.json();
      })
      .then((response) => {
        if (error === false) {
          setData(response);
        }
        setLoading(false);
      });
  }

  function setUserInfo(para) {
    setUser([para]);
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="App-logo"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="loading-container">
        <p className="show-error">No data to show</p>
      </div>
    );
  }

  return (
    <div className="parent-home">
      <div className="users-list-container">
        <div className="list-header">
          <p className="list-header-txt">Users List</p>
        </div>
        <div className="list-container">
          {data
            .slice()
            .reverse()
            .map((par, index) => {
              return (
                <div
                  key={index}
                  className="single-container"
                  onClick={() => setUserInfo(par)}
                >
                  <img
                    src={
                      par.avatar || "https://i.ibb.co/WDS7G7c/download-1.png"
                    }
                    onError={(e) =>
                      (e.currentTarget.src =
                        "https://i.ibb.co/WDS7G7c/download-1.png")
                    }
                    alt="user-avatar"
                  />
                  <p className="user-full-name">
                    {par.profile.firstName} {par.profile.lastName}
                  </p>
                </div>
              );
            })}
        </div>
      </div>

      {user.length !== 0 ? (
        <div className="user-data">
          <div className="list-header">
            <p className="list-header-txt">User Details</p>
          </div>
          <div className="user-info">
            {user.map((par) => {
              return (
                <div key={par.id} className="single-user-card">
                  <img
                    src={
                      par.avatar || "https://i.ibb.co/WDS7G7c/download-1.png"
                    }
                    onError={(e) =>
                      (e.currentTarget.src =
                        "https://i.ibb.co/WDS7G7c/download-1.png")
                    }
                    alt="user-avatar"
                  />
                  <p className="single-user-username">
                    @{par.profile.username}
                  </p>
                  <div className="single-user-bio">{par.Bio}</div>
                  <div className="single-user-readonly">
                    <p>Full Name</p>
                    <input
                      value={par.profile.firstName + " " + par.profile.lastName}
                      disabled={true}
                      readOnly={true}
                    />
                  </div>
                  <div className="single-user-readonly">
                    <p>Job Title</p>
                    <input
                      value={par.jobTitle}
                      disabled={true}
                      readOnly={true}
                    />
                  </div>
                  <div className="single-user-readonly">
                    <p>Email</p>
                    <input
                      value={par.profile.email}
                      disabled={true}
                      readOnly={true}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
