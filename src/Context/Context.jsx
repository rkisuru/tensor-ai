import { createContext, useState } from "react";
import run from "../config/tensor";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let response;
    if (prompt !== undefined) {
      response = await run(prompt);
      setRecentPrompt(prompt);
    } else {
      setPrevPrompts((prev) => [...prev, input]);
      setRecentPrompt(input);
      response = await run(input);
    }

    // Step 1: Replace ## with <b> and </b>
    let responseWithBoldHeaders = response
      .split("##")
      .join("<b>")
      .split(":</b>")
      .join(":</b></br>");

    // Step 2: Replace ** with <b> and </b>
    let responseArray = responseWithBoldHeaders.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i % 2 === 1) {
        newResponse += "<b>" + responseArray[i] + "</b>";
      } else {
        newResponse += responseArray[i];
      }
    }

    // Step 3: Replace * with <li> and wrap with <ul> tags if there are list items
    let listSegments = newResponse.split("* **");
    let newResponseWithList = listSegments[0]; // The text before the first list item remains as is
    if (listSegments.length > 1) {
      newResponseWithList += "<ul>"; // Start the unordered list
      for (let i = 1; i < listSegments.length; i++) {
        newResponseWithList += "<li>" + listSegments[i].trim() + "</li>";
      }
      newResponseWithList += "</ul>"; // Close the unordered list
    }

    // Step 4: Handle line spaces by preserving line breaks (assuming \n represents line breaks)
    let formattedResponse = newResponseWithList.replace(/\n/g, "</br>");

    // Step 5: Display the formatted response with delays as before
    let newResponseArray = formattedResponse.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord + " ");
    }
    setLoading(false);
    setInput("");
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
