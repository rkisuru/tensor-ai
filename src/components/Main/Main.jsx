import React, { createContext, useContext } from "react";
import "./Main.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCompass,
  faImage,
  faMicrophone,
  faPaperPlane,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Context } from "../../Context/Context";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
  } = useContext(Context);

  return (
    <div className="main">
      <div className="nav">
        <p>Tensor</p>
        <span>
          <FontAwesomeIcon icon={faUser} size="lg"></FontAwesomeIcon>
        </span>
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Dev.</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Lorem ipsum dolor sit amet.</p>
                <span>
                  <FontAwesomeIcon icon={faCompass} size="xl" />
                </span>
              </div>
              <div className="card">
                <p>Lorem ipsum dolor sit amet.</p>
                <span>
                  <FontAwesomeIcon icon={faCompass} size="xl" />
                </span>
              </div>
              <div className="card">
                <p>Lorem ipsum dolor sit amet.</p>
                <span>
                  <FontAwesomeIcon icon={faCompass} size="xl" />
                </span>
              </div>
              <div className="card">
                <p>Lorem ipsum dolor sit amet.</p>
                <span>
                  <FontAwesomeIcon icon={faCompass} size="xl" />
                </span>
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <span>
                <FontAwesomeIcon icon={faUser} size="xl"></FontAwesomeIcon>
                {recentPrompt}
              </span>
            </div>
            <div className="result-data">
              <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter your prompt"
            />
            <div>
              <span>
                <FontAwesomeIcon icon={faImage} size="xl"></FontAwesomeIcon>
              </span>
              <span>
                <FontAwesomeIcon
                  icon={faMicrophone}
                  size="xl"
                ></FontAwesomeIcon>
              </span>
              {input ? (
                <span onClick={() => onSent()}>
                  <FontAwesomeIcon
                    icon={faPaperPlane}
                    size="xl"
                  ></FontAwesomeIcon>
                </span>
              ) : null}
            </div>
          </div>
          <p className="bottom-info">Lorem ipsum dolor sit amet consectetur.</p>
        </div>
      </div>
    </div>
  );
};

export default Main;
