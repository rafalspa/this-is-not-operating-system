let date = new Date();
let current_time = date.getHours() + ":" + date.getMinutes()+":"+ date.getSeconds();
document.getElementByID("time").innerHTML = current_time;