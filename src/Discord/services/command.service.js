const {ResolveLangs} = require('./lang');

function AddTranslations(option, langResolver) {
	const localizations = ResolveLangs(langResolver).reduce((acc, item) => {
		acc.name[item.name] = item.value.name;
		acc.description[item.name] = item.value.description;

		return acc;
	}, {name: {}, description: {}});

	console.log(localizations);

	return option
		.setNameLocalizations(localizations.name)
		.setDescriptionLocalizations(localizations.description);
}

module.exports = {AddTranslations};