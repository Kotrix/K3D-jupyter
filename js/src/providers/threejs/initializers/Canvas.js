'use strict';
/**
 * Canvas initializer for Three.js library
 * @this K3D.Core~world
 * @method Canvas
 * @memberof K3D.Providers.ThreeJS.Initializers
 */
module.exports = function (K3D) {

    var self = this, mouseCoordOnDown;

    function refresh() {
        if (K3D.disabling) {
            self.renderer.domElement.removeEventListener('mousemove', onDocumentMouseMove);
            self.renderer.domElement.removeEventListener('mousedown', onDocumentMouseDown);
            return;
        }

        self.controls.update();
        requestAnimationFrame(refresh);
    }

    function getCoordinate(event) {
        return {
            x: event.offsetX / K3D.getWorld().targetDOMNode.offsetWidth * 2 - 1,
            y: -event.offsetY / K3D.getWorld().targetDOMNode.offsetHeight * 2 + 1
        };
    }

    function onDocumentMouseDown(event) {
        event.preventDefault();
        mouseCoordOnDown = getCoordinate(event);
    }

    function onDocumentMouseUp(event) {
        var coordinate;

        event.preventDefault();
        coordinate = getCoordinate(event);

        if (mouseCoordOnDown.x === coordinate.x && mouseCoordOnDown.y === coordinate.y) {
            K3D.mouseClick(coordinate.x, coordinate.y);
        }
    }

    function onDocumentMouseMove(event) {
        var coordinate;

        event.preventDefault();
        coordinate = getCoordinate(event);

        K3D.updateMousePosition(coordinate.x, coordinate.y);
    }

    this.renderer.setSize(this.width, this.height);
    this.targetDOMNode.appendChild(this.renderer.domElement);

    this.controls = new THREE.TrackballControls(this.camera, this.renderer.domElement);
    this.controls.rotateSpeed = 2.0;
    this.controls.zoomSpeed = 1.2;
    this.controls.panSpeed = 0.8;
    this.controls.staticMoving = true;
    this.controls.dynamicDampingFactor = 0.3;

    this.renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, false);
    this.renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);
    this.renderer.domElement.addEventListener('mouseup', onDocumentMouseUp, false);

    refresh();
};
