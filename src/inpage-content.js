
const url = window.location.href;
// const action = url.split('?')[1].split('=')[1];

const action = parseQuery(url).action;
const btnLink = parseQuery(url).btnlink;

console.log(action);


const loginItem = document.getElementById("fbc-login");
const emailItem = document.getElementById("fbc-email");

function parseQuery(queryString) {
    var query = {};

    var pairs = queryString.split('?')[1].split('&');
    for (var i = 0; i < pairs.length; i++) {
        var splt = pairs[i].split('=');
        query[splt[0]] = splt[1]
    }
    return query;
}


if (action === "login") {
    loginItem.classList.remove("is-hidden");
}

if (action === "email") {
    emailItem.classList.remove("is-hidden");
}

const fbcTitle = document.querySelector(".fbc-title");
fbcTitle.innerHTML = browser.i18n.getMessage("facebookContainer");

const fbcPromptSubtitleLogin = document.querySelector(".fbc-subtitle-login");
fbcPromptSubtitleLogin.innerHTML = browser.i18n.getMessage("inPageUI-tooltip-prompt-p1");

const fbcPromptBodyTextLogin = document.querySelector(".fbc-bodytext-login");
fbcPromptBodyTextLogin.innerHTML = browser.i18n.getMessage("inPageUI-tooltip-prompt-p2");

const fbcPromptSubtitleEmail =  browser.i18n.getMessage("inPageUI-tooltip-email-prompt-p1");
const fbcPromptBodyTextEmail = browser.i18n.getMessage("inPageUI-tooltip-email-prompt-p2");

const fbcPromptAllow = document.querySelector(".fbc-badge-prompt-btn-allow");
const fbcPromptCancel = document.querySelector(".fbc-badge-prompt-btn-cancel");

fbcPromptAllow.innerHTML = browser.i18n.getMessage("btn-allow");
fbcPromptCancel.innerHTML = browser.i18n.getMessage("btn-cancel");


fbcPromptAllow.addEventListener("click", (e) => {

    if (!e.isTrusted) {
    // The click was not user generated so ignore
    e.preventDefault();
    return false;
    } 

    // allowClickSwitch = true;
    browser.runtime.sendMessage({
    message: "add-domain-to-list"
    });

    parent.location.href = btnLink;

});

fbcPromptCancel.addEventListener("click", function() {
    parent.postMessage("closeTheInjectedIframe", "*")
});

