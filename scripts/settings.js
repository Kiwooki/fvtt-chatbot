export const moduleName = 'fvtt-chatbot';

export const gameSystems = (() => {
	const genericPrompt = "I would like you to help me with running the game by coming up with ideas, answering questions, and improvising. Keep responses as short as possible. Stick to the rules as much as possible.";
	const formatPrompt = "Always format each answer as HTML code without CSS, including lists and tables. Never use Markdown.";
	return {
		'generic': {
			name: 'Generic tabletop RPG',
			prompt: `You are a game master for a tabletop roleplaying game. ${genericPrompt} ${formatPrompt}`,
		},
		'dnd5e': {
			name: 'Dungeons & Dragons 5th Edition',
			prompt: `You are a dungeon master for a Dungeons & Dragons 5th Edition game. ${genericPrompt} Properly format spells, monsters, conditions, and so on. ${formatPrompt}`,
		},
	};
})();

export const registerSettings = () => {
	// 'world' scope settings are available only to GMs

	game.settings.register(moduleName, 'apiKey', {
		name: 'Gemini API key',
		hint: 'API key for Google Gemini. Get yours at <here>.',
		scope: 'world',
		config: true,
		type: String,
		default: '',
	});

	Hooks.on('renderSettingsConfig', (_settingsConfig, element, _data) => {
		let apiKeyInput = element.find(`input[name='${moduleName}.apiKey']`)[0];
		if (apiKeyInput) {
			apiKeyInput.type = 'password';
			apiKeyInput.autocomplete = 'one-time-code';
		}
	});

	game.settings.register(moduleName, 'gameSystem', {
		name: 'Game system',
		hint: 'Optimize logic for the game system, including Gemini prompt.',
		scope: 'world',
		config: true,
		type: String,
		default: game.system.id in gameSystems ? game.system.id : 'generic',
		choices: Object.fromEntries(
			Object.entries(gameSystems).map(([id, desc]) => [id, desc.name])
		),
		onChange: id => console.log(`${moduleName} | Game system changed to '${id}',`,
			'Gemini prompt now is:', getGamePromptSetting()),
	});

	game.settings.register(moduleName, 'gamePrompt', {
		name: 'Custom Gemini prompt',
		hint: 'Overrides prompt for the game system above. Set to customize or refine Gemini behavior.',
		scope: 'world',
		config: true,
		type: String,
		default: gameSystems[game.settings.get(moduleName, 'gameSystem')].prompt,
		onChange: () => console.log(`${moduleName} | Gemini prompt now is:`, getGamePromptSetting()),
	});
}

export const getGamePromptSetting = () => {
	return game.settings.get(moduleName, 'gamePrompt').trim() ||
		gameSystems[game.settings.get(moduleName, 'gameSystem')].prompt;
}