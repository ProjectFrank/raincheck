(function($) {

    // Object responsible for acquiring data from API
    function CitySearch(city) {

	var forecast = {};

	// Return string representing day of the week where
	// 0 is Sunday and 6 is Saturday
	function prettyDay(num) {
	    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	    if (days[num]) {
		return days[num];
	    }
	    throw 'Argument must be integer 0-6 inclusive';
	}

	// Return string representing month of the year where
	// 0 is January and 11 is December
	function prettyMonth(num) {
	    var months = ['January', 'February', 'March', 'April', 'May', 'June',
			      'July', 'August', 'September', 'October', 'November', 'December'];
	    if (months[num]) {
		return months[num];
	    }
	    throw 'Argument must be integer 0-11 inclusive';
	}

	var isoCountries = {
	    'AF' : 'Afghanistan',
	    'AX' : 'Aland Islands',
	    'AL' : 'Albania',
	    'DZ' : 'Algeria',
	    'AS' : 'American Samoa',
	    'AD' : 'Andorra',
	    'AO' : 'Angola',
	    'AI' : 'Anguilla',
	    'AQ' : 'Antarctica',
	    'AG' : 'Antigua And Barbuda',
	    'AR' : 'Argentina',
	    'AM' : 'Armenia',
	    'AW' : 'Aruba',
	    'AU' : 'Australia',
	    'AT' : 'Austria',
	    'AZ' : 'Azerbaijan',
	    'BS' : 'Bahamas',
	    'BH' : 'Bahrain',
	    'BD' : 'Bangladesh',
	    'BB' : 'Barbados',
	    'BY' : 'Belarus',
	    'BE' : 'Belgium',
	    'BZ' : 'Belize',
	    'BJ' : 'Benin',
	    'BM' : 'Bermuda',
	    'BT' : 'Bhutan',
	    'BO' : 'Bolivia',
	    'BA' : 'Bosnia And Herzegovina',
	    'BW' : 'Botswana',
	    'BV' : 'Bouvet Island',
	    'BR' : 'Brazil',
	    'IO' : 'British Indian Ocean Territory',
	    'BN' : 'Brunei Darussalam',
	    'BG' : 'Bulgaria',
	    'BF' : 'Burkina Faso',
	    'BI' : 'Burundi',
	    'KH' : 'Cambodia',
	    'CM' : 'Cameroon',
	    'CA' : 'Canada',
	    'CV' : 'Cape Verde',
	    'KY' : 'Cayman Islands',
	    'CF' : 'Central African Republic',
	    'TD' : 'Chad',
	    'CL' : 'Chile',
	    'CN' : 'China',
	    'CX' : 'Christmas Island',
	    'CC' : 'Cocos (Keeling) Islands',
	    'CO' : 'Colombia',
	    'KM' : 'Comoros',
	    'CG' : 'Congo',
	    'CD' : 'Congo, Democratic Republic',
	    'CK' : 'Cook Islands',
	    'CR' : 'Costa Rica',
	    'CI' : 'Cote D\'Ivoire',
	    'HR' : 'Croatia',
	    'CU' : 'Cuba',
	    'CY' : 'Cyprus',
	    'CZ' : 'Czech Republic',
	    'DK' : 'Denmark',
	    'DJ' : 'Djibouti',
	    'DM' : 'Dominica',
	    'DO' : 'Dominican Republic',
	    'EC' : 'Ecuador',
	    'EG' : 'Egypt',
	    'SV' : 'El Salvador',
	    'GQ' : 'Equatorial Guinea',
	    'ER' : 'Eritrea',
	    'EE' : 'Estonia',
	    'ET' : 'Ethiopia',
	    'FK' : 'Falkland Islands (Malvinas)',
	    'FO' : 'Faroe Islands',
	    'FJ' : 'Fiji',
	    'FI' : 'Finland',
	    'FR' : 'France',
	    'GF' : 'French Guiana',
	    'PF' : 'French Polynesia',
	    'TF' : 'French Southern Territories',
	    'GA' : 'Gabon',
	    'GM' : 'Gambia',
	    'GE' : 'Georgia',
	    'DE' : 'Germany',
	    'GH' : 'Ghana',
	    'GI' : 'Gibraltar',
	    'GR' : 'Greece',
	    'GL' : 'Greenland',
	    'GD' : 'Grenada',
	    'GP' : 'Guadeloupe',
	    'GU' : 'Guam',
	    'GT' : 'Guatemala',
	    'GG' : 'Guernsey',
	    'GN' : 'Guinea',
	    'GW' : 'Guinea-Bissau',
	    'GY' : 'Guyana',
	    'HT' : 'Haiti',
	    'HM' : 'Heard Island & Mcdonald Islands',
	    'VA' : 'Holy See (Vatican City State)',
	    'HN' : 'Honduras',
	    'HK' : 'Hong Kong',
	    'HU' : 'Hungary',
	    'IS' : 'Iceland',
	    'IN' : 'India',
	    'ID' : 'Indonesia',
	    'IR' : 'Iran, Islamic Republic Of',
	    'IQ' : 'Iraq',
	    'IE' : 'Ireland',
	    'IM' : 'Isle Of Man',
	    'IL' : 'Israel',
	    'IT' : 'Italy',
	    'JM' : 'Jamaica',
	    'JP' : 'Japan',
	    'JE' : 'Jersey',
	    'JO' : 'Jordan',
	    'KZ' : 'Kazakhstan',
	    'KE' : 'Kenya',
	    'KI' : 'Kiribati',
	    'KR' : 'Korea',
	    'KW' : 'Kuwait',
	    'KG' : 'Kyrgyzstan',
	    'LA' : 'Lao People\'s Democratic Republic',
	    'LV' : 'Latvia',
	    'LB' : 'Lebanon',
	    'LS' : 'Lesotho',
	    'LR' : 'Liberia',
	    'LY' : 'Libyan Arab Jamahiriya',
	    'LI' : 'Liechtenstein',
	    'LT' : 'Lithuania',
	    'LU' : 'Luxembourg',
	    'MO' : 'Macao',
	    'MK' : 'Macedonia',
	    'MG' : 'Madagascar',
	    'MW' : 'Malawi',
	    'MY' : 'Malaysia',
	    'MV' : 'Maldives',
	    'ML' : 'Mali',
	    'MT' : 'Malta',
	    'MH' : 'Marshall Islands',
	    'MQ' : 'Martinique',
	    'MR' : 'Mauritania',
	    'MU' : 'Mauritius',
	    'YT' : 'Mayotte',
	    'MX' : 'Mexico',
	    'FM' : 'Micronesia, Federated States Of',
	    'MD' : 'Moldova',
	    'MC' : 'Monaco',
	    'MN' : 'Mongolia',
	    'ME' : 'Montenegro',
	    'MS' : 'Montserrat',
	    'MA' : 'Morocco',
	    'MZ' : 'Mozambique',
	    'MM' : 'Myanmar',
	    'NA' : 'Namibia',
	    'NR' : 'Nauru',
	    'NP' : 'Nepal',
	    'NL' : 'Netherlands',
	    'AN' : 'Netherlands Antilles',
	    'NC' : 'New Caledonia',
	    'NZ' : 'New Zealand',
	    'NI' : 'Nicaragua',
	    'NE' : 'Niger',
	    'NG' : 'Nigeria',
	    'NU' : 'Niue',
	    'NF' : 'Norfolk Island',
	    'MP' : 'Northern Mariana Islands',
	    'NO' : 'Norway',
	    'OM' : 'Oman',
	    'PK' : 'Pakistan',
	    'PW' : 'Palau',
	    'PS' : 'Palestinian Territory, Occupied',
	    'PA' : 'Panama',
	    'PG' : 'Papua New Guinea',
	    'PY' : 'Paraguay',
	    'PE' : 'Peru',
	    'PH' : 'Philippines',
	    'PN' : 'Pitcairn',
	    'PL' : 'Poland',
	    'PT' : 'Portugal',
	    'PR' : 'Puerto Rico',
	    'QA' : 'Qatar',
	    'RE' : 'Reunion',
	    'RO' : 'Romania',
	    'RU' : 'Russian Federation',
	    'RW' : 'Rwanda',
	    'BL' : 'Saint Barthelemy',
	    'SH' : 'Saint Helena',
	    'KN' : 'Saint Kitts And Nevis',
	    'LC' : 'Saint Lucia',
	    'MF' : 'Saint Martin',
	    'PM' : 'Saint Pierre And Miquelon',
	    'VC' : 'Saint Vincent And Grenadines',
	    'WS' : 'Samoa',
	    'SM' : 'San Marino',
	    'ST' : 'Sao Tome And Principe',
	    'SA' : 'Saudi Arabia',
	    'SN' : 'Senegal',
	    'RS' : 'Serbia',
	    'SC' : 'Seychelles',
	    'SL' : 'Sierra Leone',
	    'SG' : 'Singapore',
	    'SK' : 'Slovakia',
	    'SI' : 'Slovenia',
	    'SB' : 'Solomon Islands',
	    'SO' : 'Somalia',
	    'ZA' : 'South Africa',
	    'GS' : 'South Georgia And Sandwich Isl.',
	    'ES' : 'Spain',
	    'LK' : 'Sri Lanka',
	    'SD' : 'Sudan',
	    'SR' : 'Suriname',
	    'SJ' : 'Svalbard And Jan Mayen',
	    'SZ' : 'Swaziland',
	    'SE' : 'Sweden',
	    'CH' : 'Switzerland',
	    'SY' : 'Syrian Arab Republic',
	    'TW' : 'Taiwan',
	    'TJ' : 'Tajikistan',
	    'TZ' : 'Tanzania',
	    'TH' : 'Thailand',
	    'TL' : 'Timor-Leste',
	    'TG' : 'Togo',
	    'TK' : 'Tokelau',
	    'TO' : 'Tonga',
	    'TT' : 'Trinidad And Tobago',
	    'TN' : 'Tunisia',
	    'TR' : 'Turkey',
	    'TM' : 'Turkmenistan',
	    'TC' : 'Turks And Caicos Islands',
	    'TV' : 'Tuvalu',
	    'UG' : 'Uganda',
	    'UA' : 'Ukraine',
	    'AE' : 'United Arab Emirates',
	    'GB' : 'United Kingdom',
	    'US' : 'United States',
	    'UM' : 'United States Outlying Islands',
	    'UY' : 'Uruguay',
	    'UZ' : 'Uzbekistan',
	    'VU' : 'Vanuatu',
	    'VE' : 'Venezuela',
	    'VN' : 'Viet Nam',
	    'VG' : 'Virgin Islands, British',
	    'VI' : 'Virgin Islands, U.S.',
	    'WF' : 'Wallis And Futuna',
	    'EH' : 'Western Sahara',
	    'YE' : 'Yemen',
	    'ZM' : 'Zambia',
	    'ZW' : 'Zimbabwe'
	};
	
	function getCountryName (countryCode) {
	    if (isoCountries.hasOwnProperty(countryCode)) {
		return isoCountries[countryCode];
	    } else {
		return countryCode;
	    }
	}

	// Process data from API and return object representing weather
	// Used as Array.prototype.map callback
	function getWeather(data) {
	    var result = {};
	    result.date = new Date(data.dt * 1000);
	    result.day = prettyDay(result.date.getDay());
	    result.month = prettyMonth(result.date.getMonth());
	    result.dayOfMonth = result.date.getDate();
	    result.high = Math.round(data.temp.max);
	    result.low = Math.round(data.temp.min);
	    result.pressure = Math.round(data.pressure);
	    result.weather = data.weather;
	    return result;
	}

	// If forecast is cached, return promise resolved with forecast
	// Otherwise fetch 7 day forecast from API and return promise
	function search() {
	    var deferred = $.Deferred();
	    if (Object.keys(forecast).length > 0) {
		deferred.resolve(forecast);
		return deferred.promise();
	    }		
	    var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + '&units=metric&mode=json';
	    $.ajax({
		url: url,
		type: 'GET',
		data: {
		    q: city,
		    units: 'metric',
		    mode: 'json'
		},
		dataType: 'jsonp',
		success: function(response) {
		    if (response.cod == 200) {
			forecast.weather = response.list.map(getWeather);
			forecast.city = response.city.name;
			forecast.country = getCountryName(response.city.country);
			var sumPressure = 0;
			forecast.weather.forEach(function(day) {
			    sumPressure += day.pressure;
			})
			forecast.averagePressure = Math.round(sumPressure / forecast.weather.length);
			deferred.resolve(forecast);
		    } else {
			deferred.reject();
		    }
		},
		error: function() {
		    deferred.reject();
		}
	    });
	    return deferred.promise();
	}
	return {search: search};
    }

    var searches = {};
    function getSearch(city) {
	if (!(searches.hasOwnProperty(city))) {
	    searches[city] = CitySearch(city);
	}
	return searches[city];
    }

    
    var SearchBox = React.createFactory(React.createClass({
	displayName: 'SearchBox',	
	// Expose field value to owner
	getInput: function() {
	    return this.refs.city.getDOMNode().value.trim();
	},
	getInitialState: function() {
	    return null;
	},
	componentDidMount: function() {
	    $(this.refs.city.getDOMNode()).geocomplete({
		types: ['(cities)']
	    });
	},
	render: function() {
	    return React.DOM.div({className: 'searchbox'},
				 React.DOM.form({className: 'search',
						 onSubmit: this.props.handleSubmit},
						React.DOM.label({htmlFor: 'city'}, 'Search for your city:'),
						React.DOM.input({id: 'city',
								 type: 'text',
								 ref: 'city'}),
						React.DOM.input({type: 'submit', value: 'Go!'})
					       )
				);
	}
    }));

    var WeatherIcon = React.createFactory(React.createClass({
	getSVGString: function() {
	    var svgString = '';
	    if (this.props.code == '01d') {
		return '<svg version="1.1" id="sun" class="climacon climacon_sun" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="15 15 70 70" enable-background="new 15 15 70 70" xml:space="preserve"> <clipPath id="sunFillClip"> <path d="M0,0v100h100V0H0z M50.001,57.999c-4.417,0-8-3.582-8-7.999c0-4.418,3.582-7.999,8-7.999s7.998,3.581,7.998,7.999C57.999,54.417,54.418,57.999,50.001,57.999z"></path> </clipPath> <g class="climacon_iconWrap climacon_iconWrap-sun"> <g class="climacon_componentWrap climacon_componentWrap-sun"> <g class="climacon_componentWrap climacon_componentWrap-sunSpoke"> <path class="climacon_component climacon_component-stroke climacon_component-stroke_sunSpoke climacon_component-stroke_sunSpoke-east" d="M72.03,51.999h-3.998c-1.105,0-2-0.896-2-1.999s0.895-2,2-2h3.998c1.104,0,2,0.896,2,2S73.136,51.999,72.03,51.999z"></path> <path class="climacon_component climacon_component-stroke climacon_component-stroke_sunSpoke climacon_component-stroke_sunSpoke-northEast" d="M64.175,38.688c-0.781,0.781-2.049,0.781-2.828,0c-0.781-0.781-0.781-2.047,0-2.828l2.828-2.828c0.779-0.781,2.047-0.781,2.828,0c0.779,0.781,0.779,2.047,0,2.828L64.175,38.688z"></path> <path class="climacon_component climacon_component-stroke climacon_component-stroke_sunSpoke climacon_component-stroke_sunSpoke-north" d="M50.034,34.002c-1.105,0-2-0.896-2-2v-3.999c0-1.104,0.895-2,2-2c1.104,0,2,0.896,2,2v3.999C52.034,33.106,51.136,34.002,50.034,34.002z"></path> <path class="climacon_component climacon_component-stroke climacon_component-stroke_sunSpoke climacon_component-stroke_sunSpoke-northWest" d="M35.893,38.688l-2.827-2.828c-0.781-0.781-0.781-2.047,0-2.828c0.78-0.781,2.047-0.781,2.827,0l2.827,2.828c0.781,0.781,0.781,2.047,0,2.828C37.94,39.469,36.674,39.469,35.893,38.688z"></path> <path class="climacon_component climacon_component-stroke climacon_component-stroke_sunSpoke climacon_component-stroke_sunSpoke-west" d="M34.034,50c0,1.104-0.896,1.999-2,1.999h-4c-1.104,0-1.998-0.896-1.998-1.999s0.896-2,1.998-2h4C33.14,48,34.034,48.896,34.034,50z"></path> <path class="climacon_component climacon_component-stroke climacon_component-stroke_sunSpoke climacon_component-stroke_sunSpoke-southWest" d="M35.893,61.312c0.781-0.78,2.048-0.78,2.827,0c0.781,0.78,0.781,2.047,0,2.828l-2.827,2.827c-0.78,0.781-2.047,0.781-2.827,0c-0.781-0.78-0.781-2.047,0-2.827L35.893,61.312z"></path> <path class="climacon_component climacon_component-stroke climacon_component-stroke_sunSpoke climacon_component-stroke_sunSpoke-south" d="M50.034,65.998c1.104,0,2,0.895,2,1.999v4c0,1.104-0.896,2-2,2c-1.105,0-2-0.896-2-2v-4C48.034,66.893,48.929,65.998,50.034,65.998z"></path> <path class="climacon_component climacon_component-stroke climacon_component-stroke_sunSpoke climacon_component-stroke_sunSpoke-southEast" d="M64.175,61.312l2.828,2.828c0.779,0.78,0.779,2.047,0,2.827c-0.781,0.781-2.049,0.781-2.828,0l-2.828-2.827c-0.781-0.781-0.781-2.048,0-2.828C62.126,60.531,63.392,60.531,64.175,61.312z"></path> </g> <g class="climacon_componentWrap climacon_componentWrap_sunBody" clip-path="url(#sunFillClip)"> <circle class="climacon_component climacon_component-stroke climacon_component-stroke_sunBody" cx="50.034" cy="50" r="11.999"></circle> </g> </g> </g> </svg>';
	    }
	    if (this.props.code == '01n') {
		return '<svg version="1.1" id="moon" class="climacon climacon_moon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="15 15 70 70" enable-background="new 15 15 70 70" xml:space="preserve"> <clipPath id="moonFillClip"> <path d="M15,15v70h70V15H15z M50,57.999c-4.418,0-7.999-3.582-7.999-7.999c0-3.803,2.655-6.979,6.211-7.792c0.903,4.854,4.726,8.676,9.579,9.58C56.979,55.344,53.802,57.999,50,57.999z"></path> </clipPath> <g class="climacon_iconWrap climacon_iconWrap-moon"> <g class="climacon_componentWrap climacon_componentWrap-moon" clip-path="url(#moonFillClip)"> <path class="climacon_component climacon_component-stroke climacon_component-stroke_moon" d="M50,61.998c-6.627,0-11.999-5.372-11.999-11.998c0-6.627,5.372-11.999,11.999-11.999c0.755,0,1.491,0.078,2.207,0.212c-0.132,0.576-0.208,1.173-0.208,1.788c0,4.418,3.582,7.999,8,7.999c0.614,0,1.212-0.076,1.788-0.208c0.133,0.717,0.211,1.452,0.211,2.208C61.998,56.626,56.626,61.998,50,61.998z"></path> </g> </g> </svg>'
	    }
	    if (this.props.code == '02d') {
		return '<svg version="1.1" id="cloudSun" class="climacon climacon_cloudSun" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="15 15 70 70" enable-background="new 15 15 70 70" xml:space="preserve"> <clipPath id="cloudFillClip"> <path d="M15,15v70h70V15H15z M59.943,61.639c-3.02,0-12.381,0-15.999,0c-6.626,0-11.998-5.371-11.998-11.998c0-6.627,5.372-11.999,11.998-11.999c5.691,0,10.434,3.974,11.665,9.29c1.252-0.81,2.733-1.291,4.334-1.291c4.418,0,8,3.582,8,8C67.943,58.057,64.361,61.639,59.943,61.639z"></path> </clipPath> <clipPath id="sunCloudFillClip"> <path d="M15,15v70h70V15H15z M57.945,49.641c-4.417,0-8-3.582-8-7.999c0-4.418,3.582-7.999,8-7.999s7.998,3.581,7.998,7.999C65.943,46.059,62.362,49.641,57.945,49.641z"></path> </clipPath> <g class="climacon_iconWrap climacon_cloudSun-iconWrap"> <g clip-path="url(#cloudFillClip)"> <g class="climacon_componentWrap climacon_componentWrap-sun climacon_componentWrap-sun_cloud"> <g class="climacon_componentWrap climacon_componentWrap_sunSpoke"> <path class="climacon_component climacon_component-stroke climacon_component-stroke_sunSpoke climacon_component-stroke_sunSpoke-orth" d="M80.029,43.611h-3.998c-1.105,0-2-0.896-2-1.999s0.895-2,2-2h3.998c1.104,0,2,0.896,2,2S81.135,43.611,80.029,43.611z"></path> <path class="climacon_component climacon_component-stroke climacon_component-stroke_sunSpoke climacon_component-stroke_sunSpoke-north" d="M72.174,30.3c-0.781,0.781-2.049,0.781-2.828,0c-0.781-0.781-0.781-2.047,0-2.828l2.828-2.828c0.779-0.781,2.047-0.781,2.828,0c0.779,0.781,0.779,2.047,0,2.828L72.174,30.3z"></path> <path class="climacon_component climacon_component-stroke climacon_component-stroke_sunSpoke climacon_component-stroke_sunSpoke-north" d="M58.033,25.614c-1.105,0-2-0.896-2-2v-3.999c0-1.104,0.895-2,2-2c1.104,0,2,0.896,2,2v3.999C60.033,24.718,59.135,25.614,58.033,25.614z"></path> <path class="climacon_component climacon_component-stroke climacon_component-stroke_sunSpoke climacon_component-stroke_sunSpoke-north" d="M43.892,30.3l-2.827-2.828c-0.781-0.781-0.781-2.047,0-2.828c0.78-0.781,2.047-0.781,2.827,0l2.827,2.828c0.781,0.781,0.781,2.047,0,2.828C45.939,31.081,44.673,31.081,43.892,30.3z"></path> <path class="climacon_component climacon_component-stroke climacon_component-stroke_sunSpoke climacon_component-stroke_sunSpoke-north" d="M42.033,41.612c0,1.104-0.896,1.999-2,1.999h-4c-1.104,0-1.998-0.896-1.998-1.999s0.896-2,1.998-2h4C41.139,39.612,42.033,40.509,42.033,41.612z"></path> <path class="climacon_component climacon_component-stroke climacon_component-stroke_sunSpoke climacon_component-stroke_sunSpoke-north" d="M43.892,52.925c0.781-0.78,2.048-0.78,2.827,0c0.781,0.78,0.781,2.047,0,2.828l-2.827,2.827c-0.78,0.781-2.047,0.781-2.827,0c-0.781-0.78-0.781-2.047,0-2.827L43.892,52.925z"></path> <path class="climacon_component climacon_component-stroke climacon_component-stroke_sunSpoke climacon_component-stroke_sunSpoke-north" d="M58.033,57.61c1.104,0,2,0.895,2,1.999v4c0,1.104-0.896,2-2,2c-1.105,0-2-0.896-2-2v-4C56.033,58.505,56.928,57.61,58.033,57.61z"></path> <path class="climacon_component climacon_component-stroke climacon_component-stroke_sunSpoke climacon_component-stroke_sunSpoke-north" d="M72.174,52.925l2.828,2.828c0.779,0.78,0.779,2.047,0,2.827c-0.781,0.781-2.049,0.781-2.828,0l-2.828-2.827c-0.781-0.781-0.781-2.048,0-2.828C70.125,52.144,71.391,52.144,72.174,52.925z"></path> </g> <g class="climacon_componentWrap climacon_componentWrap-sunBody" clip-path="url(#sunCloudFillClip)"> <circle class="climacon_component climacon_component-stroke climacon_component-stroke_sunBody" cx="58.033" cy="41.612" r="11.999"></circle> </g> </g> </g> <g class="climacon_componentWrap climacon_componentWrap-cloud" clip-path="url(#cloudFillClip)"> <path class="climacon_component climacon_component-stroke climacon_component-stroke_cloud" d="M44.033,65.641c-8.836,0-15.999-7.162-15.999-15.998c0-8.835,7.163-15.998,15.999-15.998c6.006,0,11.233,3.312,13.969,8.203c0.664-0.113,1.338-0.205,2.033-0.205c6.627,0,11.998,5.373,11.998,12c0,6.625-5.371,11.998-11.998,11.998C57.26,65.641,47.23,65.641,44.033,65.641z"></path> </g> </g> </svg>';
	    }
	    if (this.props.code == '02n') {
		return '<svg version="1.1" id="cloudMoon" class="climacon climacon_cloudMoon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="15 15 70 70" enable-background="new 15 15 70 70" xml:space="preserve"> <clipPath id="cloudFillClip"> <path d="M15,15v70h70V15H15z M59.943,61.639c-3.02,0-12.381,0-15.999,0c-6.626,0-11.998-5.371-11.998-11.998c0-6.627,5.372-11.999,11.998-11.999c5.691,0,10.434,3.974,11.665,9.29c1.252-0.81,2.733-1.291,4.334-1.291c4.418,0,8,3.582,8,8C67.943,58.057,64.361,61.639,59.943,61.639z"></path> </clipPath> <clipPath id="moonCloudFillClip"> <path d="M0,0v100h100V0H0z M60.943,46.641c-4.418,0-7.999-3.582-7.999-7.999c0-3.803,2.655-6.979,6.211-7.792c0.903,4.854,4.726,8.676,9.579,9.58C67.922,43.986,64.745,46.641,60.943,46.641z"></path> </clipPath> <g class="climacon_iconWrap climacon_iconWrap-cloudMoon"> <g clip-path="url(#cloudFillClip)"> <g class="climacon_componentWrap climacon_componentWrap-moon climacon_componentWrap-moon_cloud" clip-path="url(#moonCloudFillClip)"> <path class="climacon_component climacon_component-stroke climacon_component-stroke_moon" d="M61.023,50.641c-6.627,0-11.999-5.372-11.999-11.998c0-6.627,5.372-11.999,11.999-11.999c0.755,0,1.491,0.078,2.207,0.212c-0.132,0.576-0.208,1.173-0.208,1.788c0,4.418,3.582,7.999,8,7.999c0.614,0,1.212-0.076,1.788-0.208c0.133,0.717,0.211,1.452,0.211,2.208C73.021,45.269,67.649,50.641,61.023,50.641z"></path> </g> </g> <g class="climacon_componentWrap climacon_componentWrap-cloud" clip-path="url(#cloudFillClip)"> <path class="climacon_component climacon_component-stroke climacon_component-stroke_cloud" d="M44.033,65.641c-8.836,0-15.999-7.162-15.999-15.998c0-8.835,7.163-15.998,15.999-15.998c6.006,0,11.233,3.312,13.969,8.203c0.664-0.113,1.338-0.205,2.033-0.205c6.627,0,11.998,5.373,11.998,12c0,6.625-5.371,11.998-11.998,11.998C57.26,65.641,47.23,65.641,44.033,65.641z"></path> </g> </g> </svg>';
	    }
	    if (this.props.code == '03d' || this.props.code == '03n' || this.props.code == '04d' || this.props.code == '04n') {
		return '<svg version="1.1" id="cloud" class="climacon climacon_cloud" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="15 15 70 70" enable-background="new 15 15 70 70" xml:space="preserve"> <clipPath id="cloudFillClip"> <path d="M15,15v70h70V15H15z M59.943,61.639c-3.02,0-12.381,0-15.999,0c-6.626,0-11.998-5.371-11.998-11.998c0-6.627,5.372-11.999,11.998-11.999c5.691,0,10.434,3.974,11.665,9.29c1.252-0.81,2.733-1.291,4.334-1.291c4.418,0,8,3.582,8,8C67.943,58.057,64.361,61.639,59.943,61.639z"></path> </clipPath> <g class="climacon_iconWrap climacon_iconWrap-cloud"> <g class="climacon_componentWrap climacon_componentWrap_cloud" clip-path="url(#cloudFillClip)"> <path class="climacon_component climacon_component-stroke climacon_component-stroke_cloud" d="M43.945,65.639c-8.835,0-15.998-7.162-15.998-15.998c0-8.836,7.163-15.998,15.998-15.998c6.004,0,11.229,3.312,13.965,8.203c0.664-0.113,1.338-0.205,2.033-0.205c6.627,0,11.998,5.373,11.998,12c0,6.625-5.371,11.998-11.998,11.998C57.168,65.639,47.143,65.639,43.945,65.639z"></path> </g> </g> </svg>'
	    }
	    if (this.props.code == '09d') {
		return '<svg version="1.1" id="cloudRain" class="climacon climacon_cloudRain" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="15 15 70 70" enable-background="new 15 15 70 70" xml:space="preserve"> <clipPath id="cloudFillClip"> <path d="M15,15v70h70V15H15z M59.943,61.639c-3.02,0-12.381,0-15.999,0c-6.626,0-11.998-5.371-11.998-11.998c0-6.627,5.372-11.999,11.998-11.999c5.691,0,10.434,3.974,11.665,9.29c1.252-0.81,2.733-1.291,4.334-1.291c4.418,0,8,3.582,8,8C67.943,58.057,64.361,61.639,59.943,61.639z"></path> </clipPath> <g class="climacon_iconWrap climacon_iconWrap-cloudRain"> <g class="climacon_componentWrap climacon_componentWrap-rain"> <path class="climacon_component climacon_component-stroke climacon_component-stroke_rain climacon_component-stroke_rain- left" d="M41.946,53.641c1.104,0,1.999,0.896,1.999,2v15.998c0,1.105-0.895,2-1.999,2s-2-0.895-2-2V55.641C39.946,54.537,40.842,53.641,41.946,53.641z"></path> <path class="climacon_component climacon_component-stroke climacon_component-stroke_rain climacon_component-stroke_rain- middle" d="M49.945,57.641c1.104,0,2,0.896,2,2v15.998c0,1.104-0.896,2-2,2s-2-0.896-2-2V59.641C47.945,58.535,48.841,57.641,49.945,57.641z"></path> <path class="climacon_component climacon_component-stroke climacon_component-stroke_rain climacon_component-stroke_rain- right" d="M57.943,53.641c1.104,0,2,0.896,2,2v15.998c0,1.105-0.896,2-2,2c-1.104,0-2-0.895-2-2V55.641C55.943,54.537,56.84,53.641,57.943,53.641z"></path> <path class="climacon_component climacon_component-stroke climacon_component-stroke_rain climacon_component-stroke_rain- left" d="M41.946,53.641c1.104,0,1.999,0.896,1.999,2v15.998c0,1.105-0.895,2-1.999,2s-2-0.895-2-2V55.641C39.946,54.537,40.842,53.641,41.946,53.641z"></path> <path class="climacon_component climacon_component-stroke climacon_component-stroke_rain climacon_component-stroke_rain- middle" d="M49.945,57.641c1.104,0,2,0.896,2,2v15.998c0,1.104-0.896,2-2,2s-2-0.896-2-2V59.641C47.945,58.535,48.841,57.641,49.945,57.641z"></path> <path class="climacon_component climacon_component-stroke climacon_component-stroke_rain climacon_component-stroke_rain- right" d="M57.943,53.641c1.104,0,2,0.896,2,2v15.998c0,1.105-0.896,2-2,2c-1.104,0-2-0.895-2-2V55.641C55.943,54.537,56.84,53.641,57.943,53.641z"></path> </g> <g class="climacon_componentWrap climacon_componentWrap_cloud" clip-path="url(#cloudFillClip)"> <path class="climacon_component climacon_component-stroke climacon_component-stroke_cloud" d="M63.943,64.941v-4.381c2.389-1.384,4-3.961,4-6.92c0-4.417-3.582-8-8-8c-1.601,0-3.082,0.48-4.334,1.291c-1.23-5.317-5.973-9.29-11.665-9.29c-6.626,0-11.998,5.372-11.998,11.998c0,3.549,1.551,6.728,4,8.924v4.916c-4.777-2.768-8-7.922-8-13.84c0-8.835,7.163-15.997,15.998-15.997c6.004,0,11.229,3.311,13.965,8.203c0.664-0.113,1.338-0.205,2.033-0.205c6.627,0,11.998,5.372,11.998,12C71.941,58.863,68.602,63.293,63.943,64.941z"></path> </g> </g> </svg>'
	    }
	    if (this.props.code == '09n') {
		return '<svg version="1.1" id="cloudRainMoon" class="climacon climacon_cloudRainMoon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="15 15 70 70" enable-background="new 15 15 70 70" xml:space="preserve"> <clipPath id="cloudFillClip"> <path d="M15,15v70h70V15H15z M59.943,61.639c-3.02,0-12.381,0-15.999,0c-6.626,0-11.998-5.371-11.998-11.998c0-6.627,5.372-11.999,11.998-11.999c5.691,0,10.434,3.974,11.665,9.29c1.252-0.81,2.733-1.291,4.334-1.291c4.418,0,8,3.582,8,8C67.943,58.057,64.361,61.639,59.943,61.639z"></path> </clipPath> <clipPath id="moonCloudFillClip"> <path d="M0,0v100h100V0H0z M60.943,46.641c-4.418,0-7.999-3.582-7.999-7.999c0-3.803,2.655-6.979,6.211-7.792c0.903,4.854,4.726,8.676,9.579,9.58C67.922,43.986,64.745,46.641,60.943,46.641z"></path> </clipPath> <g class="climacon_iconWrap climacon_iconWrap-cloudRainMoon"> <g clip-path="url(#cloudFillClip)"> <g class="climacon_componentWrap climacon_componentWrap-moon climacon_componentWrap-moon_cloud" clip-path="url(#moonCloudFillClip)"> <path class="climacon_component climacon_component-stroke climacon_component-stroke_sunBody" d="M61.023,50.641c-6.627,0-11.999-5.372-11.999-11.998c0-6.627,5.372-11.999,11.999-11.999c0.755,0,1.491,0.078,2.207,0.212c-0.132,0.576-0.208,1.173-0.208,1.788c0,4.418,3.582,7.999,8,7.999c0.614,0,1.212-0.076,1.788-0.208c0.133,0.717,0.211,1.452,0.211,2.208C73.021,45.269,67.649,50.641,61.023,50.641z"></path> </g> </g> <g class="climacon_componentWrap climacon_componentWrap-rain"> <path class="climacon_component climacon_component-stroke climacon_component-stroke_rain climacon_component-stroke_rain- left" d="M41.946,53.641c1.104,0,1.999,0.896,1.999,2v15.998c0,1.105-0.895,2-1.999,2s-2-0.895-2-2V55.641C39.946,54.537,40.842,53.641,41.946,53.641z"></path> <path class="climacon_component climacon_component-stroke climacon_component-stroke_rain climacon_component-stroke_rain- middle" d="M49.945,57.641c1.104,0,2,0.896,2,2v15.998c0,1.104-0.896,2-2,2s-2-0.896-2-2V59.641C47.945,58.535,48.841,57.641,49.945,57.641z"></path> <path class="climacon_component climacon_component-stroke climacon_component-stroke_rain climacon_component-stroke_rain- right" d="M57.943,53.641c1.104,0,2,0.896,2,2v15.998c0,1.105-0.896,2-2,2c-1.104,0-2-0.895-2-2V55.641C55.943,54.537,56.84,53.641,57.943,53.641z"></path> <path class="climacon_component climacon_component-stroke climacon_component-stroke_rain climacon_component-stroke_rain- left" d="M41.946,53.641c1.104,0,1.999,0.896,1.999,2v15.998c0,1.105-0.895,2-1.999,2s-2-0.895-2-2V55.641C39.946,54.537,40.842,53.641,41.946,53.641z"></path> <path class="climacon_component climacon_component-stroke climacon_component-stroke_rain climacon_component-stroke_rain- middle" d="M49.945,57.641c1.104,0,2,0.896,2,2v15.998c0,1.104-0.896,2-2,2s-2-0.896-2-2V59.641C47.945,58.535,48.841,57.641,49.945,57.641z"></path> <path class="climacon_component climacon_component-stroke climacon_component-stroke_rain climacon_component-stroke_rain- right" d="M57.943,53.641c1.104,0,2,0.896,2,2v15.998c0,1.105-0.896,2-2,2c-1.104,0-2-0.895-2-2V55.641C55.943,54.537,56.84,53.641,57.943,53.641z"></path> </g> <g class="climacon_componentWrap climacon_componentWrap-cloud" clip-path="url(#cloudFillClip)"> <path class="climacon_component climacon_component-stroke climacon_component-stroke_cloud" d="M59.943,41.642c-0.696,0-1.369,0.092-2.033,0.205c-2.736-4.892-7.961-8.203-13.965-8.203c-8.835,0-15.998,7.162-15.998,15.997c0,5.992,3.3,11.207,8.177,13.947c0.276-1.262,0.892-2.465,1.873-3.445l0.057-0.057c-3.644-2.061-6.106-5.963-6.106-10.445c0-6.626,5.372-11.998,11.998-11.998c5.691,0,10.433,3.974,11.666,9.29c1.25-0.81,2.732-1.291,4.332-1.291c4.418,0,8,3.581,8,7.999c0,3.443-2.182,6.371-5.235,7.498c0.788,1.146,1.194,2.471,1.222,3.807c4.666-1.645,8.014-6.077,8.014-11.305C71.941,47.014,66.57,41.642,59.943,41.642z"></path> </g> </g> </svg>';
	    }
	    if (this.props.code == '10d') {
		return '<svg version="1.1" id="cloudDrizzleAlt" class="climacon climacon_cloudDrizzleAlt" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="15 15 70 70" enable-background="new 15 15 70 70" xml:space="preserve"> <g class="climacon_iconWrap climacon_iconWrap-cloudDrizzleAlt"> <g class="climacon_componentWrap climacon_componentWrap-drizzle"> <path class="climacon_component climacon_component-stroke climacon_component-stroke_drizzle climacon_component-stroke_drizzle-left" id="Drizzle-Left_1_" d="M56.969,57.672l-2.121,2.121c-1.172,1.172-1.172,3.072,0,4.242c1.17,1.172,3.07,1.172,4.24,0c1.172-1.17,1.172-3.07,0-4.242L56.969,57.672z"></path> <path class="climacon_component climacon_component-stroke climacon_component-stroke_drizzle climacon_component-stroke_drizzle-middle" d="M50.088,57.672l-2.119,2.121c-1.174,1.172-1.174,3.07,0,4.242c1.17,1.172,3.068,1.172,4.24,0s1.172-3.07,0-4.242L50.088,57.672z"></path> <path class="climacon_component climacon_component-stroke climacon_component-stroke_drizzle climacon_component-stroke_drizzle-right" d="M43.033,57.672l-2.121,2.121c-1.172,1.172-1.172,3.07,0,4.242s3.07,1.172,4.244,0c1.172-1.172,1.172-3.07,0-4.242L43.033,57.672z"></path> </g> <g class="climacon_componentWrap climacon_componentWrap-cloud"> <path class="climacon_component climacon_component-stroke climacon_component-stroke_cloud" d="M59.943,41.642c-0.696,0-1.369,0.092-2.033,0.205c-2.736-4.892-7.961-8.203-13.965-8.203c-8.835,0-15.998,7.162-15.998,15.997c0,5.992,3.3,11.207,8.177,13.947c0.276-1.262,0.892-2.465,1.873-3.445l0.057-0.057c-3.644-2.061-6.106-5.963-6.106-10.445c0-6.626,5.372-11.998,11.998-11.998c5.691,0,10.433,3.974,11.666,9.29c1.25-0.81,2.732-1.291,4.332-1.291c4.418,0,8,3.581,8,7.999c0,3.443-2.182,6.371-5.235,7.498c0.788,1.146,1.194,2.471,1.222,3.807c4.666-1.645,8.014-6.077,8.014-11.305C71.941,47.014,66.57,41.642,59.943,41.642z"></path> </g> </g> </svg>';
	    }
	    if (this.props.code == '10n') {
		return '<svg version="1.1" id="cloudDrizzleMoonAlt" class="climacon climacon_cloudDrizzleMoonAlt" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="15 15 70 70" enable-background="new 15 15 70 70" xml:space="preserve"> <clipPath id="cloudFillClip"> <path d="M15,15v70h70V15H15z M59.943,61.639c-3.02,0-12.381,0-15.999,0c-6.626,0-11.998-5.371-11.998-11.998c0-6.627,5.372-11.999,11.998-11.999c5.691,0,10.434,3.974,11.665,9.29c1.252-0.81,2.733-1.291,4.334-1.291c4.418,0,8,3.582,8,8C67.943,58.057,64.361,61.639,59.943,61.639z"></path> </clipPath> <clipPath id="moonCloudFillClip"> <path d="M0,0v100h100V0H0z M60.943,46.641c-4.418,0-7.999-3.582-7.999-7.999c0-3.803,2.655-6.979,6.211-7.792c0.903,4.854,4.726,8.676,9.579,9.58C67.922,43.986,64.745,46.641,60.943,46.641z"></path> </clipPath> <g class="climacon_iconWrap climacon_iconWrap-cloudDrizzleMoonAlt"> <g clip-path="url(#cloudFillClip)"> <g class="climacon_componentWrap climacon_componentWrap-moon climacon_componentWrap-moon_cloud" clip-path="url(#moonCloudFillClip)"> <path class="climacon_component climacon_component-stroke climacon_component-stroke_sunBody" d="M61.023,50.641c-6.627,0-11.999-5.372-11.999-11.998c0-6.627,5.372-11.999,11.999-11.999c0.755,0,1.491,0.078,2.207,0.212c-0.132,0.576-0.208,1.173-0.208,1.788c0,4.418,3.582,7.999,8,7.999c0.614,0,1.212-0.076,1.788-0.208c0.133,0.717,0.211,1.452,0.211,2.208C73.021,45.269,67.649,50.641,61.023,50.641z"></path> </g> </g> <g class="climacon_componentWrap climacon_componentWrap-drizzle"> <path class="climacon_component climacon_component-stroke climacon_component-stroke_drizzle climacon_component-stroke_drizzle-left" id="Drizzle-Left_1_" d="M56.969,57.672l-2.121,2.121c-1.172,1.172-1.172,3.072,0,4.242c1.17,1.172,3.07,1.172,4.24,0c1.172-1.17,1.172-3.07,0-4.242L56.969,57.672z"></path> <path class="climacon_component climacon_component-stroke climacon_component-stroke_drizzle climacon_component-stroke_drizzle-middle" d="M50.088,57.672l-2.119,2.121c-1.174,1.172-1.174,3.07,0,4.242c1.17,1.172,3.068,1.172,4.24,0s1.172-3.07,0-4.242L50.088,57.672z"></path> <path class="climacon_component climacon_component-stroke climacon_component-stroke_drizzle climacon_component-stroke_drizzle-right" d="M43.033,57.672l-2.121,2.121c-1.172,1.172-1.172,3.07,0,4.242s3.07,1.172,4.244,0c1.172-1.172,1.172-3.07,0-4.242L43.033,57.672z"></path> </g> <g class="climacon_componentWrap climacon_componentWrap-cloud" clip-path="url(#cloudFillClip)"> <path class="climacon_component climacon_component-stroke climacon_component-stroke_cloud" d="M59.943,41.642c-0.696,0-1.369,0.092-2.033,0.205c-2.736-4.892-7.961-8.203-13.965-8.203c-8.835,0-15.998,7.162-15.998,15.997c0,5.992,3.3,11.207,8.177,13.947c0.276-1.262,0.892-2.465,1.873-3.445l0.057-0.057c-3.644-2.061-6.106-5.963-6.106-10.445c0-6.626,5.372-11.998,11.998-11.998c5.691,0,10.433,3.974,11.666,9.29c1.25-0.81,2.732-1.291,4.332-1.291c4.418,0,8,3.581,8,7.999c0,3.443-2.182,6.371-5.235,7.498c0.788,1.146,1.194,2.471,1.222,3.807c4.666-1.645,8.014-6.077,8.014-11.305C71.941,47.014,66.57,41.642,59.943,41.642z"></path> </g> </g> </svg>';
	    }
	    if (this.props.code == '11d') {
		return '<svg version="1.1" id="cloudLightning" class="climacon climacon_cloudLightning" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="15 15 70 70" enable-background="new 15 15 70 70" xml:space="preserve"> <g class="climacon_iconWrap climacon_iconWrap-cloudLightning"> <g class="climacon_componentWrap climacon_componentWrap-lightning"> <polygon class="climacon_component climacon_component-stroke climacon_component-stroke_lightning" points="48.001,51.641 57.999,51.641 52,61.641 58.999,61.641 46.001,77.639 49.601,65.641 43.001,65.641 "></polygon> </g> <g class="climacon_componentWrap climacon_componentWrap-cloud"> <path class="climacon_component climacon_component-stroke climacon_component-stroke_cloud" d="M59.999,65.641c-0.28,0-0.649,0-1.062,0l3.584-4.412c3.182-1.057,5.478-4.053,5.478-7.588c0-4.417-3.581-7.998-7.999-7.998c-1.602,0-3.083,0.48-4.333,1.29c-1.231-5.316-5.974-9.29-11.665-9.29c-6.626,0-11.998,5.372-11.998,12c0,5.446,3.632,10.039,8.604,11.503l-1.349,3.777c-6.52-2.021-11.255-8.098-11.255-15.282c0-8.835,7.163-15.999,15.998-15.999c6.004,0,11.229,3.312,13.965,8.204c0.664-0.114,1.338-0.205,2.033-0.205c6.627,0,11.999,5.371,11.999,11.999C71.999,60.268,66.626,65.641,59.999,65.641z"></path> </g> </g> </svg>'
	    }
	    if (this.props.code == '11n') {
		return '<svg version="1.1" id="cloudLightningMoon" class="climacon climacon_cloudLightningMoon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="15 15 70 70" enable-background="new 15 15 70 70" xml:space="preserve"> <clipPath id="moonCloudFillClip"> <path d="M0,0v100h100V0H0z M60.943,46.641c-4.418,0-7.999-3.582-7.999-7.999c0-3.803,2.655-6.979,6.211-7.792c0.903,4.854,4.726,8.676,9.579,9.58C67.922,43.986,64.745,46.641,60.943,46.641z"></path> </clipPath> <clipPath id="cloudFillClip"> <path d="M15,15v70h70V15H15z M59.943,61.639c-3.02,0-12.381,0-15.999,0c-6.626,0-11.998-5.371-11.998-11.998c0-6.627,5.372-11.999,11.998-11.999c5.691,0,10.434,3.974,11.665,9.29c1.252-0.81,2.733-1.291,4.334-1.291c4.418,0,8,3.582,8,8C67.943,58.057,64.361,61.639,59.943,61.639z"></path> </clipPath><g class="climacon_iconWrap climacon_iconWrap-cloudLightningMoon"> <g clip-path="url(#cloudFillClip)"> <g class="climacon_componentWrap climacon_componentWrap-moon climacon_componentWrap-moon_cloud" clip-path="url(#moonCloudFillClip)"> <path class="climacon_component climacon_component-stroke climacon_component-stroke_sunBody" d="M61.023,50.641c-6.627,0-11.999-5.372-11.999-11.998c0-6.627,5.372-11.999,11.999-11.999c0.755,0,1.491,0.078,2.207,0.212c-0.132,0.576-0.208,1.173-0.208,1.788c0,4.418,3.582,7.999,8,7.999c0.614,0,1.212-0.076,1.788-0.208c0.133,0.717,0.211,1.452,0.211,2.208C73.021,45.269,67.649,50.641,61.023,50.641z"></path> </g> </g> <g class="climacon_componentWrap climacon_componentWrap-lightning"> <polygon class="climacon_component climacon_component-stroke climacon_component-stroke_lightning" points="48.001,51.641 57.999,51.641 52,61.641 58.999,61.641 46.001,77.639 49.601,65.641 43.001,65.641 "></polygon> </g> <g class="climacon_componentWrap climacon_componentWrap-cloud"> <path class="climacon_component climacon_component-stroke climacon_component-stroke_cloud" d="M59.999,65.641c-0.28,0-0.649,0-1.062,0l3.584-4.412c3.182-1.057,5.478-4.053,5.478-7.588c0-4.417-3.581-7.998-7.999-7.998c-1.602,0-3.083,0.48-4.333,1.29c-1.231-5.316-5.974-9.29-11.665-9.29c-6.626,0-11.998,5.372-11.998,12c0,5.446,3.632,10.039,8.604,11.503l-1.349,3.777c-6.52-2.021-11.255-8.098-11.255-15.282c0-8.835,7.163-15.999,15.998-15.999c6.004,0,11.229,3.312,13.965,8.204c0.664-0.114,1.338-0.205,2.033-0.205c6.627,0,11.999,5.371,11.999,11.999C71.999,60.268,66.626,65.641,59.999,65.641z"></path> </g> </g> </svg>'
	    }
	    if (this.props.code == '13d') {
		return '<svg version="1.1" id="cloudSnowSunAlt" class="climacon climacon_cloudSnowSunAlt" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="15 15 70 70" enable-background="new 15 15 70 70" xml:space="preserve"> <clipPath id="cloudFillClip"> <path d="M15,15v70h70V15H15z M59.943,61.639c-3.02,0-12.381,0-15.999,0c-6.626,0-11.998-5.371-11.998-11.998c0-6.627,5.372-11.999,11.998-11.999c5.691,0,10.434,3.974,11.665,9.29c1.252-0.81,2.733-1.291,4.334-1.291c4.418,0,8,3.582,8,8C67.943,58.057,64.361,61.639,59.943,61.639z"></path> </clipPath> <clipPath id="sunCloudFillClip"> <path d="M15,15v70h70V15H15z M57.945,49.641c-4.417,0-8-3.582-8-7.999c0-4.418,3.582-7.999,8-7.999s7.998,3.581,7.998,7.999C65.943,46.059,62.362,49.641,57.945,49.641z"></path> </clipPath> <clipPath id="cloudSunFillClip"> <path d="M15,15v70h20.947V63.481c-4.778-2.767-8-7.922-8-13.84c0-8.836,7.163-15.998,15.998-15.998c6.004,0,11.229,3.312,13.965,8.203c0.664-0.113,1.338-0.205,2.033-0.205c6.627,0,11.998,5.373,11.998,12c0,5.262-3.394,9.723-8.107,11.341V85H85V15H15z"></path> </clipPath> <clipPath id="snowFillClip"> <path d="M15,15v70h70V15H15z M50,65.641c-1.104,0-2-0.896-2-2c0-1.104,0.896-2,2-2c1.104,0,2,0.896,2,2S51.104,65.641,50,65.641z"></path> </clipPath> <g class="climacon_iconWrap climacon_iconWrap-cloudSnowSunAlt"> <g clip-path="url(#cloudSunFillClip)"> <g class="climacon_componentWrap climacon_componentWrap-sun climacon_componentWrap-sun_cloud"> <g class="climacon_componentWrap climacon_componentWrap_sunSpoke"> <path class="climacon_component climacon_component-stroke climacon_component-stroke_sunSpoke climacon_component-stroke_sunSpoke-north" d="M80.029,43.611h-3.998c-1.105,0-2-0.896-2-1.999s0.895-2,2-2h3.998c1.104,0,2,0.896,2,2S81.135,43.611,80.029,43.611z"></path> <path class="climacon_component climacon_component-stroke climacon_component-stroke_sunSpoke climacon_component-stroke_sunSpoke-north" d="M72.174,30.3c-0.781,0.781-2.049,0.781-2.828,0c-0.781-0.781-0.781-2.047,0-2.828l2.828-2.828c0.779-0.781,2.047-0.781,2.828,0c0.779,0.781,0.779,2.047,0,2.828L72.174,30.3z"></path> <path class="climacon_component climacon_component-stroke climacon_component-stroke_sunSpoke climacon_component-stroke_sunSpoke-north" d="M58.033,25.614c-1.105,0-2-0.896-2-2v-3.999c0-1.104,0.895-2,2-2c1.104,0,2,0.896,2,2v3.999C60.033,24.718,59.135,25.614,58.033,25.614z"></path> <path class="climacon_component climacon_component-stroke climacon_component-stroke_sunSpoke climacon_component-stroke_sunSpoke-north" d="M43.892,30.3l-2.827-2.828c-0.781-0.781-0.781-2.047,0-2.828c0.78-0.781,2.047-0.781,2.827,0l2.827,2.828c0.781,0.781,0.781,2.047,0,2.828C45.939,31.081,44.673,31.081,43.892,30.3z"></path> <path class="climacon_component climacon_component-stroke climacon_component-stroke_sunSpoke climacon_component-stroke_sunSpoke-north" d="M42.033,41.612c0,1.104-0.896,1.999-2,1.999h-4c-1.104,0-1.998-0.896-1.998-1.999s0.896-2,1.998-2h4C41.139,39.612,42.033,40.509,42.033,41.612z"></path> <path class="climacon_component climacon_component-stroke climacon_component-stroke_sunSpoke climacon_component-stroke_sunSpoke-north" d="M43.892,52.925c0.781-0.78,2.048-0.78,2.827,0c0.781,0.78,0.781,2.047,0,2.828l-2.827,2.827c-0.78,0.781-2.047,0.781-2.827,0c-0.781-0.78-0.781-2.047,0-2.827L43.892,52.925z"></path> <path class="climacon_component climacon_component-stroke climacon_component-stroke_sunSpoke climacon_component-stroke_sunSpoke-north" d="M58.033,57.61c1.104,0,2,0.895,2,1.999v4c0,1.104-0.896,2-2,2c-1.105,0-2-0.896-2-2v-4C56.033,58.505,56.928,57.61,58.033,57.61z"></path> <path class="climacon_component climacon_component-stroke climacon_component-stroke_sunSpoke climacon_component-stroke_sunSpoke-north" d="M72.174,52.925l2.828,2.828c0.779,0.78,0.779,2.047,0,2.827c-0.781,0.781-2.049,0.781-2.828,0l-2.828-2.827c-0.781-0.781-0.781-2.048,0-2.828C70.125,52.144,71.391,52.144,72.174,52.925z"></path> </g> <g class="climacon_componentWrap climacon_componentWrap-sunBody" clip-path="url(#sunCloudFillClip)"> <circle class="climacon_component climacon_component-stroke climacon_component-stroke_sunBody" cx="58.033" cy="41.612" r="11.999"></circle> </g> </g> </g> <g class="climacon_componentWrap climacon_componentWrap-snowAlt"> <g class="climacon_component climacon_component climacon_component-snowAlt" clip-path="url(#snowFillClip)"> <path class="climacon_component climacon_component-stroke climacon_component-stroke_snowAlt" d="M43.072,59.641c0.553-0.957,1.775-1.283,2.732-0.731L48,60.176v-2.535c0-1.104,0.896-2,2-2c1.104,0,2,0.896,2,2v2.535l2.195-1.268c0.957-0.551,2.18-0.225,2.73,0.732c0.553,0.957,0.225,2.18-0.73,2.731l-2.196,1.269l2.196,1.268c0.955,0.553,1.283,1.775,0.73,2.732c-0.552,0.954-1.773,1.282-2.73,0.729L52,67.104v2.535c0,1.105-0.896,2-2,2c-1.104,0-2-0.895-2-2v-2.535l-2.195,1.269c-0.957,0.553-2.18,0.226-2.732-0.729c-0.552-0.957-0.225-2.181,0.732-2.732L46,63.641l-2.195-1.268C42.848,61.82,42.521,60.598,43.072,59.641z"></path> </g> </g> <g class="climacon_componentWrap climacon_componentWrap-cloud"> <path class="climacon_component climacon_component-stroke climacon_component-stroke_cloud" d="M61.998,65.461v-4.082c3.447-0.891,6-4.012,6-7.738c0-4.417-3.582-7.999-7.999-7.999c-1.601,0-3.084,0.48-4.334,1.291c-1.231-5.317-5.973-9.291-11.664-9.291c-6.627,0-11.999,5.373-11.999,12c0,4.438,2.417,8.305,5.999,10.379v4.444c-5.86-2.375-9.998-8.112-9.998-14.825c0-8.835,7.162-15.999,15.998-15.999c6.004,0,11.229,3.312,13.965,8.204c0.664-0.113,1.336-0.205,2.033-0.205c6.626,0,11.998,5.373,11.998,11.998C71.997,59.586,67.671,64.506,61.998,65.461z"></path> </g> </g> </svg>';
	    }
	    if (this.props.code == '13n') {
		return '<svg version="1.1" id="cloudSnowAlt" class="climacon climacon_cloudSnowAlt" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="15 15 70 70" enable-background="new 15 15 70 70" xml:space="preserve"> <clipPath id="moonCloudFillClip"> <path d="M0,0v100h100V0H0z M60.943,46.641c-4.418,0-7.999-3.582-7.999-7.999c0-3.803,2.655-6.979,6.211-7.792c0.903,4.854,4.726,8.676,9.579,9.58C67.922,43.986,64.745,46.641,60.943,46.641z"></path> </clipPath> <clipPath id="cloudFillClip"> <path d="M15,15v70h70V15H15z M59.943,61.639c-3.02,0-12.381,0-15.999,0c-6.626,0-11.998-5.371-11.998-11.998c0-6.627,5.372-11.999,11.998-11.999c5.691,0,10.434,3.974,11.665,9.29c1.252-0.81,2.733-1.291,4.334-1.291c4.418,0,8,3.582,8,8C67.943,58.057,64.361,61.639,59.943,61.639z"></path> </clipPath> <clipPath id="snowFillClip"> <path d="M15,15v70h70V15H15z M50,65.641c-1.104,0-2-0.896-2-2c0-1.104,0.896-2,2-2c1.104,0,2,0.896,2,2S51.104,65.641,50,65.641z"></path> </clipPath> <g class="climacon_iconWrap climacon_iconWrap-cloudSnowAlt"> <g clip-path="url(#cloudFillClip)"> <g class="climacon_componentWrap climacon_componentWrap-moon climacon_componentWrap-moon_cloud" clip-path="url(#moonCloudFillClip)"> <path class="climacon_component climacon_component-stroke climacon_component-stroke_sunBody" d="M61.023,50.641c-6.627,0-11.999-5.372-11.999-11.998c0-6.627,5.372-11.999,11.999-11.999c0.755,0,1.491,0.078,2.207,0.212c-0.132,0.576-0.208,1.173-0.208,1.788c0,4.418,3.582,7.999,8,7.999c0.614,0,1.212-0.076,1.788-0.208c0.133,0.717,0.211,1.452,0.211,2.208C73.021,45.269,67.649,50.641,61.023,50.641z"></path> </g> </g> <g class="climacon_componentWrap climacon_componentWrap-snowAlt"> <g class="climacon_component climacon_component climacon_component-snowAlt" clip-path="url(#snowFillClip)"> <path class="climacon_component climacon_component-stroke climacon_component-stroke_snowAlt" d="M43.072,59.641c0.553-0.957,1.775-1.283,2.732-0.731L48,60.176v-2.535c0-1.104,0.896-2,2-2c1.104,0,2,0.896,2,2v2.535l2.195-1.268c0.957-0.551,2.18-0.225,2.73,0.732c0.553,0.957,0.225,2.18-0.73,2.731l-2.196,1.269l2.196,1.268c0.955,0.553,1.283,1.775,0.73,2.732c-0.552,0.954-1.773,1.282-2.73,0.729L52,67.104v2.535c0,1.105-0.896,2-2,2c-1.104,0-2-0.895-2-2v-2.535l-2.195,1.269c-0.957,0.553-2.18,0.226-2.732-0.729c-0.552-0.957-0.225-2.181,0.732-2.732L46,63.641l-2.195-1.268C42.848,61.82,42.521,60.598,43.072,59.641z"></path> </g> </g> <g class="climacon_componentWrap climacon_componentWrap-cloud"> <path class="climacon_component climacon_component-stroke climacon_component-stroke_cloud" d="M61.998,65.461v-4.082c3.447-0.891,6-4.012,6-7.738c0-4.417-3.582-7.999-7.999-7.999c-1.601,0-3.084,0.48-4.334,1.291c-1.231-5.317-5.973-9.291-11.664-9.291c-6.627,0-11.999,5.373-11.999,12c0,4.438,2.417,8.305,5.999,10.379v4.444c-5.86-2.375-9.998-8.112-9.998-14.825c0-8.835,7.162-15.999,15.998-15.999c6.004,0,11.229,3.312,13.965,8.204c0.664-0.113,1.336-0.205,2.033-0.205c6.626,0,11.998,5.373,11.998,11.998C71.997,59.586,67.671,64.506,61.998,65.461z"></path> </g> </g> </svg>';
	    }
	    if (this.props.code == '50d') {
		return '<svg version="1.1" id="cloudFog" class="climacon climacon_cloudFog" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="15 15 70 70" enable-background="new 15 15 70 70" xml:space="preserve"> <g class="climacon_iconWrap climacon_iconWrap-cloudFog"> <g class="climacon_componentWrap climacon_componentWrap-Fog"> <path class="climacon_component climacon_component-stroke climacon_component-stroke_fogLine climacon_component-stroke_fogLine-top" d="M69.998,57.641H30.003c-1.104,0-2-0.895-2-2c0-1.104,0.896-2,2-2h39.995c1.104,0,2,0.896,2,2C71.998,56.746,71.104,57.641,69.998,57.641z"></path> <path class="climacon_component climacon_component-stroke climacon_component-stroke_fogLine climacon_component-stroke_fogLine-middle" d="M69.998,65.641H30.003c-1.104,0-2-0.896-2-2s0.896-2,2-2h39.995c1.104,0,2,0.896,2,2C71.998,64.744,71.104,65.641,69.998,65.641z"></path> <path class="climacon_component climacon_component-stroke climacon_component-stroke_fogLine climacon_component-stroke_fogLine-bottom" d="M30.003,69.639h39.995c1.104,0,2,0.896,2,2c0,1.105-0.896,2-2,2H30.003c-1.104,0-2-0.895-2-2C28.003,70.535,28.898,69.639,30.003,69.639z"></path> </g> <g class="climacon_componentWrap climacon_componentWrap-cloud"> <path class="climacon_component climacon_component-stroke climacon_component-stroke_cloud" d="M59.999,45.643c-1.601,0-3.083,0.48-4.333,1.291c-1.232-5.317-5.974-9.291-11.665-9.291c-6.626,0-11.998,5.373-11.998,12h-4c0-8.835,7.163-15.999,15.998-15.999c6.004,0,11.229,3.312,13.965,8.204c0.664-0.113,1.337-0.205,2.033-0.205c5.222,0,9.651,3.342,11.301,8h-4.381C65.535,47.253,62.958,45.643,59.999,45.643z"></path> </g> </g> </svg>';
	    }
	    if (this.props.code == '50n') {
		return '<svg version="1.1" id="cloudFogMoon" class="climacon climacon_cloudFogMoon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="15 15 70 70" enable-background="new 15 15 70 70" xml:space="preserve"> <clipPath id="moonCloudFillClip"> <path d="M0,0v100h100V0H0z M60.943,46.641c-4.418,0-7.999-3.582-7.999-7.999c0-3.803,2.655-6.979,6.211-7.792c0.903,4.854,4.726,8.676,9.579,9.58C67.922,43.986,64.745,46.641,60.943,46.641z"></path> </clipPath> <clipPath id="cloudFillClip"> <path d="M15,15v70h70V15H15z M59.943,61.639c-3.02,0-12.381,0-15.999,0c-6.626,0-11.998-5.371-11.998-11.998c0-6.627,5.372-11.999,11.998-11.999c5.691,0,10.434,3.974,11.665,9.29c1.252-0.81,2.733-1.291,4.334-1.291c4.418,0,8,3.582,8,8C67.943,58.057,64.361,61.639,59.943,61.639z"></path> </clipPath> <g class="climacon_iconWrap climacon_iconWrap-cloudFogMoon"> <g clip-path="url(#cloudFillClip)"> <g class="climacon_componentWrap climacon_componentWrap-moon climacon_componentWrap-moon_cloud" clip-path="url(#moonCloudFillClip)"> <path class="climacon_component climacon_component-stroke climacon_component-stroke_sunBody" d="M61.023,50.641c-6.627,0-11.999-5.372-11.999-11.998c0-6.627,5.372-11.999,11.999-11.999c0.755,0,1.491,0.078,2.207,0.212c-0.132,0.576-0.208,1.173-0.208,1.788c0,4.418,3.582,7.999,8,7.999c0.614,0,1.212-0.076,1.788-0.208c0.133,0.717,0.211,1.452,0.211,2.208C73.021,45.269,67.649,50.641,61.023,50.641z"></path> </g> </g> <g class="climacon_componentWrap climacon_componentWrap-Fog"> <path class="climacon_component climacon_component-stroke climacon_component-stroke_fogLine climacon_component-stroke_fogLine-top" d="M69.998,57.641H30.003c-1.104,0-2-0.895-2-2c0-1.104,0.896-2,2-2h39.995c1.104,0,2,0.896,2,2C71.998,56.746,71.104,57.641,69.998,57.641z"></path> <path class="climacon_component climacon_component-stroke climacon_component-stroke_fogLine climacon_component-stroke_fogLine-middle" d="M69.998,65.641H30.003c-1.104,0-2-0.896-2-2s0.896-2,2-2h39.995c1.104,0,2,0.896,2,2C71.998,64.744,71.104,65.641,69.998,65.641z"></path> <path class="climacon_component climacon_component-stroke climacon_component-stroke_fogLine climacon_component-stroke_fogLine-bottom" d="M30.003,69.639h39.995c1.104,0,2,0.896,2,2c0,1.105-0.896,2-2,2H30.003c-1.104,0-2-0.895-2-2C28.003,70.535,28.898,69.639,30.003,69.639z"></path> </g> <g class="climacon_componentWrap climacon_componentWrap-cloud"> <path class="climacon_component climacon_component-stroke climacon_component-stroke_cloud" d="M59.999,45.643c-1.601,0-3.083,0.48-4.333,1.291c-1.232-5.317-5.974-9.291-11.665-9.291c-6.626,0-11.998,5.373-11.998,12h-4c0-8.835,7.163-15.999,15.998-15.999c6.004,0,11.229,3.312,13.965,8.204c0.664-0.113,1.337-0.205,2.033-0.205c5.222,0,9.651,3.342,11.301,8h-4.381C65.535,47.253,62.958,45.643,59.999,45.643z"></path> </g> </g> </svg>';
	    }
	},
	render: function() {
	    return React.DOM.span({dangerouslySetInnerHTML: {__html: this.getSVGString()}});
	}
    }));
    var WeatherNode = React.createFactory(React.createClass({
	render: function() {
	    return React.DOM.div({className: 'daily-forecast'},
				 React.DOM.h3({className: 'date'},
					      React.DOM.span({className: 'day'},
							     this.props.weather.day + ' '),
					      React.DOM.span({className: 'date'},
							     this.props.weather.month + ' ' + this.props.weather.dayOfMonth)
					     ),
				 React.DOM.p({className: 'weather-type'}, this.props.weather.weather[0].main),
				 WeatherIcon({code: this.props.weather.weather[0].icon}),
				 React.DOM.p({className: 'temp'}, 'High: ' + this.props.weather.high + '\u00B0C'
					    ),
				 React.DOM.p({className: 'temp'}, 'Low: ' + this.props.weather.low + '\u00B0C'
					    )
				)
	}
    }));
    var ResultsBox = React.createFactory(React.createClass({
	scrollToWeather: function() {
	    smoothScroll.animateScroll(null, '#weatherbox', {updateURL: false});
	},
	componentDidMount: function() {
	    this.scrollToWeather();
	},
	componentDidUpdate: function() {
	    this.scrollToWeather();
	},
	createNodes: function() {
	    return this.props.forecast.weather.map(function(day) {
		return WeatherNode({weather: day})
	    });
	},
	render: function() {
	    if (this.props.forecast === null) {
		return React.DOM.div({className: 'results'},
				     React.DOM.div({className: 'weatherbox',
						    id: 'weatherbox'},
						   React.DOM.h2({className: 'error'},
								React.DOM.i({className: 'fa fa-close'}),
								' "' + this.props.input + '" was not found. Try using a different query.'
							       )
						  )
				    );
	    }
	    return React.DOM.div({className: 'results'},
				 React.DOM.div({className: 'weatherbox',
						id: 'weatherbox'},
					       React.DOM.h2({className: 'weather-heading'},
							    '7-day forecast for ' + this.props.forecast.city + ', ' + this.props.forecast.country
							   ),
					       React.DOM.p({className: 'pressure'},
							   'The average air pressure for this week is expected to be ' + this.props.forecast.averagePressure + 'kPa.'
							  ),
					       this.createNodes()
					      )
				);
	}
    }));
    
    var WeatherApp = React.createFactory(React.createClass({
	displayName: 'WeatherApp',
	getInitialState: function() {
	    return {forecast: undefined};
	},
	input: undefined,
	handleSubmit: function(e) {
	    e.preventDefault();
	    var newInput = this.refs.input.getInput();
	    if (this.input == newInput) {
		return;
	    }
	    this.input = newInput;
	    getSearch(this.input).search().then(function(forecast) {
		this.setState({forecast: forecast});
	    }.bind(this), function() {
		this.setState({forecast: null});
	    }.bind(this));
	},
	render: function() {
	    if (this.state.forecast === undefined) {
		return React.DOM.div({className: 'app'},
				     SearchBox({ref: 'input', handleSubmit: this.handleSubmit})
				    );
	    }
	    return React.DOM.div({className: 'app'},
				 SearchBox({ref: 'input', handleSubmit: this.handleSubmit}),
				 ResultsBox({ref: 'results', forecast: this.state.forecast, input: this.input})
				);
	}
    }));
    
    React.render(WeatherApp(null), document.getElementById('content'));
})(jQuery);
