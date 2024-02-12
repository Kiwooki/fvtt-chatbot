import { registerSettings, moduleName } from './scripts/settings.js';
import { sendRestApiRequest } from './gemini-api.js';
// Import necessary libraries
// const { TextPrompt } = foundry.utils;

// Function to send a message to the API and display response
// async function sendQuery(message, apiKey) {
//     const prompt = new TextPrompt({
//       apiKey,
//       prompt: message,
//       temperature: 0.7,
//       maxTokens: 50,
//     });
  
//     const response = await prompt.completion;
//     const chatEntry = await ChatMessage.create({
//       content: `<p><b>Assistant:</b> ${response.trim()}</p>`,
//       speaker: {
//         alias: "Gemini Assistant",
//         appId: "module.gemini-chat-assistant",
//       },
//     });
//     canvas.tokens.controlled.forEach((token) => token.actor.addChatMessage(chatEntry));
//   }

Hooks.once('init', () => {
	console.log(`${moduleName} | Initialization`);
	registerSettings();
    const apiKey = game.settings.get(moduleName, 'apiKey');
    game.chatCommands.register("!query", (message) => {
      const content = message.content.trim();
      if (content.length > 0) {
        temperature = 0.8
        sendRestApiRequest(content, temperature)
        // sendQuery(content, apiKey);
      } else {
        console.log("No content sent.")
        // ChatMessage.create({
        //   content: "<p><b>Assistant:</b> I need a question or message to respond to.</p>",
        //   speaker: {
        //     alias: "Gemini Assistant",
        //     appId: "module.gemini-chat-assistant",
        //   },
        // });
      }
    });
});

// Replace with your actual API key
const apiKey = "YOUR_API_KEY";


// // Register chat command handler
// Hooks.once("init", async () => {
//   game.chatCommands.register("!query", (message) => {
//     const content = message.content.trim();
//     if (content.length > 0) {
//       sendQuery(content);
//     } else {
//       ChatMessage.create({
//         content: "<p><b>Assistant:</b> I need a question or message to respond to.</p>",
//         speaker: {
//           alias: "Gemini Assistant",
//           appId: "module.gemini-chat-assistant",
//         },
//       });
//     }
//   });
// });