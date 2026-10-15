# Thông số cho editor thiết kế banner Dunnio Tailor

> **Hiện hành 15/10/2026:** v3.2 PC **16:7**, nguồn 1896×829, slide 1 **02-new**, slide 2 **01**; Tablet **5:3**, Mobile khung hướng tới **4:7** có giới hạn chiều cao. v3.1 giữ PC gần 7:4, Tablet 5:3, Mobile 4:5. Xem [trạng thái phiên bản hiện hành](VERSION-STATUS.md) và [bản HTML](VERSION-STATUS.html). Các tỷ lệ/ảnh trong phần lịch sử không ghi đè cấu hình này.

## Bộ thông số nền tảng ngày 12/10/2026 — năm concept gốc

Phần này mô tả năm concept gốc v1–v5. Hai biến thể v3.1/v3.2 có ngoại lệ trong tài liệu hiện hành ở trên; đặc biệt vị trí nút dưới ảnh và khung mobile v3.2 không dùng bảng điều khiển trên ảnh dưới đây.

## Ảnh và khung hiển thị

**v1 Heritage Atelier và v5 Fit Concierge** vẫn dùng bộ editor chung: `editor-banner-7x4.png` 1659×948 (7:4) và `editor-banner-5x3.png` 1619×971 (~5:3). Tablet 640–1199px hoán đổi hai ảnh này theo slide; mobile dùng SVG dọc 800×1422 (~9:16) và compact 800×1000 (4:5).

**v2 Design Studio, v3 Wedding Story, v4 Modern Essentials** đã chuẩn hóa theo thiết bị với ảnh thật:

| Concept | PC 7:4 | Tablet 5:3 | Mobile / Compact 4:5 | Định dạng |
|---|---|---|---|---|
| v2 Design Studio | 3 ảnh 1600×914 | 3 ảnh 1600×960 | 2 ảnh 1122×1402 (slide đầu không có 4:5) | WebP |
| v3 Wedding Story | 2 ảnh 1600×914 | 2 ảnh 1600×960 | 2 ảnh 1122×1402 | WebP |
| v4 Modern Essentials | 2 ảnh 1600×914 | 2 ảnh 1600×960 | 2 ảnh 1122×1402 | WebP |

Tổng 7 WebP cho v2 (3+3+2, thiếu 1 bản 4:5 của cảnh v2), 6 WebP cho v3 và 6 WebP cho v4. Tất cả hiển thị `width:100%;height:auto`, không crop/blur/méo. `concept-strip` đã xóa nên không còn dải demo T=44px.

| W vùng ảnh (CSS px) | H ở 7:4 (1600×914) | H ở 5:3 (1600×960) | H ở 4:5 (1122×1402) |
|---:|---:|---:|---:|
|1920|1097.1|1152|2400|
|1440|822.9|864|1800|
|1366|780.6|819.6|1707|
|1280|731.4|768|1600|
|1024|585.1|614.4|1280|
|820|468.6|492|1025|
|768|438.9|460.8|960|
|390 (mobile 4:5)|—|—|487|

H=W/r. r=7/4=1.75, 5/3≈1.667, 4/5=0.8. PC/tablet dùng H 7:4 hoặc 5:3; mobile dùng H 4:5. W thường nhỏ hơn viewport ~15px do scrollbar desktop.

## Vị trí nội dung — nền tảng năm concept gốc

Header: hàng riêng phía trên ảnh,80px PC≥1200 và64px tablet/mobile; logo SVG giữa bằng `1fr auto 1fr`. Ảnh bắt đầu sau header, tránh menu che tóc. Khi cuộn, header sticky có thể phủ nội dung đã cuộn qua như hành vi thông thường.

Gọi V=chiều cao viewport, N=header (80px PC ≥1200, 64px tablet/mobile), H=chiều cao ảnh. **U=min(H, V−N)** là phần ảnh nhìn thấy trong màn hình đầu. `concept-strip` đã xóa nên T=0; công thức cũ V−T−N chỉ còn V−N. Chữ/nút neo theo U; ảnh vẫn giữ toàn bộ tỷ lệ và có thể kéo dài dưới màn hình đầu. Không thể đồng thời giữ nguyên ảnh7:4 rộng1920px và ép toàn bộ ảnh+header vào màn hình900px mà không crop/thu nhỏ.

| Thành phần | PC / tablet≥640px | Mobile cao | Mobile thấp≤760px |
|---|---|---|---|
|`.hero-copy` trái|4.2% W|6% W|6% W|
|Chiều rộng copy|24% W (cạnh phải28.2%)|88% W|88% W|
|Đáy copy tính từ mép trên ảnh|U−88px|U−82px|U−68px|
|`.hero-scroll` trái|4.2% W|6% W|6% W|
|Scroll width/height|khoảng120px /44px|rộng tối đa42% W /44px|rộng tối đa42% W /44px|
|Đáy scroll|U−28px|U−18px|U−12px|
|`.banner-controls` phải|4.2% W|6% W|6% W|
|Controls rộng/cao|136×44px|132×44px|132×44px|
|Đáy controls|U−28px|U−18px|U−12px|

136px =44+8+32+8+44 (hai nút44, hai gap8, counter tối thiểu32). Mobile gap6 nên132px. Counter dài hơn hoặc font người dùng lớn hơn có thể tăng kích thước thực; kiểm tra lại khi đổi số slide.

**Controls chiếm từ mép phải:** R = lề phải + chiều rộng cụm. Tỷ lệ R/W =4.2%+136/W trên PC/tablet;6%+132/W trên mobile.

| W | Copy trái / rộng / cạnh phải | Controls: lề phải / rộng / vùng từ mép phải |
|---:|---|---|
|1920|80.64 /460.8 /541.44px|80.64 /136 /216.64px (11.28%)|
|1440|60.48 /345.6 /406.08px|60.48 /136 /196.48px (13.64%)|
|1366|57.37 /327.84 /385.21px|57.37 /136 /193.37px (14.16%)|
|1024|43.01 /245.76 /288.77px|43.01 /136 /179.01px (17.48%)|
|820|34.44 /196.8 /231.24px|34.44 /136 /170.44px (20.79%)|
|390 (mobile)|23.4 /343.2 /366.6px|23.4 /132 /155.4px (39.85%)|

Scroll PC chiếm từ mép trái khoảng4.2% W+120px; ví dụ1920px là200.64px (10.45%). Không đặt bàn tay/ve áo cần nổi bật trong hai vùng controls/scroll cộng khoảng đệm12px.

## Chừa khoảng âm trong ảnh

- PC/tablet: để vùng từ x=0 đến khoảng30% W thông thoáng cho chữ. Từ30% trở đi có thể là người mẫu; mặt và chi tiết suit quan trọng nên ở vùng giữa/phải. Headline dài sẽ xuống dòng trong24% W.
- Chiều cao copy không cố định: Garamon Pro Display36–64px PC,32–48px tablet; subtitle18px PC/17px tablet; nút thường52px. Thay chữ/font/zoom làm chiều cao thay đổi. Lấy Y_top = U−88−copyHeight thực.
- Mobile: chữ chiếm ngang88% ở phía dưới, nên artwork dọc cần khoảng âm dưới người mẫu; thiết kế ảnh dọc riêng để giữ mặt, ve áo và tay khỏi vùng chữ. Nếu không đủ chỗ, runtime chuyển chữ xuống dưới.
- Ảnh chưa có bounding box, hoặc copy giao vùng người mẫu (+12px), sẽ dùng fallback chữ dưới ảnh. 72 link menu,10 dịch vụ và USP/footer không bị thay đổi.

## Quy đổi từ CSS pixel sang file thiết kế

Với file rộng A_w và chiều rộng hiển thị W:

```
scale = A_w / W
x_art = x_css × scale
y_art = y_css × scale
width_art = width_css × scale
height_art = height_css × scale
U = min(W × A_h/A_w, V − T − N)
```

Khoảng cách phần trăm giữ nguyên, nhưng khoảng88px/28px/44px là **CSS pixel**, không phải pixel cố định trong file nguồn. Vì vậy cùng một ảnh hiển thị trên các màn hình sẽ có vùng chữ/nút ở các tọa độ artwork khác nhau. Chừa hợp vùng an toàn của tất cả màn hình mục tiêu.

Template SVG trong `docs/banner-templates` có label viewport tham chiếu và các hộp header/copy/scroll/controls. Tắt các layer guide trước khi xuất ảnh; không nhúng chữ/CTA website vào ảnh nếu muốn responsive và khả năng đọc tốt.

Thông số khung thực: `docs/banner-composition-metadata.json`. Hướng dẫn HTML và bộ tính: `banner-guide.html`. Các đo browser thực: `docs/responsive-banner-verification.json`.
