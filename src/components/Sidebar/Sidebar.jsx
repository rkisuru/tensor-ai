import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faPlus } from "@fortawesome/free-solid-svg-icons";
import { faCommentAlt } from "@fortawesome/free-solid-svg-icons";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { faHistory } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { Context } from "../../Context/Context";

const Sidebar = () => {
  const [expand, setExpand] = useState(false);
  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);
  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <div className="sidebar">
      <div className="top">
        <span className="menu" onClick={() => setExpand((prev) => !prev)}>
          <FontAwesomeIcon icon={faBars} size="lg"></FontAwesomeIcon>
        </span>
        <div className="new-chat" onClick={() => newChat()}>
          <FontAwesomeIcon icon={faPlus} size="lg"></FontAwesomeIcon>
          {expand ? <p>New Chat</p> : null}
        </div>
        {expand ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index) => {
              return (
                <div className="recent-entry" onClick={() => loadPrompt(item)}>
                  <FontAwesomeIcon
                    icon={faCommentAlt}
                    size="lg"
                  ></FontAwesomeIcon>
                  <p>{item.slice(0, 18)}...</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <FontAwesomeIcon icon={faQuestion} size="lg"></FontAwesomeIcon>
          {expand ? <p>Help</p> : null}
        </div>
        <div className="bottom">
          <div className="bottom-item recent-entry">
            <FontAwesomeIcon icon={faHistory} size="lg"></FontAwesomeIcon>
            {expand ? <p>Activity</p> : null}
          </div>
        </div>
        <div className="bottom">
          <div className="bottom-item recent-entry">
            <FontAwesomeIcon icon={faGear} size="lg"></FontAwesomeIcon>
            {expand ? <p>Settings</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
