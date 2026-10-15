> **Hiện hành 15/10/2026:** v3.2 PC **16:7**, nguồn 1896×829, slide 1 **02-new**, slide 2 **01**; Tablet **5:3**, Mobile khung hướng tới **4:7** có giới hạn chiều cao. v3.1 giữ PC gần 7:4, Tablet 5:3, Mobile 4:5. Xem [trạng thái phiên bản hiện hành](VERSION-STATUS.md) và [bản HTML](VERSION-STATUS.html). Các tỷ lệ/ảnh trong phần lịch sử không ghi đè cấu hình này.

> **Cập nhật trước đó:** hai PNG7:4/5:3 đã thay thế thử nghiệm8:3 và canvas navy. Đọc [BANNER-EDITOR-SPEC.md](BANNER-EDITOR-SPEC.md) và [hướng dẫn HTML](../banner-guide.html). Phần dưới lưu công thức dàn artwork và lịch sử thử nghiệm; không dùng các tỷ lệ/neo header cũ cho ảnh mới.

# Công thức banner responsive — Yêu cầu 13

Ngày: 12/10/2026. Hồ sơ công thức của Yêu cầu 13; không dùng để ghi đè cấu hình các biến thể Wedding Story mới.

## Công thức hiện hành của v3.2

PC: H=W×7/16; tổng header + ảnh + nút thường là 80+H+64px. Tablet: H=W×3/5. Mobile: H=max(240px,min(175vw,100svh−128px)), nên 4:7 là tỉ lệ mục tiêu trước khi giới hạn chiều cao. Ảnh nguồn mobile gần 4:5 được cover vào khung; PC dùng contain. Xem bảng chiều cao và hướng dẫn cập nhật trong VERSION-STATUS.md.

## Hồ sơ Yêu cầu 13

## 1. Chọn khung trước khi dàn ảnh

Dùng kích thước **viewport CSS**, không dùng độ phân giải phần cứng hoặc ảnh chụp gồm thanh trình duyệt.

- W = chiều rộng vùng trang (`document.documentElement.clientWidth`).
- V = chiều cao viewport; T = chiều cao dải review đầu trang (demo hiện tại 44px).
- B = V − T: ngân sách chiều cao banner ở màn hình đầu tiên. Header nằm trong banner nên không trừ hai lần.
- r = chiều rộng / chiều cao artwork; H = W / r.
- Điều kiện ảnh, chữ và nút cùng xuất hiện trước khi cuộn: **H ≤ B** và toàn bộ vùng chữ/nút nằm trong H.

| Khung | Artwork | Khi chọn | Vùng đầu người mẫu | Vùng chữ |
|---|---:|---|---|---|
| PC | 1600 × 600, 8:3 | PC, hoặc tablet ngang với W/V ≥ 1.5 | từ 20% H | trái 4.2–40.2% W; cách đáy 88px |
| Tablet dọc | 1200 × 900, 4:3 | 640–1199px, W/V < 1.5 | từ 19% H | trái 4.2–43.2% W; cách đáy 88px |
| Mobile cao | 800 × 1422, gần 9:16 | W < 640px, V > 760px | từ 18% H, kết thúc người mẫu ≤60% H | dưới người mẫu, cách đáy 82px |
| Mobile thấp | 800 × 1000, 4:5 | W < 640px, V ≤760px | từ 23% H, kết thúc ≤54% H | headline ngắn, cách đáy 68px |

Ví dụ PC1920×900: W≈1905 do scrollbar, H≈714px, T+H≈758px; đủ chỗ cho headline, CTA và Explore services. Nếu giữ16:9, H≈1072px, phần chữ ở đáy nằm ngoài màn hình đầu tiên.

Không có một tỷ lệ cố định đáp ứng mọi cửa sổ. Màn hình cực thấp, font phóng lớn hoặc ảnh mới thiếu dữ liệu vùng an toàn sẽ dùng fallback chữ bên dưới ảnh. Đây là bảo vệ nội dung, không phải ép cắt ảnh để vừa khung.

## 2. Đánh dấu vùng quan trọng trong ảnh gốc

Trong `assets/banner-layout.json`, ghi kích thước thật và `subject=[x0,y0,x1,y1]` chuẩn hóa 0–1. Bao gồm tóc, đầu, vai, ve áo, bàn tay, phần trang phục cần giữ; dùng một bounding box chung nếu nhiều người. Các tọa độ hiện tại được ước lượng bằng kiểm tra ảnh, không phải nhận diện tự động.

Với ảnh S_w×S_h, khung A_w×A_h, vùng đầu a, đáy b, tâm người mẫu c và độ rộng vùng người mẫu Q:

```
subjectWidth  = S_w × (x1 − x0)
subjectHeight = S_h × (y1 − y0)
k = min(A_h × (b − a) / subjectHeight, Q / subjectWidth)
X = A_w × c − S_w × (x0 + x1) / 2 × k
Y = A_h × a − S_h × y0 × k
photoWidth  = S_w × k
photoHeight = S_h × k
```

Dùng cùng hệ số k cho hai trục: **không kéo méo người mẫu**. Tọa độ sau dàn:

```
x0' = (X + S_w × x0 × k) / A_w
x1' = (X + S_w × x1 × k) / A_w
y0' = a
y1' = (Y + S_h × y1 × k) / A_h
```

PC: c=0.58 và Q=0.30A_w. Tablet: c=0.64 và Q=0.36A_w. Mobile: c=0.50 và Q=0.90A_w. Tâm hơi lệch phải trên PC/tablet để chừa vùng âm bên trái cho chữ; mobile đặt chính giữa. SVG hiển thị ảnh nguồn sắc nét trên canvas navy, giữ tỉ lệ ảnh người mẫu; đã bỏ nền mép kéo giãn/blur. Canvas navy là phần không có bối cảnh trong ảnh nguồn, không phải ảnh được mở rộng hoàn chỉnh. Editor nên thay bằng artwork toàn cảnh được thiết kế đúng từng khung. Không tạo thêm khuôn mặt hoặc chi tiết trang phục mới. Những phần vốn không có trong ảnh nguồn không thể được khôi phục bằng phép dàn này.

## 3. Kiểm tra an toàn ở kích thước hiển thị thật

- Đầu: `imageTop + y0' × H ≥ headerBottom + 12px`.
- Vùng chữ và bounding box người mẫu phải không giao nhau; thêm khoảng đệm 12px.
- Headline, subtitle, CTA, Explore services và slider phải nằm trong banner và viewport đầu tiên ở màn hình tiêu chuẩn.
- Logo dùng SVG Dunnio gốc nền trong suốt; bố cục header `1fr auto 1fr` đưa logo vào giữa thật, không phụ thuộc số mục hai bên.
- Header80px trên PC;64px trên tablet/mobile. Logo trắng khi trên banner, navy khi cuộn/mở mega menu.
- Menu bên trái dùng được trên mọi thiết bị. Blog, Explore, Shop nằm trong drawer đầy đủ; PC rộng chỉ hiển thị thêm Customize outfit, Custom clothing và Occasion. 72 link nguồn vẫn có trong drawer.
- 10 dịch vụ intro-line nằm sau banner; USP ngay trên footer; không có section blog tiêu biểu.
- Với ảnh không đăng ký bounding box, hoặc chữ vượt vùng an toàn, `app.js` chuyển copy xuống dưới và tách header khỏi ảnh. Kiểm lại sau khi đổi slide, resize và font tải xong.

## 4. Cách tái áp dụng

1. Chọn chủ đề và ảnh nguồn đủ độ phân giải; kiểm tra ảnh đã có đầu/trang phục cần giữ.
2. Bổ sung source/kích thước/bounding box trong `assets/banner-layout.json` và ánh xạ source trong `tools/fashion-heroes.cjs`.
3. Cập nhật headline một câu, subtitle một câu, một CTA. Nếu cần giải thích dài, đưa xuống section dưới.
4. Chạy `node tools/fashion-heroes.cjs` để xuất 4 khung × 2 slide × 5 concept và metadata cho runtime.
5. Chạy `node tools/navigation-system.cjs` nếu đổi header/menu; giữ URL dịch vụ từ cây nguồn đã đối chiếu.
6. Cập nhật revision khi publish để tránh browser dùng CSS/JS cũ. `tools/build.cjs` sử dụng cùng module hero/header.
7. Kiểm tra ít nhất1920×900,1440×900,1366×768,1032×1376,820×1180,1024×768,390×844,390×667,320×568; đổi cả hai slide, zoom/text lớn và mở/đóng menu bằng bàn phím.

HTML hướng dẫn có bộ tính H/B: `banner-guide.html`. Bằng chứng kiểm tra trình duyệt: `docs/responsive-banner-verification.json`. Các khung mặc định là lựa chọn thiết kế cho bộ demo; khi đổi nội dung hoặc thiết bị mục tiêu, tính lại thay vì dùng cố định.
