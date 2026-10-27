const menuButton=document.querySelector('.menu-button');
const mobileMenu=document.querySelector('.mobile-menu');
if(menuButton&&mobileMenu){menuButton.addEventListener('click',()=>{const open=mobileMenu.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));});}
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target);}}),{threshold:.12,rootMargin:'0px 0px -25px'});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Small stagger keeps section entrances polished without slowing navigation.
document.querySelectorAll('.cap-list, .process-steps, .trust-cards, .service-grid').forEach(group=>{[...group.querySelectorAll('.reveal, .service-card')].forEach((el,i)=>{el.style.transitionDelay=`${Math.min(i,5)*55}ms`;});});

// Site-wide language selector. All copy is kept locally; no third-party translation API.
(() => {
  const dictionary = Object.fromEntries([
  [
    "About",
    "Nosotros",
    "من نحن"
  ],
  [
    "Services",
    "Servicios",
    "الخدمات"
  ],
  [
    "Contact",
    "Contacto",
    "اتصل بنا"
  ],
  [
    "Call 405.778.5388",
    "Llamar al 405.778.5388",
    "اتصل على 405.778.5388"
  ],
  [
    "Oklahoma City",
    "Ciudad de Oklahoma",
    "أوكلاهوما سيتي"
  ],
  [
    "Personal + Business Tax Services",
    "Servicios de impuestos personales y empresariales",
    "خدمات الضرائب للأفراد والشركات"
  ],
  [
    "Clear answers.",
    "Respuestas claras.",
    "إجابات واضحة."
  ],
  [
    "Confident filing.",
    "Declaraciones seguras.",
    "تقديم إقرارات بثقة."
  ],
  [
    "Attentive, straightforward tax support for individuals and businesses, with personal service from people you can actually reach.",
    "Asesoría fiscal clara y atenta para personas y empresas, con un trato personalizado y alguien a quien realmente puede contactar.",
    "مساعدة ضريبية واضحة ومباشرة للأفراد والشركات، مع خدمة شخصية من فريق يسهل التواصل معه."
  ],
  [
    "Get Started",
    "Comenzar",
    "ابدأ الآن"
  ],
  [
    "Explore Services ↗",
    "Explorar servicios ↗",
    "استكشف خدماتنا ↗"
  ],
  [
    "Scroll to explore ↓",
    "Deslice para explorar ↓",
    "مرّر لاستكشاف المزيد ↓"
  ],
  [
    "Personal Tax Preparation",
    "Preparación de impuestos personales",
    "إعداد الإقرارات الضريبية للأفراد"
  ],
  [
    "Business Tax Services",
    "Servicios de impuestos empresariales",
    "الخدمات الضريبية للشركات"
  ],
  [
    "IRS Representation",
    "Representación ante el IRS",
    "التمثيل أمام مصلحة الضرائب الأمريكية"
  ],
  [
    "The Office",
    "Nuestra oficina",
    "مكتبنا"
  ],
  [
    "Preparation starts with the details.",
    "La preparación comienza con los detalles.",
    "يبدأ الإعداد بالاهتمام بالتفاصيل."
  ],
  [
    "Tax work is personal.",
    "Los impuestos son personales.",
    "الشؤون الضريبية مسألة شخصية."
  ],
  [
    "We treat it that",
    "Por eso los tratamos",
    "ولهذا نتعامل معها"
  ],
  [
    "way.",
    "como tal.",
    "على هذا الأساس."
  ],
  [
    "Elite Taxes OKC helps individuals and businesses navigate tax preparation and more complex tax matters with a focus on clarity, accuracy and responsive service.",
    "Elite Taxes OKC ayuda a personas y empresas con la preparación de impuestos y asuntos fiscales más complejos, con un enfoque en la claridad, la precisión y la atención oportuna.",
    "تساعد Elite Taxes OKC الأفراد والشركات في إعداد الإقرارات ومعالجة المسائل الضريبية الأكثر تعقيدًا، مع التركيز على الوضوح والدقة وسرعة الاستجابة."
  ],
  [
    "Local service. Clear communication. Careful preparation.",
    "Servicio local. Comunicación clara. Preparación minuciosa.",
    "خدمة محلية. تواصل واضح. إعداد دقيق."
  ],
  [
    "Practical expertise.",
    "Experiencia práctica.",
    "خبرة عملية."
  ],
  [
    "One clear place to start.",
    "Un punto de partida claro.",
    "نقطة انطلاق واضحة."
  ],
  [
    "From individual returns to business needs and IRS matters, Elite Taxes OKC provides clear, dependable support for the tax situations that matter most.",
    "Desde declaraciones individuales hasta necesidades empresariales y asuntos con el IRS, Elite Taxes OKC ofrece apoyo claro y confiable en los temas fiscales que más importan.",
    "من الإقرارات الفردية إلى احتياجات الشركات والمسائل المتعلقة بمصلحة الضرائب الأمريكية، تقدم Elite Taxes OKC دعمًا واضحًا وموثوقًا في أهم الأمور الضريبية."
  ],
  [
    "Organized, detail-focused preparation for individual returns.",
    "Preparación organizada y minuciosa de declaraciones individuales.",
    "إعداد منظم ودقيق للإقرارات الضريبية الفردية."
  ],
  [
    "Tax support for sole proprietors, partnerships, corporations and LLCs.",
    "Apoyo fiscal para propietarios únicos, sociedades, corporaciones y LLC.",
    "دعم ضريبي للمنشآت الفردية والشراكات والشركات والشركات ذات المسؤولية المحدودة."
  ],
  [
    "Help navigating IRS notices, audits and tax disputes.",
    "Ayuda con avisos, auditorías y disputas del IRS.",
    "مساعدة في التعامل مع إشعارات مصلحة الضرائب والتدقيق والنزاعات الضريبية."
  ],
  [
    "View all 9 services ↗",
    "Ver los 9 servicios ↗",
    "عرض الخدمات التسع ↗"
  ],
  [
    "OKC / Tax Support",
    "OKC / Asesoría fiscal",
    "أوكلاهوما سيتي / دعم ضريبي"
  ],
  [
    "Local knowledge.",
    "Conocimiento local.",
    "معرفة محلية."
  ],
  [
    "Personal attention.",
    "Atención personalizada.",
    "اهتمام شخصي."
  ],
  [
    "Tax questions are easier when you know who you’re talking to. Elite Taxes OKC keeps the process direct, understandable and rooted here in Oklahoma City.",
    "Las dudas fiscales son más fáciles de resolver cuando sabe con quién habla. Elite Taxes OKC mantiene el proceso directo, comprensible y cercano a nuestra comunidad de Oklahoma City.",
    "تكون الأسئلة الضريبية أسهل عندما تعرف مع من تتحدث. تجعل Elite Taxes OKC الإجراءات مباشرة ومفهومة، بخبرة محلية من أوكلاهوما سيتي."
  ],
  [
    "LOCAL",
    "LOCAL",
    "الموقع"
  ],
  [
    "SCOPE",
    "SERVICIOS",
    "النطاق"
  ],
  [
    "Individual + business tax support",
    "Apoyo fiscal para personas y empresas",
    "دعم ضريبي للأفراد والشركات"
  ],
  [
    "CONTACT",
    "CONTACTO",
    "التواصل"
  ],
  [
    "Phone, email or in-person contact",
    "Por teléfono, correo o en persona",
    "هاتفياً أو بالبريد الإلكتروني أو بالحضور شخصياً"
  ],
  [
    "Process",
    "Proceso",
    "الخطوات"
  ],
  [
    "A straightforward",
    "Un camino",
    "خطوات"
  ],
  [
    "path.",
    "sencillo.",
    "واضحة."
  ],
  [
    "Every tax situation is different. The process should still feel clear.",
    "Cada situación fiscal es diferente. Aun así, el proceso debe ser claro.",
    "تختلف كل حالة ضريبية عن الأخرى، لكن ينبغي أن تبقى الإجراءات واضحة."
  ],
  [
    "Start with the situation.",
    "Cuéntenos su situación.",
    "نبدأ بفهم وضعك."
  ],
  [
    "Tell us what you need help with and share the relevant documents or notices.",
    "Díganos en qué necesita ayuda y comparta los documentos o avisos correspondientes.",
    "أخبرنا بما تحتاج إلى مساعدة فيه، وشارك المستندات أو الإشعارات ذات الصلة."
  ],
  [
    "Review the details.",
    "Revisamos los detalles.",
    "نراجع التفاصيل."
  ],
  [
    "We organize the information, identify the work involved and clarify what comes next.",
    "Organizamos la información, identificamos el trabajo necesario y aclaramos los próximos pasos.",
    "ننظم المعلومات ونحدد العمل المطلوب ونوضح الخطوات التالية."
  ],
  [
    "Move forward clearly.",
    "Avanzamos con claridad.",
    "نمضي قدماً بوضوح."
  ],
  [
    "Preparation, filing or representation is handled with direct communication throughout the process.",
    "Ya sea preparación, presentación o representación, mantenemos una comunicación directa durante todo el proceso.",
    "نتولى إعداد الإقرارات أو تقديمها أو التمثيل الضريبي مع تواصل مباشر طوال العملية."
  ],
  [
    "Not sure which service fits your situation?",
    "¿No sabe qué servicio necesita?",
    "لست متأكداً من الخدمة المناسبة لحالتك؟"
  ],
  [
    "Start a conversation ↗",
    "Hablemos ↗",
    "تواصل معنا ↗"
  ],
  [
    "Ready when",
    "Listos cuando",
    "نحن مستعدون"
  ],
  [
    "you are.",
    "usted lo esté.",
    "عندما تكون مستعداً."
  ],
  [
    "Call, email or visit Elite Taxes OKC to get started.",
    "Llame, escriba o visite Elite Taxes OKC para comenzar.",
    "اتصل بنا أو راسلنا أو زر مكتب Elite Taxes OKC للبدء."
  ],
  [
    "Contact Elite Taxes",
    "Contactar a Elite Taxes",
    "تواصل مع Elite Taxes"
  ],
  [
    "We treat it that way.",
    "Y así los tratamos.",
    "ونتعامل معها على هذا الأساس."
  ],
  [
    "Clear, responsive tax support for individuals and businesses in Oklahoma City.",
    "Asesoría fiscal clara y oportuna para personas y empresas en Oklahoma City.",
    "دعم ضريبي واضح وسريع الاستجابة للأفراد والشركات في أوكلاهوما سيتي."
  ],
  [
    "Clarity first.",
    "Primero, claridad.",
    "الوضوح أولاً."
  ],
  [
    "Details always.",
    "Siempre, atención al detalle.",
    "والاهتمام بالتفاصيل دائماً."
  ],
  [
    "Elite Taxes OKC helps people navigate tax preparation and more complex tax matters without making the process feel harder than it needs to be.",
    "Elite Taxes OKC ayuda a las personas con la preparación de impuestos y asuntos fiscales más complejos sin complicar innecesariamente el proceso.",
    "تساعد Elite Taxes OKC العملاء في إعداد الضرائب والتعامل مع المسائل الضريبية المعقدة دون جعل الإجراءات أصعب مما ينبغي."
  ],
  [
    "The approach is straightforward: understand the situation, pay attention to the details and communicate clearly about what comes next.",
    "Nuestro enfoque es sencillo: comprender la situación, cuidar los detalles y explicar con claridad los siguientes pasos.",
    "نهجنا بسيط: نفهم الحالة، ونهتم بالتفاصيل، ونوضح الخطوات التالية بجلاء."
  ],
  [
    "Explore services ↗",
    "Explorar servicios ↗",
    "استكشف الخدمات ↗"
  ],
  [
    "01 / Local",
    "01 / Local",
    "01 / محلي"
  ],
  [
    "02 / Support",
    "02 / Apoyo",
    "02 / الدعم"
  ],
  [
    "Individuals + Businesses",
    "Personas + Empresas",
    "الأفراد + الشركات"
  ],
  [
    "03 / Contact",
    "03 / Contacto",
    "03 / التواصل"
  ],
  [
    "Phone, Email or In Person",
    "Teléfono, correo o en persona",
    "هاتفياً أو بالبريد الإلكتروني أو شخصياً"
  ],
  [
    "The standard",
    "Nuestro compromiso",
    "معيارنا"
  ],
  [
    "Clear work.",
    "Trabajo claro.",
    "عمل واضح."
  ],
  [
    "Clear communication.",
    "Comunicación clara.",
    "تواصل واضح."
  ],
  [
    "Tax work can involve a lot of moving pieces. Elite Taxes OKC focuses on keeping the experience organized and understandable, whether you’re preparing a return, working through a business issue or dealing with the IRS.",
    "Los asuntos fiscales pueden tener muchas partes. Elite Taxes OKC se enfoca en mantener todo organizado y fácil de entender, ya sea para preparar una declaración, resolver un asunto empresarial o tratar con el IRS.",
    "قد تتضمن المسائل الضريبية تفاصيل كثيرة. تركز Elite Taxes OKC على جعل التجربة منظمة وسهلة الفهم، سواء كنت تعد إقراراً أو تعالج مسألة تخص شركتك أو تتعامل مع مصلحة الضرائب الأمريكية."
  ],
  [
    "That means careful preparation, direct answers and a person you can reach when you have a question.",
    "Eso significa preparación cuidadosa, respuestas directas y alguien disponible cuando tenga preguntas.",
    "وهذا يعني إعداداً دقيقاً وإجابات مباشرة وشخصاً يمكنك التواصل معه عند وجود أسئلة."
  ],
  [
    "Clear support.",
    "Asesoría clara.",
    "دعم واضح."
  ],
  [
    "Tax services for individuals, businesses and more complex situations.",
    "Servicios fiscales para personas, empresas y situaciones más complejas.",
    "خدمات ضريبية للأفراد والشركات والحالات الأكثر تعقيداً."
  ],
  [
    "Accurate, organized individual return preparation with attention to the details that matter.",
    "Preparación precisa y organizada de declaraciones individuales, con atención a los detalles importantes.",
    "إعداد دقيق ومنظم للإقرارات الفردية مع الاهتمام بالتفاصيل المهمة."
  ],
  [
    "Business Tax Audits",
    "Auditorías fiscales empresariales",
    "تدقيق ضرائب الشركات"
  ],
  [
    "Support for business tax audit matters and related documentation.",
    "Apoyo en auditorías fiscales empresariales y la documentación relacionada.",
    "دعم في مسائل تدقيق ضرائب الشركات والوثائق المرتبطة بها."
  ],
  [
    "Workers Compensation",
    "Compensación laboral",
    "تعويضات العمال"
  ],
  [
    "Practical support to help businesses stay organized with workers’ compensation requirements and documentation.",
    "Apoyo práctico para que las empresas organicen los requisitos y documentos de compensación laboral.",
    "مساعدة عملية للشركات في تنظيم متطلبات تعويضات العمال ووثائقها."
  ],
  [
    "Support communicating with the IRS and navigating audits, notices and tax disputes.",
    "Apoyo para comunicarse con el IRS y atender auditorías, avisos y controversias fiscales.",
    "مساعدة في التواصل مع مصلحة الضرائب الأمريكية والتعامل مع التدقيق والإشعارات والنزاعات الضريبية."
  ],
  [
    "Power of Attorney",
    "Poder de representación",
    "التوكيل الرسمي"
  ],
  [
    "Assistance with tax-related authorization and representation matters.",
    "Asistencia con autorizaciones y representación en asuntos fiscales.",
    "مساعدة في التفويض والتمثيل في المسائل الضريبية."
  ],
  [
    "ITIN Applications",
    "Solicitudes de ITIN",
    "طلبات رقم التعريف الضريبي الفردي (ITIN)"
  ],
  [
    "Assistance with Individual Taxpayer Identification Number applications and related filing needs.",
    "Asistencia con solicitudes del Número de Identificación Personal del Contribuyente (ITIN) y trámites relacionados.",
    "مساعدة في طلبات رقم التعريف الضريبي الفردي (ITIN) ومتطلبات تقديم الإقرارات المرتبطة بها."
  ],
  [
    "Estate & Trust",
    "Herencias y fideicomisos",
    "التركات والصناديق الاستئمانية"
  ],
  [
    "Tax guidance for estates, trusts, gifting and related filing considerations.",
    "Orientación fiscal para herencias, fideicomisos, donaciones y declaraciones relacionadas.",
    "إرشادات ضريبية للتركات والصناديق الاستئمانية والهبات وما يرتبط بها من متطلبات تقديم."
  ],
  [
    "Tax Credits",
    "Créditos fiscales",
    "الإعفاءات والائتمانات الضريبية"
  ],
  [
    "Help identifying applicable credits and opportunities based on your specific tax situation.",
    "Ayuda para identificar créditos y beneficios aplicables según su situación fiscal.",
    "مساعدة في تحديد الائتمانات والفرص الضريبية المناسبة لحالتك."
  ],
  [
    "Questions?",
    "¿Tiene preguntas?",
    "هل لديك أسئلة؟"
  ],
  [
    "Not sure which service fits?",
    "¿No sabe qué servicio necesita?",
    "لست متأكداً من الخدمة المناسبة؟"
  ],
  [
    "Contact Us",
    "Contáctenos",
    "اتصل بنا"
  ],
  [
    "Start with a",
    "Comencemos con una",
    "لنبدأ"
  ],
  [
    "conversation.",
    "conversación.",
    "بمحادثة."
  ],
  [
    "Reach out by phone or email, or visit the Elite Taxes OKC office in Oklahoma City.",
    "Comuníquese por teléfono o correo, o visite la oficina de Elite Taxes OKC en Oklahoma City.",
    "تواصل معنا هاتفياً أو بالبريد الإلكتروني، أو زر مكتب Elite Taxes OKC في أوكلاهوما سيتي."
  ],
  [
    "Primary phone",
    "Teléfono principal",
    "الهاتف الرئيسي"
  ],
  [
    "Secondary phone",
    "Teléfono alternativo",
    "الهاتف البديل"
  ],
  [
    "Email",
    "Correo electrónico",
    "البريد الإلكتروني"
  ],
  [
    "Office",
    "Oficina",
    "المكتب"
  ],
  [
    "Get in touch",
    "Póngase en contacto",
    "تواصل معنا"
  ],
  [
    "Tell us what you need help with.",
    "Cuéntenos en qué podemos ayudarle.",
    "أخبرنا بما تحتاج إلى مساعدة فيه."
  ],
  [
    "Call or email Elite Taxes OKC with a brief description of your tax situation. We’ll help you determine the next step.",
    "Llame o escriba a Elite Taxes OKC y describa brevemente su situación fiscal. Le ayudaremos a determinar el siguiente paso.",
    "اتصل بمكتب Elite Taxes OKC أو راسله مع وصف موجز لوضعك الضريبي، وسنساعدك في تحديد الخطوة التالية."
  ],
  [
    "Send an Email ↗",
    "Enviar correo ↗",
    "إرسال بريد إلكتروني ↗"
  ],
  [
    "Office details",
    "Datos de la oficina",
    "تفاصيل المكتب"
  ],
  [
    "Office hours and appointment details available by phone or email.",
    "Consulte los horarios y las citas por teléfono o correo electrónico.",
    "يمكن الاستفسار عن ساعات العمل والمواعيد هاتفياً أو بالبريد الإلكتروني."
  ],
  [
    "Local support, direct contact and a clear next step.",
    "Apoyo local, comunicación directa y un siguiente paso claro.",
    "دعم محلي وتواصل مباشر وخطوة تالية واضحة."
  ],
  [
    "Open menu",
    "Abrir menú",
    "افتح القائمة"
  ],
  [
    "Elite Taxes OKC on Facebook",
    "Elite Taxes OKC en Facebook",
    "Elite Taxes OKC على فيسبوك"
  ],
  [
    "Tax forms and financial documents",
    "Formularios fiscales y documentos financieros",
    "نماذج ضريبية ومستندات مالية"
  ],
  [
    "Professional business consultation",
    "Asesoría profesional para empresas",
    "استشارة مهنية للأعمال"
  ],
  [
    "Elite Taxes OKC mark",
    "Emblema de Elite Taxes OKC",
    "شعار Elite Taxes OKC"
  ],
  [
    "Tax documents and preparation materials",
    "Documentos fiscales y materiales de preparación",
    "مستندات ضريبية ومواد إعداد الإقرارات"
  ],
  [
    "Tax documents being reviewed",
    "Revisión de documentos fiscales",
    "مراجعة المستندات الضريبية"
  ],
  [
    "Professional office paperwork and tax support",
    "Documentos de oficina y asistencia fiscal profesional",
    "مستندات مكتبية ودعم ضريبي مهني"
  ]
].map(([source, es, ar]) => [source, { es, ar }]));
  const metadata = {
  "Elite Taxes OKC | Tax Preparation & Tax Support": [
    "Elite Taxes OKC | Preparación y asesoría fiscal",
    "Elite Taxes OKC | إعداد الضرائب والدعم الضريبي"
  ],
  "About | Elite Taxes OKC": [
    "Nosotros | Elite Taxes OKC",
    "من نحن | Elite Taxes OKC"
  ],
  "Services | Elite Taxes OKC": [
    "Servicios | Elite Taxes OKC",
    "الخدمات | Elite Taxes OKC"
  ],
  "Contact | Elite Taxes OKC": [
    "Contacto | Elite Taxes OKC",
    "اتصل بنا | Elite Taxes OKC"
  ],
  "Elite Taxes OKC provides personal and business tax preparation, IRS representation and tax support in Oklahoma City.": [
    "Elite Taxes OKC ofrece preparación de impuestos personales y empresariales, representación ante el IRS y asesoría fiscal en Oklahoma City.",
    "تقدم Elite Taxes OKC إعداد الضرائب للأفراد والشركات والتمثيل أمام مصلحة الضرائب الأمريكية والدعم الضريبي في أوكلاهوما سيتي."
  ],
  "Learn about Elite Taxes OKC and its straightforward approach to personal and business tax support in Oklahoma City.": [
    "Conozca Elite Taxes OKC y su enfoque claro para ayudar a personas y empresas con sus impuestos en Oklahoma City.",
    "تعرّف على Elite Taxes OKC ونهجها الواضح في الدعم الضريبي للأفراد والشركات في أوكلاهوما سيتي."
  ],
  "Personal and business tax preparation, IRS representation, ITIN applications, estate and trust tax support and more from Elite Taxes OKC.": [
    "Preparación de impuestos personales y empresariales, representación ante el IRS, solicitudes de ITIN, herencias, fideicomisos y más en Elite Taxes OKC.",
    "إعداد ضرائب الأفراد والشركات والتمثيل أمام مصلحة الضرائب وطلبات ITIN ودعم ضرائب التركات والصناديق الاستئمانية والمزيد."
  ],
  "Contact Elite Taxes OKC at 405-778-5388 or elitetaxesllcokc@gmail.com. Office: 1117 N Robinson Ave, Suite 205, Oklahoma City, OK 73103.": [
    "Comuníquese con Elite Taxes OKC al 405-778-5388 o elitetaxesllcokc@gmail.com. Oficina: 1117 N Robinson Ave, Suite 205, Oklahoma City, OK 73103.",
    "تواصل مع Elite Taxes OKC عبر 405-778-5388 أو elitetaxesllcokc@gmail.com. المكتب: 1117 N Robinson Ave, Suite 205, Oklahoma City, OK 73103."
  ]
};
  const supported = new Set(['en', 'es', 'ar']);
  const labels = {
    en: 'Language',
    es: 'Idioma',
    ar: 'اللغة'
  };
  const originalText = new WeakMap();
  const originalAttributes = new WeakMap();
  const originalTitle = document.title;
  const description = document.querySelector('meta[name="description"]');
  const originalDescription = description?.getAttribute('content');

  let savedLanguage = 'en';
  try {
    const saved = localStorage.getItem('elite-taxes-language');
    if (supported.has(saved)) savedLanguage = saved;
  } catch (_) {
    // Private browsing or disabled storage: the control still works this visit.
  }

  const switcher = document.createElement('div');
  switcher.className = 'site-language-switcher';
  switcher.setAttribute('dir', 'ltr');
  switcher.innerHTML = '<span class="language-globe" aria-hidden="true">🌐</span>' +
    '<label class="visually-hidden" for="site-language-select">Language</label>' +
    '<select id="site-language-select" name="language">' +
    '<option value="en">English</option>' +
    '<option value="es">Español</option>' +
    '<option value="ar">العربية</option>' +
    '</select>';
  document.body.appendChild(switcher);

  const select = switcher.querySelector('select');
  const label = switcher.querySelector('label');

  function translateValue(source, language) {
    const key = source.trim();
    const translated = language === 'en' ? key : dictionary[key]?.[language];
    return translated ? source.replace(key, translated) : source;
  }

  function setLanguage(language) {
    if (!supported.has(language)) language = 'en';

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      const parent = node.parentElement;
      if (!parent || parent.closest('.site-language-switcher, script, style, svg, noscript')) continue;
      if (!originalText.has(node)) originalText.set(node, node.nodeValue);
      node.nodeValue = translateValue(originalText.get(node), language);
    }

    document.querySelectorAll('[alt], [aria-label]').forEach(element => {
      if (element.closest('.site-language-switcher')) return;
      if (!originalAttributes.has(element)) {
        originalAttributes.set(element, {
          alt: element.getAttribute('alt'),
          ariaLabel: element.getAttribute('aria-label')
        });
      }
      const original = originalAttributes.get(element);
      if (original.alt !== null) element.setAttribute('alt', translateValue(original.alt, language));
      if (original.ariaLabel !== null) element.setAttribute('aria-label', translateValue(original.ariaLabel, language));
    });

    const metaIndex = language === 'es' ? 0 : 1;
    document.title = language === 'en' ? originalTitle : metadata[originalTitle]?.[metaIndex] || originalTitle;
    if (description && originalDescription) {
      const next = language === 'en' ? originalDescription : metadata[originalDescription]?.[metaIndex] || originalDescription;
      description.setAttribute('content', next);
    }

    document.documentElement.setAttribute('lang', language);
    document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
    label.textContent = labels[language];
    select.setAttribute('aria-label', labels[language]);
    select.value = language;
  }

  select.addEventListener('change', () => {
    const language = select.value;
    try {
      localStorage.setItem('elite-taxes-language', language);
    } catch (_) {}
    setLanguage(language);
  });

  setLanguage(savedLanguage);
})();
