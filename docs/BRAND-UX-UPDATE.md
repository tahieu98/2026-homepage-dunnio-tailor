# Dunnio Tailor — Hiệu chỉnh thương hiệu và UX/UI

Ngày: 12/10/2026. Phạm vi: 5 homepage, hub so sánh, Banner Lab và báo cáo BOD. URL của 5 phương án được giữ nguyên.

## Quyết định chính

Giữ khác biệt về bố cục và động lực mua của 5 phương án, thống nhất một hệ navy–gold–white theo màu người dùng cung cấp. Bảng màu olive/sage/brown của bản khám phá trước được thay thế ở lớp giao diện. Màu vải và màu trong ảnh vẫn phản ánh nội dung, không được ép sang màu thương hiệu.

| Token | Giá trị | Vai trò |
| --- | --- | --- |
| Primary | #0b1f3a | Logo trên nền trắng, chữ, điều hướng, viền, trạng thái chọn |
| Primary variant | #04142a | Footer và vùng nền tối sâu |
| Dark blue | #111a4c | Dải nội dung tối bổ trợ, đặc biệt ở Design Studio |
| Secondary | #C8A96A | CTA chính, đường nhấn, selected accents |
| White | #fff | Canvas, form, catalog, chữ trên nền tối |

Tương phản tính theo relative luminance: navy/white 16.52:1; white/deep navy 18.44:1; navy/gold 7.35:1; gold/white chỉ 2.25:1. Vì vậy CTA gold dùng chữ navy; gold trên nền trắng chỉ trang trí, không chứa thông tin chữ hoặc làm viền điều khiển duy nhất. Kết quả chi tiết: `brand-contrast.json`. Đo cặp màu không thay thế audit accessibility toàn trang.

## Các thay đổi và lý do

- Header, logo, footer và CTA dùng cùng vai trò màu ở cả 5 phương án: giảm cảm giác đây là nhiều thương hiệu khác nhau.
- Typography Cormorant/Montserrat tạo nhịp editorial và hệ labels rõ; self-host font, có fallback và font-display:swap.
- Body mobile 16px, metadata 12–14px, giá tách khỏi ảnh và tăng độ rõ; không dùng chữ nhỏ để tạo cảm giác “premium”.
- Nút chính gold/navy, nút phụ outline, pressed/focus rõ; không dịch chuyển vị trí nút khi hover.
- Early quick links tới suits/tuxedos/quy trình giúp khách đã biết nhu cầu đi thẳng, trong khi V1 vẫn giữ workshop-first.
- Service icons chuyển thành SVG outline đồng nhất; icon mang ý nghĩa điều khiển vẫn có tên accessible.
- Form ngày cưới có helper, error sát trường, aria-invalid và focus recovery. Form chỉ tạo draft, không giả lập booking.
- Finder có Start again và thông báo khi lựa chọn thay đổi để tránh giữ kết quả cũ gây hiểu nhầm.
- Thanh CTA mobile chừa safe area, ẩn khi nhập và nhường chỗ cho keyboard focus.
- 4 USP vẫn nằm ngay trước footer; nguồn ảnh banner từng thiết bị và tỉ lệ gốc được giữ.

## Skills và phạm vi thực tế

Đã đọc các local SKILL.md của ui-ux-pro-max, ui-ux-designer, ux-audit, ux-flow và uxui-principles. Không chỉnh repository của bộ skills.

UI/UX Pro Max trả về Typography Cormorant/Montserrat phù hợp thời trang. Gợi ý style Liquid Glass không hợp website may đo kể cả sau một lần retry hẹp, nên không áp dụng. Màu thương hiệu của người dùng có ưu tiên cao hơn bảng màu do search trả về.

ui-ux-designer được dùng để lập semantic tokens, thành phần và trạng thái. ux-audit được dùng cho mức độ lỗi và giải pháp. ux-flow lập các đường đi và error recovery, thích nghi với HTML hiện có thay vì thêm framework ứng dụng. uxui-principles bản local chỉ là wrapper; không có cơ sở tuyên bố đã đánh giá đủ 168 nguyên tắc hoặc chạy API của bộ đó.

Các tài liệu phụ được skill nhắc tới nhưng không có tại local gồm implementation-playbook.md, upstream DESIGN-LANGUAGE và PageShell/BottomNav. Chúng không phải điều kiện để áp dụng hướng dẫn đang có; dự án có `DESIGN-LANGUAGE.md` và `design-system/dunnio-tailor/MASTER.md` riêng để mô tả chính xác triển khai.

## Audit định tính

Đánh giá theo rubric nội bộ, không phải điểm nghiên cứu người dùng hay chứng nhận. Mức sau chỉnh cần đọc cùng kết quả kiểm thử.

| Trục | Trước | Sau | Bằng chứng |
| --- | --- | --- | --- |
| Nhất quán thương hiệu | C | A | Primitive và vai trò chung, loại theme olive/sage/brown khỏi giao diện thực |
| Phân cấp và khả năng đọc | B | A− | Font system, body mobile, giá và metadata rõ |
| Trạng thái và điều khiển | B | A− | Focus/pressed, kích thước controls, reset và clear kết quả cũ |
| Khôi phục lỗi | B | A− | Inline date error, mô tả và focus đúng trường |
| Responsive | B+ | A− | Tỉ lệ banner, menu, safe area, kiểm tra thêm 320px/landscape/zoom |

Không phát hiện lỗi chặn việc sử dụng trong phạm vi kiểm tra ban đầu. Major findings là thiếu thống nhất màu, chữ phụ nhỏ, phản hồi lỗi chưa sát trường; minor findings là icon và nhịp khoảng cách. Không thêm urgency giả hoặc suy diễn uplift chuyển đổi.

## Kiểm chứng và giới hạn

`verification.json` ghi 15 tổ hợp responsive và chức năng; `brand-verification.json` ghi token/contrast/target/flow checks. Ảnh trước nằm ở `brand-before/`, ảnh sau ở `screenshots/`; xem so sánh trực quan qua `../brand-review.html`.

Chưa có A/B test, người dùng thực, thiết bị iOS vật lý hoặc chứng nhận WCAG đầy đủ. Contrast tokens và browser checks là bằng chứng phạm vi kỹ thuật; không thay cho performance mạng di động hay tỷ lệ đặt hàng. BOD nên phê duyệt dùng màu thống nhất trước, rồi đo qualified leads và orders theo kế hoạch trong report.html.
