const { Browser, Page, launch } = require('puppeteer');
const dateUtils = require('chrono-node');

async function init() {
	const browser = await launch({
		headless: false
	});

	const page = await browser.newPage();
	await page.goto('http://scotlandjs.com/schedule/');

	const time = await page.evaluate(() => {
		const umar = document.querySelector('a[href="#umar"]');
		const scheduleItem = umar.parentElement.parentElement;
		const date = scheduleItem.parentElement.querySelector('.header').innerHTML;
		const time = scheduleItem.querySelector('.time').innerHTML;
		return `${date} ${time}`;
	});

	const myConferenceTalk = dateUtils.parseDate(time);
	await browser.close();

	const output = `Umar's Conf Talk: ${myConferenceTalk.toString()}`;
	console.log(output);
}

init();