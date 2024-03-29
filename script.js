function loadiFrame(url) {
    //let x = document.createElement("IFRAME");
    let x = document.getElementById('originalFrame');
    x.setAttribute("src", url);
    x.setAttribute("style", "position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:99;");
    //document.body.appendChild(x);
}

function sendMessage() {
    /**
     * Use data object and postMessage to URL provided (postMessage to child frame)
     * @param {Object} data - data to be sent to url provided of child frame
     * @returns - no return
     */

    console.log('inside sendMessage in script - loaded originalFrame');
    var originalPageUrl = document.getElementById('originalFrame').contentWindow.location.href || "";
    console.log('sendMessage in script - originalPageUrl: ' + originalPageUrl);
    var receiverElem = document.getElementById('receiver').contentWindow;
    receiverElem.postMessage({actionType: 'ameliaConversationAttributes', actionData: {test: 'testing some stuff'}}, "https://amh.demo.amelia.com/Amelia/ui/amh/chat");
}

async function grabData() {
    await fetch("properties.json")
        .then(response => {
            return response.json()
        })
        .then(data => {
            data.innerText = JSON.stringify(data, null, 2);
            let jsonData = JSON.parse(data.innerText);
            let ameliaUrl = jsonData.ameliaUrl
            let clientUrl = jsonData.clientUrl
            let link = document.getElementById('receiver')
            link.src = ameliaUrl
            let clientLink = document.getElementById('originalFrame')
            clientLink.src = clientUrl
        })
}
