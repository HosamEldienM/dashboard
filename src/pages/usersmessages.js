import { useContext, useEffect, useMemo, useState } from "react";
import MessageCard from "../components/messagecard";
import { LangContext } from "../contexts/cartContext";
import { MessagesContext } from "../contexts/messagescontext";

const UsersMessages = () => {
  const [Filter, setFilter] = useState(false);
  const { Messages, getMessages, markRead } = useContext(MessagesContext);
  const { Lang } = useContext(LangContext);
  useEffect(() => {
    getMessages();
  }, []);

  const displayMessages = useMemo(() => {
    if (!Filter) return Messages;
    else return Messages.filter((message) => message.status === "new");
  }, [Messages, Filter]);
  return (
    <div className="p-3">
      <div className="col-12  row m-0 my-3 m-auto">
        <div className="col-3 col-md-7"></div>
        <div class=" col-9 col-md-5  ">
          <input
            class="form-check-input  "
            type="checkbox"
            checked={Filter}
            onChange={(e) => {
              setFilter(e.target.checked);
            }}
          />

          <label class="form-check-label mx-2">
            {Lang === "en"
              ? "Show new messages only"
              : "عرض الرسائل الجديدة فقط"}
          </label>
        </div>
      </div>

      {!displayMessages[0] && (
        <div className=" text-center h1 txtone p-5 m-5">
          {Lang === "en" ? "No messages to display" : "لا توجد رسائل لعرضها"}
        </div>
      )}
      {displayMessages[0] &&
        displayMessages.map((message) => <MessageCard message={message} />)}
    </div>
  );
};

export default UsersMessages;
