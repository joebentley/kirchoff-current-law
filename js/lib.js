/* globals Two $ MathJax */

var lib = {}

;(function (ns) {
  // Make a function to calculate currents
  ns.Circuit = function (I1, I2, I3, I4, I5) {
    var circuit = {
      currents: [
        I1,
        I2,
        I3,
        I4,
        I5,
        0
      ],

      // Update value of I6
      update: function () {
        this.currents[5] = 0

        for (var i = 0; i < this.currents.length - 1; i++) {
          this.currents[5] += this.currents[i]
        }

        return circuit
      }
    }

    circuit.update()

    return circuit
  }

// Make a function to draw the arrowheads

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

    /*flip() will rotate the arrow by pi and change the value of forward such that forward is 1 when the arrowhead
    is unchanged from its original position and -1 when not*/
    arrowhead.flip = function () {
      if ((arrowhead.rotation - ((Math.PI / 180) * theta)) % (2 * Math.PI) === 0) {
        arrowhead.rotation = (Math.PI / 180) * theta + Math.PI
        arrowhead.forward = -1
      } else {
        arrowhead.rotation = (Math.PI / 180) * theta
        arrowhead.forward = 1
      }
    }

    return arrowhead
  }

  // Make a LARGE function to draw the circuit

  ns.drawCircuit = function (two) {
    /* Make 6 lines for branches. These must insersect at a point*/

    //Top left line
    two.makeLine(two.width / 7, two.height / 7, two.width / 2, two.height / 2)

    //Middle left line
    two.makeLine(two.width / 10, two.height / 2, two.width / 2, two.height / 2)

    //Bottom left line
    two.makeLine(two.width / 7, 6 * two.height / 7, two.width / 2, two.height / 2)

    //Middle right line
    two.makeLine(two.width / 2, two.height / 2, 9 * two.width / 10, two.height / 2)

    //Top right line
    two.makeLine(6 * two.width / 7, two.height / 7, two.width / 2, two.height / 2)

    //Bottom right line
    two.makeLine(6 * two.width / 7, 6 * two.height / 7, two.width / 2, two.height / 2)

    //Length of each of the two lines making up the arrowhead
    var arrowheadLength = 10

    //Width of each of the two lines making up the arrowhead
    var linewidth = 1.5

    //Southeast arrow
    var southeastArrow = ns.makeArrowhead(two, arrowheadLength, two.width / 4, two.height / 4, 180, linewidth)

    //Left east arrow
    var leftEastArrow = ns.makeArrowhead(two, arrowheadLength, two.width / 4, two.height / 2, 135, linewidth)

    //Northeast arrow
    var northeastArrow = ns.makeArrowhead(two, arrowheadLength, two.width / 4, 3 * two.height / 4, 90, linewidth)

    //Southwest arrow
    var southwestArrow = ns.makeArrowhead(two, arrowheadLength, 3 * two.width / 4, two.height / 4, 270, linewidth)

    //Northwest arrow
    var northwestArrow = ns.makeArrowhead(two, arrowheadLength, 3 * two.width / 4, 3 * two.height / 4, 0, linewidth)

    //East arrow right
    var eastArrowRight = ns.makeArrowhead(two, arrowheadLength, 3 * two.width / 4, two.height / 2, 135, linewidth)

    //Make a filled circle to represent the node
    var nodeCircle = two.makeCircle(two.width / 2, two.height / 2, two.width / 100)

    nodeCircle.fill = 'black'

    two.update()

    //Make an array of the arrows to reference the elements below
    var arrows =
    [southeastArrow,
    leftEastArrow,
    northeastArrow,
    northwestArrow,
    southwestArrow,
    eastArrowRight]

    // Setup the input boxes and labels using jQuery

    $(this.canvasContainer).append('<div class="label" id="labelI1">\\(I_1 =\\)' +
      '<input ID="inputI1" type="text" class="inputI" tabindex="1" value="' +
      this.circuit.currents[0] + '"/>' + '<div class="padTopAmp">\\(A\\)</div></div>')

    $(this.canvasContainer).append('<div class="label" id="labelI2">\\(I_2 =\\)' +
      '<input ID="inputI2" type="text" class="inputI" tabindex="2" value="' +
      this.circuit.currents[1] + '"/>' + '<div class="padTopAmp">\\(A\\)</div></div>')

    $(this.canvasContainer).append('<div class="label" id="labelI3">\\(I_3 =\\)' +
        '<input ID="inputI3" type="text" class="inputI" tabindex="3" value="' +
        this.circuit.currents[2] + '"/>' + '<div class="padTopAmp">\\(A\\)</div></div>')

    $(this.canvasContainer).append('<div class="label" id="labelI4">\\(I_4 =\\)' +
          '<input ID="inputI4" type="text" class="inputI" tabindex="4" value="' +
          this.circuit.currents[3] + '"/>' + '<div class="padTopAmp">\\(A\\)</div></div>')

    $(this.canvasContainer).append('<div class="label" id="labelI5">\\(I_5 =\\)' +
            '<input ID="inputI5" type="text" class="inputI" tabindex="5" value="' +
            this.circuit.currents[4] + '"/>' + '<div class="padTopAmp">\\(A\\)</div></div>')

    $(this.canvasContainer).append('<div class="label" id="labelI6">\\(I_6 = ' + this.circuit.currents[5] + 'A\\)</div>')

    // Add CSS for the labels through jQuery

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

    return arrows
  }

  ns.redrawLabels = function (arrows) {
    // Edit MathJax elements directly to update value of I6 without having to re-render mathjax
    if (arrows[5].forward === 1) {
      $('#labelI6 .mjx-mrow > .mjx-mn > .mjx-char').html((1 * this.circuit.currents[5].toPrecision(2)).toString())
    } else {
      $('#labelI6 .mjx-mrow > .mjx-mn > .mjx-char').html(((-1.0) * this.circuit.currents[5].toPrecision(2)).toString())
    }
  }

  ns.runApp = function (canvasContainer) {
    this.canvasContainer = canvasContainer

    // Make a new circuit
    this.circuit = ns.Circuit(4, 5, 6, 5, 4)

    var width1 = 650
    var height1 = 650
    var two = new Two({ type: Two.Types.svg, width: width1, height: height1 }).appendTo(canvasContainer)

    var arrows = ns.drawCircuit(two)

    var self = this

    // Setup event handlers for currents

    $('#inputI1').on('input', function () {
      if (!isNaN(this.value) && this.value !== '') {
        self.circuit.currents[0] = Number(this.value) * arrows[0].forward
        self.circuit.update()
        two.update()
        //Re-write the value of I6 onto the screen
        ns.redrawLabels(arrows)
      }
    })
    $('#inputI2').on('input', function () {
      if (!isNaN(this.value) && this.value !== '') {
        self.circuit.currents[1] = Number(this.value) * arrows[1].forward
        self.circuit.update()
        two.update()
        //Re-write the value of I6 onto the screen
        ns.redrawLabels(arrows)
      }
    })
    $('#inputI3').on('input', function () {
      if (!isNaN(this.value) && this.value !== '') {
        self.circuit.currents[2] = Number(this.value) * arrows[2].forward
        self.circuit.update()
        two.update()
        //Re-write the value of I6 onto the screen
        ns.redrawLabels(arrows)
      }
    })
    $('#inputI4').on('input', function () {
      if (!isNaN(this.value) && this.value !== '') {
        self.circuit.currents[3] = Number(this.value) * arrows[3].forward
        self.circuit.update()
        two.update()
        //Re-write the value of I6 onto the screen
        ns.redrawLabels(arrows)
      }
    })
    $('#inputI5').on('input', function () {
      if (!isNaN(this.value) && this.value !== '') {
        self.circuit.currents[4] = Number(this.value) * arrows[4].forward
        self.circuit.update()
        two.update()
        //Re-write the value of I6 onto the screen
        ns.redrawLabels(arrows)
      }
    })

    // Setup click and hover actions for the arrowheads, ._renderer.elem is the direct two.js arrowhead group

    for (var i = 0; i < arrows.length; i++) {
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
          if (i !== arrows.length - 1) {
            self.circuit.currents[i] = ($('#inputI' + (i + 1)).val()) * arrows[i].forward
            self.circuit.update()
          }
          two.update()
          //Re-write the value of I6 onto the screen
          ns.redrawLabels(arrows)
        })
      })(i)
    }
  }
})(lib)
