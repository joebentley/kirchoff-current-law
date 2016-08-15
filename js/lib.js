/* globals Two $ */

var lib = {}

;(function (ns) {
  ns.makeArrowhead = function (two, length, x, y, theta) {
    var horizontalArrowhead = two.makeLine(0, 0, length, 0)

    var verticalArrowhead = two.makeLine(0, 0, 0, length)

    var arrowhead = two.makeGroup(horizontalArrowhead, verticalArrowhead)

    arrowhead.translation.set(x, y)

    arrowhead.rotation = (Math.PI / 180) * theta
  }
  ns.runApp = function (canvasElem) {
    var width1 = 400
    var height1 = 400
    var two = new Two({ type: Two.Types.svg, width: width1, height: height1 }).appendTo(canvasElem)

    /* Make 6 lines for branches. These must insersect at a point*/

    var test = two.makeLine(0, 0, two.width / 2, two.height / 2)

    two.makeLine(0, two.height / 2, two.width / 2, two.height / 2)

    two.makeLine(0, two.height, two.width / 2, two.height / 2)

    two.makeLine(two.width / 2, two.height / 2, two.width, two.height / 2)

    two.makeLine(width1 / 2, 0, two.width / 2, two.height / 2)

    two.makeLine(two.width / 2, two.height, two.width / 2, two.height / 2)

    var arrowheadLength = 10

    // northwest arrow:

    ns.makeArrowhead(two, arrowheadLength, two.width / 4, two.height / 4, 0)

    // southeast arrow:

    ns.makeArrowhead(two, arrowheadLength, two.width / 4, two.height / 4, 180)

    // left east arrow

    ns.makeArrowhead(two, arrowheadLength, two.width / 4, two.height / 2, 135)

    // left west arrow

    ns.makeArrowhead(two, arrowheadLength, two.width / 4, two.height / 2, 315)

    // southwest arrow

    ns.makeArrowhead(two, arrowheadLength, two.width / 4, 3 * two.height / 4, 270)

    // northeast arrow

    ns.makeArrowhead(two, arrowheadLength, two.width / 4, 3 * two.height / 4, 90)

    // north arrow top

    ns.makeArrowhead(two, arrowheadLength, two.width / 2, two.height / 4, 45)

    // south arrow top

    ns.makeArrowhead(two, arrowheadLength, two.width / 2, two.height / 4, 225)

    // north arrow bottom

    ns.makeArrowhead(two, arrowheadLength, two.width / 2, 3 * two.height / 4, 45)

    // south arrow bottom

    ns.makeArrowhead(two, arrowheadLength, two.width / 2, 3 * two.height / 4, 225)

    // east arrow right

    ns.makeArrowhead(two, arrowheadLength, 3 * two.width / 4, two.height / 2, 135)

    // west arrow right

    ns.makeArrowhead(two, arrowheadLength, 3 * two.width / 4, two.height / 2, 315)

    two.update()

    $(test._renderer.elem).on('click', function () {

    })

    /* test._renderer.elem.addEventListener('click', function () {
      alert('you clicked javascript')
    })*/
  }
})(lib)
