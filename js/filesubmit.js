
 //$('#progress').attr('disabled', 'disabled');
function newlo(){
    location.reload();
}

function submitcert() {
    var aa="<div class=\"bar\"></div><div class=\"bar\"></div><div class=\"bar\"></div>";
    $("#progress").append(aa);
   
    console.log("got");
    var CID = document.getElementById("CertificateID").value;
    var RID = document.getElementById("ReceiverID").value;
    var image = document.getElementById('customFile')
    if (validation()) // Calling validation function
    {
        var address='0xE678D0829b5E66104b17fEc8431F214DbB91a4aB';
        var hash=localStorage.getItem('filehash');
        console.log(CID +" 8 "+RID+" 8 "+hash);
 
      //  console.log(myContract);
       // console.log(myContract.methods.getCertificate(1).call());
       // console.log(myContract.methods.createCertificate(CID,RID,address,hash).send({from: '0xE678D0829b5E66104b17fEc8431F214DbB91a4aB'}));
       
        $( "#checking" ).append( "processing! " );
        
     

        myContract.methods.createCertificate(CID,RID,address,hash).send({from: '0xE678D0829b5E66104b17fEc8431F214DbB91a4aB'})
        .on('transactionHash', (hash) => {
         // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
         $('#progress').remove();
         $( "#checking" ).append( "final processing! " );
         $( ".modal-body" ).append(hash);
         $('#myModal').modal('show')
     });
     
     
      
      
    
  
      
    }

    alert("finished");
}




function validation() {
    var CID = document.getElementById("CertificateID").value;
    var RID = document.getElementById("ReceiverID").value;
    var image = document.getElementById('customFile').value;
   // var emailReg = /^([w-.]+@([w-]+.)+[w-]{2,4})?$/;
    if (CID === '' || RID === '' ||image==='') {
        alert("Please fill all fields...!!!!!!");
        return false;
    }  else {
        return true;
    }
}

var loadFile = function (event) {
    
    var image = document.getElementById('certificate');
    // document.getElementById("input")
  //  image.src = URL.createObjectURL(event.target.files[0]);

    var reader = new FileReader();
    reader.addEventListener('load',function () {
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