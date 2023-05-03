AFRAME.registerComponent('terrain-rotation', {
    schema: {
        speed: { type: "number", default: 1 },
        speedOfRotation: { type: "number", default: 0.01 }
    },

    init: function () {
        
    },

    tick: function () {
        window.addEventListener("keydown", (e) => {
            if (e.key === "ArrowRight") {
                
                var pos = this.el.getAttribute("rotation")

                pos.y -= 1

                this.el.setAttribute("rotation", pos);
            }
            if (e.key === "ArrowLeft") {
                
                var pos = this.el.getAttribute("rotation")

                pos.y += 1

                this.el.setAttribute("rotation", pos);
            }
        })
        
    }
});



AFRAME.registerComponent("foo", {
    init: function () {
        // grab the camera
       

        window.addEventListener("keydown", (e) => {
            if (e.code === "ArrowUp") {
                var pos = this.el.getAttribute("position")

                pos.y += 5

                this.el.setAttribute("position", pos);
            }
            if (e.code === "ArrowDown") {
                var pos = this.el.getAttribute("position")

                pos.y -= 5

                this.el.setAttribute("position", pos);
            }
            if (e.key === "ArrowRight") {

                var pos = this.el.getAttribute("rotation")

                pos.y -= 1

                this.el.setAttribute("rotation", pos);
            }
            if (e.key === "ArrowLeft") {

                var pos = this.el.getAttribute("rotation")

                pos.y += 1

                this.el.setAttribute("rotation", pos);
            }
        })
    },
    tick:function(){

        var direction = new THREE.Vector3();
        this.el.sceneEl.camera.getWorldDirection(direction);
        // multiply the direction by a "speed" factor
        direction.multiplyScalar(5)
        // get the current position
        var pos = this.el.getAttribute("position")

        pos.add(direction)

        this.el.setAttribute("position", pos);
    }
})


