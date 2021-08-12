import { useContext } from "react";
import { LangContext } from "../contexts/cartContext";
import { MessagesContext } from "../contexts/messagescontext";

const MessageCard = ({ message }) => {
  const { Lang } = useContext(LangContext);
  const { markRead } = useContext(MessagesContext);
  return (
    <div className="  p-3 bgtwo rounded myshadow my-5 col-md-9 m-auto">
      <div className="row px-4 ">
        <div className="col-md-6 mb-3 ">
          <label>{Lang === "en" ? "Status:" : "الحالة:"}</label>{" "}
          {Lang === "en"
            ? message.status
            : message.status === "new"
            ? "جديدة"
            : "مقروءة"}
        </div>
        <div className="col-md-6 mb-3">
          <label>{Lang === "en" ? "Email: " : "البريد الإلكتروني: "}</label>{" "}
          {message.Email}
        </div>
        <div className=" col-md-6 mb-3">
          <label>{Lang === "en" ? "Name:" : "الاسم:"}</label>{" "}
          {message.Name || "______"}
        </div>
        <div className="mb-3 col-md-6">
          <label>{Lang === "en" ? "Subject:" : "الموضوع:"}</label>{" "}
          {message.Subject || "______"}
        </div>
        <hr />
        <div className="p-3 bg-white rounded">
          <div>{message.Message}</div>
        </div>

        <div className="mt-2  row ms-auto px-2">
          <div className=" col-6 col-lg-9"></div>
          <button
            className="btn col-6 col-lg-3 btn-one "
            onClick={() => markRead(message.ID)}
            hidden={message.status !== "new"}
          >
            {Lang === "en" ? "Mark as read" : "التحديد كمقروءة"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageCard;
