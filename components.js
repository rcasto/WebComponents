// Grab the imported document object
var importDoc = document._currentScript.ownerDocument;

// Create a prototype for a new element that extends HTMLElement
var ComponentProto = Object.create(HTMLElement.prototype);

// This callback is invoked synchronously with element instantiation
ComponentProto.createdCallback = function () {
    console.log('Custom Element created!');

    // Grab our template
    var template = importDoc.querySelector('#custom');

    // Setup our Shadow DOM and clone the template
    var root = this.createShadowRoot();
    var clone = document.importNode(template.content, true);

    // Add template content to shadow root
    root.appendChild(clone);

    // Grab component container
    var container = root.querySelector('.container');

    // Add drag event handlers
    container.addEventListener('dragenter', function (dataTransfer) {
        console.log(dataTransfer);
    });
};

// Register our new element
var DragDrop = document.registerElement('test-component', {
    prototype: ComponentProto
});