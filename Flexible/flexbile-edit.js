(function flexible (window, document) {
    var docEl = document.documentElement
    var dpr = window.devicePixelRatio || 1

    // adjust body font size = 16px
    function setBodyFontSize () {
        if (document.body) {
            document.body.style.fontSize = (16 * dpr) + 'px'
        }
        else {
            document.addEventListener('DOMContentLoaded', setBodyFontSize)
        }
    }
    setBodyFontSize();

    // set 1rem = 10px
    function setRemUnit () {
        var width = docEl.clientWidth;
        if (width > 375) { //最大宽度为iPhone8 375pt 750px
            width = 375;
        }
        var rem = width / 37.5
        docEl.style.fontSize = rem + 'px'
    }

    setRemUnit()

    // reset rem unit on page resize
    window.addEventListener('resize', setRemUnit)
    window.addEventListener('pageshow', function (e) {
        if (e.persisted) {
            setRemUnit()
        }
    })

    // detect 0.5px supports
    if (dpr >= 2) {
        var fakeBody = document.createElement('body')
        var testElement = document.createElement('div')
        testElement.style.border = '.5px solid transparent'
        fakeBody.appendChild(testElement)
        docEl.appendChild(fakeBody)
        if (testElement.offsetHeight === 1) {
            docEl.classList.add('hairlines')
        }
        docEl.removeChild(fakeBody)
    }
}(window, document))