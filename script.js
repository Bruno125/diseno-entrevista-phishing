const scenarios = [
    {
        id: 1,
        type: 'email',
        title: 'Correo Electrónico de BCP',
        isPhishing: true,
        content: `
            <div class="email-simulation">
                <div class="email-header">
                    <p><strong>De:</strong> seguridad@bcpbanco.pe</p>
                    <p><strong>Asunto:</strong> Alerta de Seguridad - Acceso Sospechoso</p>
                </div>
                <div class="email-content">
                    <p>Estimado cliente,</p>
                    <p>Hemos detectado un intento de acceso sospechoso a su cuenta. Por su seguridad, por favor verifique su información haciendo clic en el siguiente enlace:</p>
                    <p><a href="#" class="interactive-element phishing-link" data-url="https://bcpbanco-verificacion.com/login.php">Verificar mi cuenta</a></p>
                    <p>Si no realiza esta acción, su cuenta podría ser bloqueada temporalmente.</p>
                    <p>Atentamente,<br>Equipo de Seguridad BCP</p>
                </div>
            </div>
        `,
        phishingIndicators: [
            'El dominio del remitente es "bcpbanco.pe" en lugar de "bcp.com.pe"',
            'El enlace redirige a un sitio web sospechoso (bcpbanco-verificacion.com)',
            'El mensaje genera urgencia y miedo para forzar una acción rápida'
        ],
        feedback: {
            correct: '¡Correcto! Has identificado correctamente un intento de phishing. Este correo contiene señales de alerta: un dominio incorrecto (bcpbanco.pe), un enlace sospechoso, y un mensaje que intenta crear urgencia.',
            incorrect: 'Este era un intento de phishing. Fíjate en estos detalles: el dominio del remitente es "bcpbanco.pe" (no el oficial "bcp.com.pe") y el enlace redirige a un sitio sospechoso "bcpbanco-verificacion.com".'
        }
    },
    // {
    //     id: 2,
    //     type: 'email',
    //     title: 'Correo Electrónico de BCP',
    //     isPhishing: false,
    //     content: `
    //         <div class="email-simulation">
    //             <div class="email-header">
    //                 <p><strong>De:</strong> notificaciones@bcp.com.pe</p>
    //                 <p><strong>Asunto:</strong> Resumen de Operaciones - Mayo 2023</p>
    //             </div>
    //             <div class="email-content">
    //                 <p>Estimado cliente,</p>
    //                 <p>Le enviamos el resumen de operaciones de su cuenta para el mes de Mayo 2023.</p>
    //                 <p>Puede verificar todas sus operaciones iniciando sesión en nuestra Banca por Internet: <a href="#" class="interactive-element legitimate-link" data-url="https://www.viabcp.com">www.viabcp.com</a></p>
    //                 <p>Recuerde que nunca le solicitaremos datos confidenciales como claves o números completos de tarjeta por correo electrónico.</p>
    //                 <p>Atentamente,<br>Banco de Crédito BCP</p>
    //             </div>
    //         </div>
    //     `,
    //     legitimateIndicators: [
    //         'El dominio del remitente es el oficial (bcp.com.pe)',
    //         'El enlace redirige al sitio oficial del banco (viabcp.com)',
    //         'El mensaje no solicita información confidencial ni crea urgencia',
    //         'Incluye un recordatorio de seguridad'
    //     ],
    //     feedback: {
    //         correct: '¡Correcto! Este es un correo legítimo del BCP. El dominio del remitente es correcto (bcp.com.pe), el enlace es al sitio oficial (viabcp.com), y contiene un recordatorio de seguridad.',
    //         incorrect: 'Este era un correo legítimo del BCP. Fíjate que el dominio del remitente es el oficial (bcp.com.pe), el enlace dirige a la página oficial (viabcp.com), y el mensaje incluye recordatorios de seguridad.'
    //     }
    // },
    {
        id: 3,
        type: 'sms',
        title: 'Mensaje de Texto',
        isPhishing: true,
        content: `
            <div class="sms-simulation">
                <div class="sms-header">
                    <p><strong>De:</strong> BCP</p>
                </div>
                <div class="sms-content">
                    <p>BCP: Su cuenta ha sido bloqueada temporalmente por motivos de seguridad. Para desbloquear, ingrese a: <a href="#" class="interactive-element phishing-link" data-url="https://bcp-seguridadonline.com/desbloqueo">bcp-desbloqueo.xyz</a></p>
                </div>
            </div>
        `,
        phishingIndicators: [
            'El enlace utiliza un dominio que no es oficial (bcp-desbloqueo.xyz)',
            'El mensaje crea urgencia mediante un supuesto bloqueo',
            'No incluye información personalizada del cliente'
        ],
        feedback: {
            correct: '¡Bien hecho! Has identificado correctamente un intento de phishing por SMS. El enlace utiliza un dominio falso (bcp-desbloqueo.xyz) y el mensaje intenta crear urgencia para que actúes rápidamente.',
            incorrect: 'Este era un intento de phishing. El enlace utiliza un dominio falso (bcp-desbloqueo.xyz) y el banco nunca te enviará enlaces en mensajes de texto para desbloquear tu cuenta.'
        }
    },
    {
        id: 4,
        type: 'whatsapp',
        title: 'Mensaje de WhatsApp',
        isPhishing: true,
        content: `
            <div class="whatsapp-simulation">
                <div class="whatsapp-header">
                    <p><strong>De:</strong> +51 999 123 456</p>
                </div>
                <div class="whatsapp-content">
                    <p>🎉 ¡Felicidades! Ha sido seleccionado para participar en la promoción especial del BCP por su aniversario. Reclame su premio de S/1,000 aquí: <a href="#" class="interactive-element phishing-link" data-url="https://bcpromotions-peru.com/claim">bcppromos.net</a></p>
                </div>
            </div>
        `,
        phishingIndicators: [
            'Número de teléfono desconocido, no un canal oficial del banco',
            'Ofrece un premio monetario demasiado bueno para ser verdad',
            'El enlace utiliza un dominio que no es oficial (bcppromos.net)'
        ],
        feedback: {
            correct: '¡Excelente! Has identificado correctamente un intento de phishing por WhatsApp. El banco nunca te contactará por WhatsApp desde números desconocidos para ofrecer premios, y el enlace utiliza un dominio falso.',
            incorrect: 'Este era un intento de phishing. El banco nunca te contactará por WhatsApp desde números desconocidos para ofrecer premios, y el enlace utiliza un dominio que no pertenece al banco.'
        }
    },
    {
        id: 5,
        type: 'sms',
        title: 'Mensaje de Texto',
        isPhishing: false,
        content: `
            <div class="sms-simulation">
                <div class="sms-header">
                    <p><strong>De:</strong> BCP</p>
                </div>
                <div class="sms-content">
                    <p>BCP: Se realizó una compra de S/150.00 en WONG SAN ISIDRO con su tarjeta terminada en 4568 el 15/05/2023 18:45. Si no reconoce esta operación, bloquee su tarjeta en la app o llamando al 311-9898.</p>
                </div>
            </div>
        `,
        legitimateIndicators: [
            'No contiene enlaces sospechosos',
            'Proporciona información específica (número parcial de tarjeta, fecha, monto)',
            'Recomienda canales seguros para reportar (app oficial o teléfono oficial)'
        ],
        feedback: {
            correct: '¡Correcto! Este es un SMS legítimo del BCP. Contiene información específica sobre la transacción, no incluye enlaces sospechosos, y recomienda canales oficiales para reportar problemas.',
            incorrect: 'Este era un SMS legítimo del BCP. No contiene enlaces sospechosos, proporciona información específica sobre la transacción, y recomienda canales oficiales para reportar problemas.'
        }
    },
    // {
    //     id: 6,
    //     type: 'multi-step',
    //     title: 'Actualización de Datos - BCP',
    //     isPhishing: true,
    //     step: 1,
    //     totalSteps: 2,
    //     content: `
    //         <div class="form-simulation">
    //             <div class="email-header">
    //                 <p><strong>De:</strong> actualizacion@bcp-clientes.com</p>
    //                 <p><strong>Asunto:</strong> Actualización obligatoria de datos - Evite bloqueos</p>
    //             </div>
    //             <div class="email-content">
    //                 <p>Estimado cliente,</p>
    //                 <p>Por disposición de la Superintendencia de Banca y Seguros, todos nuestros clientes deben actualizar su información personal. De no hacerlo en las próximas 48 horas, su cuenta podría sufrir restricciones temporales.</p>
    //                 <p>Por favor complete el siguiente formulario:</p>
                    
    //                 <div class="form-step" id="form-step-1">
    //                     <div class="form-group">
    //                         <label for="nombre">Nombre completo:</label>
    //                         <input type="text" id="nombre" placeholder="Ingrese su nombre completo">
    //                     </div>
    //                     <div class="form-group">
    //                         <label for="dni">Número de DNI:</label>
    //                         <input type="text" id="dni" placeholder="Ingrese su DNI">
    //                     </div>
    //                     <div class="form-group">
    //                         <label for="telefono">Número de teléfono:</label>
    //                         <input type="text" id="telefono" placeholder="Ingrese su número de teléfono">
    //                     </div>
    //                     <button class="form-submit interactive-element" id="continue-btn">Continuar</button>
    //                 </div>
    //             </div>
    //         </div>
    //     `,
    //     phishingIndicators: [
    //         'El dominio del remitente es sospechoso (bcp-clientes.com, no el oficial bcp.com.pe)',
    //         'Crea urgencia con una amenaza de restricción en 48 horas',
    //         'Menciona a la SBS para dar falsa legitimidad',
    //         'Solicita información personal a través de un formulario en correo'
    //     ],
    //     feedback: {
    //         step1: 'Ten cuidado. Este formulario está solicitando tu información personal. ¿Deseas continuar?',
    //         correct: '¡Muy bien! Has identificado correctamente un sofisticado intento de phishing multi-paso. El correo viene de un dominio falso (bcp-clientes.com) y el banco nunca te pedirá datos confidenciales a través de formularios en correos.',
    //         incorrect: 'Este era un intento de phishing sofisticado. Observa que el correo viene de un dominio falso (bcp-clientes.com) y los bancos nunca solicitan datos confidenciales a través de formularios en correos electrónicos.'
    //     },
    //     nextStep: {
    //         content: `
    //             <div class="form-simulation">
    //                 <div class="email-header">
    //                     <p><strong>De:</strong> actualizacion@bcp-clientes.com</p>
    //                     <p><strong>Asunto:</strong> Actualización obligatoria de datos - Paso 2</p>
    //                 </div>
    //                 <div class="email-content">
    //                     <p>Gracias por la información proporcionada.</p>
    //                     <p>Para completar el proceso de actualización, por favor proporcione los siguientes datos adicionales:</p>
                        
    //                     <div class="form-step" id="form-step-2">
    //                         <div class="form-group">
    //                             <label for="tarjeta">Número de tarjeta:</label>
    //                             <input type="text" id="tarjeta" placeholder="Ingrese el número de su tarjeta">
    //                         </div>
    //                         <div class="form-group">
    //                             <label for="cvv">Código CVV:</label>
    //                             <input type="text" id="cvv" placeholder="Ingrese el código de seguridad (CVV)">
    //                         </div>
    //                         <div class="form-group">
    //                             <label for="clave">Clave digital:</label>
    //                             <input type="password" id="clave" placeholder="Ingrese su clave digital">
    //                         </div>
    //                         <button class="form-submit interactive-element" id="submit-btn">Finalizar actualización</button>
    //                     </div>
    //                 </div>
    //             </div>
    //         `
    //     }
    // },
    {
        id: 7,
        type: 'email',
        title: 'Correo Electrónico - Actividad Sospechosa',
        isPhishing: true,
        content: `
            <div class="email-simulation">
                <div class="email-header">
                    <p><strong>De:</strong> Soporte BCP <ti.soporte@bcp.pe></p>
                    <p><strong>Para:</strong> Oscar Vite <ovite@bcp.com.pe></p>
                </div>
                <div class="email-warning-banner">
                    ADVERTENCIA: Este es un email externo. 1. Verifique el remitente 2. No descargue adjuntos desconocidos 3. No haga click en links y 4. Ante sospechas reporte al buzón "Alerta Correo Sospechoso"
                </div>
                <div class="email-content">
                    <p>Estimado Oscar,</p>
                    <p>Nuestro sistema <strong>ha detectado un archivo sospechoso en tu equipo corporativo.</strong></p>
                    <p>Para evitar una posible vulnerabilidad, ejecuta el siguiente <strong>archivo de diagnóstico</strong> y envíanos el reporte.</p>
                    <p><a href="#" class="interactive-element phishing-link" data-url="https://bcp-diagnostico-seguridad.online/scanner.exe">📩 Herramienta de Diagnóstico Automático</a></p>
                    <p>Atentamente,<br>Equipo de Soporte BCP</p>
                </div>
            </div>
        `,
        phishingIndicators: [
            'El dominio del remitente es sospechoso (bcp.pe en lugar de bcp.com.pe)',
            'Tiene una advertencia sobre correo externo pero pretende ser del soporte interno',
            'Solicita ejecutar una herramienta/archivo descargable (potencialmente malware)',
            'El enlace lleva a un dominio no oficial (bcp-diagnostico-seguridad.online)'
        ],
        feedback: {
            correct: '¡Muy bien! Has identificado correctamente un intento de phishing sofisticado. Este correo pretende ser del soporte técnico interno pero viene de un dominio externo. Ningún departamento de TI legítimo te pedirá descargar herramientas de diagnóstico a través de enlaces en correos.',
            incorrect: 'Este era un intento de phishing. El correo viene de un dominio sospechoso y ningún departamento de TI legítimo te pedirá descargar herramientas a través de enlaces en correos. Además, la advertencia del correo externo contradice que sea del soporte interno.'
        }
    },
    {
        id: 8,
        type: 'email',
        title: 'Correo Electrónico - Incentivo Laboral',
        isPhishing: true,
        content: `
            <div class="email-simulation">
                <div class="email-header">
                    <p><strong>De:</strong> Compensaciones BCP <compensaciones.bcp@bcpbenefits.com></p>
                    <p><strong>Para:</strong> Oscar Vite <ovite@bcp.com.pe></p>
                </div>
                <div class="email-content">
                    <p>Hola Oscar,</p>
                    <p>Como parte del nuevo programa de incentivos y/o facilidades para el trabajo híbrido, tienes acceso a un <strong>bono de S/ 500.</strong></p>
                    <p>Para revisar la fecha de depósito en tu cuenta, accede aquí y sigue los pasos indicados:</p>
                    <p><a href="#" class="interactive-element phishing-link" data-url="https://bcp-rewards.net/claim-bonus">Reclamar mi bono</a></p>
                    <p>¡Gracias por ser siempre mínimo dar lo máximo!</p>
                </div>
            </div>
        `,
        phishingIndicators: [
            'El dominio del remitente es sospechoso (bcpbenefits.com en lugar de bcp.com.pe)',
            'Ofrece dinero como gancho para hacer clic',
            'El enlace lleva a un dominio no oficial (bcp-rewards.net)',
            'El mensaje imita comunicaciones internas pero con pequeñas inconsistencias'
        ],
        feedback: {
            correct: '¡Correcto! Este es un intento de phishing que imita una comunicación interna de recursos humanos. Observa que el dominio del remitente no es oficial (bcpbenefits.com) y el enlace lleva a un sitio externo sospechoso (bcp-rewards.net).',
            incorrect: 'Este era un intento de phishing. El dominio del remitente no es oficial (bcpbenefits.com) y el enlace lleva a un sitio externo sospechoso (bcp-rewards.net). Los anuncios de beneficios legítimos siempre vendrán de dominios oficiales de la empresa.'
        }
    },
    {
        id: 9,
        type: 'sms',
        title: 'Mensaje de Texto - Paquete en Espera',
        isPhishing: true,
        content: `
            <div class="sms-simulation">
                <div class="sms-header">
                    <p><strong>De:</strong> gob.pe</p>
                </div>
                <div class="sms-content">
                    <p>El paquete ha llegado al almacén de entrega, pero no se puede determinar la dirección de entrega. Por favor, vuelva a completar la información de la dirección con precisión. Lo entregaremos en un plazo de 24 horas: <a href="#" class="interactive-element phishing-link" data-url="https://wwwgobpeiserposst.com/serpost">wwwgobpeiserposst.com/serpost</a></p>
                    <p>(Por favor, responda con Y, luego cierre el mensaje de texto y ábralo nuevamente para activar el enlace, o copie el enlace y ábralo en el navegador Safari.)</p>
                </div>
            </div>
        `,
        phishingIndicators: [
            'El mensaje se hace pasar por una entidad gubernamental (gob.pe)',
            'El URL contiene errores tipográficos (wwwgobpeiserposst.com)',
            'Incluye instrucciones sospechosas para "activar" el enlace',
            'Crea urgencia con un plazo de entrega de 24 horas'
        ],
        feedback: {
            correct: '¡Excelente! Has identificado correctamente un intento de phishing por SMS que imita a una entidad gubernamental. Observa el URL con errores tipográficos (wwwgobpeiserposst.com) y las instrucciones sospechosas para activar el enlace.',
            incorrect: 'Este era un intento de phishing. El mensaje imita a una entidad gubernamental pero contiene un URL con errores tipográficos (wwwgobpeiserposst.com) y instrucciones sospechosas para activar el enlace.'
        }
    }
];

let currentScenarioIndex = 0;
let currentScenario = null;
let decisionMade = false;

function loadScenario(index) {
    // Set current scenario
    currentScenario = scenarios[index];
    decisionMade = false;
    
    // References to DOM elements
    const titleContainer = document.getElementById('scenario-title');
    const scenarioContainer = document.getElementById('scenario-container');
    const decisionContainer = document.getElementById('decision-container');
    const feedbackContainer = document.getElementById('feedback-container');
    const nextButton = document.getElementById('next-button');
    
    // Reset UI
    feedbackContainer.classList.add('hidden');
    feedbackContainer.classList.remove('success', 'danger', 'warning');
    nextButton.classList.add('hidden');
    
    // Display scenario title
    titleContainer.textContent = currentScenario.title;
    
    // Load scenario content
    scenarioContainer.innerHTML = currentScenario.content;
    
    // Show decision container
    decisionContainer.classList.remove('hidden');
    
    // Add event listeners for multi-step scenario
    if (currentScenario.type === 'multi-step') {
        const continueBtn = document.getElementById('continue-btn');
        if (continueBtn) {
            continueBtn.addEventListener('click', handleMultiStepContinue);
        }
        
        const submitBtn = document.getElementById('submit-btn');
        if (submitBtn) {
            submitBtn.addEventListener('click', () => handleInteraction('submit', currentScenario));
        }
    }
    
    // Add event listeners to interactive elements
    const interactiveElements = scenarioContainer.querySelectorAll('.interactive-element');
    interactiveElements.forEach(element => {
        element.addEventListener('click', () => {
            // For multi-step scenarios, only handle submit button clicks
            if (currentScenario.type === 'multi-step' && !element.id.includes('btn')) {
                return;
            }
            handleInteraction('click', currentScenario);
        });
    });
    
    // Add event listeners to decision buttons
    document.getElementById('report-button').addEventListener('click', () => makeDecision('report'));
    document.getElementById('trust-button').addEventListener('click', () => makeDecision('trust'));
}

function handleMultiStepContinue() {
    if (currentScenario.step < currentScenario.totalSteps) {
        // Update feedback for intermediate step
        const feedbackContainer = document.getElementById('feedback-container');
        const feedbackMessage = document.getElementById('feedback-message');
        
        feedbackContainer.classList.remove('hidden', 'success', 'danger');
        feedbackContainer.classList.add('warning');
        feedbackMessage.textContent = currentScenario.feedback.step1;
        
        // Load next step content
        currentScenario.step++;
        document.getElementById('scenario-container').innerHTML = currentScenario.nextStep.content;
        
        // Add event listener to the new submit button
        const submitBtn = document.getElementById('submit-btn');
        if (submitBtn) {
            submitBtn.addEventListener('click', () => handleInteraction('submit', currentScenario));
        }
    }
}

function handleInteraction(action, scenario) {
    // Don't handle interactions if a decision has been made
    if (decisionMade) return;
    
    // For the first interaction, just show a warning for multi-step
    if (scenario.type === 'multi-step' && action === 'click' && scenario.step === 1) {
        return;
    }
    
    // If the user interacted with a phishing element, we consider it falling for the scam
    // But we'll still require them to make an explicit decision before showing feedback
}

function makeDecision(decision) {
    if (decisionMade) return;
    
    const feedbackContainer = document.getElementById('feedback-container');
    const feedbackMessage = document.getElementById('feedback-message');
    const nextButton = document.getElementById('next-button');
    
    // Determine if the decision was correct
    const isCorrectDecision = (decision === 'report' && currentScenario.isPhishing) || 
                              (decision === 'trust' && !currentScenario.isPhishing);
    
    // Show feedback
    feedbackContainer.classList.remove('hidden', 'success', 'danger', 'warning');
    feedbackContainer.classList.add(isCorrectDecision ? 'success' : 'danger');
    feedbackMessage.textContent = isCorrectDecision ? 
                                  currentScenario.feedback.correct : 
                                  currentScenario.feedback.incorrect;
    nextButton.classList.remove('hidden');
    
    // Mark decision as made
    decisionMade = true;
}

function nextScenario() {
    currentScenarioIndex++;
    if (currentScenarioIndex < scenarios.length) {
        loadScenario(currentScenarioIndex);
    } else {
        // Show completion message
        const titleContainer = document.getElementById('scenario-title');
        const scenarioContainer = document.getElementById('scenario-container');
        const decisionContainer = document.getElementById('decision-container');
        const decisionColumn = document.querySelector('.decision-column');
        
        // Hide the decision column on completion
        if (decisionColumn) {
            decisionColumn.style.display = 'none';
        }
        
        titleContainer.textContent = '';
        scenarioContainer.innerHTML = `
            <div class="completion-message">
                <h2>¡Prueba completada!</h2>
                <p>Gracias por participar en esta prueba de seguridad.</p>
                <p>Recuerde siempre verificar:</p>
                <ul style="text-align: left; margin: 1rem auto; max-width: 400px;">
                    <li>El dominio del remitente de correos</li>
                    <li>La URL de los enlaces antes de hacer clic</li>
                    <li>La autenticidad de las solicitudes de información personal</li>
                    <li>La existencia de errores gramaticales o de formato</li>
                </ul>
                <p>El BCP nunca le solicitará información confidencial por correo electrónico, mensajes de texto o WhatsApp.</p>
            </div>
        `;
        decisionContainer.classList.add('hidden');
        document.getElementById('feedback-container').classList.add('hidden');
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Add new styles for warning banner
    const style = document.createElement('style');
    style.textContent = `
        .email-warning-banner {
            background-color: #fff3cd;
            color: #856404;
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #ffeeba;
            border-radius: 4px;
            font-size: 0.9rem;
        }
    `;
    document.head.appendChild(style);
    
    loadScenario(0);
    document.getElementById('next-button').addEventListener('click', nextScenario);
}); 