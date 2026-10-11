# Yêu cầu 9 — Heritage Atelier / Quick starting points

Ngày 12/10/2026. Phạm vi giao diện: `.theme-1 .intro-line`, ngay sau banner của Heritage Atelier.

Ba liên kết Custom suits, Tuxedos và How it works được đóng thành block có nền dark blue `#111A4C`, chữ trắng, góc bo 8px. Mũi tên nằm trong hình tròn gold `#C8A96A`, dùng màu chữ primary navy để có tương phản rõ. Hover chuyển block sang gold với chữ navy; active dùng deep navy; bàn phím có focus ring trên khoảng trắng quanh block.

PC và tablet dùng ba cột bằng nhau, label 18px PC / 17px tablet, chiều cao tối thiểu 68px. Mobile xếp ba hàng, label 17px và chiều cao tối thiểu 64px, giúp đọc đủ tên lựa chọn và thao tác thoải mái. Font Afacad, các đích liên kết và vị trí trong hành trình được giữ nguyên.

## Lý do UX/UI cho BOD

- Tương phản và hình khối phân biệt rõ các lựa chọn với đoạn văn thông thường, tạo dấu hiệu có thể bấm.
- Nhóm ba hướng đi ngay sau hero giúp người đã biết nhu cầu nhận ra đường vào sản phẩm; người cần tìm hiểu có đường vào quy trình.
- Cùng kích thước và cùng trọng lượng thị giác cho ba lựa chọn giữ quyền tự chọn của khách hàng; điểm nhấn gold kết nối với nhận diện và CTA đang có.
- Trạng thái hover/focus/active phản hồi thao tác mà không dịch chuyển nút. Xếp dọc trên mobile tránh ép chữ nhỏ hoặc buộc cuộn ngang để tìm lựa chọn.

Đây là giả thuyết thiết kế về khả năng nhận biết và khám phá, chưa phải bằng chứng tăng tỷ lệ đặt hàng. Khi đo thực tế, theo dõi lượt bấm từng quick link, lượt tới category/quy trình và qualified leads/purchases; không suy ra chuyển đổi từ số click riêng lẻ.

## Kiểm chứng và ảnh minh họa

`heritage-quick-links-qa.json` ghi nhận responsive, tương phản, hover/focus và thao tác cuộn tới quy trình trên Chrome. Ảnh render cập nhật: `screenshots/v1-quick-links-desktop.png`, `screenshots/v1-quick-links-tablet.png`, `screenshots/v1-quick-links-mobile.png`; ảnh toàn trang V1 cũng được cập nhật.

Kiểm tra tại 1440px, 820px, 640px, 390px và 320px không ghi nhận tràn ngang. Tương phản white/dark blue khoảng 16.46:1; navy/gold khoảng 7.35:1. Các giá trị này kiểm chứng cặp màu của thành phần, không phải chứng nhận accessibility toàn website.
