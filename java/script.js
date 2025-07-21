document.addEventListener('DOMContentLoaded', () => {
    // ... (Giữ nguyên phần cuộn mượt mà nếu có) ...

    const form = document.querySelector('.contact-form');
    const formStatus = document.getElementById('formStatus');

    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault(); // Ngăn chặn form gửi đi theo cách truyền thống

            const formData = new FormData(form);
            try {
                const response = await fetch(form.action, {
                    method: form.method,
                    body: formData,
                    headers: {
                        'Accept': 'application/json' // Quan trọng để nhận phản hồi JSON
                    }
                });

                if (response.ok) {
                    formStatus.textContent = 'Tin nhắn của bạn đã được gửi thành công!';
                    formStatus.className = 'form-status success';
                    form.reset(); // Xóa nội dung form
                } else {
                    const data = await response.json(); // Đọc lỗi từ phản hồi JSON
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


// Thêm đoạn mã này vào file script.js của bạn

document.addEventListener('DOMContentLoaded', () => {
    // ... (Giữ nguyên các mã JavaScript hiện có của bạn, ví dụ xử lý form) ...

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Ngăn chặn hành vi cuộn mặc định của trình duyệt

            const targetId = this.getAttribute('href'); // Lấy id của phần tử mục tiêu (ví dụ: #about)
            const targetElement = document.querySelector(targetId); // Tìm phần tử đó trong DOM

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth' // Kích hoạt hiệu ứng cuộn mượt mà
                });
            }
        });
    });
});
