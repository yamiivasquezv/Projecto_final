var hostname = "192.168.8.107";
var port = 9001;
var clientId = "vilma";
//var clientId = user._id;
//console.log("ID:" + clientId);
clientId += new Date().getUTCMilliseconds();
//var username = "webclient";
//var password = "Super$icher123";

var subscription = "candado/+/set";
//var subscription = "hola";

mqttClient = new Paho.MQTT.Client(hostname, port, clientId);
mqttClient.qos=3;
mqttClient.onMessageArrived = MessageArrived;
mqttClient.onConnectionLost = ConnectionLost;
Connect();

/*Initiates a connection to the MQTT broker*/
function Connect(){
    mqttClient.connect({
        onSuccess: Connected,
        onFailure: ConnectionFailed,
        keepAliveInterval: 10,
        //userName: username,
        //useSSL: true,
        //password: password
    });
}

/*Callback for successful MQTT connection */
function Connected() {
    console.log("Connected");
    mqttClient.subscribe(subscription,{qos:1});
}

/*Callback for failed connection*/
function ConnectionFailed(res) {
    console.log("Connect failed:" + res.errorMessage);
}

/*Callback for lost connection*/
function ConnectionLost(res) {
    if (res.errorCode !== 0) {
        console.log("Connection lost:" + res.errorMessage);
        Connect();
    }
}

/*Callback for incoming message processing */
function MessageArrived(message) {
    console.log(message.destinationName +" : " + message.payloadString);
    switch(message.payloadString){
        case "on":
            displayClass = "on";
            break;
        case "off":
            displayClass = "off";
            break;
        default:
            displayClass = "unknown";
    }
    var topic = message.destinationName.split("/");
    if (topic.length === 3){
        var ioname = topic[1];
        UpdateElement(ioname, displayClass);
    }
}