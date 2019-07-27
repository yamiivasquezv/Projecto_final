/*La comunicación se ejecuta a través de los tópicos mywebio/<io>/status, con el que Web-IO publica el estado actual de
conmutación, y mywebio/<io>/set, con el que la interfaz web envía una solicitud de conmutación al Web-IO.

1 Una vez que se ha conectado el Web-Client, este recibe los estados de cada entrada y salida como publicaciones
retenidas (Retained Messages) y los reproduce en una tabla en HTML.

2 Cuando el usuario pulsa en una salida (aquí Output 0), Web-Client genera una publicación con la payload "ON" y el
tópico "mywebio/output0/set". Cuando la solicitud está sin confirmar se muestra en Web-Client con un color menos intenso.

3 Web-IO reacciona a la recepción de la suscripción activando la salida correspondiente. Luego envía una publicación con
el nuevo estado como payload y el tópico "mywebio/output0/status". Cuando Web-Client recibe el mensaje cambia de nuevo la
salida al color más intenso.*/

//hola//
/** Web-IO 4.0: MQTT WebSocket example*/

/* Updates the CSS class of an DOM element */

function UpdateElement(ioname, displayClass){
    var cell = document.getElementById(ioname);
    if ((displayClass==="on")&&(cell)){
        cell.className = displayClass;
        cell.disabled=false;
    }
    else if ((displayClass==="off")&&(cell)){
        cell.className = displayClass;
        cell.disabled=true;
    }
    else{
        cell.className = displayClass;
    }
}

//Alterna una entrada
/* Toggles an input in the web interfaces and
* initiates an MQTT publish */
function ToggleOutput(ioname){
    var cell = document.getElementById(ioname);
    switch (cell.className){
        case "on":
            var message = new Paho.MQTT.Message("OFF");
            message.destinationName = "candado/" + ioname + "/set";
            message.qos=1;
            message.retain=true;
            mqttClient.send(message);
            cell.className = "set_off";
            break;
        case "off":
            var message = new Paho.MQTT.Message("ON");
            message.destinationName = "candado/" + ioname + "/set";
            message.qos=1;
            message.retain=true;
            mqttClient.send(message);
            cell.className = "set_on";
            break;
        default:
            cell.className = "unknown";
            break;
    }
}

/* Adds an Click-Event-Listener to a table cell, so that after
	* a click the element can is toggeled */
function EnableToggle(ioname){
    var cell = document.getElementById(ioname);
    if (cell){
            cell.addEventListener("click",
                function(){
                    ToggleOutput(ioname)
                }, true);
    }
}
/*Initialize elements that can be toggled my by click*/
EnableToggle("slot0");
EnableToggle("slot1");
EnableToggle("slot2");
EnableToggle("slot3");