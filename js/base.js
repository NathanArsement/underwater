AFRAME.registerComponent('base', {
    schema: {
        modelRef:{type:"string",default:"./assets/models/underwater_showcase/scene.gltf"},
    },

    init: function () {
      var model=this.data.modelRef;
      this.el.setAttribute("gltf-model",model)
    },

    update: function () {
      // Do something when component's data is updated.
    },

    remove: function () {
      // Do something the component or its entity is detached.
    },

    tick: function (time, timeDelta) {
      // Do something on every scene tick or frame.
    }
});

AFRAME.registerComponent('fish', {
  schema: {
  },

  init: function () {
    for (i = 1; i <= 20; i++) {
      var posX = Math.floor(Math.random() * 50000 + -10000)
      var posY = Math.floor(Math.random() * 2000 + -500)
      var posZ = Math.floor(Math.random() * 50000 + -10000)
      for(i=1; i<10;i++){
        var id = `fish${i}`
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
    fishEL.setAttribute("static-body", { shape: "sphere", sphereRadius: 15 })
    fishEL.setAttribute("gameplay", { elementID: `#${id}` })
    terrainEL.appendChild(fishEL)
  }
});