# Dunnio Tailor — 5 homepage concepts

Hoàn thành ngày 12/10/2026. Bản clone `C:\laragon\www\dunnio-tailor-redesign` được giữ nguyên.

## Xem online — URL riêng cho từng phương án

1. [Heritage Atelier](https://tahieu98.github.io/2026-homepage-dunnio-tailor/v1-heritage-atelier.html)
2. [Design Studio](https://tahieu98.github.io/2026-homepage-dunnio-tailor/v2-design-studio.html)
3. [Wedding Story](https://tahieu98.github.io/2026-homepage-dunnio-tailor/v3-wedding-story.html)
4. [Modern Essentials](https://tahieu98.github.io/2026-homepage-dunnio-tailor/v4-modern-essentials.html)
5. [The Fit Concierge](https://tahieu98.github.io/2026-homepage-dunnio-tailor/v5-fit-concierge.html)

[Trang so sánh tổng hợp](https://tahieu98.github.io/2026-homepage-dunnio-tailor/) · [Báo cáo BOD](https://tahieu98.github.io/2026-homepage-dunnio-tailor/report.html) · [Banner Lab](https://tahieu98.github.io/2026-homepage-dunnio-tailor/banner-lab.html)

Repository: https://github.com/tahieu98/2026-homepage-dunnio-tailor

GitHub Pages được cấu hình từ nhánh `main`, folder `/(root)`. Mỗi file HTML là một trang chủ độc lập với URL riêng; cập nhật rồi push `main` sẽ triển khai lại.

## Xem local

- Laragon: http://localhost/dunnio-homepage-concepts/
- Hoặc mở `index.html` trực tiếp trong browser. Không cần cài Node/WordPress/MySQL.
- Trang so sánh có iframe PC 1440 / tablet 820 / mobile 390, tải trang responsive thật.
- `report.html`: giải trình tiếng Việt cho BOD, có CSS print để in/PDF.
- `banner-lab.html`: thử banner nhiều tỉ lệ và chọn ảnh từng thiết bị; không upload vào server/CMS.

## Năm phiên bản

1. `v1-heritage-atelier.html` — tay nghề, nguồn gốc, giá trị.
2. `v2-design-studio.html` — cá nhân hóa, style preview, designer entry.
3. `v3-wedding-story.html` — wedding roles, date enquiry draft.
4. `v4-modern-essentials.html` — category-first, filters, use occasions.
5. `v5-fit-concierge.html` — guided finder, measurement/fit support.

Mỗi trang có nội dung đầy đủ, responsive, banner slider thủ công, carousel, FAQ, menu mobile, CTA. Các link sản phẩm và dịch vụ mở trang thật tại `https://dunniotailor.com`. Không có checkout, đăng ký tư vấn thật, lưu cấu hình 3D hay tracking trong prototype. Form cưới chỉ chuẩn bị email draft; người dùng tự xem và gửi trong ứng dụng email.

## Tên miền ảo Laragon

Đã chuẩn bị vhost `config/auto.dunnio-homepage-concepts.test.conf` và sao chép vào `C:\laragon\etc\apache2\sites-enabled`.

Để dùng `http://dunnio-homepage-concepts.test/`, chạy `tools/activate-domain.cmd` bằng quyền Administrator, rồi bấm **Reload** trong Laragon. Helper chỉ thêm mapping riêng của dự án vào hosts nếu chưa có và không ghi đè mapping xung đột. Nó không khởi động/dừng Apache hoặc MySQL. Nếu không muốn sửa hosts, dùng URL localhost ở trên.

## Đưa lên GitHub Pages — không cần host phức tạp

1. Tạo repository GitHub và push nội dung thư mục này vào nhánh `main`.
2. Vào repository **Settings → Pages → Build and deployment**.
3. Chọn **Deploy from a branch**, nhánh **main**, folder **/(root)** và Save.
4. Sau khi Pages deploy thành công, mở URL Pages mà GitHub trả về. Các relative path hoạt động cả khi site ở `/ten-repo/`.

Không cần npm install, build, server, secret hoặc Actions workflow. File `.nojekyll` có sẵn. Hành vi mở email phụ thuộc việc browser có email handler; nút Copy enquiry là lối dùng thay thế.

Hướng dẫn publishing source được đối chiếu với [GitHub Docs](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site). Có thể dùng repository public với GitHub Free; repository private cần gói hỗ trợ Pages tương ứng.

Repo local đã kết nối `origin` với repository của dự án. Để cập nhật các phiên bản:

```powershell
git add .
git commit -m "Update homepage concepts"
git push origin main
```

`docs/heatmaps/` chứa ảnh Clarity gốc ở local và bị loại khỏi Git để giữ tách biệt tư liệu review nội bộ; bản giải trình và ảnh chụp responsive của prototype vẫn được đưa lên Pages. Không copy `.local`, database, tài khoản CMS hay wp-config từ dự án gốc.

## Chỉnh nội dung và banner

- Các file `v*.html` là trang HTML hoàn chỉnh; có thể chỉnh trực tiếp.
- `assets/styles.css`: nền tảng và theme riêng của từng hướng.
- `assets/app.js`: menu, carousel, slider, bộ lọc, preview, finder, planner, banner lab.
- `assets/banner-config.js`: hai slides mỗi trang, mỗi slide có ảnh desktop/tablet/mobile, alt và dimensions.
- `assets/images/`: ảnh từ bản clone. `docs/asset-provenance.json` ghi nguồn; một số ảnh được chuyển định dạng WebP.
- `tools/build.cjs`: generator tùy chọn, dùng Node để tạo lại 5 file HTML. Chạy generator sẽ ghi đè chỉnh sửa trực tiếp trên 5 trang và cấu hình banner; dùng generator hoặc chỉnh HTML, không trộn mà chưa đồng bộ.
- `tools/prepare-assets.cjs`, `optimise-assets.cjs`, `upgrade-assets.cjs` là lịch sử pipeline asset từ máy local. Không cần chạy để xem site.

Ảnh banner được hiển thị `width:100%;height:auto` theo tỉ lệ thực, không ép khung cao cố định. Default: desktop 4:3 (V3 8:3), tablet 4:3 (V3 16:9), mobile 4:5. Có thể thay bằng 16:9 / 8:3 / 9:16 hoặc tỉ lệ bất kỳ; cần khai đúng dimensions. Mobile là art direction riêng, không tự cắt giữa ảnh ngang. Nếu V3 dùng banner có chữ sẵn, thêm `banner-copy-outside` vào class của hero. Script cũng đưa copy ra ngoài khi overlay không đủ chỗ.

Trong production CMS nên có 3 trường ảnh trên mỗi slide và tự đọc metadata width/height. Banner Lab là công cụ review trong browser, không phải admin CMS.

## Kiểm tra

`docs/verification.json`: 15 tổ hợp responsive và kiểm tra chức năng. `docs/link-checks.json`: link nội bộ / path của trang con. `docs/screenshots/`: ảnh đầu trang và toàn trang cho cả 5 hướng ở PC/tablet/mobile. `docs/screenshot-index.html`: thư viện xem các ảnh này.

Có thể chạy lại trên máy hiện tại:

```powershell
node --check assets/app.js
node tools/verify.cjs
node tools/check-links.cjs
```

Test scripts dùng Playwright và Chrome đã cài trên máy HP, có đường dẫn dependency tuyệt đối. Đây là tooling QA, không phải runtime site. Trên máy khác, cập nhật đường dẫn Playwright/Chrome trong script nếu muốn chạy lại.

Chưa xác nhận bằng thiết bị vật lý, iOS Safari, screen reader, mạng di động thật hoặc A/B conversion. Không có dự báo uplift được chứng minh. Giá và policy cần Dunnio xác nhận lại trước production; các trang storefront có `noindex` để phân biệt prototype với website bán hàng.


## Brand & UX/UI revision — 12/10/2026

Màu thương hiệu đúng brief được áp dụng xuyên 5 phương án, hub, báo cáo và Banner Lab. `assets/brand.css` là semantic contract sau structural CSS. Font Garamon Pro Display/Afacad lấy đúng file từ bản clone Dunnio, self-hosted với font-display:swap. Không cần Google Fonts ở runtime.

- [So sánh trước/sau](https://tahieu98.github.io/2026-homepage-dunnio-tailor/brand-review.html)
- [Chương giải trình mới cho BOD](https://tahieu98.github.io/2026-homepage-dunnio-tailor/report.html#brand-update)
- `docs/BRAND-UX-UPDATE.md`: audit, quyết định màu và giới hạn của skills.
- `design-system/dunnio-tailor/MASTER.md`: source of truth; `DESIGN-LANGUAGE.md`: component inventory và flow.
- `docs/brand-contrast.json`, `docs/brand-verification.json`: tính tương phản và browser checks.

Typography/touch/focus/date validation/finder reset được cải thiện, nhưng không tuyên bố CR tăng hoặc chứng nhận WCAG toàn bộ. 4 USP vẫn ngay trước footer; banner giữ tỉ lệ thực. Các URL 5 phương án không thay đổi.

## Font thương hiệu — 12/10/2026

`--font-primary: "Garamon Pro Display", serif` và `--font-secondary: "Afacad", sans-serif` được áp dụng cho cả demo và trang trình bày. Dùng đúng 5 file WOFF2 của bản clone Dunnio. Garamond khai báo 400; Afacad có 400/500/600/700. Nguồn và SHA-256: `docs/font-provenance.json`.

- [Giải trình typography cho BOD](https://tahieu98.github.io/2026-homepage-dunnio-tailor/report.html#typography-update)
- `docs/TYPOGRAPHY-UPDATE.md`: vai trò font, cỡ chữ và lý do UX/UI.
- `docs/typography-verification.json`: kiểm tra font thật qua Chrome DevTools, tiếng Việt, responsive.
- `node tools/prepare-brand-fonts.cjs`: sao chép lại từ clone; có thể chỉ định thư mục qua `DUNNIO_FONT_SOURCE`. Để xem live không cần chạy script này vì font đã nằm trong repository.
