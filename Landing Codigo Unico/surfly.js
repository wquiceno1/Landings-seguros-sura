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

// The preferred way is to set session options from the Surfly web interface,
// so in most cases you only need to provide a widget key below,
// but you can also override any options here
var settings = {
    widget_key: "ccd7108a35034cfa8644ab6371867f35",
    hide_until_agent_joins: true,
    url: "https://seguros.sura.cl/"
};


var metadata = {
    "name": "RoseF",
    "email": "rose@example.com"
};

// Surfly.init() must be called before any other API call
Surfly.init(settings, function (init) {
    if (init.success && !Surfly.isInsideSession) {
        window.onload = Surfly.session()
            .on("session_created", function (session, event) {
                // display the PIN of the current session
                console.log("Session created: " + session.pin);
                document.querySelector("#session-id").innerText = session.pin;

                // Display the Cancel button
                var cancelButton = document.querySelector("#btn-cancel-session");
                cancelButton.classList.remove("hidden");

                // If the Cancel button is clicked, end the session
                cancelButton.addEventListener("click", function () {
                    session.end();
                });
            })
            .startLeader(null, metadata);
    }
});