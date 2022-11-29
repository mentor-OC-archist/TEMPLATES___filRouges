export default class Tools {
    // Public field declarations
    // publicField = 0;
    // Private field declarations
    // #privateField = 0;
    constructor(props) {
        Object.assign(this,props)
    }

    showSourceOnIframeLoad(src_iframe = "iframe_"){

        const iframe_ = document.getElementById(src_iframe);

        iframe_.addEventListener('load', function() {

            const documentElement = this.contentWindow.document.documentElement
            // .querySeletor('head>script');
            
            const html = documentElement.outerHTML;

            documentElement.innerHTML = '';
            documentElement.appendChild(document.createTextNode(html));
        });
    }
/*
    // Setter
    set _props(props) {
        this.props = props;
    }
    // Getter
    get area() {
        return this.calcArea();
    }
    // Method
    calcArea() {
        return this.props;
    }
    // Generator *Method
    *getSides() {
            for (const side of this.sides) {
            yield side;
        }
    }
    // Static Properties
    static displayName = "VALUE";
    // Static Methods
    static distance(a) {
        
    }
*/
}
// const square = new Tools()
