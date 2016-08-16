/* globals Two $ MathJax */

var lib = {}

;(function (ns) {
  ns.Circuit = function (I1, I2, I3, I4, I5) {
    var circuit = {
      I1: I1,
      I2: I2,
      I3: I3,
      I4: I4,
      I5: I5,

      // Update circuit variables
      update: function () {
        circuit.I6 = circuit.I1 + circuit.I2 + circuit.I3 + circuit.I4 + circuit.I5

        return circuit
      }
    }

    circuit.update()

    return circuit
  }

  ns.makeArrowhead = function (two, length, x, y, theta, lwidth) {
    var horizontalArrowhead = two.makeLine(0, 0, length, 0)

    horizontalArrowhead.linewidth = lwidth

    var verticalArrowhead = two.makeLine(0, 0, 0, length)

    verticalArrowhead.linewidth = lwidth

    var rectangle = two.makeRectangle(0, 0, 2 * length, 2 * length)

    rectangle.opacity = 0

    var arrowhead = two.makeGroup(horizontalArrowhead, verticalArrowhead, rectangle)

    arrowhead.translation.set(x, y)

    arrowhead.rotation = (Math.PI / 180) * theta

    arrowhead.forward = 1

    arrowhead.flip = function () {
      arrowhead.rotation += Math.PI

      arrowhead.forward *= -1
    }

    return arrowhead
  }

  ns.drawCircuit = function (two) {
    /* Make 6 lines for branches. These must insersect at a point*/

    two.makeLine(0, 0, two.width / 2, two.height / 2)

    two.makeLine(0, two.height / 2, two.width / 2, two.height / 2)

    two.makeLine(0, two.height, two.width / 2, two.height / 2)

    two.makeLine(two.width / 2, two.height / 2, two.width, two.height / 2)

    two.makeLine(two.width / 2, 0, two.width / 2, two.height / 2)

    two.makeLine(two.width / 2, two.height, two.width / 2, two.height / 2)

    var arrowheadLength = 10

    var linewidth = 1.5

    // southeast arrow:

    var southeastArrow = ns.makeArrowhead(two, arrowheadLength, two.width / 4, two.height / 4, 180, linewidth)

    // left east arrow

    var leftEastArrow = ns.makeArrowhead(two, arrowheadLength, two.width / 4, two.height / 2, 135, linewidth)

    // northeast arrow

    var northeastArrow = ns.makeArrowhead(two, arrowheadLength, two.width / 4, 3 * two.height / 4, 90, linewidth)

    // south arrow top

    var southArrowTop = ns.makeArrowhead(two, arrowheadLength, two.width / 2, two.height / 4, 225, linewidth)

    // north arrow bottom

    var northArrowBottom = ns.makeArrowhead(two, arrowheadLength, two.width / 2, 3 * two.height / 4, 45, linewidth)

    // east arrow right

    var eastArrowRight = ns.makeArrowhead(two, arrowheadLength, 3 * two.width / 4, two.height / 2, 135, linewidth)

    two.update()

    // hide all arrows pointing away from the node

    var arrows =
    [southeastArrow,
    leftEastArrow,
    northeastArrow,
    northArrowBottom,
    southArrowTop,
    eastArrowRight]

    for (var i = 0; i < arrows.length - 1; i++) {
      var element = arrows[i]._renderer.elem

      $(element).hover(
        function () {
          $(this).addClass('arrows > path')
        }, function () {
        $(this).removeClass('arrows > path')
      }
      )

      ;(function (i) {
        $(element).on('click', function () {
          arrows[i].flip()
          two.update()
        })
      })(i)
    }

    $(this.canvasContainer).append('<div class="label" id="labelI1">\\(I_1 =\\)' +
      '<input ID="inputI1" type="text" class="inputI" tabindex="1" value="' +
      this.circuit.I1 + '"/>' + '<div class="padTopAmp">\\(A\\)</div></div>')

    $(this.canvasContainer).append('<div class="label" id="labelI2">\\(I_2 =\\)' +
      '<input ID="inputI2" type="text" class="inputI" tabindex="2" value="' +
      this.circuit.I2 + '"/>' + '<div class="padTopAmp">\\(A\\)</div></div>')

    $(this.canvasContainer).append('<div class="label" id="labelI3">\\(I_3 =\\)' +
        '<input ID="inputI3" type="text" class="inputI" tabindex="3" value="' +
        this.circuit.I3 + '"/>' + '<div class="padTopAmp">\\(A\\)</div></div>')

    $(this.canvasContainer).append('<div class="label" id="labelI4">\\(I_4 =\\)' +
          '<input ID="inputI4" type="text" class="inputI" tabindex="4" value="' +
          this.circuit.I4 + '"/>' + '<div class="padTopAmp">\\(A\\)</div></div>')

    $(this.canvasContainer).append('<div class="label" id="labelI5">\\(I_5 =\\)' +
            '<input ID="inputI5" type="text" class="inputI" tabindex="5" value="' +
            this.circuit.I5 + '"/>' + '<div class="padTopAmp">\\(A\\)</div></div>')

    $(this.canvasContainer).append('<div class="label" id="labelI6">\\(I_6 = ' + this.circuit.I6 + 'A\\)</div>')

    $('#labelI1').css('top', (two.height / 4.4) + 'px')
                 .css('left', (two.width / 21.3) + 'px')

    $('#labelI2').css('top', (two.height / 1.9) + 'px')
                 .css('left', (two.width / 5) + 'px')

    $('#labelI3').css('top', (3 * two.height / 4.04) + 'px')
                 .css('left', (two.width / 21) + 'px')

    $('#labelI4').css('top', (3 * two.height / 4.04) + 'px')
                 .css('left', (two.width / 1.86) + 'px')

    $('#labelI5').css('top', (two.height / 4.4) + 'px')
                 .css('left', (two.width / 1.86) + 'px')

    $('#labelI6').css('top', (two.height / 1.9) + 'px')
                 .css('left', (3 * two.width / 4) + 'px')

    two.update()

    // Refresh typsetting
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'Kirchhoff Current Law'])
  }

  ns.redrawLabels = function () {
    // Edit MathJax elements directly to update values without having to re-render mathjax
    $('#labelI6 .mjx-mrow > .mjx-mn > .mjx-char').html(this.circuit.I6.toPrecision(2))
  }

  ns.runApp = function (canvasContainer) {
    this.canvasContainer = canvasContainer

    // Make a new circuit
    this.circuit = ns.Circuit(4, 5, 6, 5, 4)

    var width1 = 650
    var height1 = 650
    var two = new Two({ type: Two.Types.svg, width: width1, height: height1 }).appendTo(canvasContainer)

    ns.drawCircuit(two)

    // Setup event handlers for currents
    var self = this

    $('#inputI1').on('input', function () {
      if (!isNaN(this.value) && this.value !== '') {
        self.circuit.I1 = Number(this.value)
        self.circuit.update()
        // Redraw labels
        ns.redrawLabels()
      }
    })
    $('#inputI2').on('input', function () {
      if (!isNaN(this.value) && this.value !== '') {
        self.circuit.I2 = Number(this.value)
        self.circuit.update()
        // Redraw labels
        ns.redrawLabels()
      }
    })
    $('#inputI3').on('input', function () {
      if (!isNaN(this.value) && this.value !== '') {
        self.circuit.I3 = Number(this.value)
        self.circuit.update()
        // Redraw labels
        ns.redrawLabels()
      }
    })
    $('#inputI4').on('input', function () {
      if (!isNaN(this.value) && this.value !== '') {
        self.circuit.I4 = Number(this.value)
        self.circuit.update()
        // Redraw labels
        ns.redrawLabels()
      }
    })
    $('#inputI5').on('input', function () {
      if (!isNaN(this.value) && this.value !== '') {
        self.circuit.I5 = Number(this.value)
        self.circuit.update()
        // Redraw labels
        ns.redrawLabels()
      }
    })
  }
})(lib)
