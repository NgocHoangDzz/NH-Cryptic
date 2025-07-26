document.addEventListener('DOMContentLoaded', () => {

    const form = document.querySelector('.contact-form');
    const formStatus = document.getElementById('formStatus');

    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const formData = new FormData(form);
            try {
                const response = await fetch(form.action, {
                    method: form.method,
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formStatus.textContent = 'Tin nhắn của bạn đã được gửi thành công!';
                    formStatus.className = 'form-status success';
                    form.reset();
                } else {
                    const data = await response.json();
                    if (data.message) {
                        formStatus.textContent = 'Có lỗi xảy ra: ' + data.message;
                    } else {
                        formStatus.textContent = 'Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại.';
                    }
                    formStatus.className = 'form-status error';
                }
            } catch (error) {
                formStatus.textContent = 'Không thể kết nối với máy chủ. Vui lòng kiểm tra kết nối mạng.';
                formStatus.className = 'form-status error';
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});


document.addEventListener('click', () => {
    const clickAudio = document.getElementById('click-sound');
        if (clickAudio) {
            clickAudio.currentTime = 0;
            clickAudio.play();
    }
});
