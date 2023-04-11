const path = require('path');
const fs = require('fs').promises;

const langsDirectoryPath = path.resolve(__dirname, '../langs');

const LangMap = new Map();

async function SetupLangFiles() {
	const files = await fs.readdir(langsDirectoryPath);

	return files
		.filter(function (fileName) {
			return fileName.endsWith('.js');
		})
		.map(function (fileName) {
			return require(`../langs/${fileName}`);
		})
		.reduce(function (langMap, file) {
			langMap.set(file.lang, file);
			return langMap;
		}, LangMap);
}

/**
 *
 * @returns {Promise<void>}
 * @param interaction
 */
function Lang(interaction) {
	if (!LangMap.has(interaction.locale)) {
		throw new Error('lang file not found');
	}

	return LangMap.get(interaction.locale);
}

module.exports = {SetupLangFiles, Lang};