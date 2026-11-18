/* Local, preview-only intake UI localization. Tax/legal text requires professional review before publication.
   Runs before existing site script to retain original English text nodes; site-wide translator is unchanged. */
(() => {
'use strict';
const original = new WeakMap();
const translations = {
"This form supports up to 12 dependents. Please contact Elite Taxes if you need to list more.":["Este formulario admite hasta 12 dependientes. Comuníquese con Elite Taxes si necesita incluir más.","يدعم هذا النموذج حتى 12 مُعالًا. يُرجى الاتصال بمكتب Elite Taxes إذا كنت بحاجة إلى إدراج المزيد."],
"Keep this window open until you've shared the password. Once closed, the password can't be recovered from this website. This website does not send emails, texts, or Signal messages for you.":["Mantenga esta ventana abierta hasta compartir la contraseña. Una vez cerrada, no podrá recuperarla desde este sitio. Este sitio no envía correos, SMS ni mensajes de Signal por usted.","أبقِ هذه النافذة مفتوحة حتى مشاركة كلمة المرور. بعد إغلاقها لا يمكن استعادتها من الموقع. لا يرسل الموقع رسائل بريد إلكتروني أو نصية أو رسائل سيغنال نيابة عنك."],
"If you copy your password, it may remain in your device's clipboard or clipboard history after you select Done. For extra privacy, replace it with other text after sharing. The downloaded encrypted PDF also remains in your Downloads folder until you delete it.":["Si copia la contraseña, podría permanecer en el portapapeles o en su historial incluso después de pulsar Listo. Para mayor privacidad, copie otro texto después de compartirla. El PDF cifrado descargado permanece en Descargas hasta que usted lo elimine.","إذا نسخت كلمة المرور، فقد تبقى في الحافظة أو سجل الحافظة بعد الضغط على تم. لمزيد من الخصوصية، انسخ نصًا آخر بعد مشاركتها. وسيظل ملف PDF المشفر في مجلد التنزيلات حتى تحذفه."],
'TEST PREVIEW — Fictional information only. Do not deploy or use with real taxpayer data.':['VISTA DE PRUEBA — Use solo datos ficticios. No publique ni use este formulario con datos reales.','نسخة تجريبية — استخدم بيانات وهمية فقط. لا تنشر هذه الصفحة أو تستخدم معلومات حقيقية.'],
'ELITE TAXES OKC / NEW CLIENTS':['ELITE TAXES OKC / CLIENTES NUEVOS','إيليت تاكسز / العملاء الجدد'],
'Tax preparation,':['Preparación de impuestos,','إعداد الضرائب،'],
'made simpler.':['sin complicaciones.','بكل بساطة.'],
'Review the document checklist, enter fictional tax details, and test downloading a password-protected PDF on your device.':['Revise la lista de documentos, introduzca datos fiscales ficticios y pruebe a descargar un PDF protegido con contraseña en su dispositivo.','راجع قائمة المستندات، وأدخل بيانات ضريبية وهمية، وجرّب تنزيل ملف PDF محمي بكلمة مرور على جهازك.'],
'01 / INTAKE':['01 / DATOS INICIALES','01 / جمع المعلومات'],
'Review.':['Revisar.','مراجعة.'], 'Protect.':['Proteger.','حماية.'], 'Share by phone.':['Comunicar por teléfono.','مشاركة كلمة المرور هاتفيًا.'],
'HOW IT WORKS':['CÓMO FUNCIONA','كيف تعمل العملية'],
'Simple steps.':['Pasos sencillos.','خطوات بسيطة.'], 'Careful handling.':['Protección cuidadosa.','تعامل بحذر.'],
'The goal is a secure, self-contained PDF—not an online submission.':['El objetivo es crear un PDF protegido en su dispositivo, no enviar datos por Internet.','الهدف إنشاء ملف PDF محمي على جهازك، وليس إرسال البيانات عبر الإنترنت.'],
'Complete the tax intake':['Completar el formulario','أكمل النموذج'], 'Download encrypted PDF':['Descargar PDF cifrado','تنزيل ملف PDF مشفّر'],
'Email PDF; call with password':['Enviar el PDF y llamar con la contraseña','أرسل الملف بالبريد واتصل لإعطاء كلمة المرور'],
'Download your secure PDF':['Descargue su PDF seguro','تنزيل ملف PDF الآمن'],
'The PDF is not sent automatically. Attach only the encrypted PDF to your email to Elite Taxes. Never include the password in that email.':['El PDF no se envía automáticamente. Adjunte únicamente el PDF cifrado al correo dirigido a Elite Taxes. Nunca incluya la contraseña en ese correo.','لا يتم إرسال ملف PDF تلقائيًا. أرفق الملف المشفر فقط برسالتك إلى Elite Taxes. لا تضع كلمة المرور في البريد نفسه.'],
'Generate and download encrypted PDF':['Generar y descargar PDF cifrado','إنشاء وتنزيل ملف PDF مشفر'],
'PDF downloaded. Share the password.':['PDF descargado. Comunique la contraseña.','تم تنزيل ملف PDF. شارك كلمة المرور.'],
'Your encrypted PDF should be in your Downloads folder. Email it to Elite Taxes as an attachment, then give the office this password separately. It is not sent automatically.':['El PDF cifrado debería estar en Descargas. Envíelo como archivo adjunto a Elite Taxes y comunique esta contraseña por separado. No se envía automáticamente.','يجب أن يكون ملف PDF المشفر في مجلد التنزيلات. أرسله مرفقًا إلى Elite Taxes ثم زوّد المكتب بكلمة المرور بشكل منفصل. لا تُرسل تلقائيًا.'],
'Copy password':['Copiar contraseña','نسخ كلمة المرور'],
'How to share your password':['Cómo comunicar la contraseña','كيفية مشاركة كلمة المرور'],
'Call Elite Taxes · 405-778-5388':['Llamar a Elite Taxes · 405-778-5388','اتصل بـ Elite Taxes · 405-778-5388'],
'Phone call is preferred. If you’re calling from this phone, keep this page available so you can switch back to read the password during the call.':['Es preferible llamar. Si llama desde este teléfono, deje esta página abierta para volver a consultar la contraseña durante la llamada.','المكالمة الهاتفية هي الخيار المفضل. إذا كنت تتصل من هذا الهاتف، فاترك هذه الصفحة مفتوحة لتتمكن من العودة وقراءة كلمة المرور أثناء المكالمة.'],
'Share your password separately':['Comparta la contraseña por separado','شارك كلمة المرور بشكل منفصل'],
'Copy number':['Copiar número','نسخ الرقم'],
"Share securely.":["Compartir con seguridad.", "شارك بأمان."],
"Email PDF; share password via Signal or phone":["Envíe el PDF; comparta la contraseña por Signal o teléfono", "أرسل ملف PDF وشارك كلمة المرور عبر سيغنال أو الهاتف"],
"The PDF is created and encrypted on your device. This website does not receive or store your form answers. Email only the encrypted PDF. Your password is generated automatically; send it separately through a verified Signal conversation, or call the office. Never include the password, SSN, or bank details in the PDF email.":["El PDF se crea y cifra en su dispositivo. Este sitio no recibe ni almacena sus respuestas. Envíe solo el PDF cifrado por correo. La contraseña se genera automáticamente; envíela por Signal a la cuenta verificada de la oficina o llame. Nunca incluya la contraseña, el SSN ni los datos bancarios en el correo.", "يُنشأ ملف PDF ويُشفّر على جهازك. لا يتلقى الموقع بياناتك ولا يخزنها. أرسل ملف PDF المشفر فقط بالبريد الإلكتروني. تُنشأ كلمة المرور تلقائيًا؛ أرسلها عبر محادثة سيغنال مؤكدة أو اتصل بالمكتب. لا تضع كلمة المرور أو رقم الضمان الاجتماعي أو المعلومات المصرفية في البريد."],
"We'll create a strong password automatically and encrypt your PDF on this device. You won't need to choose a password. After downloading, copy it into a verified Signal chat with Elite Taxes, or share it by phone.":["Generaremos una contraseña segura automáticamente y cifraremos el PDF en este dispositivo. No tendrá que elegirla. Después de descargarlo, copie la contraseña en un chat verificado de Signal con Elite Taxes o comuníquela por teléfono.", "سننشئ كلمة مرور قوية تلقائيًا ونشفّر ملف PDF على هذا الجهاز. لا تحتاج إلى اختيار كلمة مرور. بعد التنزيل، انسخها إلى محادثة سيغنال مؤكدة مع Elite Taxes أو شاركها عبر الهاتف."],
"YOUR PDF PASSWORD — COPY EXACTLY":["SU CONTRASEÑA DEL PDF — COPIE EXACTAMENTE", "كلمة مرور PDF — انسخها تمامًا"],
"01 / PREFERRED — SIGNAL":["01 / RECOMENDADO — SIGNAL", "01 / المُفضّل — سيغنال"],
"Signal is an encrypted messaging app. Both you and Elite Taxes must have Signal before using this option.":["Signal es una aplicación de mensajería cifrada. Tanto usted como Elite Taxes necesitan tener Signal para usar esta opción.", "سيغنال تطبيق مراسلة مشفّر. يجب أن يكون لديك ولدى Elite Taxes حساب في سيغنال لاستخدام هذا الخيار."],
"Click":["Haga clic en", "اضغط على"],
"Open Signal on your phone or linked desktop app. Select a new message and find Elite Taxes using the":["Abra Signal en su teléfono o computadora vinculada. Inicie un mensaje nuevo y busque a Elite Taxes con el", "افتح سيغنال على هاتفك أو حاسوبك المرتبط. أنشئ رسالة جديدة وابحث عن Elite Taxes باستخدام"],
"Signal username or number confirmed by the office":["usuario o número de Signal confirmado por la oficina", "اسم المستخدم أو الرقم المؤكد من المكتب في سيغنال"],
"Make sure you're messaging the verified Elite Taxes contact. Paste the password and send it there,":["Asegúrese de escribir al contacto verificado de Elite Taxes. Pegue la contraseña y envíela allí,", "تأكد من أنك تراسل الحساب المؤكّد لـ Elite Taxes. الصق كلمة المرور وأرسلها هناك،"],
"not in the PDF email":["nunca en el correo del PDF", "وليس في بريد ملف PDF"],
"Don't assume the regular office phone number is on Signal. If you don't have a verified Signal contact, use the phone option.":["No suponga que el número habitual de la oficina está en Signal. Si no tiene el contacto verificado, use la llamada telefónica.", "لا تفترض أن رقم المكتب المعتاد مسجل في سيغنال. إذا لم يكن لديك حساب سيغنال مؤكد، فاستخدم المكالمة الهاتفية."],
"Get Signal (optional)":["Obtener Signal (opcional)", "تنزيل سيغنال (اختياري)"],
"02 / BACKUP — PHONE CALL":["02 / ALTERNATIVA — LLAMADA", "02 / البديل — مكالمة هاتفية"],
"Call Elite Taxes from any phone and read the password exactly, including the hyphens. All generated passwords contain only capital letters; no digits.":["Llame a Elite Taxes desde cualquier teléfono y lea la contraseña exactamente, incluidos los guiones. Las contraseñas generadas contienen solo letras mayúsculas, sin números.", "اتصل بمكتب Elite Taxes من أي هاتف واقرأ كلمة المرور بدقة، بما في ذلك الشرطات. تتكون كلمات المرور المنشأة من أحرف لاتينية كبيرة فقط دون أرقام."],
"Keep this page open until the password has been shared; it can't be recovered after closing. This site doesn't send Signal messages or make calls for you.":["Mantenga esta página abierta hasta compartir la contraseña; no puede recuperarla después de cerrarla. El sitio no envía mensajes de Signal ni hace llamadas.", "أبقِ هذه الصفحة مفتوحة حتى مشاركة كلمة المرور؛ لا يمكن استعادتها بعد إغلاقها. الموقع لا يرسل رسائل سيغنال أو يجري مكالمات."],
"Never include the PDF password in the same email or email conversation as the encrypted PDF. Do not put SSNs or bank details in Signal messages.":["Nunca incluya la contraseña en el mismo correo o conversación de correo que el PDF cifrado. No incluya SSN ni datos bancarios en Signal.", "لا ترسل كلمة مرور PDF في نفس الرسالة أو سلسلة البريد التي تحتوي على الملف المشفر. لا ترسل أرقام الضمان الاجتماعي أو بيانات بنكية عبر سيغنال."],
'Done — clear password and form':['Listo: borrar contraseña y formulario','تم — امسح كلمة المرور والنموذج'],
"Email PDF; share password separately":["Envíe el PDF y comparta la contraseña por separado", "أرسل ملف PDF وشارك كلمة المرور بشكل منفصل"],
"The PDF is created and encrypted on your device. This website does not receive or store your form answers. Email only the encrypted PDF. Your password is generated automatically; send it separately through a verified Signal message or text message, or call the office. Never include the password, SSN, or bank details in the PDF email.":["El PDF se crea y cifra en su dispositivo. Este sitio no recibe ni almacena sus respuestas. Envíe solo el PDF cifrado por correo. La contraseña se genera automáticamente; compártala por Signal verificado, mensaje de texto separado o llamada. Nunca incluya la contraseña, el SSN ni datos bancarios en el correo.", "يُنشأ ملف PDF ويُشفّر على جهازك. لا يتلقى هذا الموقع بياناتك ولا يخزنها. أرسل ملف PDF المشفر فقط بالبريد. تُنشأ كلمة المرور تلقائيًا؛ شاركها عبر سيغنال المؤكد أو رسالة نصية منفصلة أو اتصال هاتفي. لا تُدرج كلمة المرور أو أرقام الضمان الاجتماعي أو البيانات المصرفية في البريد."],
"We'll create a strong password automatically and encrypt your PDF on this device. You won't need to choose a password. After downloading, share the password separately through Signal (if available), regular text, or a phone call.":["Generaremos una contraseña segura automáticamente y cifraremos el PDF en este dispositivo. No tendrá que elegirla. Después de descargarlo, compártala por separado mediante Signal (si está disponible), un mensaje de texto o una llamada.", "سننشئ كلمة مرور قوية تلقائيًا ونشفّر ملف PDF على هذا الجهاز. لن تحتاج إلى اختيار كلمة مرور. بعد التنزيل، شاركها بشكل منفصل عبر سيغنال إن توفر، أو رسالة نصية عادية، أو مكالمة هاتفية."],
"01 / MORE PRIVATE OPTION — SIGNAL":["01 / OPCIÓN MÁS PRIVADA — SIGNAL", "01 / خيار أكثر خصوصية — سيغنال"],
"Signal is a free messaging app that protects messages with end-to-end encryption. It's more private than regular SMS, but you and Elite Taxes both need Signal to use it.":["Signal es una aplicación gratuita que protege los mensajes mediante cifrado de extremo a extremo. Es más privada que los SMS, pero tanto usted como Elite Taxes deben usarla.", "سيغنال تطبيق مراسلة مجاني يحمي الرسائل بالتشفير التام بين الطرفين. إنه أكثر خصوصية من الرسائل النصية العادية، لكن يجب أن تستخدمه أنت ومكتب Elite Taxes."],
"Why choose Signal?":["¿Por qué elegir Signal?", "لماذا تختار سيغنال؟"],
"Private by default:":["Privado de forma predeterminada:", "خصوصية افتراضية:"],
"Messages are end-to-end encrypted, so neither Signal nor phone carriers can read their contents in transit.":["Los mensajes tienen cifrado de extremo a extremo, por lo que ni Signal ni las operadoras pueden leer su contenido durante el envío.", "الرسائل مشفرة من طرف إلى طرف، لذلك لا يستطيع سيغنال أو مشغلو الهاتف قراءة محتواها أثناء النقل."],
"Easy to copy and paste:":["Fácil de copiar y pegar:", "سهولة النسخ واللصق:"],
"Send the exact password without having to read letters aloud.":["Envíe la contraseña exacta sin necesidad de leer las letras en voz alta.", "أرسل كلمة المرور بدقة دون الحاجة إلى نطق الحروف."],
"Works across devices:":["Funciona en varios dispositivos:", "يعمل عبر الأجهزة:"],
"Use Signal on a phone or linked computer.":["Use Signal en un teléfono o computadora vinculada.", "استخدم سيغنال على هاتف أو حاسوب مرتبط."],
"Open Signal and start a message to the":["Abra Signal e inicie un mensaje al", "افتح سيغنال وابدأ رسالة إلى"],
"Elite Taxes Signal username or number confirmed directly by the office":["usuario o número de Signal de Elite Taxes confirmado directamente por la oficina", "اسم مستخدم أو رقم سيغنال الخاص بمكتب Elite Taxes والمؤكد مباشرة من المكتب"],
"Verify the recipient, then paste and send":["Verifique al destinatario y luego pegue y envíe", "تحقق من المستلم ثم الصق وأرسل"],
"only the password":["solo la contraseña", "كلمة المرور فقط"],
"—never the PDF itself.":["—nunca el PDF.", "— وليس ملف PDF نفسه."],
"Signal is optional and only available once Elite Taxes confirms its Signal contact. If not available, use regular texting below.":["Signal es opcional y estará disponible cuando Elite Taxes confirme su contacto. Si no está disponible, use los mensajes de texto de abajo.", "سيغنال اختياري ولا يتوفر إلا بعد تأكيد مكتب Elite Taxes جهة اتصاله. إن لم يتوفر، استخدم الرسائل النصية أدناه."],
"Learn about / get Signal (optional)":["Conocer / descargar Signal (opcional)", "التعرف على سيغنال أو تنزيله (اختياري)"],
"02 / REGULAR TEXT MESSAGE — FALLBACK":["02 / MENSAJE DE TEXTO — ALTERNATIVA", "02 / رسالة نصية عادية — بديل"],
"No extra app needed. Copy the password and paste it into a new text message to":["No necesita otra aplicación. Copie la contraseña y péguela en un nuevo mensaje al", "لا تحتاج إلى تطبيق إضافي. انسخ كلمة المرور والصقها في رسالة نصية جديدة إلى"],
"Shar's text-capable number confirmed by the office":["número de Shar habilitado para mensajes y confirmado por la oficina", "رقم شار القابل لاستقبال الرسائل النصية والمؤكد من المكتب"],
". Regular SMS is not end-to-end encrypted, so Signal is preferable when available.":[". Los SMS normales no tienen cifrado de extremo a extremo; por eso Signal es preferible cuando está disponible.", ". الرسائل النصية العادية غير مشفرة من طرف إلى طرف، لذا يُفضّل سيغنال عند توفره."],
"Do not assume the office's voice number accepts texts. This site does not send texts automatically.":["No suponga que el número de llamadas de la oficina recibe mensajes. Este sitio no envía mensajes automáticamente.", "لا تفترض أن رقم هاتف المكتب يستقبل الرسائل النصية. لا يرسل هذا الموقع رسائل تلقائيًا."],
"03 / PHONE CALL — IF NEEDED":["03 / LLAMADA TELEFÓNICA — SI ES NECESARIO", "03 / مكالمة هاتفية — عند الحاجة"],
"Call Elite Taxes and read the password exactly, including the hyphens. Generated passwords contain only capital letters, no digits.":["Llame a Elite Taxes y lea la contraseña exactamente, incluidos los guiones. Las contraseñas generadas solo tienen letras mayúsculas, sin números.", "اتصل بمكتب Elite Taxes واقرأ كلمة المرور كما هي، بما فيها الشرطات. تتكون كلمات المرور المُنشأة من أحرف كبيرة فقط، دون أرقام."],
"Keep this page open until the password has been shared; it can't be recovered after closing. This site does not send any messages or place calls for you.":["Mantenga esta página abierta hasta compartir la contraseña; no podrá recuperarla al cerrarla. Este sitio no envía mensajes ni realiza llamadas por usted.", "أبقِ هذه الصفحة مفتوحة حتى مشاركة كلمة المرور، فلا يمكن استعادتها بعد إغلاقها. لا يرسل الموقع رسائل ولا يجري مكالمات نيابة عنك."],
"Never include the PDF password in the same email or email conversation as the encrypted PDF. Do not put SSNs or bank details in Signal or text messages.":["Nunca incluya la contraseña en el mismo correo o conversación que el PDF cifrado. No incluya SSN ni datos bancarios en Signal o SMS.", "لا تضع كلمة مرور PDF في البريد أو سلسلة البريد التي تحتوي على الملف المشفر. لا ترسل أرقام الضمان الاجتماعي أو التفاصيل المصرفية عبر سيغنال أو الرسائل النصية."],
'Security testing in progress':['Pruebas de seguridad en curso','اختبارات الأمان جارية'],
'Browser-only AES-256 PDF downloads passed local technical tests. This is still a private test build, not approved for real taxpayer data.':['Las descargas de PDF con cifrado AES-256 en el navegador pasaron pruebas técnicas locales. Esta sigue siendo una versión de prueba privada, no autorizada para datos reales.','نجحت ملفات PDF المشفّرة بخوارزمية AES-256 محليًا في الاختبارات التقنية. هذه نسخة اختبار خاصة لم تُعتمد بعد للبيانات الحقيقية.'],
'Individual tax information':['Información fiscal individual','المعلومات الضريبية الشخصية'],
'Complete the form using fictional details for this preview. Your answers will not be sent to Elite Taxes or saved by this website.':['Complete esta vista previa solo con datos ficticios. Las respuestas no se envían a Elite Taxes ni se guardan en este sitio.','املأ هذه النسخة التجريبية ببيانات وهمية فقط. لا تُرسل الإجابات إلى Elite Taxes ولا تُخزّن على هذا الموقع.'],
'TAX YEAR':['AÑO FISCAL','السنة الضريبية'],
'Local-only preview. No server submission.':['Vista previa local. No se envían datos.','معاينة محلية. لا تُرسل أي بيانات.'],
'View documents checklist ↗':['Ver lista de documentos ↗','عرض قائمة المستندات ↗'],
'Documents Checklist':['Lista de documentos','قائمة المستندات'],
'Income forms':['Comprobantes de ingresos','مستندات الدخل'],
'Deductions checklist':['Lista de deducciones','قائمة الخصومات'],
'W-2':['W-2','W-2'],'1099':['1099','1099'],
'Social Security':['Seguro Social','الضمان الاجتماعي'],
'Interest and dividends':['Intereses y dividendos','الفوائد والأرباح'],
'Rental income':['Ingresos por alquiler','دخل الإيجار'],
'Investment stock sales':['Venta de acciones e inversiones','بيع الأسهم والاستثمارات'],
'Mortgage interest':['Intereses hipotecarios','فوائد الرهن العقاري'],
'Child care':['Cuidado infantil','رعاية الأطفال'],
'Education':['Educación','التعليم'],
'Student loan interest':['Intereses de préstamos estudiantiles','فوائد قروض الطلاب'],
'Charitable donations':['Donaciones caritativas','التبرعات الخيرية'],
'Close':['Cerrar','إغلاق'],
'Your name':['Su nombre','اسمك'],
'First name':['Nombre','الاسم الأول'], 'Middle':['Segundo nombre','الاسم الأوسط'], 'Last name':['Apellido','اسم العائلة'],
'(optional)':['(opcional)','(اختياري)'],
'Date of birth':['Fecha de nacimiento','تاريخ الميلاد'],
'Social Security Number or Individual Taxpayer Identification Number (SSN/ITIN)':['Número de Seguro Social o identificación fiscal (SSN/ITIN)','رقم الضمان الاجتماعي أو الرقم الضريبي (SSN/ITIN)'],
'Show':['Mostrar','إظهار'],
'Hide':['Ocultar','إخفاء'],
'Home address':['Domicilio','عنوان السكن'],
'Street address':['Dirección','عنوان الشارع'],
'Apt / unit':['Apartamento / unidad','الشقة / الوحدة'],
'City':['Ciudad','المدينة'], 'State':['Estado','الولاية'], 'ZIP code':['Código postal','الرمز البريدي'],
'Email':['Correo electrónico','البريد الإلكتروني'],
'Filing status':['Estado civil para la declaración','حالة تقديم الإقرار'],
'Single':['Soltero(a)','أعزب / عزباء'],
'Married filing jointly':['Casados, declaración conjunta','متزوجان وتقديم إقرار مشترك'],
'Married filing separately':['Casados, declaración separada','متزوجان وتقديم إقرار منفصل'],
'Head of household':['Jefe(a) de familia','ربّ الأسرة'],
'Qualifying surviving spouse':['Cónyuge sobreviviente que reúne los requisitos','الأرمل/الأرملة المؤهل(ة)'],
'Spouse full name':['Nombre completo del cónyuge','الاسم الكامل للزوج/الزوجة'],
'Spouse Social Security number':['Número de Seguro Social del cónyuge','رقم الضمان الاجتماعي للزوج/الزوجة'],
'Spouse date of birth':['Fecha de nacimiento del cónyuge','تاريخ ميلاد الزوج/الزوجة'],
'Spouse occupation':['Ocupación del cónyuge','مهنة الزوج/الزوجة'],
'Dependents':['Dependientes','المعالون'],
'Children or others you support and may claim on your return.':['Hijos u otras personas a su cargo que podría incluir en su declaración.','الأطفال أو غيرهم ممن تعولهم وقد تطالب بإعفائهم في إقرارك الضريبي.'],
'No dependents':['Sin dependientes','لا يوجد معالون'],
'Yes, I have dependents':['Sí, tengo dependientes','نعم، لدي معالون'],
'Add a dependent':['Agregar dependiente','إضافة مُعال'],
'Remove':['Eliminar','حذف'],
'Social Security number':['Número de Seguro Social','رقم الضمان الاجتماعي'],
'Relationship to you':['Parentesco','صلة القرابة'],
'Refund/Payment Information':['Información de reembolso o pago','معلومات استرداد الضريبة أو الدفع'],
'Direct deposit':['Depósito directo','إيداع مباشر'],
'Check':['Cheque','شيك'],
'Bank name':['Nombre del banco','اسم البنك'],
'Account number':['Número de cuenta','رقم الحساب'],
'Routing number':['Número de ruta bancaria','رقم التوجيه المصرفي'],
'Account type':['Tipo de cuenta','نوع الحساب'],
'Checking':['Cuenta corriente','حساب جاري'],
'Savings':['Cuenta de ahorros','حساب توفير'],
'The PDF is created and encrypted on your device. This website does not receive or store your form answers. Email only the password-protected PDF, and provide the password separately by phone. Do not include personal details in the email message or file name.':['El PDF se crea y cifra en su dispositivo. Este sitio no recibe ni almacena sus respuestas. Envíe por correo solo el PDF protegido y proporcione la contraseña por teléfono. No incluya datos personales en el mensaje ni en el nombre del archivo.','يُنشأ ملف PDF ويُشفّر على جهازك. لا يتلقى هذا الموقع إجاباتك ولا يخزنها. أرسل ملف PDF المحمي فقط بالبريد الإلكتروني، وقدم كلمة المرور هاتفيًا. لا تضع معلومات شخصية في الرسالة أو اسم الملف.'],
'Clear form':['Borrar formulario','مسح النموذج'],
'Protect your tax form':['Proteja su formulario fiscal','احمِ نموذجك الضريبي'],
'Create a password to open your PDF. The password is not saved or sent to Elite Taxes. You will need to give it to the office by phone.':['Cree una contraseña para abrir el PDF. No se guarda ni se envía a Elite Taxes. Deberá comunicarla a la oficina por teléfono.','أنشئ كلمة مرور لفتح ملف PDF. لن تُحفظ أو تُرسل إلى Elite Taxes. ستحتاج إلى إبلاغ المكتب بها هاتفيًا.'],
'PDF password (16–32 characters)':['Contraseña del PDF (16 a 32 caracteres)','كلمة مرور PDF (من 16 إلى 32 حرفًا)'],
'Confirm PDF password':['Confirme la contraseña','تأكيد كلمة المرور'],
'Show passwords':['Mostrar contraseñas','إظهار كلمات المرور'],
'Generate a strong password':['Generar contraseña segura','إنشاء كلمة مرور قوية'],
'Keep this password somewhere safe. Do not email it with the PDF or put it in the same email thread. Call Elite Taxes to share it. There is no password recovery.':['Guarde esta contraseña en un lugar seguro. No la envíe junto con el PDF ni en el mismo hilo de correo. Llame a Elite Taxes para comunicarla. No se puede recuperar.','احتفظ بكلمة المرور في مكان آمن. لا ترسلها مع ملف PDF أو ضمن سلسلة البريد نفسها. اتصل بـ Elite Taxes لإبلاغهم بها. لا يمكن استعادة كلمة المرور.'],
'Cancel':['Cancelar','إلغاء'],
'Please fix the highlighted fields.':['Corrija los campos marcados.','يرجى تصحيح الحقول المحددة.'],
'This field is required.':['Este campo es obligatorio.','هذا الحقل مطلوب.'],
'Enter your email address.':['Ingrese su correo electrónico.','أدخل بريدك الإلكتروني.'],
'Enter a valid email address.':['Ingrese un correo válido.','أدخل بريدًا إلكترونيًا صالحًا.'],
'Enter a 5-digit ZIP code.':['Ingrese un código postal de 5 dígitos.','أدخل رمزًا بريديًا مكونًا من 5 أرقام.'],
'Enter an SSN or ITIN.':['Ingrese SSN o ITIN.','أدخل SSN أو ITIN.'],
'Enter a valid 9-digit SSN or ITIN.':['Ingrese un SSN o ITIN válido de 9 dígitos.','أدخل رقم SSN أو ITIN صالحًا من 9 أرقام.'],
'Choose a filing status.':['Seleccione su estado para la declaración.','اختر حالة تقديم الإقرار.'],
'Choose direct deposit or check.':['Seleccione depósito directo o cheque.','اختر الإيداع المباشر أو الشيك.'],
'Enter the bank name.':['Ingrese el nombre del banco.','أدخل اسم البنك.'],
'Enter the account number.':['Ingrese el número de cuenta.','أدخل رقم الحساب.'],
'Enter a 9-digit routing number.':['Ingrese un número de ruta de 9 dígitos.','أدخل رقم توجيه مصرفي من 9 أرقام.'],
'Choose checking or savings.':['Seleccione corriente o ahorros.','اختر الحساب الجاري أو التوفير.'],
'Enter your spouse\'s full name.':['Ingrese el nombre completo del cónyuge.','أدخل الاسم الكامل للزوج/الزوجة.'],
'Enter a valid 9-digit Social Security number.':['Ingrese un SSN válido de 9 dígitos.','أدخل رقم ضمان اجتماعي صالحًا من 9 أرقام.'],
'Enter your spouse\'s date of birth.':['Ingrese la fecha de nacimiento del cónyuge.','أدخل تاريخ ميلاد الزوج/الزوجة.'],
'Enter your spouse\'s occupation.':['Ingrese la ocupación del cónyuge.','أدخل مهنة الزوج/الزوجة.'],
'Enter a first name.':['Ingrese un nombre.','أدخل الاسم الأول.'],
'Enter a last name.':['Ingrese un apellido.','أدخل اسم العائلة.'],
'Enter a date of birth.':['Ingrese la fecha de nacimiento.','أدخل تاريخ الميلاد.'],
'Enter a valid 9-digit number.':['Ingrese un número válido de 9 dígitos.','أدخل رقمًا صالحًا من 9 أرقام.'],
'Write down this password exactly, including the hyphens, before downloading.':['Anote la contraseña exactamente, incluidos los guiones.','دوّن كلمة المرور كما هي، بما في ذلك الشرطات.'],
'Passwords do not match.':['Las contraseñas no coinciden.','كلمتا المرور غير متطابقتين.'],
'Local PDF 2.0 AES-256 engine available for fictional-data testing only. Not security-reviewed or approved for real taxpayer information.':['Motor local AES-256 disponible solo para pruebas con datos ficticios. No ha sido auditado ni aprobado para información real.','محرّك التشفير المحلي AES-256 متاح للتجربة ببيانات وهمية فقط، ولم يخضع بعد لمراجعة أمنية مستقلة.'],
'Use 16–32 characters, using letters, numbers and standard punctuation only.':['Use de 16 a 32 caracteres: letras, números y signos de puntuación habituales.','استخدم من 16 إلى 32 حرفًا من الحروف والأرقام وعلامات الترقيم الإنجليزية المعتادة.'],
'Could not generate an encrypted PDF. No file was sent. Try again with fictional test data. If the problem continues, ask the developer to inspect the code.':['No se pudo crear el PDF cifrado. No se envió ningún archivo. Use datos ficticios y consulte al desarrollador si persiste.','تعذّر إنشاء ملف PDF مشفّر. لم يُرسل أي ملف. استخدم بيانات وهمية واطلب من المطور المساعدة إذا استمرت المشكلة.']
};
// Final customer-facing wording added in v10. Existing site translations remain untouched.
Object.assign(translations, {
  "Complete your tax intake, download a password-protected PDF, and email it to our office. We’ll show you how to share the password separately.": [
    "Complete su formulario, descargue un PDF protegido con contraseña y envíelo a nuestra oficina. Le indicaremos cómo compartir la contraseña por separado.",
    "أكمل نموذج المعلومات الضريبية، ثم نزّل ملف PDF محميًا بكلمة مرور وأرسله إلى مكتبنا بالبريد الإلكتروني. سنوضح لك كيفية إرسال كلمة المرور بشكل منفصل."
  ],
  "Complete.": [
    "Completar.",
    "أكمل."
  ],
  "Protect.": [
    "Proteger.",
    "احمِ."
  ],
  "Share.": [
    "Compartir.",
    "شارك."
  ],
  "Three steps.": [
    "Tres pasos.",
    "ثلاث خطوات."
  ],
  "One secure handoff.": [
    "Una entrega protegida.",
    "إرسال واحد محمي."
  ],
  "Your information is encrypted before you email it. Nothing is submitted directly from this form.": [
    "Sus datos se cifran antes de enviarlos por correo electrónico. Este formulario no envía información directamente.",
    "تُشفّر معلوماتك قبل إرسالها بالبريد الإلكتروني. لا يرسل هذا النموذج البيانات مباشرة."
  ],
  "Complete your intake form": [
    "Complete su formulario",
    "أكمل نموذج المعلومات"
  ],
  "Download your encrypted PDF": [
    "Descargue su PDF cifrado",
    "نزّل ملف PDF المشفر"
  ],
  "Email the PDF and share its password separately": [
    "Envíe el PDF y comparta la contraseña por separado",
    "أرسل ملف PDF وشارك كلمة المرور بشكل منفصل"
  ],
  "How your information is protected": [
    "Cómo se protegen sus datos",
    "كيف نحمي معلوماتك"
  ],
  "We don’t collect your answers through this page. Your completed form is encrypted on your device before you download it.": [
    "No recopilamos sus respuestas a través de esta página. El formulario se cifra en su dispositivo antes de descargarlo.",
    "لا نجمع إجاباتك عبر هذه الصفحة. يُشفّر النموذج المكتمل على جهازك قبل تنزيله."
  ],
  "Enter your information below. When you’re finished, you’ll receive an encrypted PDF to send to our office. Your answers are not submitted automatically.": [
    "Ingrese sus datos a continuación. Al terminar, recibirá un PDF cifrado para enviarlo a nuestra oficina. Sus respuestas no se envían automáticamente.",
    "أدخل معلوماتك أدناه. عند الانتهاء، ستحصل على ملف PDF مشفر لإرساله إلى مكتبنا. لا تُرسل الإجابات تلقائيًا."
  ],
  "Your information stays on this device until you send the PDF.": [
    "Sus datos permanecen en este dispositivo hasta que envíe el PDF.",
    "تبقى معلوماتك على هذا الجهاز حتى ترسل ملف PDF."
  ],
  "Review tax documents checklist ↗": [
    "Revise la lista de documentos fiscales ↗",
    "راجع قائمة المستندات الضريبية ↗"
  ],
  "Tax documents checklist": [
    "Lista de documentos fiscales",
    "قائمة المستندات الضريبية"
  ],
  "Select the documents that apply to your tax return. Your selections will be included in your PDF.": [
    "Marque los documentos correspondientes a su declaración. Sus selecciones aparecerán en el PDF.",
    "حدد المستندات المتعلقة بإقرارك الضريبي. ستُدرج اختياراتك في ملف PDF."
  ],
  "Personal information": [
    "Datos personales",
    "البيانات الشخصية"
  ],
  "Refund or payment information": [
    "Información de reembolso o pago",
    "معلومات استرداد الضريبة أو دفعها"
  ],
  "Your completed form is encrypted on your device, not submitted to our website. Email only the encrypted PDF to": [
    "El formulario se cifra en su dispositivo y no se envía a nuestro sitio. Envíe únicamente el PDF cifrado a",
    "يُشفّر النموذج المكتمل على جهازك ولا يُرسل إلى موقعنا. أرسل ملف PDF المشفر فقط إلى"
  ],
  ". Send its password separately through Signal or a text message to an office-confirmed contact, or call us. Never include the password or personal information in the email message.": [
    ". Comparta su contraseña por separado mediante Signal, un mensaje al número confirmado por la oficina o una llamada. Nunca incluya la contraseña ni datos personales en el mensaje de correo.",
    ". شارك كلمة مروره بشكل منفصل عبر سيغنال أو رسالة نصية إلى جهة اتصال مؤكدة من المكتب، أو اتصل بنا. لا تُدرج كلمة المرور أو بياناتك الشخصية في البريد الإلكتروني."
  ],
  "Continue to encrypted PDF": [
    "Continuar al PDF cifrado",
    "المتابعة إلى ملف PDF المشفر"
  ],
  "Prepare your encrypted PDF": [
    "Prepare su PDF cifrado",
    "جهّز ملف PDF المشفر"
  ],
  "We’ll generate a strong password and encrypt your PDF on this device. You won’t need to create or remember a password.": [
    "Generaremos una contraseña segura y cifraremos el PDF en este dispositivo. No tendrá que crear ni memorizar una contraseña.",
    "سننشئ كلمة مرور قوية ونشفّر ملف PDF على هذا الجهاز. لن تحتاج إلى إنشاء كلمة مرور أو حفظها."
  ],
  "After downloading, email the encrypted PDF to our office. We’ll show you the password and how to send it separately. Nothing is sent automatically.": [
    "Después de descargarlo, envíe el PDF cifrado a nuestra oficina. Le mostraremos la contraseña y cómo compartirla por separado. Nada se envía automáticamente.",
    "بعد التنزيل، أرسل ملف PDF المشفر إلى مكتبنا. سنعرض لك كلمة المرور وكيفية مشاركتها بشكل منفصل. لا يُرسل أي شيء تلقائيًا."
  ],
  "Generate and download PDF": [
    "Generar y descargar PDF",
    "إنشاء وتنزيل ملف PDF"
  ],
  "Your encrypted PDF is ready": [
    "Su PDF cifrado está listo",
    "ملف PDF المشفر جاهز"
  ],
  "Check your Downloads folder for": [
    "Busque en su carpeta Descargas el archivo",
    "ابحث في مجلد التنزيلات عن الملف"
  ],
  ". Email that file to Elite Taxes, then send us the password separately using one of the options below.": [
    ". Envíelo a Elite Taxes por correo y comparta la contraseña por separado mediante una de las opciones siguientes.",
    ". أرسل هذا الملف إلى Elite Taxes بالبريد الإلكتروني، ثم شارك كلمة المرور بشكل منفصل باستخدام أحد الخيارات أدناه."
  ],
  "1. Email the encrypted PDF": [
    "1. Envíe el PDF cifrado",
    "١. أرسل ملف PDF المشفر"
  ],
  "Attachment only — no password": [
    "Solo adjunto — sin contraseña",
    "المرفق فقط — دون كلمة المرور"
  ],
  "Copy email address": [
    "Copiar correo electrónico",
    "نسخ البريد الإلكتروني"
  ],
  "Download PDF again": [
    "Descargar PDF de nuevo",
    "تنزيل ملف PDF مجددًا"
  ],
  "Attach only the encrypted PDF. Don’t include your password, Social Security number, or bank details in the email message.": [
    "Adjunte únicamente el PDF cifrado. No incluya la contraseña, el número de Seguro Social ni datos bancarios en el mensaje.",
    "أرفق ملف PDF المشفر فقط. لا تُدرج كلمة المرور أو رقم الضمان الاجتماعي أو التفاصيل المصرفية في البريد الإلكتروني."
  ],
  "2. Share the PDF password separately": [
    "2. Comparta la contraseña del PDF por separado",
    "٢. شارك كلمة مرور ملف PDF بشكل منفصل"
  ],
  "SIGNAL — RECOMMENDED WHEN AVAILABLE": [
    "SIGNAL — RECOMENDADO SI ESTÁ DISPONIBLE",
    "سيغنال — موصى به عند توفره"
  ],
  "Signal uses end-to-end encryption, so it offers more privacy than regular text messages. Both you and Elite Taxes need Signal to use this option.": [
    "Signal usa cifrado de extremo a extremo y ofrece más privacidad que los SMS normales. Usted y Elite Taxes necesitan Signal para usar esta opción.",
    "يستخدم سيغنال تشفيرًا تامًا بين الطرفين، لذا فهو أكثر خصوصية من الرسائل النصية العادية. يجب أن تستخدمه أنت ومكتب Elite Taxes."
  ],
  "Why Signal is safer than texting": [
    "Por qué Signal ofrece más privacidad que los SMS",
    "لماذا سيغنال أكثر أمانًا من الرسائل النصية"
  ],
  "End-to-end encrypted:": [
    "Cifrado de extremo a extremo:",
    "تشفير من طرف إلى طرف:"
  ],
  "Only you and your recipient can read the message in transit—not Signal or your phone carrier.": [
    "Solo usted y el destinatario pueden leer el mensaje durante el envío; ni Signal ni la operadora pueden leerlo.",
    "لا يستطيع قراءة الرسالة أثناء نقلها سوى المرسل والمستلم، وليس سيغنال أو شركة الاتصالات."
  ],
  "No spelling mistakes:": [
    "Sin errores al dictar:",
    "دون أخطاء إملائية:"
  ],
  "Paste the exact password without reading it aloud.": [
    "Pegue la contraseña exacta sin tener que dictarla.",
    "الصق كلمة المرور كما هي دون قراءتها بصوت عالٍ."
  ],
  "Phone or computer:": [
    "Teléfono o computadora:",
    "الهاتف أو الكمبيوتر:"
  ],
  "Send from your phone or linked desktop app.": [
    "Envíela desde su teléfono o aplicación de escritorio vinculada.",
    "أرسلها من هاتفك أو تطبيق الكمبيوتر المرتبط."
  ],
  "Select": [
    "Seleccione",
    "اختر"
  ],
  "above.": [
    "arriba.",
    "أعلاه."
  ],
  "Open Signal and find the": [
    "Abra Signal y busque el",
    "افتح سيغنال وابحث عن"
  ],
  "Elite Taxes contact confirmed by our office": [
    "contacto de Elite Taxes confirmado por nuestra oficina",
    "جهة اتصال Elite Taxes التي أكدها مكتبنا"
  ],
  "Verify you have the correct contact, then paste and send": [
    "Verifique que sea el destinatario correcto y después pegue y envíe",
    "تحقق من أنك تراسل جهة الاتصال الصحيحة، ثم الصق وأرسل"
  ],
  "Only use Signal after our office confirms its Signal account. Otherwise, use a regular text message below.": [
    "Use Signal solo después de que nuestra oficina confirme su cuenta. De lo contrario, utilice un mensaje de texto.",
    "لا تستخدم سيغنال إلا بعد تأكيد المكتب لحسابه. وإلا فاستخدم رسالة نصية عادية."
  ],
  "Get Signal (optional)": [
    "Descargar Signal (opcional)",
    "تنزيل سيغنال (اختياري)"
  ],
  "TEXT MESSAGE — SIMPLE FALLBACK": [
    "MENSAJE DE TEXTO — OTRA OPCIÓN",
    "رسالة نصية — خيار بديل"
  ],
  "Copy the password and paste it into a new text message to": [
    "Copie la contraseña y péguela en un mensaje nuevo dirigido a",
    "انسخ كلمة المرور والصقها في رسالة نصية جديدة إلى"
  ],
  "the mobile number confirmed by our office": [
    "el número móvil confirmado por nuestra oficina",
    "رقم الهاتف المحمول الذي أكده مكتبنا"
  ],
  ". Standard SMS is less private than Signal, but avoids reading the password aloud.": [
    ". Los SMS normales son menos privados que Signal, pero evitan tener que dictar la contraseña.",
    ". الرسائل النصية العادية أقل خصوصية من سيغنال، لكنها تجنبك قراءة كلمة المرور بصوت عالٍ."
  ],
  "Please confirm the correct texting number with Elite Taxes before sending. This website does not send texts for you.": [
    "Confirme con Elite Taxes el número correcto para mensajes. Este sitio no envía mensajes por usted.",
    "تحقق من رقم استقبال الرسائل الصحيح مع Elite Taxes قبل الإرسال. لا يرسل الموقع الرسائل نيابة عنك."
  ],
  "PHONE CALL — ANOTHER OPTION": [
    "LLAMADA — OTRA OPCIÓN",
    "مكالمة هاتفية — خيار آخر"
  ],
  "Call us and read the password in five groups. All characters are capital letters; include the hyphens when entering the password.": [
    "Llámenos y dicte la contraseña en cinco grupos. Todos los caracteres son letras mayúsculas; incluya los guiones al escribirla.",
    "اتصل بنا واقرأ كلمة المرور في خمس مجموعات. جميع الرموز أحرف إنجليزية كبيرة؛ أدخل الشرطات عند كتابة كلمة المرور."
  ],
  "Keep this window open until you’ve shared the password. Once closed, it cannot be recovered. This website does not send emails, messages, or calls for you.": [
    "Mantenga abierta esta ventana hasta compartir la contraseña. Una vez cerrada, no podrá recuperarla. Este sitio no envía correos, mensajes ni realiza llamadas.",
    "أبقِ هذه النافذة مفتوحة حتى تشارك كلمة المرور. بعد إغلاقها لا يمكن استعادتها. لا يرسل الموقع البريد أو الرسائل ولا يجري المكالمات نيابة عنك."
  ],
  "For your protection, do not send the password in the same email thread as the PDF. Never send your SSN or banking details in a text or Signal message.": [
    "Para su protección, no envíe la contraseña en el mismo hilo de correo que el PDF. Nunca envíe su SSN ni datos bancarios por SMS o Signal.",
    "لحمايتك، لا ترسل كلمة المرور في نفس سلسلة البريد التي تحتوي على ملف PDF. لا ترسل رقم الضمان الاجتماعي أو البيانات المصرفية عبر الرسائل أو سيغنال."
  ],
  "Done — clear password": [
    "Listo — borrar contraseña",
    "تم — امسح كلمة المرور"
  ],
  "PRIVATE TEST ONLY — This form has not been security-approved for real taxpayer information.": [
    "SOLO PRUEBAS — Este formulario no ha sido aprobado para datos reales de contribuyentes.",
    "للاختبار الخاص فقط — لم يُعتمد هذا النموذج أمنيًا لمعلومات دافعي الضرائب الحقيقية."
  ],
  "PRIVATE TEST ONLY — Encrypted PDF download is unavailable in this browser.": [
    "SOLO PRUEBAS — La descarga de PDF cifrado no funciona en este navegador.",
    "للاختبار الخاص فقط — تنزيل ملف PDF المشفر غير متاح في هذا المتصفح."
  ],
  "Enter a valid date of birth that is not in the future.": [
    "Ingrese una fecha de nacimiento válida que no sea futura.",
    "أدخل تاريخ ميلاد صالحًا ليس في المستقبل."
  ],
  "PDF encryption is unavailable in this browser. Please use an updated version of Chrome or Edge.": [
    "El cifrado de PDF no está disponible en este navegador. Use Chrome o Edge actualizado.",
    "تشفير PDF غير متاح في هذا المتصفح. استخدم إصدارًا حديثًا من كروم أو إيدج."
  ],
  "Encrypted PDF download is unavailable in this browser.": [
    "La descarga de PDF cifrado no está disponible en este navegador.",
    "تنزيل ملف PDF المشفر غير متاح في هذا المتصفح."
  ],
  "Encrypting your PDF on this device…": [
    "Cifrando su PDF en este dispositivo…",
    "جارٍ تشفير ملف PDF على هذا الجهاز…"
  ],
  "Encrypted PDF created. Email the file and send its password separately. Keep the sharing window open until you finish.": [
    "PDF cifrado creado. Envíe el archivo por correo y la contraseña por separado. Mantenga abierta esta ventana hasta terminar.",
    "تم إنشاء ملف PDF المشفر. أرسله بالبريد وأرسل كلمة المرور بشكل منفصل. أبقِ نافذة المشاركة مفتوحة حتى تنتهي."
  ],
  "We couldn't create your encrypted PDF. Nothing was sent. Please try again in an updated browser.": [
    "No pudimos crear el PDF cifrado. No se envió nada. Inténtelo de nuevo con un navegador actualizado.",
    "تعذر إنشاء ملف PDF المشفر. لم يُرسل أي شيء. حاول مجددًا باستخدام متصفح حديث."
  ],
  "Password copied. Paste it into a verified Signal chat or a separate text message—not the PDF email.": [
    "Contraseña copiada. Péguela en un chat de Signal verificado o mensaje de texto separado, no en el correo del PDF.",
    "تم نسخ كلمة المرور. الصقها في محادثة سيغنال موثوقة أو رسالة نصية منفصلة، وليس في بريد ملف PDF."
  ],
  "Copying isn't available here. Select the password above to copy it manually.": [
    "No se puede copiar aquí. Seleccione la contraseña y cópiela manualmente.",
    "النسخ غير متاح هنا. حدد كلمة المرور أعلاه وانسخها يدويًا."
  ],
  "Phone number copied.": [
    "Número de teléfono copiado.",
    "تم نسخ رقم الهاتف."
  ],
  "Office email copied. Attach only the encrypted PDF—never the password.": [
    "Correo de la oficina copiado. Adjunte solo el PDF cifrado, nunca la contraseña.",
    "تم نسخ بريد المكتب. أرفق ملف PDF المشفر فقط، دون كلمة المرور."
  ],
  "Copy unavailable. Enter the email address above manually.": [
    "No se puede copiar. Introduzca manualmente el correo indicado.",
    "النسخ غير متاح. أدخل عنوان البريد أعلاه يدويًا."
  ],
  "Clear all information entered on this device?": [
    "¿Borrar toda la información introducida en este dispositivo?",
    "هل تريد مسح كل المعلومات التي أدخلتها على هذا الجهاز؟"
  ],
  "Show": [
    "Mostrar",
    "إظهار"
  ],
  "Hide": [
    "Ocultar",
    "إخفاء"
  ],
  "Child": [
    "Hijo/a",
    "ابن/ابنة"
  ],
  "Stepchild": [
    "Hijastro/a",
    "ابن الزوج/الزوجة"
  ],
  "Foster child": [
    "Menor acogido",
    "طفل بالرعاية"
  ],
  "Grandchild": [
    "Nieto/a",
    "حفيد/حفيدة"
  ],
  "Sibling": [
    "Hermano/a",
    "أخ/أخت"
  ],
  "Parent": [
    "Padre o madre",
    "أب/أم"
  ],
  "Other relative": [
    "Otro familiar",
    "قريب آخر"
  ],
  "Other": [
    "Otro",
    "غير ذلك"
  ]
});
window.eliteIntakeTranslate=function(message){const language=document.getElementById("site-language-select")?.value;const i=language==="es"?0:language==="ar"?1:-1;return i>=0?(translations[message]?.[i]||message):message;};

const source=new WeakMap();
const tracked=[];
const areas=['.preview-banner','.intake-hero','.intake-sidebar','.intake-form-content','.password-dialog'];
function collect(){
 for(const selector of areas){
  const area=document.querySelector(selector); if(!area)continue;
  const walker=document.createTreeWalker(area,NodeFilter.SHOW_TEXT);
  let node;while((node=walker.nextNode())){
   if(!node.parentElement || node.parentElement.closest('script,style,svg,option,.err,#status,#passwordError,#copyStatus,#officeCopyStatus,#emailCopyStatus,#encryption-readiness,#ssnToggle,#count,#generatedPdfPassword'))continue;
   if(!source.has(node)){source.set(node,node.nodeValue);tracked.push(node);}
  }
 }
}
collect(); // Collect original English BEFORE the existing site's language script runs.
function selected(){const el=document.getElementById('site-language-select');return el ? el.value : 'en';}
function update(){
 collect();const lang=selected();const index=lang==='es'?0:lang==='ar'?1:-1;
 for(const node of tracked){if(!node.isConnected)continue;const orig=source.get(node);const key=orig.trim();
  const translated=index>=0 ? translations[key]?.[index] : null;
  const target=translated ? orig.replace(key,translated) : orig;
  if(node.nodeValue!==target)node.nodeValue=target;
 }
 // Dynamic controls use the same translation dictionary, without resetting user-entered data.
 const toggle=document.getElementById('ssnToggle');
 if(toggle){const value=toggle.getAttribute('aria-pressed')==='true'?'Hide':'Show';const t=index>=0?(translations[value]?.[index]||value):value;if(toggle.textContent!==t)toggle.textContent=t;}
 for(const option of document.querySelectorAll('select[data-f="rel"] option')){
   const value=option.value;
   const label=index>=0?(translations[value]?.[index]||value):value;
   if(option.textContent!==label)option.textContent=label;
 }
 const rtl=lang==='ar';
 for(const selector of ['.intake-form-content','.intake-sidebar-inner','.intake-hero-inner > div:first-child']){
   const el=document.querySelector(selector);if(el)el.setAttribute('dir',rtl?'rtl':'ltr');
 }
}
document.addEventListener('DOMContentLoaded',()=>{
 update(); const selector=document.getElementById('site-language-select');
 if(selector)selector.addEventListener('change',update);
 let pending=false;
 const obs=new MutationObserver(()=>{if(pending)return;pending=true;setTimeout(()=>{pending=false;update();},0)});
 for(const selector of areas){const e=document.querySelector(selector);if(e)obs.observe(e,{subtree:true,childList:true,characterData:true});}
});
})();