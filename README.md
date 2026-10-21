# Dunnio Tailor — Wedding Story

Cập nhật 21/10/2026: giữ ba phiên bản Wedding Story. **v3.2 Final là bản bàn giao developer; HTML và toàn bộ tài nguyên trong `assets/` được đóng băng byte for byte. Mọi cải tiến tiếp theo chỉ thuộc v3.1.** Bản v3 gốc cũng được giữ nguyên trong đợt dọn dẹp.

| Phiên bản | Vai trò | Online |
|---|---|---|
| [v3.2 Wedding Story](v3.2-wedding-story.html) | **Final — đóng băng** | [Mở Final](https://tahieu98.github.io/2026-homepage-dunnio-tailor/v3.2-wedding-story.html) |
| [v3.1 Wedding Story](v3.1-wedding-story.html) | **Editable — chỉnh sửa tiếp** | [Mở Editable](https://tahieu98.github.io/2026-homepage-dunnio-tailor/v3.1-wedding-story.html) |
| [v3 Wedding Story](v3-wedding-story.html) | **Reference — tham chiếu** | [Mở Reference](https://tahieu98.github.io/2026-homepage-dunnio-tailor/v3-wedding-story.html) |

[Trang tổng hợp và preview PC/Tablet/Mobile](index.html) · [Báo cáo BOD](report.html) · [Banner Lab](banner-lab.html) · [Hướng dẫn banner](banner-guide.html) · [Repository](https://github.com/tahieu98/2026-homepage-dunnio-tailor)

v1 Heritage Atelier, v2 Design Studio, v4 Modern Essentials và v5 Fit Concierge đã ngừng phát hành. Lịch sử Git, ảnh chụp và báo cáo cũ vẫn được giữ để tham chiếu; chúng không phải bằng chứng kiểm thử vừa chạy. Bản clone gốc ở `C:\laragon\www\dunnio-tailor-redesign` được giữ nguyên.

## Bộ nhớ dự án cho các phiên tiếp theo

Đọc [AGENTS.md](AGENTS.md), [CLAUDE.md](CLAUDE.md) và [PROJECT-MEMORY](docs/PROJECT-MEMORY.md) trước khi chỉnh sửa. [SESSION-HISTORY](docs/SESSION-HISTORY.md) lưu lịch sử quyết định; [REQUEST30-CLEANUP](docs/REQUEST30-CLEANUP.md) ghi phạm vi dọn dẹp, bằng chứng kiểm tra và tình trạng triển khai. Đây là bộ nhớ bằng file; Cognee chưa được cài hoặc index.

[VERSION-STATUS HTML](docs/VERSION-STATUS.html) · [Markdown](docs/VERSION-STATUS.md) · [Manifest ảnh/SHA-256](docs/VERSION-STATUS.json) là thông số hiện hành. Danh sách route nằm trong [current-pages.json](tools/current-pages.json); [final-v32-lock.json](docs/final-v32-lock.json) khóa ba trang được giữ và toàn bộ tracked assets.

## Xem local và triển khai

Đây là website HTML/CSS/JavaScript tĩnh, không cần WordPress, MySQL hay build để xem. Mở [index.html](index.html) trong browser hoặc dùng [Laragon localhost](http://localhost/dunnio-homepage-concepts/). Trang tổng hợp có iframe tải trang thật ở PC 1440 / Tablet 820 / Mobile 390.

GitHub Pages phục vụ root của nhánh `main`. Push thành công chưa xác nhận triển khai; kiểm tra deployment đúng commit và các URL live sau mỗi lần phát hành.

## Nguồn và lệnh kiểm tra được hỗ trợ

`tools/build-wedding-variants.cjs` dùng v3, dữ liệu `docs/wedding-story-sources.json` và ba section trong `tools/templates/wedding-shared-sections.json`. Không còn phụ thuộc route v2. Chế độ ghi chỉ dành cho v3.1; mọi yêu cầu ghi v3.2 bị từ chối. Module `tools/wedding-final.cjs` giữ các phép biến đổi final để đối chiếu trong bộ nhớ.

```powershell
node tools/build-wedding-variants.cjs --check
node tools/verify-final-lock.cjs
node tools/test-cleanup.cjs
node tools/test-retired-tools.cjs
node tools/test-current-links.cjs
node tools/check-current-links.cjs
node tools/test-product-touch.cjs
node tools/test-wedding-autoslide.cjs
```

`node tools/build-version-status-docs.cjs` chỉ dựng lại ba tài liệu VERSION-STATUS, không ghi homepage hoặc assets. [retired-tools.json](tools/retired-tools.json) liệt kê **18 writer lịch sử và 6 bộ kiểm tra cũ** đã có guard từ chối thực thi trước mọi import hoặc ghi file. Giữ chúng làm hồ sơ, không dùng lại pipeline hero/font/asset trong hướng dẫn lịch sử.

## Hành vi hiện hành và giới hạn

v3.2 dùng PC **7:4**, Tablet **5:3**, Mobile hướng tới **4:7** với giới hạn chiều cao. Banner tự chuyển mỗi **6 giây**, không có nút banner; kéo chuột/vuốt ngang để đổi ảnh, cuộn dọc vẫn hoạt động. v3.1 có Wedding party/FAQ, nút thủ công và Mobile **4:5**. Hai biến thể chọn một video Custom Outfit 3D theo thiết bị.

v3.2 giữ một H1 trong logo header; tiêu đề banner/nội dung dùng H2. Thẻ sản phẩm đổi gold khi hover/focus và khi chạm giữ trên Mobile/Tablet; thả/hủy chạm bỏ highlight. Bốn USP PC có kích thước 180×180px, với CTA Fit Guarantee ngay dưới. Footer còn nhãn lịch sử “All 5 concepts”; đích index vẫn hoạt động và hiển thị ba phiên bản được giữ.

Đây là prototype: link sản phẩm/dịch vụ mở website Dunnio thật, không có checkout, CRM hoặc tracking giao dịch. Form cưới chuẩn bị email draft để người dùng xem và gửi. Chưa xác nhận thiết bị cảm ứng thật, iOS Safari, screen reader, mạng di động hoặc conversion uplift.

## Hồ sơ lịch sử

- [Báo cáo BOD](report.html), [Brand trước/sau](brand-review.html) và [Thư viện screenshot](docs/screenshot-index.html) giữ ảnh/giải trình của năm concept gốc; các route đã nghỉ không còn liên kết mở trang.
- [Yêu cầu 22 — cấu trúc final](docs/WEDDING-FINAL-REQUEST22.md), [Yêu cầu 23–24 — USP/Fit](docs/WEDDING-USP-FIT-UPDATE.md), [Yêu cầu 25 — autoplay](docs/WEDDING-AUTOSLIDE-REQUEST25.md), [Yêu cầu 21 — studio video](docs/STUDIO-VIDEO-UPDATE.md).
- [Khảo sát Hockerty ngày 15/10](docs/hockerty-banner-audit-20261015.html) ghi cấu hình PC 3:2 tại thời điểm khảo sát; không dùng làm số đo của final 7:4. [PLAN.md](PLAN.md) chỉ là kế hoạch Yêu cầu 14 đã lưu lịch sử.

Xóa source HTML không xóa Actions artifacts hoặc phí storage đã phát sinh. Giải thích và giới hạn số liệu nằm trong [báo cáo Yêu cầu 30](docs/REQUEST30-CLEANUP.md); đợt dọn dẹp không xóa artifact hay thay đổi billing.
