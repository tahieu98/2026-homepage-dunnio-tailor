# Yêu cầu 25 — Auto-slide và kéo/vuốt banner v3.2

Cập nhật 16/10/2026. Chỉ áp dụng [Wedding Story v3.2](../v3.2-wedding-story.html).

- Xóa hoàn toàn button `.hero-autoplay-toggle` khỏi HTML và CSS. Không có nút prev/next, play/pause hoặc counter.
- Tự chuyển tuần tự mỗi **6000ms**: 1 → 2 → 1…; không dừng khi hover hay focus. Timer không chạy khi banner ra khỏi viewport hoặc tab bị ẩn; khi quay lại bắt đầu đủ 6 giây.
- Giữ chuột trên ảnh và kéo trái để xem tiếp, kéo phải để xem trước. Pointer Events hỗ trợ chuột, cảm ứng và bút. Không chiếm thao tác bắt đầu ở CTA.
- Vuốt ngang dùng cùng cơ chế; `touch-action: pan-y` giữ thao tác cuộn dọc của trình duyệt. Chỉ đổi ảnh khi thả và kéo đủ ngưỡng 40–80px, hướng ngang rõ ràng; kéo ngắn, vuốt dọc hoặc pointercancel không đổi ảnh. Sau thao tác bắt đầu lại timer 6 giây.
- Có thể focus khung ảnh và dùng phím ArrowLeft/ArrowRight mà không cần thêm nút trên ảnh.
- Giữ ảnh và khung: PC 7:4, Tablet 5:3, Mobile 4:7 có giới hạn chiều cao đã có. Không đổi studio video, USP 180px trên PC, CTA Fit Guarantee dưới USP hoặc footer; v3.1 giữ nguyên.

Nguồn: `tools/wedding-final.cjs`, `assets/wedding-final.js`, `assets/wedding-final.css`; CSS/JS revision **request25-r1**. `app.js` tiếp tục xử lý chỉ số slide và chọn nguồn responsive qua sự kiện `dunnio:banner-step`.

Kiểm tra: `node tools/test-wedding-autoslide.cjs` xác nhận timer 6000ms, hai hướng pointer, ngưỡng, hủy thao tác, CTA, keyboard và visibility. Kéo chuột thực tế ở viewport 440/1032/1440px; đo bố cục sáu viewport 320–1440px; không nút banner, không tràn ngang và đúng nguồn ảnh sau resize. [Biên bản](wedding-autoslide-verification.json). Chưa kiểm tra cảm ứng trên thiết bị thật; luồng pointer cảm ứng được kiểm tra bằng mô phỏng sự kiện trong test.

![PC: banner không có nút điều khiển](screenshots/request25/desktop.png)
