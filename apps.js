function fillApp(winTitle) {
    if (winTitle === "Terminal") {
      openApp.innerHTML = `<div class="terminal"><input type="text"></input></div>`;
    } 
    if (winTitle === "Text Editor") {
      openApp.innerHTML = `<textarea class="textedit">nie dupa</textarea>`;
    }
    if (winTitle === "Settings") {
      openApp.innerHTML = `<textarea class="textedit">ust?</textarea>`;
    }
  }