/**
 * The Sign-In client object.
 * 
 * 
 */

function request(method, url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader("authorization", "Basic ZjQzZDNjYmQtMTIxMS00NjcwLWI5YmQtYWFlNTc1ZmM1MmZiOjY5MzYzNWFiLTIwY2YtNDZiYi1hZTAzLTMzOWQwZGEzYmY0YQ==")
        xhr.setRequestHeader("content-type", "application/json")
        xhr.setRequestHeader("accept", "application/json")
        xhr.onload = resolve;
        xhr.onerror = reject;
        xhr.send();
    });
}

request('GET', 'https://ditory.restlet.net:443/v1/certificates/')
    .then(function (e) {
        localStorage.setItem('certificates', e.target.response);




        console.log(e.target.response);

    }, function (e) {
        console.log(e);
        // handle errors
    });

/*var req = new XMLHttpRequest();
req.open('GET', 'https://ditory.restlet.net:443/v1/certificates/', true);
req.setRequestHeader("authorization","Basic ZjQzZDNjYmQtMTIxMS00NjcwLWI5YmQtYWFlNTc1ZmM1MmZiOjY5MzYzNWFiLTIwY2YtNDZiYi1hZTAzLTMzOWQwZGEzYmY0YQ==")
req.setRequestHeader("content-type","application/json")
req.setRequestHeader("accept","application/json")



console.log("befor on load");
req.onload = function () {
    console.log("on load");
    if (request.status >= 200 && request.status < 400) {
        console.log("success");
    }
    else{
        console.log("error");
    }
        
}

req.send();*/

console.log("after on load");

$("#vid1").click(function () {


    $("#ajaxchange").load("verify.html");




});
$("#ccid1").click(function () {
    auth2 = gapi.auth2.getAuthInstance()
    if (auth2.isSignedIn.get() == false) {
        console.log(" login please ");
        auth2.signIn().then(() => {

            $("#ajaxchange").load("issue.html");

        });

    }
    else {
        $("#ajaxchange").load("issue.html");
    }


});

//vid1

$("#vid1").click(function () {
    $("#ajaxchange").load("verify.html",function() { add(); });
    function add()
    {
        var data = JSON.parse(localStorage.getItem('certificates'));
        data.forEach((cert) => {
        var answer = "Certificate Id: " + cert.cid + "\nTransaction Hash: " + cert.th;
        console.log(answer);
        var certapp = "<div class=\"card\"><div class=\"card-body\">" + answer + "</div></div>"
        $("#issuedcert").append(certapp);        
        console.log(certapp);

    })
    }
    
});


var auth2;

/**
 * Initializes the Sign-In client.
 */

console.log("calling function");
init();
function init() {
    console.log("init function called");
    gapi.load('auth2', function () {
        /**
         * Retrieve the singleton for the GoogleAuth library and set up the
         * client.
         */
        auth2 = gapi.auth2.init({
            client_id: '798086767693-avh53svs75dgsle00jj3bqn5m1cu3nr5.apps.googleusercontent.com',
            hosted_domain: 'karpagamtech.ac.in'
        }).then(() => {

            console.log("remder");
            renderButton();

        }

        )

        // Attach the click handler to the sign-in button
        //  auth2.attachClickHandler('signin-button', {}, onSuccess, onFailure);

    });
}

function renderButton() {
    gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSuccess,
        'onfailure': onFailure
    });
}
/*var initClient = function() {
    console.log("initclient")

    gapi.load('auth2', function(){
        
    });
};*/

/**
 * Handle successful sign-ins.
 */
var onSuccess = function (user) {
    console.log('Signed in as ' + user.getBasicProfile().getName());
};

/**
 * Handle sign-in failures.
 */
var onFailure = function (error) {
    console.log(error);
};

function checklogin() {
    auth2 = gapi.auth2.getAuthInstance()
    if (auth2.isSignedIn.get() == false) {
        console.log(" login please ");
        auth2.signIn();
    }
    console.log(" checklogin ");
    if (auth2) {
        console.log('Refreshing values...');

        //  googleUser = auth2.currentUser.get();
        auth2 = gapi.auth2.getAuthInstance()
        googleUser = auth2.currentUser.get()
        console.log(auth2.isSignedIn.get());
        console.log(googleUser);
    }
}
function newlo() {
    location.reload();
}

function verifycert() {
    var CID = document.getElementById("CertificateID").value;
    var hash = localStorage.getItem('filehash');

    myContract.methods.getCertificate(CID).call({ from: '0x57054C1C6BA9b9cAdCb8AA5D7aB06FDd8EC1A8c1' })
        .then((result) => {
            var text = "";
            if (hash == result.CH)
                text = "original certificate";
            else
                text = "fake certificate"

            $(".modal-body").append(text);
            $('#myModal').modal('show')
            console.log(result);
            console.log("west");
            console.log(result.CH);
        }).catch((err) => {
            console.log(err);
        });

}



function submitcert() {

    function block() {
        var aa = "<div class=\"bar\"></div><div class=\"bar\"></div><div class=\"bar\"></div>";
        $("#progress").append(aa);

        console.log("got");
        var CID = document.getElementById("CertificateID").value;
        var RID = document.getElementById("ReceiverID").value;
        var image = document.getElementById('customFile')



        if (validation()) // Calling validation function
        {
            var address = '0x57054C1C6BA9b9cAdCb8AA5D7aB06FDd8EC1A8c1';
            var hash = localStorage.getItem('filehash');
            console.log(CID + " 8 " + RID + " 8 " + hash);

            //  console.log(myContract);
            // console.log(myContract.methods.getCertificate(1).call());
            // console.log(myContract.methods.createCertificate(CID,RID,address,hash).send({from: '0xE678D0829b5E66104b17fEc8431F214DbB91a4aB'}));

            $("#checking").append("processing! ");



            myContract.methods.createCertificate(CID, RID, address, hash).send({ from: '0x57054C1C6BA9b9cAdCb8AA5D7aB06FDd8EC1A8c1' })
                .on('transactionHash', (hash) => {
                    // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
                    $('#progress').remove();
                    $("#checking").append("final processing! ");
                    $(".modal-body").append(hash);
                    $('#myModal').modal('show')
                });







        }

        alert("finished");
    }

    // init();
    auth2 = window.gapi.auth2.getAuthInstance()
    if (auth2.isSignedIn.get() == false) {
        console.log(" login please ");
        auth2.signIn().then(() => {

            block();

        });;
    }
    else {

        block();


    }
}




function validation() {
    var CID = document.getElementById("CertificateID").value;
    var RID = document.getElementById("ReceiverID").value;
    var image = document.getElementById('customFile').value;
    // var emailReg = /^([w-.]+@([w-]+.)+[w-]{2,4})?$/;

    var data = JSON.parse(localStorage.getItem('certificates'));

    var idcheck = false;

    /*data.forEach((cert) => {
        //  var temp=cert.CID;
        console.log("idcheck");
        if (CID == cert.cid) {
            console.log("already submitted");
            idcheck = true;
        }


    })*/
    console.log(idcheck)
    console.log("idchect after")
    if (idcheck) {
        console.log("idchektrue");
        alert("Certificate ID already exist");
        return false;
    }

    if (CID === '' || RID === '' || image === '') {
        alert("Please fill all fields...!!!!!!");
        return false;
    } else {
        return true;
    }
}

var loadFile = function (event) {

    var image = document.getElementById('certificate');
    // document.getElementById("input")
    //  image.src = URL.createObjectURL(event.target.files[0]);

    var reader = new FileReader();
    reader.addEventListener('load', function () {
        var hash = CryptoJS.SHA256(CryptoJS.enc.Latin1.parse(this.result));
        var SHA256 = hash.toString(CryptoJS.enc.Hex)
        localStorage.setItem('filehash', SHA256);
        var filename = document.getElementById("customFile").value.split('/').pop().split('\\').pop();
        var output = "SHA256 (" + filename + ") = " + SHA256
        console.log(output);
        document.getElementById("md5").innerText = output
    });
    reader.readAsBinaryString(document.getElementById("customFile").files[0]);

};

