import { useContext } from "react";
import { LangContext, UserContext } from "../contexts/cartContext";
import { auth, db } from "../config/config";
import { useHistory } from "react-router-dom";
const SignOutButton = () => {
  const { User, setUser } = useContext(UserContext);
  const history = useHistory();
  const { Lang } = useContext(LangContext);
  var time = new Date();
  return (
    <button
      className="btn btn-outline-one border-0 p-2"
      onClick={() => {
        db.collection("Users")
          .doc(auth.currentUser.uid)
          .update({ LastSeen: time.getTime() })
          .then(() => auth.signOut());
        setUser(null);
        history.push("./");
      }}
    >
      {Lang == "en" ? "Sign Out" : "تسجيل الخروج"}
    </button>
  );
};

export default SignOutButton;
