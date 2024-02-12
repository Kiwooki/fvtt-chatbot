import { getGamePromptSetting } from './settings.js';

// Function to send a POST request with the prompt and temperature
async function sendRestApiRequest(prompt, temperature) {
  try {
    const game_prompt = getGamePromptSetting();
    const apiKey = game.settings.get(moduleName, 'apiKey');
    const apiUrl = 'https://api.generative-ai.google/v1/textGeneration'

    let str = game_prompt + ' ' + prompt
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        str,
        temperature,
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.completion.trim();
  } catch (error) {
    console.error("Error sending API request:", error);
    return error.message; // Or handle the error differently
  }
}

// // Example usage:
// const myPrompt = "Write a fictional story about a robot.";
// const desiredTemperature = 0.8;

sendRestApiRequest(myPrompt, desiredTemperature)
  .then((response) => {
    console.log("Response from Gemini API:", response);
  })
  .catch((error) => {
    console.error("Error:", error);
  });