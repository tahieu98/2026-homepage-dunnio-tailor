# Thông số cho editor thiết kế banner Dunnio Tailor

Cập nhật12/10/2026, theo ảnh hoàn chỉnh người dùng cung cấp. Áp dụng chung5 concept; headline/CTA thay theo chủ đề. Quyết định hiện hành thay thế thử nghiệm8:3 và nền kéo giãn/blur.

## Ảnh và khung hiển thị

- PC slide1: `editor-banner-7x4.png`,1659×948px, chính xác7:4.
- PC slide2: `editor-banner-5x3.png`,1619×971px, khoảng5:3 (sai khác tỷ lệ khoảng0.041% do số pixel nguyên). Giữ nguyên tỉ lệ thực.
- Tablet640–1199px: slide1 dùng5:3, slide2 dùng7:4.
- Mobile<640px: nguồn ảnh dọc riêng800×1422, gần9:16; màn hình cao≤760px dùng800×1000,4:5. Hai PNG ngang mới chưa thay thế các artwork mobile.
- Ảnh ngang mới được hiển thị trực tiếp `width:100%;height:auto;object-fit:contain`. Không crop, blur, scale méo hay thêm bối cảnh.
- Xuất ảnh mới theo khung7:4 (ví dụ2800×1600) và5:3 (ví dụ2500×1500 hoặc3000×1800). Giữ ảnh đủ nét theo màn hình mục tiêu; PNG hiện có1659px sẽ được nội suy khi hiển thị rộng1920px.

| W vùng ảnh (CSS px) | H ở7:4 | H ở5:3 lý thuyết |
|---:|---:|---:|
|1920|1097.1|1152|
|1440|822.9|864|
|1366|780.6|819.6|
|1280|731.4|768|
|1024|585.1|614.4|
|820|468.6|492|
|768|438.9|460.8|

H=W/r. W là chiều rộng nội dung trang, thường nhỏ hơn viewport khoảng15px do scrollbar desktop. Bảng tính theo W, không tính thanh trình duyệt/Windows. Nếu dùng chính PNG1619×971 thì H=W×971/1619.

## Vị trí nội dung — đúng CSS hiện hành

Header: hàng riêng phía trên ảnh,80px PC≥1200 và64px tablet/mobile; logo SVG giữa bằng `1fr auto 1fr`. Ảnh bắt đầu sau header, tránh menu che tóc. Khi cuộn, header sticky có thể phủ nội dung đã cuộn qua như hành vi thông thường.

Gọi V=chiều cao viewport,T=dải demo (44px hiện tại),N=header, H=chiều cao ảnh. **U=min(H,V−T−N)** là phần ảnh có thể nhìn thấy trong màn hình đầu. Chữ/nút neo theo U; ảnh vẫn giữ toàn bộ tỷ lệ và có thể kéo dài dưới màn hình đầu. Không thể đồng thời giữ nguyên ảnh7:4 rộng1920px và ép toàn bộ ảnh+header vào màn hình900px mà không crop/thu nhỏ.

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
