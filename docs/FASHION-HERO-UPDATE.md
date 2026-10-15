# Yêu cầu 11 — Banner thời trang dẫn dắt bằng hình ảnh

> **Hiện hành 15/10/2026:** v3.2 PC **16:7**, nguồn 1896×829, slide 1 **02-new**, slide 2 **01**; Tablet **5:3**, Mobile khung hướng tới **4:7** có giới hạn chiều cao. v3.1 giữ PC gần 7:4, Tablet 5:3, Mobile 4:5. Xem [trạng thái phiên bản hiện hành](VERSION-STATUS.md) và [bản HTML](VERSION-STATUS.html). Các tỷ lệ/ảnh trong phần lịch sử không ghi đè cấu hình này.

Lưu ý: bố cục copy dưới ảnh của Yêu cầu 11 dưới đây đã được thay bằng template overlay Hockerty và hệ danh mục đầy đủ. Quyết định hiện hành: `HOCKERTY-NAVIGATION-UPDATE.md`.

Ngày 12/10/2026. Phạm vi: banner của cả 5 homepage, ưu tiên thiết kế lại The Fit Concierge.

The Fit Concierge chuyển từ bố cục chữ–ảnh hai cột, chân dung nhỏ và khung bo góc sang một ảnh editorial atelier tràn toàn chiều ngang màn hình. Thông điệp còn “Your style. Perfected.” và một CTA “Explore my options” tới bộ chọn đang có. Tiêu đề và hành động nằm trên dải trắng dưới ảnh để không che gương mặt hoặc trang phục.

## Cách triển khai trên các thiết bị

- PC: artwork ngang 1600×880, full-width; title, một CTA và điều khiển slider trên cùng dải dưới ảnh.
- Tablet: artwork riêng 1200×900 (4:3), bố cục ảnh và chủ thể được chọn lại; tiêu đề ở hàng riêng khi cần.
- Mobile: artwork dọc riêng 800×1000 (4:5); ảnh xuất hiện trước, tiêu đề ngắn và CTA theo sau. Mũi tên slider tối thiểu 44px.
- Ảnh banner do admin thay sau này vẫn hiển thị `width:100%; height:auto`, đúng tỷ lệ gốc, kể cả 16:9, 8:3 hoặc 9:16. Không ép ảnh upload theo chiều cao viewport, vì điều đó có thể cắt mất nội dung. “Full-size” ở đây là tràn chiều ngang viewport với nguồn riêng theo thiết bị, không phải khóa tất cả ảnh ở 100vh.

## Tinh giản cả 5 biến thể

| Biến thể | Tiêu đề mới | Hướng hình ảnh |
| --- | --- | --- |
| Heritage Atelier | Crafted to be yours. | Outfit trong atelier; tay nghề được giải thích ở khối craft bên dưới |
| Design Studio | Make it your own. | Ba outfit trên PC, hai trên tablet, một trên mobile; controls tùy chọn nằm ở Studio bên dưới |
| Wedding Story | Made for your moment. | Ảnh dịp cưới ngang/dọc được chọn riêng; bỏ lớp copy lớn phủ nửa ảnh |
| Modern Essentials | Everyday. Elevated. | Wardrobe editorial nhiều outfit trên PC, outfit đơn trên mobile |
| The Fit Concierge | Your style. Perfected. | Model với jacket navy trong atelier; tư vấn và đo số nằm ở finder/support bên dưới |

Loại khỏi banner: đoạn giới thiệu dài, CTA phụ, dòng ghi chú sản phẩm/giá, caption lặp thông điệp và swatch trang trí. Dải announcement lặp thông điệp may đo cũng được ẩn trên 5 homepage. Giữ headline HTML, nhãn edit ngắn, một CTA chính, slider thủ công và navigation. Không thêm autoplay. Thanh CTA mobile ẩn khi CTA của hero đang hiện trong viewport, tránh hai nút nổi lặp nhau tại cùng thời điểm.

## Lý do UX/UI cho BOD

Hình outfit có ưu thế thị giác giúp truyền tải phong cách trước khi yêu cầu người dùng đọc giải thích. Một headline và một CTA giảm số lựa chọn cạnh tranh trong vùng đầu trang. Copy tách khỏi ảnh giữ tương phản ổn định và bảo vệ chủ thể ở các tỷ lệ màn hình; dải trắng, navy và gold tiếp tục nhận diện Dunnio. Quy trình/đo số/fit guidance vẫn có ở phía dưới khi khách muốn tìm hiểu sâu.

Đây là giả thuyết thiết kế về cảm nhận thời trang và khả năng khám phá, chưa có dữ liệu xác nhận tăng chuyển đổi. Đo tiếp hero CTA, slider interaction, tới category/finder, qualified leads/purchases và guardrail tốc độ tải.

## Hình ảnh và cập nhật nội dung

Dùng asset editorial đã có trong bản clone Dunnio. Hai ảnh atelier bổ sung có nguồn 2413×1401 và 2784×1536; nguồn và SHA-256 nằm trong `fashion-hero-assets.json`. Không gọi các ảnh editorial là ảnh khách hàng thực, testimonial hoặc founder portrait. Một số outfit portrait có nguồn 568×841 nên cần thay bằng ảnh chiến dịch độ phân giải cao hơn nếu dùng production trên màn hình lớn.

SVG chỉ đóng gói layout ảnh riêng cho từng thiết bị; không nhúng chữ quảng cáo hay font vào artwork mới. Crop trong bước biên tập được chọn để giữ gương mặt/chủ thể. CSS của trang không crop lại banner hoàn chỉnh. Để đổi ảnh upload và kích thước thực, sửa `assets/banner-config.js`; title/CTA nằm trong HTML. `tools/fashion-heroes.cjs` là nguồn của các composition demo và được dùng bởi generator chính.

## Kiểm chứng

Ảnh trước thay đổi: `banner-before/`. Ảnh sau: `screenshots/v1-…` đến `screenshots/v5-…`. Browser checks kiểm tra toàn chiều ngang ảnh, tỷ lệ gốc, nguồn PC/tablet/mobile và slide thứ hai, một CTA, không có copy che ảnh, không tràn ngang, keyboard focus, menu, finder, planner, filters và vị trí 4 USP ngay trước footer. Kiểm thử Chrome không thay thế kiểm thử thiết bị iOS thực hoặc usability test.
