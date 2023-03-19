const desktop = document.querySelector(".desktop");
const osWindows = document.querySelectorAll(".os-window");
const newWindowButton = document.querySelector("#new-window-button");
const appsBar = document.querySelector(".appsBar");
let appsBarBottom = appsBar.getBoundingClientRect();
let desktopBound = desktop.getBoundingClientRect();
let countMinimized = 0;

// Function to create a new osWindow
function createNewWindow(winTitle) {
  let canBeDragged = 1;
  const newWindow = document.createElement("div");
  newWindow.classList.add("os-window");
  newWindow.innerHTML = `
    <div class="os-titlebar">
      <div class="os-close"></div>
      <div class="os-minimize"></div>
      <div class="os-zoom"></div>
      <div class="os-title">${winTitle}</div>
      <div class="os-tools"><div class="os-tool">File</div>
    <div class="os-tool">Edit</div>
    <div class="os-tool">Help</div></div>
    </div>
    
  `;
  desktop.appendChild(newWindow);
  const openApp = document.createElement("div");

  // function showFileMenu(){
  //   const fileMenu = document.createElement("div");
  //   const fileButton = newWindow.querySelector(".os-tool");
  //   fileMenu.innerHTML = `<div class="os-tool-popup">test</div>`;
  //   newWindow.appendChild(fileMenu);
  //   fileMenu.style.left = MouseEvent.pageX;
  // }

  // newWindow.addEventListener('click', () => {
  //   showFileMenu();
  //   console.log("dupa");
  // })

  function fillApp(winTitle) {
    if (winTitle === "Terminal") {
      openApp.innerHTML = `<div class="terminal"><input type="text" autofocus></input></div>`;
    } 
    if (winTitle === "Text Editor") {
      openApp.innerHTML = `<textarea class="textedit" autofocus>nie dupa</textarea>`;
      newWindow.style.width = "450px";
      newWindow.style.height = "350px";
    }
    if (winTitle === "Calculator") {
      openApp.innerHTML = `
      <input type="text" id="display" readonly>
	<br>
	<button onclick="addToDisplay('1')">1</button>
	<button onclick="addToDisplay('2')">2</button>
	<button onclick="addToDisplay('3')">3</button>
	<button onclick="addToDisplay('+')">+</button>
	<br>
	<button onclick="addToDisplay('4')">4</button>
	<button onclick="addToDisplay('5')">5</button>
	<button onclick="addToDisplay('6')">6</button>
	<button onclick="addToDisplay('-')">-</button>
	<br>
	<button onclick="addToDisplay('7')">7</button>
	<button onclick="addToDisplay('8')">8</button>
	<button onclick="addToDisplay('9')">9</button>
	<button onclick="addToDisplay('*')">*</button>
	<br>
	<button onclick="addToDisplay('0')">0</button>
	<button onclick="addToDisplay('.')">.</button>
	<button onclick="calculate()">=</button>
	<button onclick="addToDisplay('/')">/</button>
	<br>
	<button onclick="clearDisplay()">Clear</button>
	`;
      newWindow.style.width = "280px";
      newWindow.style.height = "300px";
    }
    if (winTitle === "Settings") {
      openApp.innerHTML = `<div class="settings">ust?</div>`;
      newWindow.style.width = "300px";
      newWindow.style.height = "400px";
    }
  }

  fillApp(winTitle);
  newWindow.appendChild(openApp);
  
  // Add event listener to the osClose button
  const osCloseButton = newWindow.querySelector(".os-close");
  osCloseButton.addEventListener("click", () => {
    if (newWindow.classList.contains("minimized")) {
      countMinimized -= 1;
    }
    newWindow.remove();
  });

  //Add event listener to the osZoom button
  const osZoomButton = newWindow.querySelector(".os-zoom");
  osZoomButton.addEventListener("click", () => {
    newWindow.style.top = desktopBound.top;
    newWindow.style.left = 0;
    newWindow.style.height = "calc(100% - 50px)";
    newWindow.classList.toggle("maximized");
    newWindow.classList.remove("minimized");
    if (!newWindow.classList.contains("maximized")) {
      newWindow.style.height = "200px";
    }
  });

  //Add event listener to the osMinimize button
  const osMinimizeButton = newWindow.querySelector(".os-minimize");
  osMinimizeButton.addEventListener("click", () => {

    newWindow.style.top = "calc(100% - 72px)";
    newWindow.classList.toggle("minimized");
    newWindow.classList.remove("maximized");
    let calcPosition = (countMinimized * 204) + 18;
    newWindow.style.left = calcPosition + "px";
    newWindow.style.marginright = "24px";

    if (!newWindow.classList.contains("maximized") && !newWindow.classList.contains("minimized"))
    {
      newWindow.style.top = "0px";
      newWindow.style.left = "0px";
      //newWindow.style.height = "24px";
    }
    if (newWindow.classList.contains("minimized")) { 
      countMinimized += 1;
      //newWindow.style.height = "24px";
    }
    else {
      
    const minimizedWindows = document.querySelectorAll(".minimized");
    minimizedWindows.forEach((osWindow,index) => {
          let currentPos = parseInt(osWindow.style.left);
          console.log(currentPos);
          
          if (osWindow.style.left > 100) {
          osWindow.style.left = (parseInt(osWindow.style.left) - 24) + "px";
          }
      });
      countMinimized -= 1;
    }
  });

  //Add event listener to show icon on buttons
  osCloseButton.addEventListener("mouseover", () => {
    osCloseButton.innerHTML = `x`;
  });

  osCloseButton.addEventListener("mouseout", () => {
    osCloseButton.innerHTML = ``;
  });

  osMinimizeButton.addEventListener("mouseover", () => {
    osMinimizeButton.innerHTML = `-`;
  });

  osMinimizeButton.addEventListener("mouseout", () => {
    osMinimizeButton.innerHTML = ``;
  });

  osZoomButton.addEventListener("mouseover", () => {
    osZoomButton.innerHTML = `+`;
  });

  osZoomButton.addEventListener("mouseout", () => {
    osZoomButton.innerHTML = ``;
  });

  function makeDraggable(osWindow) {
    let isDragging = false;
    let mouseX = 0;
    let mouseY = 0;
    const osTitlebar = osWindow.querySelector(".os-titlebar");
    const bodyRect = document.body.getBoundingClientRect();
    if ((canBeDragged = 1)) {
      osTitlebar.addEventListener("mousedown", function (e) {
        if (
          !e.target.classList.contains("os-close") &&
          !e.target.classList.contains("os-minimize") &&
          !e.target.classList.contains("os-zoom")
        ) {
          isDragging = true;
          mouseX = e.clientX - parseInt(osWindow.offsetLeft);
          mouseY = e.clientY - parseInt(osWindow.offsetTop);
        }
      });
    }

    document.addEventListener("mousemove", function (e) {
      if (isDragging && !osWindow.classList.contains("minimized") && !osWindow.classList.contains("maximized")) {
        const maxLeft = bodyRect.right - osWindow.offsetWidth;
        // const maxTop = bodyRect.top + bodyRect.height - osWindow.offsetHeight;
        const maxTop = appsBarBottom.top;
        osWindow.style.left = `${Math.min(Math.max(e.clientX - mouseX, bodyRect.left), maxLeft)}px`;
        osWindow.style.top = `${Math.min(Math.max(e.clientY - mouseY, bodyRect.top), maxTop)}px`;
    
        // Adjust the position of the osWindow element if it exceeds the boundaries of the body element
        if (osWindow.offsetLeft < bodyRect.left) {
          osWindow.style.left = `${bodyRect.left}px`;
        }
        if (osWindow.offsetLeft + osWindow.offsetWidth > bodyRect.right) {
          osWindow.style.left = `${maxLeft}px`;
        }
        if (osWindow.offsetTop < bodyRect.top) {
          osWindow.style.top = `${bodyRect.top}px`;
        }

        //chujowo dziala
        if (osWindow.offsetTop + osWindow.offsetHeight > bodyRect.top + bodyRect.height-(osWindow.offsetTop + osWindow.offsetHeight)) {
          osWindow.style.top = `${appsBarBottom.top-osWindow.offsetHeight}px`;
          console.log(osWindow.offsetHeight);
        }
      }
    });
    
    document.addEventListener("mouseup", function () {
      isDragging = false;
    });
  }

  makeDraggable(newWindow);
}

let powerButton = document.querySelector(".powerButton");
powerButton.addEventListener('click', () => {
  window.close();
})


