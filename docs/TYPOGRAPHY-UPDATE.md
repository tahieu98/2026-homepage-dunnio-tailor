# Dunnio Tailor — Chuẩn hóa typography

Ngày 12/10/2026. Áp dụng cho 5 homepage, trang chọn phương án, Brand Review, Banner Lab, thư viện ảnh và báo cáo BOD.

## Font sử dụng

```css
--font-primary: "Garamon Pro Display", serif;
--font-secondary: "Afacad", sans-serif;
```

Tên `Garamon Pro Display` giữ đúng alias CSS trên website gốc và yêu cầu của người dùng. File thực là `GaramondPremrPro.woff2`, khai báo weight 400 như trong clone. Afacad có bốn file thật: Regular 400, Medium 500, SemiBold 600 và Bold 700. Các file được sao chép nguyên vẹn từ dự án `dunnio-tailor-redesign`; đường dẫn, kích thước và SHA-256 nằm trong `font-provenance.json`. Không dùng cặp font đề xuất ở bước khám phá trước.

| Nội dung | Font / trọng lượng | Cỡ chữ và nhịp đọc |
| --- | --- | --- |
| Tiêu đề editorial V1/V3/V5, hub và BOD | Garamon Pro Display 400 | Hero sau Yêu cầu 11: PC 36–54px, mobile 32–36px; line-height 1.12–1.15. Hub/BOD giữ thang tiêu đề riêng |
| Tiêu đề hiện đại V2/V4 | Afacad 500 | Giữ phân biệt bố cục studio/catalog; letter-spacing −0.03em |
| Nội dung chính sau hero | Afacad 400 | Nội dung 16–17px mobile; copy giải thích đặt ở section dưới hero; line-height theo vai trò đọc |
| CTA, labels, điều hướng | Afacad 500–600 | CTA 16px PC / 15px mobile, điều hướng PC 16px; không giảm vùng bấm |
| Báo cáo và Brand Review | Afacad 400–600 | Prose 18px PC / 17px mobile; bảng 16px PC / 14px mobile, cho cuộn ngang khi cần |
| Metadata, ghi chú ảnh | Afacad | 12–14px cho nội dung phụ; không dùng để chứa copy thuyết phục chính |

## Lý do UX/UI cho BOD

Font gốc tạo liên kết thị giác giữa homepage thử nghiệm và website hiện tại, giúp khách nhận diện thương hiệu xuyên suốt hành trình. Garamond tạo nhịp editorial phù hợp nội dung tay nghề và dịp lễ; Afacad có vai trò đọc, thao tác và so sánh sản phẩm. Đây là giả thuyết thiết kế, chưa phải bằng chứng tăng chuyển đổi.

Afacad có tỷ lệ chữ khác Montserrat trước đây, nên chỉ đổi tên font sẽ làm một số nhãn có cảm giác nhỏ. Điều hướng, CTA, hero description và prose BOD được chỉnh cỡ chữ theo vai trò; tiêu đề cân bằng dòng, phần đọc có khoảng dòng đủ thoáng. Garamond chỉ dùng trọng lượng thực 400 cho tiêu đề thay vì yêu cầu trình duyệt tạo bold giả. Mã nguồn minh họa giữ monospace, logo SVG và ảnh lịch sử giữ nguyên nội dung gốc.

WOFF2 được phục vụ từ cùng repository với `font-display:swap`, không gọi dịch vụ font bên ngoài. Hai font có fallback serif/sans-serif khi tài nguyên chưa sẵn sàng. CSS và ảnh preview có phiên bản cache mới `typography-20261012`.

## Kiểm chứng

`typography-verification.json` kiểm tra font CSS, font nhúng thực tế qua Chrome DevTools Protocol, dấu tiếng Việt, các trang trình bày và 5 demo ở PC/tablet/mobile. `brand-verification.json`, `verification.json` và `final-qa.json` kiểm tra responsive, tỷ lệ banner, 4 USP trước footer và các tương tác. Ảnh preview được render lại sau thay đổi.

Đây là kiểm thử trên Chrome bằng Playwright, không phải phiên thử nghiệm thiết bị thực hoặc đánh giá độ dễ đọc với người dùng. Ưu tiên nhận diện theo yêu cầu người dùng; hướng dẫn từ UX/UI skills hỗ trợ phân cấp, khoảng dòng, focus và trạng thái điều khiển.
