const axios = require('axios');
const cheerio = require('cheerio');

//const url='https://www.valueresearchonline.com/funds/15684/axis-focused-25-fund-direct-plan/?';
//utm_source=direct-click&utm_medium=funds&utm_content=Axis+Focused+25&utm_campaign=vro-search&utm_term=axis+focus';//'https://news.ycombinator.com';

async function getData (html) {
	//data = [];
	const $ = await cheerio.load(html);
	let data = $('#growth-dividend')
				.children('p')
				.children('small')
				.first()
                .text().replace('Growth: ₹ ','');

                data = data.replace(',', '');

	const last_price = Number(data);
	const units = 112926.935;
	const costperunit = 28.34;

	const totalReturn = (last_price - costperunit) * units

    //console.log(data, last_price, totalReturn);
    return last_price;
}



module.exports = {
    getNAV: async function (mf_data, url) {

        mf_data.last_nav_price = 0;

        console.log("URL: "+url+mf_data.type);
        await axios.get(url+mf_data.type)
        .then(async response => {
            mf_data.last_nav_price = response.data.data[0].nav;
            // mf_data.last_nav_price = await getData(response.data);
            console.log("mf_data: :::: " + mf_data);
            //let response2 = await Promise.all(mf_data.last_nav_price);
            //console.log(response2);
            return mf_data.last_nav_price;
        })
        .catch(error => {
            console.log(error);
        })
      //console.log("data [1]: " + data[1]);
    }
  };