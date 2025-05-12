// Simple Q&A responses based on website content
const responses = {
    "مرحبا": "مرحباً! أنا المساعد الشخصي لموقع محمد إبراهيم. كيف يمكنني مساعدتك اليوم؟",
    "من انت": "أنا المساعد الشخصي لموقع محمد إبراهيم. يمكنني الإجابة على أسئلتك حول مهاراته، مشاريعه، وخبراته.",
    "ماذا يمكنك ان تفعل": "يمكنني الإجابة على أسئلتك حول:\n- المهارات التقنية واللغات البرمجية\n- المشاريع السابقة\n- الشهادات والدورات التدريبية\n- الخبرات والمؤهلات\n- كيفية التواصل مع محمد",
    "ما هي مهاراتك": "محمد لديه مهارات متعددة:\n- برمجة Python وعلوم البيانات\n- تطوير الويب Front-End\n- RPA والأتمتة\n- إدارة قواعد البيانات MySQL\n- أنظمة التشغيل Linux و Windows\n- الشبكات والأمن السيبراني",
    "ما هي مشاريعك": "محمد لديه عدة مشاريع مهمة:\n1. نظام الحضور باستخدام RFID\n2. نظام إدارة الطلاب\n3. نظام أتمتة باستخدام RPA\n4. تطبيق ويب لإعادة التدوير",
    "ما هي شهاداتك": "لديه العديد من الشهادات:\n- شهادة Machine Learning من هيئة الفضاء المصرية\n- شهادة تحليل الأعمال\n- شهادة SQL من مهارة تك\n- شهادة Python من مهارة تك\n- شهادة تطوير الويب من مهارة تك\n- شهادة أدوات التحليل",
    "كيف اتواصل معك": "يمكنك التواصل مع محمد عبر:\n- البريد الإلكتروني: Mhmdg7480@gmail.com\n- رقم الهاتف: +2001063697784\n- لينكد إن: linkedin.com/in/mohamed-ibrahim\n- جيت هب: github.com/banhamedo",
    "ما هي لغاتك": "محمد يتحدث:\n- العربية: اللغة الأم\n- الإنجليزية: مستوى متوسط",
    "ما هي خبراتك": "محمد طالب في السنة الثالثة في علوم البيانات بجامعة حلوان الدولية للتكنولوجيا، مع خبرة في:\n- تطوير الويب\n- تحليل البيانات\n- أتمتة العمليات\n- حلول البرمجيات",
    "ما هي خدماتك": "يقدم محمد خدمات:\n1. تحليل البيانات\n2. تطوير RPA\n3. تطوير الويب",
    "default": "عذراً، لم أفهم سؤالك. 😊\n\nيمكنك اختيار أحد الأسئلة التالية:\n\n📚 المهارات والشهادات:\n• ما هي مهاراتك؟\n• ما هي شهاداتك؟\n\n💼 الخبرات والمشاريع:\n• ما هي خبراتك؟\n• ما هي مشاريعك؟\n\n🌐 التواصل والخدمات:\n• كيف اتواصل معك؟\n• ما هي لغاتك؟\n• ما هي خدماتك؟\n\nأو يمكنك إعادة صياغة سؤالك بطريقة أخرى. 🤝"
};

// Suggested questions
const suggestedQuestions = [
    "ما هي مهاراتك؟",
    "ما هي مشاريعك؟",
    "كيف اتواصل معك؟",
    "ما هي شهاداتك؟",
    "ما هي خبراتك؟",
    "ما هي لغاتك؟",
    "ما هي خدماتك؟"
];

// Chat widget HTML
const chatWidget = `
<div class="chat-widget">
    <div class="chat-button" id="chatButton">
        <i class="fas fa-comments"></i>
    </div>
    <div class="chat-window" id="chatWindow">
        <div class="chat-header">
            <span>المساعد الشخصي</span>
            <button id="closeChat"><i class="fas fa-times"></i></button>
        </div>
        <div class="chat-messages" id="chatMessages">
            <div class="message bot-message">مرحباً! أنا المساعد الشخصي لموقع محمد إبراهيم. كيف يمكنني مساعدتك اليوم؟</div>
            <div class="suggested-questions">
                <p class="text-sm text-gray-500 mb-2">يمكنك اختيار أحد هذه الأسئلة:</p>
                <div class="flex flex-wrap gap-2" id="suggestedQuestionsContainer"></div>
            </div>
        </div>
        <div class="chat-input">
            <input type="text" id="userInput" placeholder="اكتب سؤالك هنا...">
            <button id="sendMessage">إرسال</button>
        </div>
    </div>
</div>
`;

// Add chat widget to the page
document.body.insertAdjacentHTML('beforeend', chatWidget);

// Get DOM elements
const chatButton = document.getElementById('chatButton');
const chatWindow = document.getElementById('chatWindow');
const closeChat = document.getElementById('closeChat');
const userInput = document.getElementById('userInput');
const sendMessage = document.getElementById('sendMessage');
const chatMessages = document.getElementById('chatMessages');
const suggestedQuestionsContainer = document.getElementById('suggestedQuestionsContainer');

// Add suggested questions
function addSuggestedQuestions() {
    // Clear previous questions
    suggestedQuestionsContainer.innerHTML = '';
    
    // Add new questions
    suggestedQuestions.forEach(question => {
        const button = document.createElement('button');
        button.className = 'suggested-question';
        button.textContent = question;
        button.addEventListener('click', () => {
            userInput.value = question;
            sendUserMessage();
        });
        suggestedQuestionsContainer.appendChild(button);
    });
}

// Toggle chat window
chatButton.addEventListener('click', () => {
    chatWindow.classList.toggle('active');
    if (chatWindow.classList.contains('active')) {
        addSuggestedQuestions();
    }
});

closeChat.addEventListener('click', () => {
    chatWindow.classList.remove('active');
});

// Send message function
function sendUserMessage() {
    const message = userInput.value.trim();
    if (message) {
        // Add user message
        addMessage(message, 'user-message');
        
        // Get bot response
        const response = getBotResponse(message);
        
        // Add bot response after a short delay
        setTimeout(() => {
            addMessage(response, 'bot-message');
            // Add suggested questions after bot response
            addSuggestedQuestions();
        }, 500);
        
        // Clear input
        userInput.value = '';
    }
}

// Add message to chat
function addMessage(text, className) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${className}`;
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Get bot response
function getBotResponse(message) {
    // Normalize the message by removing question marks and extra spaces
    const normalizedMessage = message.toLowerCase().replace(/[؟?]/g, '').trim();
    
    // Find the matching response
    for (const [key, value] of Object.entries(responses)) {
        const normalizedKey = key.toLowerCase().replace(/[؟?]/g, '').trim();
        if (normalizedMessage === normalizedKey) {
            return value;
        }
    }
    
    return responses.default;
}

// Event listeners for sending messages
sendMessage.addEventListener('click', sendUserMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendUserMessage();
    }
}); 