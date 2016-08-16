/* globals Two $ */

var lib = {}

;(function (ns) {
  ns.makeArrowhead = function (two, length, x, y, theta) {
    var horizontalArrowhead = two.makeLine(0, 0, length, 0)

    var verticalArrowhead = two.makeLine(0, 0, 0, length)

    var arrowhead = two.makeGroup(horizontalArrowhead, verticalArrowhead)

    arrowhead.translation.set(x, y)

    arrowhead.rotation = (Math.PI / 180) * theta

    arrowhead.forward = 1

    arrowhead.flip = function () {
      arrowhead.rotation += Math.PI

      arrowhead.forward *= -1
    }

    return arrowhead
  }
  ns.runApp = function (canvasElem) {
    var width1 = 400
    var height1 = 400
    var two = new Two({ type: Two.Types.svg, width: width1, height: height1 }).appendTo(canvasElem)

    /* Make 6 lines for branches. These must insersect at a point*/

    two.makeLine(0, 0, two.width / 2, two.height / 2)

    two.makeLine(0, two.height / 2, two.width / 2, two.height / 2)

    two.makeLine(0, two.height, two.width / 2, two.height / 2)

    two.makeLine(two.width / 2, two.height / 2, two.width, two.height / 2)

    two.makeLine(width1 / 2, 0, two.width / 2, two.height / 2)

    two.makeLine(two.width / 2, two.height, two.width / 2, two.height / 2)

    var arrowheadLength = 10

    // southeast arrow:

    var southeastArrow = ns.makeArrowhead(two, arrowheadLength, two.width / 4, two.height / 4, 180)

    // left east arrow

    var leftEastArrow = ns.makeArrowhead(two, arrowheadLength, two.width / 4, two.height / 2, 135)

    // northeast arrow

    var northeastArrow = ns.makeArrowhead(two, arrowheadLength, two.width / 4, 3 * two.height / 4, 90)

    // south arrow top

    var southArrowTop = ns.makeArrowhead(two, arrowheadLength, two.width / 2, two.height / 4, 225)

    // north arrow bottom

    var northArrowBottom = ns.makeArrowhead(two, arrowheadLength, two.width / 2, 3 * two.height / 4, 45)

    // east arrow right

    var eastArrowRight = ns.makeArrowhead(two, arrowheadLength, 3 * two.width / 4, two.height / 2, 135)

    two.update()

    // hide all arrows pointing away from the node

    var arrows =
    [southeastArrow,
    leftEastArrow,
    northeastArrow,
    northArrowBottom,
    eastArrowRight,
    southArrowTop]

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
          $(this).hide()
          arrows[i].flip()
          $(this).removeClass('arrows > path')
          two.update()
          $(this).show()
        })
      })(i)
    }
  }
})(lib)
