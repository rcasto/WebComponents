 var imageTest = /image\/*/;
 var RED = 0.2126;
 var GREEN = 0.7152;
 var BLUE = 0.0722;

// Grab the imported document object
var importDoc = document._currentScript.ownerDocument;

// Create a prototype for a new element that extends HTMLElement
var ComponentProto = Object.create(HTMLElement.prototype);

// This callback is invoked synchronously with element instantiation
ComponentProto.createdCallback = function () {
    console.log('Custom Element created!', this);

    // Grab our template
    var template = importDoc.querySelector('.drag-drop');

    // Setup our Shadow DOM and clone the template
    var root = (this.attachShadow && this.attachShadow({ mode: 'open' })) ||
               (this.createShadowRoot && this.createShadowRoot());
    var clone = document.importNode(template.content, true);

    // Add template content to shadow root
    root.appendChild(clone);

    // Grab component container
    var container = root.querySelector('.container');

    // Grab Drag drop info
    var dragDropInfo = root.querySelector('.dragdrop-info');

    // Grab Canvas element and get context
    var canvas = root.querySelector('canvas');
    var context = canvas.getContext('2d');

    // Get filter button elements
    var grayscale = root.querySelector('.grayscale');

    // Add drag event handlers, must have all three for some reason for it to work
    container.addEventListener('dragenter', function (event) {
        event.preventDefault();
    });
    container.addEventListener('dragover', function (event) {
        event.preventDefault();
    });
    // only looks at the first file dropped, if multiple files were dropped in
    container.addEventListener('drop', function (event) {
        var numItems = event.dataTransfer.items.length;
        if (numItems > 0 &&
            imageTest.test(event.dataTransfer.items[0].type)) {
            event.preventDefault();
            dragDropInfo.hidden = true;

            var file = event.dataTransfer.items[0].getAsFile();
            createImageBitmap(file)
                .then(function (sprite) {
                    context.drawImage(sprite, 0, 0, canvas.width, canvas.height);
                });
        }
    });

    // Attach filter button handlers
    grayscale.addEventListener('click', function () {
        var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        var average, r, g, b;
        for (var i = 0; i < imageData.data.length; i += 4) {
            r = imageData.data[i];
            g = imageData.data[i + 1];
            b = imageData.data[i + 2];
            average = r * RED + g * GREEN + b * BLUE;

            imageData.data[i] = average;
            imageData.data[i + 1] = average;
            imageData.data[i + 2] = average;
        }
        context.putImageData(imageData, 0, 0);
    });
};

// Register our new element
var DragDrop = document.registerElement('test-component', {
    prototype: ComponentProto
});