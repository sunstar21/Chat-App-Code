const ws = new WebSocket('wss://2886795286-3000-ollie07.environments.katacoda.com/');
var user;
var pressing = false;
function submitted() {
debugger;
	var username = $("#user-login-input").val();
  $("#user-login-input").val(" ");
  user=username;
  if(user.length<2||user.length>20) {
  	alert("Please enter a valid username less than 20 characters long")
    return;
  }
  var info = {"Username": user, "Message": "", "Reason": "New User Request"}
  ws.send(JSON.stringify(info));
}
function msgsub() {
	var message = $("#msg").val();
  $("#msg").val("");
  console.log(message);
  ws.send(JSON.stringify({"Username": user, "Message": message, "Reason": "Message Request"}));
}
ws.onopen = function() {
    console.log('WebSocket Client Connected');
};
ws.onmessage = function(e) {
  var messages = JSON.parse(e.data);
  if(messages.Status==="Approved" && messages.Reason==="New User Request") {
  	ws.send(JSON.stringify({"Reason":"Message Request", "Username": "Server", "Message": user+" has joined the chat."}))	
    $("#login-block").hide();
    $("#recievingmessages, #sendmsg").show();
    pressing=true;
  } else if(messages.Status==="Approved" && messages.Reason==="Message Request") {
  	if(messages.Username==="Server") {
        $("#type").show().text(messages.Username+": "+messages.Message);
        window.setTimeout(function() {
          $("#type").text("").hide();
        }, 5000)
    }
    else if(messages.Username===user) {
      var date = new Date;
      var seconds = date.getSeconds();
      var minutes = date.getMinutes();
      var hour = date.getHours();
      if(JSON.stringify(minutes).length===1) minutes="0"+minutes;
      if(hour>12) hour-=12;
      if(JSON.stringify(seconds).length===1) seconds="0"+seconds;
      var fulldate = hour+":"+minutes+":"+seconds;
      var enclosingdiv = $("<div style='width: 100%; display: table;' />")
      var nextdiv = $("<div style='display: table-row;' />");
      var afternextdiv = $("<div style='display: table-cell; width: 30%;' />");
      var withafternextdiv = $("<div class='yourText' style='display: table-cell;' />").html("<span style='color: gray;'>"+fulldate+"  </span>"+"<span style='font-weight: bold; font-family: Comic Sans MS;'>"+messages.Username+":</span>"+"<br><div class='yourText' style='background-color: black; color: white;'>"+messages.Message+"</div>");
      enclosingdiv.append(nextdiv.append(afternextdiv).append(withafternextdiv));
      $("#msgssss").append(enclosingdiv);
        var elem = document.getElementById('recievingmessages');
        elem.scrollTop = elem.scrollHeight;
    } else if(messages.Username!==user) {
      var date = new Date;
      var seconds = date.getSeconds();
      var minutes = date.getMinutes();
      var hour = date.getHours();
      if(JSON.stringify(minutes).length===1) minutes="0"+minutes;
      if(hour>12) hour-=12;
      if(JSON.stringify(seconds).length===1) seconds="0"+seconds;
      var fulldate = hour+":"+minutes+":"+seconds;
      var enclosingdiv = $("<div />").append($("<div class='otherText' />").html("<span style='color: gray;'>"+fulldate+"  </span>"+"<span style='font-weight: bold; font-family: Comic Sans MS;'>"+messages.Username+":</span>"+"<br><div class='yourText' style='background-color: black; color: white;'>"+messages.Message+"</div>"))
      $("#msgssss").append(enclosingdiv);
      var elem = document.getElementById('recievingmessages');
      elem.scrollTop = elem.scrollHeight;
    }
  } else if(messages.Status==="Denied" && messages.Reason==="New User Request") {
  	alert("Please choose another name, thank you!");
  }
};
function calcNumbers(result){
  form.displayResult.value=form.displayResult.value+result;
}
window.addEventListener('keydown', function (e) {
  if(pressing===true) {
  if(e.key==="Escape") {
    $("#mct").hide();
    $("#cct").show();
  } else if(e.key==="Shift") {
    $("#mct").show();
    $("#cct").hide();
  }
}
}, false);
