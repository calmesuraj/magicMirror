/* Config Sample
 *
 * For more information on how you can configure this file
 * see https://docs.magicmirror.builders/configuration/introduction.html
 * and https://docs.magicmirror.builders/modules/configuration.html
 *
 * You can use environment variables using a `config.js.template` file instead of `config.js`
 * which will be converted to `config.js` while starting. For more information
 * see https://docs.magicmirror.builders/configuration/introduction.html#enviromnent-variables
 */
let config = {
	address: "localhost",	// Address to listen on, can be:
	// - "localhost", "127.0.0.1", "::1" to listen on loopback interface
	// - another specific IPv4/6 to listen on a specific interface
	// - "0.0.0.0", "::" to listen on any interface
	// Default, when address config is left out or empty, is "localhost"
	port: 8080,
	basePath: "/",	// The URL path where MagicMirror² is hosted. If you are using a Reverse proxy
	// you must set the sub path here. basePath must end with a /
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"],	// Set [] to allow all IP addresses
	// or add a specific IPv4 of 192.168.1.5 :
	// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
	// or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
	// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	useHttps: false,			// Support HTTPS or not, default "false" will use HTTP
	httpsPrivateKey: "",	// HTTPS private key path, only require when useHttps is true
	httpsCertificate: "",	// HTTPS Certificate path, only require when useHttps is true

	language: "en",
	locale: "en-US",   // this variable is provided as a consistent location
	// it is currently only used by 3rd party modules. no MagicMirror code uses this value
	// as we have no usage, we  have no constraints on what this field holds
	// see https://en.wikipedia.org/wiki/Locale_(computer_software) for the possibilities

	logLevel: ["INFO", "LOG", "WARN", "ERROR"], // Add "DEBUG" for even more logging
	timeFormat: 12,
	units: "metric",

	modules: [
		// 3.1 Date/Time
		{
			module: "clock",
			position: "top_left",
			config: {
				// 24hr or 12hr
				timeFormat: "12",
				displaySeconds: true,
				dateFormat: "dddd, MMMM Do YYYY",
			}
		},

		// 3.2 Weather: current
		{
			module: "weather",
			position: "top_right",
			config: {
				weatherProvider: "openweather",
				type: "current",
				// EITHER city + locationID OR coordinates. Coordinates are more reliable:
				latitude: 32.8140,      // Irving example - change to yours
				longitude: -96.9489,
				apiKey: "YOUR_OPENWEATHERMAP_API_KEY",
				showHumidity: true,
				showFeelsLike: true
			}
		},

		// 3.3 Weather: forecast
		{
			module: "weather",
			position: "upper_third",
			config: {
				weatherProvider: "openmeteo",
				type: "current",          // current weather
				lat: 32.8140,             // Irving, Texas latitude
				lon: -96.9489,            // Irving, Texas longitude
				tempUnit: "F",            // Fahrenheit
				windUnit: "mph",          // optional, for wind speed
				showHumidity: true        // optional
			}
		},
		{
			module: "weather",
			position: "upper_third",
			header: "Weather Forecast",
			config: {
				weatherProvider: "openmeteo",
				type: "forecast",         // forecast
				lat: 32.8140,
				lon: -96.9489,
				tempUnit: "F",
				windUnit: "mph"
			}
		},

		// 3.5 Upcoming Events LIST (stock calendar)
		{
			module: "calendar",
			header: "Upcoming Events",
			position: "bottom_left",
			config: {
				showEnd: true,
				fullDayEventDateFormat: "ddd, MMM D",
				maximumEntries: 10,
				maximumNumberOfDays: 60,
				fetchInterval: 5 * 60 * 1000, // 5 min
				displaySymbol: true,
				defaultSymbol: "calendar",
				dateFormat: "ddd, MMM D",
				timeFormat: "absolute", // shows “in 3 days” alongside time
				urgency: 1440,          // minutes; < this shows times like “Today/Tomorrow”
				getRelative: 24 * 60 * 60 * 1000, // show “in X days”
				calendars: [
					{
						url: "",// Add your calendar URL here
						symbol: "calendar-check",
						name: "My Calendar",
						color: "#ffffff"
					}
				],


				wrapEvents: true,
				wrapAfter: 30,
				maxEventTitleLines: 4
			}
		},

		// 3.6 (Required by CX3) – define sources for CalendarExt3
		{
			module: "MMM-CalendarExt3Agenda",
			// position: "middle_center",
			position: "middle_center",
			header: "Karki Family Event",
			config: {
				updateInterval: 20 * 1000,
				instanceId: "basicCalendar",
				locale: 'en-US',
				firstDayOfWeek: 0,
				startDayIndex: -1,
				endDayIndex: 10,
				calendarSet: ['My Calendar']

			},
		},
	]

};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") { module.exports = config; }
