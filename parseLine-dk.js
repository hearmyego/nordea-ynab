function cleanLine(input) {
	let output = input.replace('Dankort-nota ', '');
	output = output.replace(',', '.');
	output = output.replace(/\s+/g, ' ');

	return output;
}

function parseLine(line) {
	if (line === '') {
		return null;
	}

	const lineArr = line.split(';');

	// console.log(line);
	// console.log(lineArr);

	// 0 - Bogført
	// 1 - Tekst;
	// 2 - Rentedato;
	// 3 - Beløb;
	// 4 - Saldo

	let date = '';

	if (lineArr[0].includes('Reserveret')) {
		return null;
		// const curDate = new Date();
		// date = `${curDate.getDate() + 7}/${curDate.getMonth() + 1}/${curDate.getFullYear()}`;
	} else {
		const dateParts = lineArr[0].split('-');
		date = dateParts[0] + '/' + dateParts[1] + '/' + dateParts[2];
	}

	const payee = cleanLine(lineArr[1]);

	const memo = ''; // lineArr[10];

	let amount = lineArr[3].replace(',', '.');
	amount = parseFloat(amount);

	let outflow = 0;
	let inflow = 0;

	if (amount > 0) {
		inflow = amount;
	} else {
		outflow = -1 * amount;
	}

	const payment = {
		date: date,
		payee: payee,
		memo: '"' + memo + '"',
		outflow: outflow,
		inflow: inflow,
	};

	return payment;
}

module.exports = parseLine;
