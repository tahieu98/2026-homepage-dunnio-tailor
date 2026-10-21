# Trạng thái hiện hành của các phiên bản Dunnio Tailor

Cập nhật **21/10/2026 · giờ Việt Nam — Yêu cầu 30**. Chỉ giữ ba phiên bản Wedding Story: v3 Reference, v3.1 Editable và v3.2 Final. v1/v2/v4/v5 đã ngừng phát hành; ảnh và báo cáo cũ được giữ làm lịch sử. **v3.2 Final và toàn bộ tài nguyên runtime trong assets/ được đóng băng byte for byte. Mọi cải tiến tiếp theo chỉ thuộc v3.1.** [Bộ khóa SHA-256](final-v32-lock.json) · [Bộ nhớ dự án](PROJECT-MEMORY.md).

v3.2 đã áp dụng bản final **Yêu cầu 22** và các cập nhật tới Yêu cầu 29; studio video giữ từ **Yêu cầu 21**. [Chi tiết bản final](WEDDING-FINAL-REQUEST22.md). Tài liệu này ưu tiên hơn các thông số lịch sử Yêu cầu 11–21 khi có khác biệt về Wedding Story. Đây là thông số bản demo đã triển khai, không phải phương án viewport tự co chiều cao được đề xuất trong báo cáo Hockerty.

## 1. URL và khung banner đang dùng

Breakpoint chọn nguồn ảnh: **PC ≥1200px**, **Tablet 640–1199px**, **Mobile ≤639px**, theo chiều rộng CSS viewport. Breakpoint của từng lưới nội dung có thể khác, ví dụ USP chuyển hai cột dưới 1024px.

| Phiên bản | PC | Tablet | Mobile | Điểm khác biệt |
|---|---|---|---|---|
| [v3 Wedding Story — Reference](../v3-wedding-story.html) | 1600×914, gần 7:4 | 1600×960, 5:3 | 1122×1402, gần 4:5 | Bản gốc tham chiếu, giữ nguyên |
| [v3.1 Wedding Story — Editable](../v3.1-wedding-story.html) | 1600×914, gần 7:4 | 1600×960, 5:3 | Khung 4:5, nguồn 1122×1402 | Bản dành cho cải tiến tiếp theo; có Wedding party và FAQ |
| [v3.2 Wedding Story — Final (đóng băng)](../v3.2-wedding-story.html) | **Khung 7:4**, nguồn **1600×914** | **5:3**, nguồn **1600×960** | **Khung hướng tới 4:7**, nguồn **1122×1402** | Bản bàn giao developer; copy trong ảnh mobile; bỏ Wedding party và FAQ |

Các kích thước và cấu hình từng slide nằm trong [manifest JSON](VERSION-STATUS.json). “Tỉ lệ ảnh nguồn” và “tỉ lệ khung” được ghi riêng khi khác nhau.

## 2. Hai ảnh PC hiện hành của v3.2

| Slide | Nội dung | File đang phát | Kích thước / dung lượng |
|---|---|---|---|
| 1 | Hai người trong vườn cưới — nguồn v3.1 | [wedding-story-a-7x4.webp](../assets/banners/wedding-story-a-7x4.webp) | 1600×914 / 209.7 KiB |
| 2 | Chú rể bên bãi biển — nguồn v3.1 | [wedding-story-b-7x4.webp](../assets/banners/wedding-story-b-7x4.webp) | 1600×914 / 99.6 KiB |

Hai file PC hiện tại dùng chung nguồn với v3.1; không xử lý lại ảnh. Nguồn 1600×914 gần 7:4; CSS v3.2 khóa khung 7:4 và dùng contain. Các ảnh 3:2, 16:7 và 02-new vẫn lưu làm lịch sử nhưng không còn được v3.2 nạp để phát banner. Tablet/Mobile giữ bộ nguồn gốc.

## 3. Bố cục Wedding Story v3.1 và v3.2

**Yêu cầu 29:** v3.2 chỉ giữ một H1 ở khung logo header, bao gồm logo-light và logo-dark; tên truy cập là Dunnio Tailor. Banner trong fashion-heading chuyển thành H2.hero-title. Bảy title nội dung bỏ dấu chấm cuối mỗi dòng, giữ cách ngắt dòng và kích thước chữ. Logo giữ nguyên vị trí/kích thước trên PC/Tablet/Mobile; CSS hiện là **request29-r1**.

**Bổ sung phản hồi cảm ứng sau Yêu cầu 28:** Mobile/Tablet có trạng thái is-touch-active riêng cho product-card. Chạm giữ đổi nền gold #C8A96A tức thì, giữ khi vuốt, thả/hủy chạm thì xóa trạng thái; không chặn cuộn và click. Touch Events passive tránh mất highlight khi native scroll phát pointercancel. PC giữ hover, bàn phím giữ focus-visible. CSS và product-card-touch.js dùng revision **product-touch-r1**. node tools/test-product-touch.cjs kiểm tra vòng đời chạm; kiểm tra responsive bằng Chrome, chưa kiểm tra cảm ứng trên thiết bị thật.

**Yêu cầu 28:** bỏ toàn bộ mũi tên chéo trang trí trên v3.2, gồm các span aria-hidden trong CTA và footer, cùng các ký tự gắn trực tiếp vào nhãn liên kết. Xóa span chỉ chứa biểu tượng để không còn gap rỗng. Không đổi URL hoặc chức năng điều hướng; v3.1 giữ nguyên.

**Yêu cầu 27:** v3.2 bỏ toàn bộ image-arrow trong product-rail. Hover mỗi product-card đổi nền sang gold #C8A96A, chữ navy; focus bằng bàn phím có cùng hiệu ứng. Padding 12px bao quanh ảnh và nội dung; ảnh giữ màu gốc, không đổi kích thước khi hover. Hover giới hạn cho thiết bị có chuột để tránh trạng thái dính trên cảm ứng. CSS hiện là **request27-r1**. [Biên bản kiểm tra](product-hover-verification.json).

**Yêu cầu 26:** v3.2 bỏ cả community-review-action và nút Read customer reviews trùng lặp. Giữ sáu liên kết Read original review trong các thẻ; padding section PC/Tablet 48px trên, 40px dưới; Mobile 32px trên, 24px dưới; padding cuối rail 8px. CSS revision **request26-r1**, JS banner giữ request25-r1. [Biên bản](community-spacing-verification.json).

**Yêu cầu 23–24:** v3.2 thu USP về **180×180px** chỉ trên PC ≥1200px, căn giữa bốn ô; Tablet/Mobile giữ kích thước và màu hiện có. Nút **See how we ensure your fit** nằm giữa, ngay dưới bốn ô USP trong usp-section, chữ một dòng, dẫn đến trang Fit Guarantee. Closing giữ hai nút ban đầu. [Chi tiết và biên bản](WEDDING-USP-FIT-UPDATE.md). Yêu cầu 25 cập nhật CSS/JS v3.2 sang **request25-r1**; app.js giữ request22-r1.

Thứ tự: **hero → Wedding party (chỉ v3.1) → products → studio → looks → craft → customer reviews → Style Gallery → FAQ (chỉ v3.1) → closing → USP → footer**.

- Products/looks/craft trước đây lấy từ v2, nay có nguồn section riêng trong tools/templates/wedding-shared-sections.json; cấu trúc studio ban đầu dựa trên v2; studio-board nay đã thay bằng video demo theo Yêu cầu 21; bỏ service-section và phần products .fine. Nội dung craft nhấn mạnh thợ may Việt Nam với 15 năm kinh nghiệm.
- v3.1 giữ hàng nút banner 64px, nút 48×48px căn giữa. v3.2 bỏ toàn bộ nút banner, tự chuyển tuần tự mỗi 6 giây; kéo chuột/vuốt ngang trái để xem tiếp, phải để xem trước. Không dừng khi hover; giữ cuộn dọc. [Yêu cầu 25](WEDDING-AUTOSLIDE-REQUEST25.md).
- v3.1 mobile: ảnh 4:5 → nút → hero-copy trên nền trắng. Wedding party cuộn ngang.
- v3.2 mobile: chữ/CTA gần chân ảnh, ẩn hero eyebrow. Khung 4:7 có chiều cao max(240px,min(W×7/4,100svh−64px)), W là chiều rộng vùng ảnh; không còn hàng nút dưới ảnh. Nguồn gần 4:5 được cover và căn center 35%.
- Eyebrow mobile có hai gạch cân đối; riêng v3.2 dùng 16px và mô tả p trong main 14px. Review một hàng không tự chạy: v3.1 giữ prev/next, v3.2 dùng cuộn ngang và chỉ giữ liên kết gốc trong từng review; ảnh/tên/ngày/rating từ nguồn review, đoạn giới thiệu có nhãn Review summary.
- Gallery: bảy ảnh trên PC/Tablet, bốn ảnh trong lưới 2×2 mobile; giảm chiều cao để gom tiêu đề, mô tả, ảnh và See more gallery. Font/zoom lớn vẫn có thể cần cuộn.
- v3.2 đã bỏ mô tả p và Learn more trong USP, căn số/tiêu đề giữa các ô vuông đồng kích thước. Products/looks/community bỏ các rail-controls, looks bỏ fine, craft bỏ detail-line; CTA studio Mobile căn giữa. All outfit ideas thành nút gold/dark-blue; nút Read customer reviews dưới rail đã bỏ theo Yêu cầu 26, chỉ giữ liên kết trong từng review.
- USP mobile: 01/04 nền navy **#0b1f3a**, chữ gold **#C8A96A**; 02/03 nền gold, chữ navy. Bố cục hai cột tạo đường chéo. PC/Tablet giữ màu xen kẽ 01/03 navy, 02/04 gold; breakpoint bố cục lưới độc lập với breakpoint ảnh.
- Header và logo trong drawer của hai biến thể không dẫn về index. Footer được giữ nguyên theo yêu cầu ban đầu, bao gồm các liên kết vốn có của footer.


- **Studio video — Yêu cầu 21:** thay bộ chọn style bằng video Custom Outfit 3D: PC **1600×1000 (8:5)**, Tablet **834×1194 (139:199)**, Mobile **390×844 (195:422)**. Một player chọn một nguồn theo breakpoint 640/1200px; khung contain giữ trọn nội dung, native controls, muted/loop/playsinline. Tải khi cuộn gần, phát khi nhìn thấy; tạm dừng ngoài viewport, giữ trạng thái user pause; reduced-motion/Save-Data không autoplay. [Chi tiết và quy trình](STUDIO-VIDEO-UPDATE.md) · [Nguồn/SHA-256](studio-video-assets.json) · [Kiểm tra 16 trường hợp](studio-video-verification.json).

## 4. Chiều cao banner PC v3.2 và giới hạn một màn hình

Header PC **80px**, không còn hàng nút 64px dưới ảnh. H=W×4/7; tổng thường là 80+H. Với W=1440px, tổng khoảng 902,9px; W=1920px tổng khoảng 1177,1px. Scrollbar có thể giảm W. Bản final giữ 7:4 do người dùng chọn, không tự co ảnh PC để vừa mọi viewport thấp.

## 5. Nguồn và quy trình bảo toàn bản final

1. Ba route hiện hành nằm trong `tools/current-pages.json`. v3 là bản tham chiếu, v3.1 là bản chỉnh sửa tiếp và v3.2 là bản Final đóng băng. Không đổi HTML v3/v3.2 hoặc tài nguyên dùng chung dưới assets/.
2. `tools/build-wedding-variants.cjs` dùng bản v3, dữ liệu `docs/wedding-story-sources.json` và ba section đã tách trong `tools/templates/wedding-shared-sections.json`; không đọc lại route v2 đã ngừng phát hành. `tools/wedding-final.cjs` giữ phép biến đổi bản final để đối chiếu trong bộ nhớ.
3. Chạy `node tools/build-wedding-variants.cjs --check` để đối chiếu cả v3.1/v3.2 mà không ghi HTML. Chế độ ghi chỉ dành cho v3.1; generator từ chối ghi v3.2. Với cải tiến tương lai, cần giữ đầu ra v3.2 và mọi shared asset nguyên vẹn.
4. Chạy `node tools/verify-final-lock.cjs` để kiểm tra SHA-256 của ba trang được giữ và toàn bộ tracked assets. Không cập nhật lock để hợp thức hóa thay đổi ngoài phạm vi. CSS/JS hiện hành của v3.2: wedding-final.css request29-r1, product-card-touch.js product-touch-r1, wedding-final.js request25-r1; app.js giữ request22-r1.
5. Chạy `node tools/build-version-status-docs.cjs` chỉ để dựng lại ba tài liệu VERSION-STATUS; không dựng lại homepage hoặc assets. Các biên bản browser cũ dưới đây là hồ sơ theo thời điểm, không phải kết quả kiểm thử vừa chạy.
6. [retired-tools.json](../tools/retired-tools.json) liệt kê **18 writer lịch sử và 6 bộ kiểm tra cũ** đã bị chặn trước mọi import hoặc ghi file. Các pipeline build/hero/font/asset/navigation/migration được giữ làm hồ sơ, không dùng để dựng lại bản final.

Xem [bộ nhớ dự án](PROJECT-MEMORY.md), [lịch sử phiên](SESSION-HISTORY.md) và [báo cáo dọn dẹp Yêu cầu 30](REQUEST30-CLEANUP.md) cho phạm vi, lệnh hỗ trợ và bằng chứng mới. SVG/ZIP vùng an toàn trong banner-templates là tư liệu trước Yêu cầu 17, chưa phải template của bố cục final hiện hành.

## 6. Bằng chứng lịch sử và giới hạn kiểm tra

Các liên kết dưới đây là biên bản đã lưu ở từng yêu cầu. Việc dựng lại VERSION-STATUS không chạy lại các kiểm tra đó. Kết quả dọn dẹp mới nằm trong [REQUEST30-CLEANUP](REQUEST30-CLEANUP.md).

- [Yêu cầu 25](WEDDING-AUTOSLIDE-REQUEST25.md): auto-slide không nút, kéo hai chiều ở ba viewport; [biên bản mới](wedding-autoslide-verification.json). Biên bản Yêu cầu 22 bên dưới lưu cơ chế play/pause cũ, không phải hành vi hiện tại.

- [Bản final v3.2](wedding-final-verification.json): 11 viewport 320–1920px, khung banner, vị trí CTA, ô USP vuông, typography Mobile, cấu trúc đã tinh giản, autoplay 6 giây, dừng và cuộn ngang bằng bàn phím. Biên bản banner 15/10 vẫn được lưu làm lịch sử.
- [Kiểm tra cấu trúc hai biến thể ngày 14/10](wedding-story-verification.json) và [footer/USP ngày 14/10](wedding-footer-verification.json) là bằng chứng theo thời điểm, không tự coi là đã chạy lại toàn bộ sau mỗi lần thay ảnh PC.
- Vấn đề footer trong DevTools iPad đã được người dùng xác nhận cuộn được khi chọn **Fit to window**; không có thay đổi nội dung footer để xử lý việc canvas bị cắt ở mức 75%.
- [Báo cáo Hockerty Yêu cầu 19](hockerty-banner-audit-20261015.html) giữ số đo Dunnio PC **3:2 tại thời điểm khảo sát**. Không dùng các con số đó làm số đo của v3.2 7:4 final đang chạy.
- Kiểm tra responsive dùng Chrome desktop; chưa xác nhận thiết bị thật, Safari, screen reader, mạng di động hoặc conversion uplift.
- [Kiểm tra tài liệu](documentation-verification.json): liên kết nội bộ, mục lục, ảnh minh họa, không tràn ngang ở PC/Mobile và bộ tính 7:4 final với hàng nút 0px. Chạy lại bằng `node tools/verify-current-docs.cjs` với HTTP preview; `DUNNIO_DOCUMENTATION_OUTPUT` chỉ định nơi lưu kết quả khi kiểm tra online.

## 7. Ảnh chụp trước Yêu cầu 22 — hồ sơ lịch sử

Các ảnh 02-new bên dưới thuộc bước trước. [Minh họa và thông số final 7:4](WEDDING-FINAL-REQUEST22.md) là tham chiếu hiện hành.

![PC 1440×900 — slide 1 ảnh 02-new](screenshots/wedding-current/pc-slide-1.png)

![PC 1440×900 — slide 2 ảnh bãi biển](screenshots/wedding-current/pc-slide-2.png)

![Mobile 440×956 — nguồn dọc giữ nguyên](screenshots/wedding-current/mobile-slide-1.png)

## 8. Lịch sử quyết định banner v3.2

| Bước | Trạng thái |
|---|---|
| Yêu cầu 17 | Tạo v3.1/v3.2; cơ sở PC 7:4, Tablet 5:3; mobile v3.1 4:5, v3.2 hướng tới 4:7 |
| Yêu cầu 18 | Đã từng chuyển riêng PC v3.2 sang 3:2, nguồn 1536×1024 |
| Cập nhật tiếp theo | Đã từng chuyển PC v3.2 sang 5:3, dùng chung nguồn Tablet |
| Yêu cầu 19 | Khảo sát Hockerty, báo cáo và đề xuất; không triển khai cơ chế viewport của đề xuất |
| Yêu cầu 20 — b621c39 | PC 16:7, nguồn mới 1896×829 |
| Yêu cầu 22 — final | PC 7:4 dùng nguồn v3.1; bỏ banner-controls, autoplay 6s; tinh gọn rails/craft/community/USP và typography Mobile |
| Yêu cầu 21 | Studio-board v3.1/v3.2 thay bằng ba video MP4 theo thiết bị; cấu hình banner giữ nguyên |
| Thay ảnh — 233efc0 | Thay riêng slide 1 PC từ ảnh 02 sang **02-new**; Tablet/Mobile và slide 2 PC giữ nguyên |
