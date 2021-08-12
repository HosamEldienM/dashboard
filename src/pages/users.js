import { useContext, useEffect, useMemo, useState } from "react";

import UserCard from "../components/usercard";

import { LangContext, UserContext } from "../contexts/cartContext";
import { UsersContext } from "../contexts/userscontext";
import Search from "../components/search";
const Users = () => {
  const { Users, setUsers, getUsers } = useContext(UsersContext);
  const { User } = useContext(UserContext);
  const [SearchText, setSearchText] = useState("");
  const { Lang } = useContext(LangContext);

  useEffect(() => {
    if (User) {
      getUsers();
    }
  }, []);

  const displayUsers = useMemo(() => {
    return Users.filter((user) =>
      user.Email.toLowerCase().startsWith(SearchText.toLowerCase())
    );
  }, [SearchText, Users]);
  return (
    <>
      {/* search */}
      <div className=" bgone row p-3 justify-content-center ">
        <div className=" col-md-4 ">
          <div className="input-group  col-3">
            <input
              className="form-control"
              placeholder={
                Lang === "en"
                  ? "search users by email"
                  : "البحث في المستخدمين بالبريد الإلكتروني"
              }
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />

            <i className="fa fa-search bgone p-2 text-white rounded"></i>
          </div>
        </div>
      </div>

      <div className="mx-md-5  ">
        <div className="mx-sm-4 p-3 py-4 bg-white shadow border-0 rounded ">
          <br />
          {!displayUsers[0] && (
            <div className="h1 txtone    py-5  text-center">No Users found</div>
          )}
          {displayUsers
            .sort((a, b) => b.CreatedAt - a.CreatedAt)
            .map((user, index) => (
              <UserCard user={user} key={index} SearchText={SearchText} />
            ))}
        </div>
      </div>
    </>
  );
};

export default Users;
