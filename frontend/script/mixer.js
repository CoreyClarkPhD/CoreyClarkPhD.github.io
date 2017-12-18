// Mixer OAuth + Backend server
var CONFIG_SERVER = "bmt-points-backend.azurewebsites.net";
var CONFIG_CLIENT_ID = "1831e040ec48d4d84abcb302e10821373b0c579061429864";

// Test server
// var CONFIG_SERVER = "bmt-points-backend-test.azurewebsites.net";
// var CONFIG_CLIENT_ID = "7c919758b114fdf46ca22d2cddb451885fcc6b7ac6574fd5";

var websocketConnection;
var userID = 0;
var mixerUser = {};

function getUserID(token, callback) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function () {
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
			mixerUser = JSON.parse(xmlHttp.responseText);
			callback(mixerUser.id);
		}
	}
	xmlHttp.open("GET", "https://mixer.com/api/v1/users/current", true);
	xmlHttp.setRequestHeader("Authorization", "Bearer " + token);
	xmlHttp.send(null);
}
function getAuthorizationToken(url) {
	const electron = require('electron');
	const BrowserWindow = electron.BrowserWindow || electron.remote.BrowserWindow;

	return new Promise(function (resolve, reject) {
		const authWindow = new BrowserWindow({
			webPreferences: {
				sandbox: true
			}
		});

		authWindow.loadURL(url);
		authWindow.show();

		authWindow.on('closed', () => {
			reject(new Error('window was closed by user'));
		});

		function onCallback(url) {
			if (url.startsWith("http://bmt-points-backend.azurewebsites.net/")) {

				let raw_token = /access_token=([^&]*)/.exec(url) || null;
				let token = (raw_token && raw_token.length > 1) ? raw_token[1] : null;
				let raw_expires_in = /expires_in=([^&]*)/.exec(url) || null;
				let expires_in = (raw_expires_in && raw_expires_in.length > 1) ? raw_expires_in[1] : null;
				let error = /\?error=(.+)$/.exec(url);
				console.log(url);
				console.log(token);

				resolve(token);
				authWindow.removeAllListeners('closed');
				setImmediate(function () {
					authWindow.close();
				});
			}
		}

		authWindow.webContents.on("did-navigate", (event, url) => {
			onCallback(url);
		});
	});
}

function mixerAuth(callback) {
	var authService = "https://mixer.com/oauth/authorize";
	var clientID = CONFIG_CLIENT_ID;
	var scopes = ['channel:details:self'];
	// Build the OAuth consent page URL
	var authUrl = authService;
	authUrl += "?response_type=token";
	authUrl += "&client_id=" + clientID;
	authUrl += "&scope=" + (scopes.join("%20"));
	authUrl += "&redirect_uri=http%3A%2F%2F" + CONFIG_SERVER + "%2FWaveTrace%2Foauth.html";
	console.log(authUrl);


	if (window.location.protocol === "file:" || window.location.href === "about:blank") {
		setTimeout(function () {
			if (global.__CELL_UUID !== undefined) {
				console.log("This is electron");
				getAuthorizationToken(authUrl).then((code) => {
					console.log(code);
					onMixerAuth({ access_token: code })
				});
			}
		}, 1000);
	} else {
		var div = '<div id="oauthContainer" style="position: fixed; width: 100%; height: 100%; top: -10000px; left: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,0.5); z-index: 10;">';
		div += '<div style="width: 80%; height: 80%; position: absolute; top: 10%; left: 10%;">';
		div += '<iframe id="oauth" style="border-width: 0px;" height="100%" width="100%" src="' + authUrl + '">';
		div += '</iframe>';
		div += '</div>';
		div += '</div>';
		document.body.innerHTML += div;

		setTimeout(function () {
			if (userID == 0) {
				var oauthContainer = document.getElementById("oauthContainer");
				oauthContainer.style.top = '0';
				oauthContainer.style.display = 'block';
			}
		}, 1 * 1000);
	}
}

window.addEventListener("message", function (e) {
	onMixerAuth(JSON.parse(e.data));
}, false);

function onMixerAuth(param) {
	console.log(param);

	if (window.location.protocol !== "file:") {
		var oauthContainer = document.getElementById("oauthContainer");
		oauthContainer.style.display = 'none';
	}

	getUserID(param.access_token, function (id) {
		userID = id;
		console.log("UserID", userID);

		websocketConnection = new WebSocket('ws://' + CONFIG_SERVER + '/');

		websocketConnection.onopen = function () {
			var uuid = undefined;
			if (typeof (global) !== 'undefined' && global.__CELL_UUID) {
				uuid = global.__CELL_UUID;
			}
			websocketConnection.send(JSON.stringify({
				type: "user.login",
				userID: userID,
				userToken: param.access_token,
				uuid: uuid
			}));
		};

		websocketConnection.onerror = function (error) {
			console.log('WebSocket Error', error);
		};

		websocketConnection.onmessage = function (e) {
			var str = "" + e.data;
			if (str.startsWith("{")) {
				var data = JSON.parse(str);
				if (data.type === "points.update") {
					pointsUpdateCallback(data.points);
				} else if (data.type === "error") {
					console.warn("PointsBackend error", data);
				} else if (data.type === "user.login.reply") {
					// onLogin
					websocketConnection.send(JSON.stringify({
						type: "points.subscribe",
						userID: userID
					}));
				}
			}
		};
		if (window.location.protocol !== "file:") {
			oauthContainer.style.display = 'none';
		}

		//Update User image here
		var img  = document.getElementById('user-goal-image');
		img.style.background = "url(" + mixerUser.avatarUrl + ")";
		img.style.backgroundSize = 'cover';

		//Update username
		document.getElementById('user-name').innerHTML = mixerUser.username;
		document.getElementById('login-button').innerHTML =  mixerUser.username;
	});

}

function addPoints(amount) {
	if (websocketConnection != null && websocketConnection.readyState === WebSocket.OPEN) {
		websocketConnection.send(JSON.stringify({
			type: "points.add",
			userID: userID,
			amount: amount
		}));
	}
}

//Amount of credits the player currently has
var playerCredits = 0;

var pointsUpdateCallback = function (points) {
    playerCredits = points;
	// callback to update points
	document.getElementById('user-goal-value').innerHTML = '10000 / ' + points;
	document.getElementById('progress-user-bar').style.width = (points/10000) + '%';
}
