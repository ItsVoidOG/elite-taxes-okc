/* Elite Taxes OKC - browser-only, PDF 2.0 AES-256 (Revision 6) writer.
 * PRIVATE TEST BUILD. Do not deploy for actual taxpayer records without review.
 * The PDF pages are drawn locally to canvas; image/content streams are encrypted
 * before constructing the downloadable PDF. No plaintext PDF is saved or downloaded.
 * Uses built-in Web Crypto, no CDN, third-party code, or network requests.
 * R6 hash follows ISO 32000-2 algorithm 2.B (as implemented by pypdf AlgV5).
 * Read TEST RESULTS AND SECURITY GAPS.md before publishing.
 */
(function(){
  "use strict";
  const utf8 = new TextEncoder();
  const PDF_W = 612, PDF_H = 792, S = 3; // 216 DPI, lossless rendering
  const X = 44, MAX_W = 524, FOOTER_Y = 743, LIMIT_Y = 728;
  const COLORS = {navy:"#102747",red:"#D83B3F",sky:"#75A9D4",slate:"#61718A",paper:"#F5F8FB",rule:"#D9E1E9"};
  const STATUS = {single:"Single",marriedFilingJointly:"Married filing jointly",marriedFilingSeparately:"Married filing separately",headOfHousehold:"Head of household",qualifyingSurvivingSpouse:"Qualifying surviving spouse"};

  function join(...arrs){
    const length = arrs.reduce((n,a)=>n+a.length,0);
    const out = new Uint8Array(length); let at=0;
    arrs.forEach(a=>{out.set(a,at);at+=a.length;}); return out;
  }
  function bytes(s){return utf8.encode(s);}
  function random(n){const x=new Uint8Array(n);crypto.getRandomValues(x);return x;}
  function hex(arr){return Array.from(arr, x=>x.toString(16).padStart(2,"0")).join("");}
  async function sha(name, data){return new Uint8Array(await crypto.subtle.digest(name,data));}
  // WebCrypto AES-CBC always adds PKCS#7 padding, so remove its final block only
  // where the PDF spec explicitly requires no-padding CBC (R6 hash/UE/OE/Perms).
  async function cbc(key, iv, plaintext, noPadding){
    if(noPadding && plaintext.length%16!==0)throw Error("Invalid unpadded AES input");
    const keyObj=await crypto.subtle.importKey("raw",key,{name:"AES-CBC"},false,["encrypt"]);
    const cipher=new Uint8Array(await crypto.subtle.encrypt({name:"AES-CBC",iv},keyObj,plaintext));
    return noPadding ? cipher.slice(0,plaintext.length) : cipher;
  }
  async function r6hash(pw, salt, userData){
    let key=await sha("SHA-256",join(pw,salt,userData));
    let count=0;
    for(;;){
      count++;
      const base=join(pw,key,userData);
      const repeated=new Uint8Array(base.length*64);
      for(let i=0;i<64;i++)repeated.set(base,i*base.length);
      const cipher=await cbc(key.slice(0,16),key.slice(16,32),repeated,true);
      let sum=0;for(let j=0;j<16;j++)sum+=cipher[j];
      key=await sha(["SHA-256","SHA-384","SHA-512"][sum%3],cipher);
      if(count>=64 && cipher[cipher.length-1]<=count-32)break;
      if(count>300)throw Error("Password hash iteration limit exceeded");
    }
    return key.slice(0,32);
  }
  async function securityDictionary(password){
    // Printable ASCII avoids PDF password normalization discrepancies across readers.
    if(typeof password!=="string" || password.length<16 || password.length>32 || !/^[\x20-\x7E]+$/.test(password)){
      throw Error("Password must use 16 to 32 printable ASCII characters");
    }
    const pw=bytes(password);
    const ownerPw=bytes(hex(random(32)));
    const fileKey=random(32), iv0=new Uint8Array(16), userSalts=random(16), ownerSalts=random(16);
    const U=join(await r6hash(pw,userSalts.slice(0,8),new Uint8Array(0)),userSalts);
    const UE=await cbc(await r6hash(pw,userSalts.slice(8),new Uint8Array(0)),iv0,fileKey,true);
    const O=join(await r6hash(ownerPw,ownerSalts.slice(0,8),U),ownerSalts);
    const OE=await cbc(await r6hash(ownerPw,ownerSalts.slice(8),U),iv0,fileKey,true);
    const perm=join(new Uint8Array([252,255,255,255,255,255,255,255,84,97,100,98]),random(4)); // /P -4, metadata encrypted, 'adb'
    const Perms=await cbc(fileKey,iv0,perm,true); // CBC with zero IV + 1 block == AES-ECB
    const dic=`<< /Filter /Standard /V 5 /R 6 /Length 256 /P -4 /EncryptMetadata true /O <${hex(O)}> /U <${hex(U)}> /OE <${hex(OE)}> /UE <${hex(UE)}> /Perms <${hex(Perms)}> /CF << /StdCF << /AuthEvent /DocOpen /CFM /AESV3 /Length 32 >> >> /StmF /StdCF /StrF /StdCF >>`;
    return {fileKey,dic};
  }
  async function encryptStream(fileKey, plain){
    const iv=random(16);
    return join(iv, await cbc(fileKey,iv,plain,false));
  }
  function safe(v){return v===null||v===undefined||v===""?"Not provided":String(v).replace(/[\u0000-\u001F\u007F]/g," ").slice(0,2000);}
  function hasRTL(v){return /[\u0590-\u08FF\uFB1D-\uFEFC]/.test(v);}

  // Reuse the exact logo artwork already served by the main website.
  // This avoids bundling a large encoded image inside JavaScript.
  const BRAND_LOGO_URI = "../assets/elite-taxes-logo-footer.png";
  function loadBrandLogo(){
    return new Promise((resolve,reject)=>{
      const logo = new Image();
      logo.onload=()=>resolve(logo);
      logo.onerror=()=>reject(Error("Brand artwork unavailable"));
      logo.src=BRAND_LOGO_URI;
    });
  }

  function makePages(data, brandLogo){
    const canvases=[]; let canvas,ctx,y,num=0;
    function setFont(size,weight=400){ctx.font=`${weight} ${size}px Arial, "Noto Sans Arabic", "Noto Naskh Arabic", sans-serif`;}
    function newPage(){
      canvas=document.createElement("canvas");canvas.width=PDF_W*S;canvas.height=PDF_H*S;
      ctx=canvas.getContext("2d",{alpha:false}); if(!ctx)throw Error("Canvas not supported");
      ctx.scale(S,S);ctx.fillStyle="#FFFFFF";ctx.fillRect(0,0,PDF_W,PDF_H);
      num++; canvases.push(canvas);
      ctx.fillStyle=COLORS.navy;ctx.fillRect(0,0,PDF_W,80);
      // Use actual Elite Taxes OKC artwork instead of a typed approximation.
      // Logo is high-resolution and transparent on the navy PDF letterhead.
      // Crop transparent padding from existing 1672x941 source logo (bounds 31,216,1654,854).
      const cropX=31, cropY=216, cropW=1623, cropH=638;
      const logoW=172, logoH=logoW*cropH/cropW;
      ctx.drawImage(brandLogo,cropX,cropY,cropW,cropH,X,(80-logoH)/2,logoW,logoH);
      ctx.direction="ltr";ctx.textAlign="left";ctx.fillStyle="#FFFFFF";setFont(10,700);
      ctx.fillText("CONFIDENTIAL",X+201,36);
      ctx.fillStyle="#B7D5EC";setFont(9,500);
      ctx.fillText("INDIVIDUAL TAX INTAKE",X+201,53);
      ctx.fillStyle=COLORS.red;ctx.fillRect(0,80,PDF_W,3);
      ctx.fillStyle=COLORS.slate;setFont(8,400);
      ctx.fillText("Confidential customer information  •  Handle securely",X,FOOTER_Y);
      ctx.textAlign="right";ctx.fillText(`Page ${num}`,PDF_W-X,FOOTER_Y);ctx.textAlign="left";
      y=100;
    }
    function reserve(height){if(y+height>LIMIT_Y)newPage();}
    function section(name){
      reserve(48); y+=11;
      ctx.fillStyle=COLORS.paper;ctx.fillRect(X,y,MAX_W,25);
      ctx.fillStyle=COLORS.navy;setFont(12,700);ctx.direction="ltr";ctx.textAlign="left";
      ctx.fillText(name,X+10,y+17);
      y+=37;
    }
    function wrap(text,width,size,weight){
      const t=safe(text);setFont(size,weight);
      const parts=t.split(/\s+/);const out=[];let line="";
      for(const word of parts){
        let proposed=line?line+" "+word:word;
        if(ctx.measureText(proposed).width<=width){line=proposed;continue;}
        if(line){out.push(line);line="";}
        if(ctx.measureText(word).width<=width){line=word;continue;}
        let chunk="";
        for(const cp of Array.from(word)){
          if(chunk&&ctx.measureText(chunk+cp).width>width){out.push(chunk);chunk="";}
          chunk+=cp;
        }
        line=chunk;
      }
      if(line)out.push(line);
      return out.length?out:[" "];
    }
    function row(label,value){
      const labels=wrap(label,150,9,700);const vals=wrap(value,342,11,400);
      const h=Math.max(labels.length*13,vals.length*16)+9;
      reserve(h);
      ctx.fillStyle=COLORS.slate;setFont(9,700);ctx.direction="ltr";ctx.textAlign="left";
      labels.forEach((t,i)=>ctx.fillText(t,X,y+11+i*13));
      const rtl=hasRTL(safe(value));ctx.fillStyle=COLORS.navy;setFont(11,400);
      ctx.direction=rtl?"rtl":"ltr";ctx.textAlign=rtl?"right":"left";
      vals.forEach((t,i)=>ctx.fillText(t,rtl?PDF_W-X:X+171,y+12+i*16));
      ctx.direction="ltr";ctx.textAlign="left";
      y+=h;
      ctx.strokeStyle=COLORS.rule;ctx.lineWidth=.5;ctx.beginPath();ctx.moveTo(X,y-2);ctx.lineTo(PDF_W-X,y-2);ctx.stroke();
    }
    newPage();
    section("Tax year and taxpayer");
    row("Tax year",data.taxYear);
    row("First name",data.firstName);row("Middle name",data.middle);row("Last name",data.lastName);
    row("Date of birth",data.dob);row("SSN",data.ssn);row("ITIN",data.itin);row("Email",data.email);
    section("Home address");
    row("Street address",data.address?.street);row("Apartment / unit",data.address?.unit);
    row("City",data.address?.city);row("State",data.address?.state);row("ZIP",data.address?.zip);
    section("Filing status and spouse");
    row("Filing status",STATUS[data.filingStatus]||data.filingStatus);
    if(data.spouse){
      row("Spouse full name",data.spouse.fullName);row("Spouse SSN",data.spouse.ssn);
      row("Spouse date of birth",data.spouse.dob);row("Spouse occupation",data.spouse.occupation);
    }
    section("Dependents");
    const deps=Array.isArray(data.dependents)?data.dependents:[];
    row("Number of dependents",deps.length);
    deps.forEach((d,i)=>{
      section(`Dependent ${i+1}`);
      row("First name",d.firstName);row("Last name",d.lastName);
      row("SSN",d.ssn);row("Date of birth",d.dob);row("Relationship",d.relationship);
    });
    section("Refund / payment information");
    row("Refund method",data.refundPayment?.method==="directDeposit"?"Direct deposit":"Check");
    if(data.refundPayment?.bank){const b=data.refundPayment.bank;
      row("Bank name",b.name);row("Account number",b.accountNumber);
      row("Routing number",b.routingNumber);row("Account type",b.accountType);
    }
    section("Document checklist");
    const docs=Array.isArray(data.documents)?data.documents:[];
    if(!docs.length)row("Selected documents","None selected");
    docs.forEach((d,i)=>row(`Selected ${i+1}`,d));
    reserve(55);y+=12;
    ctx.fillStyle=COLORS.slate;ctx.direction="ltr";ctx.textAlign="left";setFont(9,400);
    for(const l of wrap("Client-provided intake details for review only. Not a tax return or proof of filing.",MAX_W,9,400)){
      ctx.fillText(l,X,y);y+=13;
    }
    return canvases;
  }
  // Canvas JPEG compression makes small tax-form text look fuzzy, particularly
  // under zoom and on printed pages. Preserve every rendered pixel with the
  // standard zlib/FlateDecode filter instead (no lossy intermediate image).
  async function losslessRgbBytes(canvas){
    if(typeof CompressionStream!=="function") throw Error("Lossless PDF encoding unavailable in this browser");
    const context=canvas.getContext("2d",{willReadFrequently:true});
    const rgba=context.getImageData(0,0,canvas.width,canvas.height).data;
    const rgb=new Uint8Array(canvas.width*canvas.height*3);
    for(let i=0,j=0;i<rgba.length;i+=4){
      rgb[j++]=rgba[i];rgb[j++]=rgba[i+1];rgb[j++]=rgba[i+2];
    }
    const compressed=new Blob([rgb]).stream().pipeThrough(new CompressionStream("deflate"));
    return new Uint8Array(await new Response(compressed).arrayBuffer());
  }
  async function pdf(data,password){
    if(!globalThis.isSecureContext || !globalThis.crypto?.subtle || !globalThis.crypto?.getRandomValues){
      throw Error("Secure browser context and Web Crypto required");
    }
    const enc=await securityDictionary(password);
    const brandLogo=await loadBrandLogo();
    const pages=makePages(data,brandLogo);
    if(pages.length>40)throw Error("Too many pages");
    const obj=new Array(4+pages.length*3);
    obj[1]=bytes("<< /Type /Catalog /Pages 2 0 R /Version /2.0 >>");
    const pageNums=pages.map((_,i)=>3+i*3);
    obj[2]=bytes(`<< /Type /Pages /Count ${pages.length} /Kids [${pageNums.map(id=>id+" 0 R").join(" ")}] >>`);
    for(let i=0;i<pages.length;i++){
      const id=pageNums[i],canvas=pages[i];
      const encoded=await losslessRgbBytes(canvas);
      const img=await encryptStream(enc.fileKey,encoded);
      const content=await encryptStream(enc.fileKey,bytes("q 612 0 0 792 0 0 cm /Im0 Do Q\n"));
      obj[id]=bytes(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /XObject << /Im0 ${id+2} 0 R >> >> /Contents ${id+1} 0 R >>`);
      obj[id+1]=join(bytes(`<< /Length ${content.length} >>\nstream\n`),content,bytes("\nendstream"));
      obj[id+2]=join(bytes(`<< /Type /XObject /Subtype /Image /Width ${canvas.width} /Height ${canvas.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /FlateDecode /Length ${img.length} >>\nstream\n`),img,bytes("\nendstream"));
      // Release plaintext rendered page surface as soon as its stream is encrypted.
      canvas.width=0;canvas.height=0;
    }
    const encryptId=3+pages.length*3;
    obj[encryptId]=bytes(enc.dic);
    const chunks=[bytes("%PDF-2.0\n"),new Uint8Array([37,226,227,207,211,10])];
    let total=chunks.reduce((n,b)=>n+b.length,0);
    const offsets=[0];
    for(let id=1;id<=encryptId;id++){
      const out=join(bytes(`${id} 0 obj\n`),obj[id],bytes("\nendobj\n"));
      offsets[id]=total;chunks.push(out);total+=out.length;
    }
    const xref=total;
    let tail=`xref\n0 ${encryptId+1}\n0000000000 65535 f \n`;
    for(let id=1;id<=encryptId;id++)tail+=`${String(offsets[id]).padStart(10,"0")} 00000 n \n`;
    const fileId=hex(random(16));
    tail+=`trailer\n<< /Size ${encryptId+1} /Root 1 0 R /Encrypt ${encryptId} 0 R /ID [<${fileId}> <${fileId}>] >>\nstartxref\n${xref}\n%%EOF\n`;
    chunks.push(bytes(tail));
    return new Blob(chunks,{type:"application/pdf"});
  }
  window.buildEncryptedTaxPdf=pdf;
  window.securePdfEngineReady=()=>Boolean(globalThis.isSecureContext && globalThis.crypto?.subtle && globalThis.crypto?.getRandomValues && typeof CompressionStream==="function");
})();