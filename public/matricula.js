var hostname = "192.168.1.162";
var port = 9001;
var clientId = "hola";
clientId += new Date().getUTCMilliseconds();
var subscription = "matricula/+/set";


mqttClient = new Paho.MQTT.Client(hostname, port, clientId);
//mqttClient.qos=3;
mqttClient.onMessageArrived = MessageArrived;
mqttClient.onConnectionLost = ConnectionLost;
Connect();

/*Initiates a connection to the MQTT broker*/
function Connect(){
    mqttClient.connect({
        onSuccess: Connected,
        onFailure: ConnectionFailed,
        keepAliveInterval: 10,
    });
}

/*Callback for successful MQTT connection */
function Connected() {
    console.log("Connected");
    mqttClient.subscribe(subscription);
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
    matricula=message.payloadString;


    var topic = message.destinationName.split("/");
    if (topic.length === 3) {
        var ioname = topic[1];
        UpdateElement(ioname, matricula);
    }
}