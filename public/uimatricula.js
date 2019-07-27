/* Updates the CSS class of an DOM element */

function UpdateElement(ioname,matricula){
    var cell = document.getElementById(ioname);
    if (cell){
        cell.value=matricula;
       // cell.placeholder=matricula;
    }
}

//Alterna una entrada
/* Toggles an input in the web interfaces and
* initiates an MQTT publish */

function ToggleOutput(ioname){

    var cell = document.getElementById(ioname);

    if (cell.onFocus) {
        var message = new Paho.MQTT.Message("Recibir");
        message.destinationName = "matricula/" + ioname + "/set";
        mqttClient.send(message);
    }
}

/* Adds an Click-Event-Listener to a table cell, so that after
	* a click the element can is toggeled */

/*Initialize elements that can be toggled my by click*/
ToggleOutput("mat");
