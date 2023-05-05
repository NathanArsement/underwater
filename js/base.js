AFRAME.registerComponent('fish', {
  schema: {
  },

  init: function () {
    for (i = 1; i <= 5; i++) {
      var posX = Math.floor(Math.random() * 50000 + -10000)
      var posY = Math.floor(Math.random() * 2000 + -500)
      var posZ = Math.floor(Math.random() * 50000 + -10000)
      for(j=1;  j<=5 ;j++){
        var id = `fish${i}${j}`
        posX += Math.floor(Math.random() * 5000 + -200)
        posY += Math.floor(Math.random() * 2000 + -100)
        posZ += Math.floor(Math.random() * 5000 + -200)
        var pos = {
          x: posX,
          y: posY,
          z: posZ  
      }
        this.createFish(id, pos)
      
      }
      
    }
  },
  createFish: (id, pos) => {
    var terrainEL = document.querySelector("#base")
    var fishEL = document.createElement("a-entity")
    fishEL.setAttribute("id", id)
    fishEL.setAttribute("position", pos)
    fishEL.setAttribute("scale", { x: 100, y: 100, z: 100 })
    fishEL.setAttribute("gltf-model", "./assets/models/clown_fish/scene.gltf")
    fishEL.setAttribute("animation-mixer",{})
    fishEL.setAttribute("static-body", { shape: "sphere", sphereRadius: 25 })
    fishEL.setAttribute("gameplay", { elementID: `#${id}` })
    terrainEL.appendChild(fishEL)
  }
});

AFRAME.registerComponent('coin', {
  schema: {
  },

  init: function () {
    for (i = 1; i <= 20; i++) {
      var id = `coin${i}`
      var posX = Math.floor(Math.random() * 50000 + -10000)
      var posY = Math.floor(Math.random() * 2000 + -500)
      var posZ = Math.floor(Math.random() * 50000 + -10000)
      
        var pos = {
          x: posX,
          y: posY,
          z: posZ
        }
        this.createCoin(id, pos)

    }
  },
  createCoin: (id, pos) => {
    var terrainEL = document.querySelector("#base")
    var coinEL = document.createElement("a-entity")
    coinEL.setAttribute("id", id)
    coinEL.setAttribute("position", pos)
    coinEL.setAttribute("scale", { x: 10000, y: 10000, z: 10000 })
    coinEL.setAttribute("gltf-model", "./assets/models/coin/scene.gltf")
    coinEL.setAttribute("static-body", { shape: "null"})
    coinEL.setAttribute("gameplay", { elementID: `#${id}` })
    terrainEL.appendChild(coinEL)
  }
});

AFRAME.registerComponent('gameplay', {
  schema: {
    elementID: { type: "string", default: "#coin" }
  },
  isColided: function (elementID) {
    const element = document.querySelector(elementID)
    element.addEventListener("collide", e => {
      if (elementID.includes("#coin")) {
        this.updateScore()
        this.updateTarget()
        element.setAttribute("visible", false)
      }
      else {
        this.gameOver()

      }
    })
  },
  init: function () {
    var duration = 120
    var timerEL = document.querySelector("#timer")
    this.startTimer(duration, timerEL)
  },

  update: function () {
    this.isColided(this.data.elementID)
  },
  startTimer: function (duration, timerEL) {
    var minutes;
    var seconds
    setInterval(() => {
      if (duration > 0) {
        minutes = parseInt(duration / 60)
        seconds = parseInt(duration % 60)
        if (minutes < 10) {
          minutes = "0" + minutes
        } if (seconds < 10) {
          seconds = "0" + seconds
        }
        timerEL.setAttribute("text", {
          value: minutes + ":" + seconds
        })
        duration -= 1
      } else {
        this.gameOver()
      }
    }, 1000)
  },
  gameOver: function () {
    var planeEL = document.querySelector("#diver_model");
    var element = document.querySelector("#game_over_text");
    element.setAttribute("visible", true);
    planeEL.setAttribute("dynamic-body", { mass: 5 });
    planeEL.removeAttribute("foo")
  },
  updateTarget: function () {
    var element = document.querySelector("#targets")
    var count = element.getAttribute("text").value
    console.log(count)
    var currentTargets = parseInt(count)
    currentTargets -= 1
    element.setAttribute("text", { value: currentTargets })
  },
  updateScore: function () {
    var element = document.querySelector("#scoreDisplay")
    var count = element.getAttribute("text").value
    console.log(count)
    var currentScore = parseInt(count)
    currentScore += 50
    element.setAttribute("text", { value: currentScore })
  },
  remove: function () {
    // Do something the component or its entity is detached.
  },

  tick: function (time, timeDelta) {
    // Do something on every scene tick or frame.
  }
});

