const {ResolveLangs} = require('./lang');

function CreateOptionLocalizations(resolver) {
	return ResolveLangs(resolver).reduce((acc, item) => {
		acc.name[item.name] = item.value.name;
		acc.description[item.name] = item.value.description;

		return acc;
	}, {name: {}, description: {}});
}

function AddTranslations(option, localizationResolver) {
	const localizations = CreateOptionLocalizations(localizationResolver);

	return option
		.setNameLocalizations(localizations.name)
		.setDescriptionLocalizations(localizations.description);
}

module.exports = {AddTranslations};