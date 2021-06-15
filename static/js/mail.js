
function copyToClipboard() {
  var TempText = document.createElement("input");
  TempText.value = "HeribertoGM1999@outlook.com";
  document.body.appendChild(TempText);
  TempText.select();
  
  document.execCommand("copy");
  document.body.removeChild(TempText);
  
  alert("Mail copied to clipboard");
}

function appearMail() {
  var mailTag = document.getElementById("mail");
  mailTag.innerHTML = "HeribertoGM1999\n@outlook.com"
}

function disappearMail() {
  var mailTag = document.getElementById("mail");
  mailTag.innerHTML = "Mail"
}