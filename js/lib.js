/* globals Two */

var lib = {}

;(function (self) {
  self.runApp = function (canvasElem) {
    var two = new Two({ width: 600, height: 600 }).appendTo(canvasElem)

    var circle = two.makeCircle(72, 100, 50)
    circle.fill = '#FF8000'
    circle.stroke = 'orangered' // Accepts all valid css color
    circle.linewidth = 5

    two.update()
  }
})(lib)
