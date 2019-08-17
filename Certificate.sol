pragma solidity >=0.4.22 <0.6.0;
contract Cert {
    
   struct Certificate {
        uint no;
        string certificateX;
        bool certadded;
    }
    
    mapping (uint => Certificate) certificates;
    uint[] public certificateAccts;
    
      function setCertificate(uint _no, string memory _certificatehash) public {
       
        Certificate storage  certificate = certificates[_no];
        require(!certificate.certadded);
        certificate.no=_no;
        certificate.certificateX=_certificatehash;
        certificate.certadded=true;
        certificateAccts.push(_no)-1;

    }
    
     function getCertificate(uint _no) view public returns (uint, string memory) {
        return (certificates[_no].no, certificates[_no].certificateX);
    }
}
