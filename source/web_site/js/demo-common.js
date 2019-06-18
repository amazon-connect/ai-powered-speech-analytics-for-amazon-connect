demo = window.demo || {};
(function() {
   alias = getInstanceName();
   ccpUrl = 'https://' + alias + '.awsapps.com/connect/ccp#/';
   homeURL = 'https://' + alias + '.awsapps.com/connect/home';
   demo.alias = alias;
   demo.ccpUrl = ccpUrl;
   demo.homeURL = homeURL;
})();


$(document).ready(function() {
	var region = getRegion();
	var _hit_data = {
		  'dashboard': 1,
		  'region': region
		};
	sendDataUsage(_hit_data);
});        

//below code is required for signed url and aws authentication
var credentials ;

	const getSignatureKey = function (key, date, region, service) {
	    var kDate = AWS.util.crypto.hmac('AWS4' + key, date, 'buffer');
	    var kRegion = AWS.util.crypto.hmac(kDate, region, 'buffer');
	    var kService = AWS.util.crypto.hmac(kRegion, service, 'buffer');
	    var kCredentials = AWS.util.crypto.hmac(kService, 'aws4_request', 'buffer');    
	    return kCredentials;
	};

	const getSignedUrl = function(host, path, region, credentials) {
		//console.log(host, path, region, credentials);
	    var datetime = AWS.util.date.iso8601(new Date()).replace(/[:\-]|\.\d{3}/g, '');
	    var date = datetime.substr(0, 8);

	    var method = 'GET';
	    var protocol = 'wss';
	    var uri = path;
	    var service = 'execute-api';
	    var algorithm = 'AWS4-HMAC-SHA256';

	    var credentialScope = date + '/' + region + '/' + service + '/' + 'aws4_request';
	    var canonicalQuerystring = 'X-Amz-Algorithm=' + algorithm;
	    canonicalQuerystring += '&X-Amz-Credential=' + encodeURIComponent(credentials.accessKeyId + '/' + credentialScope);
	    canonicalQuerystring += '&X-Amz-Date=' + datetime;
	    canonicalQuerystring += '&X-Amz-Security-Token=' + encodeURIComponent(credentials.sessionToken);
	    canonicalQuerystring += '&X-Amz-SignedHeaders=host';

	    var canonicalHeaders = 'host:' + host + '\n';
	    var payloadHash = AWS.util.crypto.sha256('', 'hex')
	    var canonicalRequest = method + '\n' + uri + '\n' + canonicalQuerystring + '\n' + canonicalHeaders + '\nhost\n' + payloadHash;

	    var stringToSign = algorithm + '\n' + datetime + '\n' + credentialScope + '\n' + AWS.util.crypto.sha256(canonicalRequest, 'hex');
	    var signingKey = getSignatureKey(credentials.secretAccessKey, date, region, service);
	    var signature = AWS.util.crypto.hmac(signingKey, stringToSign, 'hex');

	    canonicalQuerystring += '&X-Amz-Signature=' + signature;
	    
	    var requestUrl = protocol + '://' + host + uri + '?' + canonicalQuerystring;
	    return requestUrl;
	};

function sendDataUsage(hitData){
	var solID = getSolutionId();
	var uid = getUUID();
	var region = getRegion();
	var _dashboard_usage = getDashboardUsage();
	//'TimeStamp': moment().utc().format('YYYY-MM-DD HH:mm:ss.S'),
	var utcDateTime = getUTCDate();
	var _send_data = {
            'Solution': solID,
            'UUID': uid,
            'TimeStamp': utcDateTime,
            'Data': hitData
            };	
	if(_dashboard_usage === 'Yes') {
		$.ajax({
			url: 'https://metrics.awssolutionsbuilder.com/page',
			type: 'POST',
			crossDomain: true,
			data: JSON.stringify(_send_data),
			dataType: 'json',
			headers: {
				'Content-Type': 'application/json'
			},
			success: function(data) {
				console.log('Successfully sent page hit to metrics');
				console.log(data);
			},
			error: function(xhr, ajaxOptions, thrownError) {
				console.log('Error sending page hit to metrics');
			}
		});
	} else {
		console.log('Dashboard use metrics disabled');
	}

}	

function sendMetrics(){
	var _call_data = {
		  'calls': 1,
		  'region': getRegion()
	};
	sendDataUsage(_call_data);
}
function getUTCDate(){
	var date = new Date(); 
	var year = date.getUTCFullYear();
	var month = date.getUTCMonth() + 1;
	if(month <=9)
		month = '0' + month;

	var day = date.getUTCDate();
	if(day <=9)
		day = '0' + day;
	    
	var hour = date.getUTCHours();
	if(hour <=9)
		hour = '0' + hour;

	var min = date.getUTCMinutes();
	if(min <=9)
		min = '0' + min;

	var sec = date.getUTCSeconds();
	if(sec <=9)
		sec = '0' + sec;

	var milsec = date.getUTCMilliseconds();
	return (year  + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec + '.' + milsec );
}
