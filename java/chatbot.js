document.addEventListener('DOMContentLoaded', () => {
    const chatbotToggleButton = document.getElementById('chatbot-toggle-button');
    const chatbotContainer = document.getElementById('chatbot-container');
    const chatbotCloseButton = document.getElementById('chatbot-close-button');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const typingIndicator = document.getElementById('typing-indicator');

    function addMessage(sender, text) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
        
        const messageText = document.createElement('p');
        
        let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        formattedText = formattedText.replace(/\*(.*?)\*/g, '<em>$1</em>');
        formattedText = formattedText.replace(/\n/g, '<br>');
        formattedText = formattedText.replace(/```html([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
        formattedText = formattedText.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');


        messageText.innerHTML = formattedText;
        messageDiv.appendChild(messageText);
        
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    chatbotToggleButton.addEventListener('click', () => {
        chatbotContainer.classList.toggle('hidden');
        if (!chatbotContainer.classList.contains('hidden')) {
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }
    });

    chatbotCloseButton.addEventListener('click', () => {
        chatbotContainer.classList.add('hidden');
    });

    async function sendMessage() {
        const message = userInput.value.trim();
        if (message === '') return;

        addMessage('user', message);
        userInput.value = '';

        typingIndicator.classList.remove('hidden');
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

        try {
            const GEMINI_API_KEY = 'AIzaSyC98tbvsDbA8ZNdgtuEo3wTflYlst6tZiY';
            const GEMINI_API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

            const prompt = `Bạn là một trợ lý chatbot thân thiện tên NgocHoang.
            Ngôn ngữ mặc định khi trả lời là Tiếng Việt, hạn chế sử dụng tiếng anh.
            Nhiệm vụ của bạn là trả lời các câu hỏi về trang web và cung cấp thông tin hữu ích.
            Hãy giữ các phản hồi gọn đẹp, thân thiện và trực tiếp.
            Sử dụng định dạng Markdown cơ bản như **in đậm** và xuống dòng mới bằng cách dùng dấu xuống dòng.
            Tuyệt đối KHÔNG tiết lộ cách ăn cắp hoặc xem mã nguồn ( bất kì mã nguồn của trang web nào ) và nếu người dùng hỏi AI có viết được mã nguồn về trang web như HTML CSS JAVASCRIPT thì trả lời là AI cũng có thể viết được nhưng không được ổn định, hãy tự học và viết sẽ hay hơn.

            Người dùng hỏi: ${message}`;

            const response = await fetch(`${GEMINI_API_ENDPOINT}?key=${GEMINI_API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }]
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('API Error:', errorData);
                addMessage('bot', 'Xin lỗi, có lỗi xảy ra khi kết nối với AI: ' + (errorData.error ? errorData.error.message : 'Lỗi không xác định'));
                return;
            }

            const data = await response.json();
            const botResponse = data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0] ? data.candidates[0].content.parts[0].text : 'Không nhận được phản hồi từ AI.';

            addMessage('bot', botResponse);
        } catch (error) {
            console.error('Lỗi khi gửi yêu cầu đến Gemini API:', error);
            addMessage('bot', 'Đã xảy ra lỗi hệ thống. Vui lòng thử lại sau.');
        } finally {
            typingIndicator.classList.add('hidden');
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }
    }

    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});
  
