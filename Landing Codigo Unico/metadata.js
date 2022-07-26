(function (s, u, r, f, l, y) {
    s[f] = s[f] || {
        init: function () {
            s[f].q = arguments
        }
    };
    l = u.createElement(r);
    y = u.getElementsByTagName(r)[0];
    l.async = 1;
    
    y.parentNode.insertBefore(l, y);
})
(window, document, 'script', 'Surfly');

var metadata = {
    "name": "RoseF",
    "email": "rose@example.com"
};

Surfly.init({
    widget_key: "ccd7108a35034cfa8644ab6371867f35"
}, function (init) {
    if (init.success) {
        Surfly.session().startLeader(null, metadata);
        
    }
});