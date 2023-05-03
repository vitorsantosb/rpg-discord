const jest = require('jest');
const ProgressBar = require('progress');

const bar = new ProgressBar(':bar :current/:total (:percent)', {
	total: 1,
	width: 20,
});

jest.run().then((result) => {
	if (result.results.success) {
		bar.tick();
	} else {
		console.error('Ocorreu um erro nos testes');
	}
});