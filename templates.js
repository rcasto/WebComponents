(function () {
    var template = document.querySelector('#testTemplate');
    var host = document.querySelector('#shadowHost');
    var root = host.createShadowRoot();
    host.appendChild(document.importNode(template.content, true));
    root.appendChild(document.importNode(template.content, true));
}());