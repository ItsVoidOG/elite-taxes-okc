
// Local PDF export only. No network submissions or backend endpoints exist.

var STATES = "AL AK AZ AR CA CO CT DE DC FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY".split(" ");
var REL = ["Child","Stepchild","Foster child","Grandchild","Sibling","Parent","Other relative","Other"];
var $ = function(id){return document.getElementById(id)};
var depCount = 0;
const MAX_DEPENDENTS = 12; // Protect mobile devices from unbounded memory use.
var tr = function(message){return window.eliteIntakeTranslate ? window.eliteIntakeTranslate(message) : message;};
function dateIsPastOrToday(value){
  if(!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year,month,day] = value.split("-").map(Number);
  const d = new Date(year, month-1, day);
  const now = new Date();
  const today = [now.getFullYear(), String(now.getMonth()+1).padStart(2,"0"), String(now.getDate()).padStart(2,"0")].join("-");
  return d.getFullYear()===year && d.getMonth()+1===month && d.getDate()===day && value<=today;
}


var currentTaxYear = new Date().getFullYear();
$("taxYear").innerHTML = [currentTaxYear, currentTaxYear - 1, currentTaxYear - 2, currentTaxYear - 3].map(function(y){return '<option value="'+y+'">'+y+'</option>';}).join("");
$("taxYear").value = String(currentTaxYear - 1);
$("state").innerHTML = STATES.map(function(s){return '<option'+(s==="OK"?' selected':'')+'>'+s+'</option>'}).join("");
$("documentsButton").addEventListener("click", function(){ $("documentsDialog").showModal(); });
$("closeDocuments").addEventListener("click", function(){ $("documentsDialog").close(); });

function fmtSSN(v){
  var d = v.replace(/\D/g,"").slice(0,9);
  if(d.length>5) return d.slice(0,3)+"-"+d.slice(3,5)+"-"+d.slice(5);
  if(d.length>3) return d.slice(0,3)+"-"+d.slice(3);
  return d;
}
function validSSN(v){
  var d = v.replace(/\D/g,"");
  return d.length===9 && !/^(000|666|9)/.test(d) && d.slice(3,5)!=="00" && d.slice(5)!=="0000";
}
function validITIN(v){
  var d = v.replace(/\D/g,"");
  var middle = Number(d.slice(3,5));
  return d.length===9 && d.charAt(0)==="9" && ((middle>=50 && middle<=65) || (middle>=70 && middle<=88) || (middle>=90 && middle<=92) || (middle>=94 && middle<=99));
}
function setErr(input, errEl, msg){
  errEl.textContent = msg ? tr(msg) : "";
  input.setAttribute("aria-invalid", msg ? "true" : "false");
  return !msg;
}
function bindSSN(input){
  input.addEventListener("input", function(){ input.value = fmtSSN(input.value); });
}
bindSSN($("ssn"));
bindSSN($("spouseSsn"));
function updateFilingStatus(){
  var status = document.querySelector('input[name="filingStatus"]:checked');
  var married = status && (status.value === "marriedFilingJointly" || status.value === "marriedFilingSeparately");
  $("spouseSection").classList.toggle("hidden", !married);
  $("spouseName").required = !!married;
  $("spouseSsn").required = !!married;
  $("spouseDob").required = !!married;
  $("spouseOccupation").required = !!married;
  if(!married){
    $("spouseName").value = "";
    $("spouseSsn").value = "";
    $("spouseDob").value = "";
    $("spouseOccupation").value = "";
    setErr($("spouseName"), $("spouseName-err"), "");
    setErr($("spouseSsn"), $("spouseSsn-err"), "");
  }
  setErr($("filingStatuses").querySelector('input[name="filingStatus"]'), $("filingStatus-err"), "");
}
document.querySelectorAll('input[name="filingStatus"]').forEach(function(input){
  input.addEventListener("change", function(){
    if(this.checked){
      // Radio buttons already enforce a single filing status.
    }
    updateFilingStatus();
  });
});
function updatePaymentMethod(){
  var method = document.querySelector('input[name="refundMethod"]:checked');
  var directDeposit = method && method.value === "directDeposit";
  $("bankSection").classList.toggle("hidden", !directDeposit);
  ["bankName", "accountNumber", "routingNumber"].forEach(function(id){
    $(id).required = !!directDeposit;
    if(!directDeposit){
      $(id).value = "";
      setErr($(id), $(id + "-err"), "");
    }
  });
  document.querySelectorAll('input[name="accountType"]').forEach(function(input){
    input.required = !!directDeposit;
    if(!directDeposit) input.checked = false;
  });
  setErr($("refundMethods").querySelector('input[name="refundMethod"]'), $("refundMethod-err"), "");
  if(!directDeposit) setErr($("accountTypes").querySelector('input[name="accountType"]'), $("accountType-err"), "");
}
document.querySelectorAll('input[name="refundMethod"]').forEach(function(input){
  input.addEventListener("change", function(){
    updatePaymentMethod();
  });
});
document.querySelectorAll('input[name="accountType"]').forEach(function(input){
  input.addEventListener("change", function(){
    if(this.checked){
      // Radio buttons already enforce a single account type.
    }
    setErr($("accountTypes").querySelector('input[name="accountType"]'), $("accountType-err"), "");
  });
});
function bindVisibility(inputId, toggleId){
  $(toggleId).addEventListener("click", function(){
    var show = $(inputId).type === "password";
    $(inputId).type = show ? "text" : "password";
    this.textContent = tr(show ? "Hide" : "Show");
    this.setAttribute("aria-pressed", show);
  });
}
bindVisibility("ssn", "ssnToggle");

document.querySelectorAll('input[name="hasDeps"]').forEach(function(r){
  r.addEventListener("change", function(){
    var yes = document.querySelector('input[name="hasDeps"]:checked').value === "yes";
    $("depSection").classList.toggle("hidden", !yes);
    if(yes && depCount===0) addDep();
    if(!yes){ $("deps").innerHTML = ""; renumber(); }
  });
});

function addDep(){
  if ($("deps").children.length >= MAX_DEPENDENTS) {
    const warning = tr("This form supports up to 12 dependents. Please contact Elite Taxes if you need to list more.");
    $("dependentLimitMessage").textContent = warning;
    return;
  }
  $("dependentLimitMessage").textContent = "";
  var id = ++depCount + "_" + Date.now();
  var div = document.createElement("div");
  div.className = "dep";
  div.innerHTML =
    '<div class="dep-head"><strong class="dep-title"></strong><button type="button" class="btn danger small rm">Remove</button></div>'+
    '<div class="grid">'+
    '<div class="c3"><label>First name</label><input data-f="first" maxlength="100" required autocomplete="off"><p class="err"></p></div>'+
    '<div class="c3"><label>Last name</label><input data-f="last" maxlength="100" required autocomplete="off"><p class="err"></p></div>'+
    '<div class="c3"><label>Social Security number</label><input data-f="ssn" type="password" inputmode="numeric" maxlength="11" placeholder="000-00-0000" autocomplete="off"><p class="err"></p></div>'+
    '<div class="c3"><label>Date of birth</label><input data-f="dob" type="date" required autocomplete="off"><p class="err"></p></div>'+
    '<div class="c6"><label>Relationship to you</label><select data-f="rel">'+REL.map(function(r){return '<option value="'+r+'">'+tr(r)+'</option>'}).join("")+'</select></div>'+
    '</div>';
  // Bind unique label/field/error associations for keyboard and screen-reader access.
  div.querySelectorAll('[data-f]').forEach(function(el){
    const field = el.getAttribute('data-f');
    const label = el.parentElement.querySelector('label');
    const err = el.parentElement.querySelector('.err');
    el.id = 'dependent-' + id + '-' + field;
    if(label) label.htmlFor = el.id;
    if(err){err.id = el.id + '-err';el.setAttribute('aria-describedby',err.id);}
  });
  bindSSN(div.querySelector('[data-f="ssn"]'));
  div.querySelector(".rm").addEventListener("click", function(){
    div.remove(); renumber();
    if(!$("deps").children.length){
      document.querySelector('input[name="hasDeps"][value="no"]').checked = true;
      $("depSection").classList.add("hidden");
    }
  });
  $("deps").appendChild(div);
  renumber();
  div.querySelector('[data-f="first"]').focus();
}
function renumber(){
  var items = $("deps").children;
  $("count").textContent = items.length;
  $("addDep").disabled = items.length >= MAX_DEPENDENTS;
  if (items.length < MAX_DEPENDENTS) $("dependentLimitMessage").textContent = "";
  Array.prototype.forEach.call(items, function(d,i){ d.querySelector(".dep-title").textContent = "Dependent " + (i+1); });
}
$("addDep").addEventListener("click", addDep);

function req(input){
  var err = input.parentNode.querySelector(".err") || input.parentNode.parentNode.querySelector(".err");
  var valid = input.type === "date" ? dateIsPastOrToday(input.value) : !!input.value.trim();
  return setErr(input, err, valid ? "" : (input.type === "date" && input.value ? "Enter a valid date of birth that is not in the future." : "This field is required."));
}

$("intake").addEventListener("submit", function(e){
  e.preventDefault();
  var ok = true;
  ["firstName","lastName","dob","street","city"].forEach(function(id){ if(!req($(id))) ok = false; });
  var email = $("email");
  if(!setErr(email, $("email-err"), !email.value.trim() ? "Enter your email address." : (email.checkValidity() ? "" : "Enter a valid email address."))) ok = false;
  if(!setErr($("zip"), $("zip-err"), /^\d{5}(-\d{4})?$/.test($("zip").value.trim()) ? "" : "Enter a 5-digit ZIP code.")) ok = false;
  var identifierValue = $("ssn").value;
  var isSSN = validSSN(identifierValue);
  var isITIN = validITIN(identifierValue);
  if(!setErr($("ssn"), $("ssn-err"), !identifierValue ? "Enter an SSN or ITIN." : (isSSN || isITIN ? "" : "Enter a valid 9-digit SSN or ITIN."))) ok = false;
  var filingStatus = document.querySelector('input[name="filingStatus"]:checked');
  if(!setErr($("filingStatuses").querySelector('input[name="filingStatus"]'), $("filingStatus-err"), filingStatus ? "" : "Choose a filing status.")) ok = false;
  var refundMethod = document.querySelector('input[name="refundMethod"]:checked');
  var directDeposit = refundMethod && refundMethod.value === "directDeposit";
  if(!setErr($("refundMethods").querySelector('input[name="refundMethod"]'), $("refundMethod-err"), refundMethod ? "" : "Choose direct deposit or check.")) ok = false;
  var accountType = document.querySelector('input[name="accountType"]:checked');
  if(directDeposit){
    if(!setErr($("bankName"), $("bankName-err"), $("bankName").value.trim() ? "" : "Enter the bank name.")) ok = false;
    if(!setErr($("accountNumber"), $("accountNumber-err"), $("accountNumber").value.trim() ? "" : "Enter the account number.")) ok = false;
    if(!setErr($("routingNumber"), $("routingNumber-err"), /^\d{9}$/.test($("routingNumber").value.trim()) ? "" : "Enter a 9-digit routing number.")) ok = false;
    if(!setErr($("accountTypes").querySelector('input[name="accountType"]'), $("accountType-err"), accountType ? "" : "Choose checking or savings.")) ok = false;
  }
  var spouseName = $("spouseName").value.trim();
  var spouseSsn = $("spouseSsn").value;
  var spouseRequired = filingStatus && (filingStatus.value === "marriedFilingJointly" || filingStatus.value === "marriedFilingSeparately");
  if(spouseRequired){
    if(!setErr($("spouseName"), $("spouseName-err"), spouseName ? "" : "Enter your spouse's full name.")) ok = false;
    if(!setErr($("spouseSsn"), $("spouseSsn-err"), validSSN(spouseSsn) ? "" : "Enter a valid 9-digit Social Security number.")) ok = false;
    if(!setErr($("spouseDob"), $("spouseDob-err"), dateIsPastOrToday($("spouseDob").value) ? "" : "Enter a valid date of birth that is not in the future.")) ok = false;
    if(!setErr($("spouseOccupation"), $("spouseOccupation-err"), $("spouseOccupation").value.trim() ? "" : "Enter your spouse's occupation.")) ok = false;
  }

  var deps = [];
  if ($("deps").children.length > MAX_DEPENDENTS) {
    $("dependentLimitMessage").textContent = tr("This form supports up to 12 dependents. Please contact Elite Taxes if you need to list more.");
    ok = false;
  }
  Array.prototype.forEach.call($("deps").children, function(d){
    var g = function(f){return d.querySelector('[data-f="'+f+'"]')};
    var e1 = g("first"), e2 = g("last"), e3 = g("ssn"), e4 = g("dob");
    var errs = d.querySelectorAll(".err");
    if(!setErr(e1, errs[0], e1.value.trim() ? "" : "Enter a first name.")) ok = false;
    if(!setErr(e2, errs[1], e2.value.trim() ? "" : "Enter a last name.")) ok = false;
    if(!setErr(e3, errs[2], validSSN(e3.value) ? "" : "Enter a valid 9-digit number.")) ok = false;
    if(!setErr(e4, errs[3], dateIsPastOrToday(e4.value) ? "" : "Enter a valid date of birth that is not in the future.")) ok = false;
    deps.push({firstName:e1.value.trim(), lastName:e2.value.trim(), ssn:e3.value, dob:e4.value, relationship:g("rel").value});
  });

  var st = $("status");
  if(!ok){
    st.className = "bad"; st.textContent = tr("Please fix the highlighted fields.");
    var bad = document.querySelector('[aria-invalid="true"]'); if(bad) bad.focus();
    return;
  }

  var data = {
    taxYear:$("taxYear").value, firstName:$("firstName").value.trim(), middle:$("middle").value.trim(), lastName:$("lastName").value.trim(), dob:$("dob").value,
    ssn:isSSN ? identifierValue : "", itin:isITIN ? identifierValue : "", email:email.value.trim(), filingStatus:filingStatus.value,
    spouse:spouseRequired ? {fullName:spouseName, ssn:spouseSsn, dob:$("spouseDob").value, occupation:$("spouseOccupation").value.trim()} : null,
    refundPayment:{method:refundMethod.value, bank:directDeposit ? {name:$("bankName").value.trim(), accountNumber:$("accountNumber").value.trim(), routingNumber:$("routingNumber").value.trim(), accountType:accountType.value} : null},
    address:{street:$("street").value.trim(), unit:$("unit").value.trim(), city:$("city").value.trim(), state:$("state").value, zip:$("zip").value.trim()},
    dependentCount:deps.length, dependents:deps, documents:Array.from(document.querySelectorAll('input[name="documents"]:checked')).map(function(el){return el.closest("label").textContent.trim();})
  };

  if(typeof window.buildEncryptedTaxPdf !== "function" || !window.securePdfEngineReady?.()){
    st.className = "bad";
    st.textContent = tr("PDF encryption is unavailable in this browser. Please use an updated version of Chrome or Edge.");
    return;
  }
  pendingIntakeData = data;
  $("passwordError").textContent = "";
  $("downloadStep").hidden = false;
  $("shareStep").hidden = true;
  $("copyStatus").textContent = "";
  $("pdfPasswordDialog").showModal();
});

let pendingIntakeData = null;
let generatedPdfPassword = "";
let encryptedPdfBlob = null;
let isExporting = false;
function randomPdfPassword(){
  if(!window.crypto || !crypto.getRandomValues) throw new Error("Secure randomness unavailable; use HTTPS.");
  // Sixteen unambiguous capital letters: no digits or O/I/L/B/S/Z/G.
  // 25 independent characters × 4 bits = 100 bits of entropy. Group for reading.
  const letters = "ACDFHJKMNPQRTVWY";
  const bytes = crypto.getRandomValues(new Uint8Array(25));
  const parts = [];
  for(let i=0;i<25;i+=5){
    parts.push(Array.from(bytes.slice(i,i+5), n => letters[n & 15]).join(""));
  }
  return parts.join("-"); // 29 chars total incl. hyphens; keep hyphens when copying
}
function forgetGeneratedPassword(){
  generatedPdfPassword = "";
  encryptedPdfBlob = null;
  $("generatedPdfPassword").textContent = "";
  $("copyStatus").textContent = "";
  $("officeCopyStatus").textContent = "";
  $("emailCopyStatus").textContent = "";
}
function closeExportDialog(){
  if(isExporting) return;
  $("pdfPasswordDialog").close();
  forgetGeneratedPassword();
  pendingIntakeData = null;
  $("passwordError").textContent = "";
}
$("cancelExport").addEventListener("click", closeExportDialog);
$("finishShare").addEventListener("click", function(){
  closeExportDialog();
  clearSensitiveForm();
});
$("pdfPasswordDialog").addEventListener("cancel", function(e){
  // Do not accidentally discard the only copy of a newly generated password.
  // The customer must explicitly use Done to clear this screen.
  if(isExporting || !!generatedPdfPassword) e.preventDefault();
});
$("pdfPasswordDialog").addEventListener("close", function(){
  if (!generatedPdfPassword) pendingIntakeData = null;
});
function downloadEncryptedPdf(blob){
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Elite-Taxes-Intake-Encrypted.pdf"; // never place a name or taxpayer identifier in the filename
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(function(){ URL.revokeObjectURL(url); }, 60000);
}
$("downloadAgain").addEventListener("click", function(){
  if(encryptedPdfBlob) downloadEncryptedPdf(encryptedPdfBlob);
});
$("confirmExport").addEventListener("click", async function(){
  if(isExporting || !pendingIntakeData) return;
  isExporting = true;
  $("confirmExport").disabled = true;
  $("cancelExport").disabled = true;
  $("passwordError").textContent = tr("Encrypting your PDF on this device…");
  const st = $("status");
  let pw = "";
  try{
    pw = randomPdfPassword();
    const blob = await window.buildEncryptedTaxPdf(pendingIntakeData, pw);
    encryptedPdfBlob = blob; // retain only the encrypted file for a retry while the dialog is open
    downloadEncryptedPdf(blob);
    generatedPdfPassword = pw;
    $("generatedPdfPassword").textContent = pw;
    pendingIntakeData = null;
    clearSensitiveForm(true); // discard unencrypted form inputs after the encrypted download begins
    $("downloadStep").hidden = true;
    $("shareStep").hidden = false;
    $("shareTitle").focus?.();
    $("passwordError").textContent = "";
    st.className = "ok";
    st.textContent = tr("Encrypted PDF created. Email the file and send its password separately. Keep the sharing window open until you finish.");
  }catch(err){
    $("passwordError").textContent = tr("We couldn't create your encrypted PDF. Nothing was sent. Please try again in an updated browser.");
    forgetGeneratedPassword();
  }finally{
    pw = "";
    isExporting = false;
    $("confirmExport").disabled = false;
    $("cancelExport").disabled = false;
  }
});
$("copyPdfPassword").addEventListener("click", async function(){
  if(!generatedPdfPassword) return;
  try{
    await navigator.clipboard.writeText(generatedPdfPassword);
    $("copyStatus").textContent = tr("Password copied. Paste it into a verified Signal chat or a separate text message—not the PDF email.");
  }catch(err){
    $("copyStatus").textContent = tr("Copying isn't available here. Select the password above to copy it manually.");
  }
});
$("copyOfficeNumber").addEventListener("click", async function(){
  try{
    await navigator.clipboard.writeText("405-778-5388");
    $("officeCopyStatus").textContent = tr("Phone number copied.");
  }catch(err){
    $("officeCopyStatus").textContent = tr("Copy unavailable. Dial 405-778-5388 manually.");
  }
});

$("copyOfficeEmail").addEventListener("click", async function(){
  try{
    await navigator.clipboard.writeText("elitetaxesllcokc@gmail.com");
    $("emailCopyStatus").textContent = tr("Office email copied. Attach only the encrypted PDF—never the password.");
  }catch(err){
    $("emailCopyStatus").textContent = tr("Copy unavailable. Enter the email address above manually.");
  }
});
function clearSensitiveForm(preserveGeneratedPassword = false){
  $("intake").reset();
  $("taxYear").value = String(new Date().getFullYear() - 1);
  $("ssn").type = "password";
  $("ssnToggle").textContent = tr("Show");
  $("ssnToggle").setAttribute("aria-pressed", "false");
  document.querySelectorAll('input[name="documents"]').forEach(el=>{el.checked=false;});
  $("deps").innerHTML = "";
  depCount = 0;
  renumber();
  $("dependentLimitMessage").textContent = "";
  $("depSection").classList.add("hidden");
  document.querySelector('input[name="hasDeps"][value="no"]').checked = true;
  updateFilingStatus();
  updatePaymentMethod();
  document.querySelectorAll('[aria-invalid="true"]').forEach(el=>el.removeAttribute("aria-invalid"));
  document.querySelectorAll(".err").forEach(el=>el.textContent="");
  pendingIntakeData=null;
  if (!preserveGeneratedPassword) forgetGeneratedPassword();
  $("status").textContent = "";
}
$("clearForm").addEventListener("click",function(){
  if(isExporting) return;
  if(confirm(tr("Clear all information entered on this device?"))) clearSensitiveForm();
});
window.addEventListener("pagehide", function(){
  // Never persist taxpayer answers or the password across a page navigation.
  // Switching apps without leaving the page does not fire pagehide.
  clearSensitiveForm();
  if($("pdfPasswordDialog").open) $("pdfPasswordDialog").close();
});
window.addEventListener("pageshow", function(e){
  if(e.persisted) clearSensitiveForm(!!generatedPdfPassword && !$("shareStep").hidden);
});

// Fail closed if the browser lacks a secure context or native Web Crypto.
// Technical tests are not a substitute for a security and business-workflow review.
(function(){
  const ready = typeof window.buildEncryptedTaxPdf === 'function' && window.securePdfEngineReady?.();
  const submit = document.getElementById('submitBtn');
  const notice = document.getElementById('encryption-readiness');
  if (!ready) {
    submit.disabled = true;
    submit.title = tr('Encrypted PDF download is unavailable in this browser.');
    if(notice) notice.textContent = tr('PRIVATE TEST ONLY — Encrypted PDF download is unavailable in this browser.');
  } else if (notice) {
    notice.textContent = tr('PRIVATE TEST ONLY — This form has not been security-approved for real taxpayer information.');
  }
})();