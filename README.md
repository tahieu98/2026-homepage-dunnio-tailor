# Dunnio Tailor — 5 homepage concepts

Năm concept gốc hoàn thành ngày 12/10/2026; tài liệu và hai biến thể Wedding Story cập nhật đến 16/10/2026. Bản clone `C:\laragon\www\dunnio-tailor-redesign` được giữ nguyên.

## Xem online — URL riêng cho từng phương án

1. [Heritage Atelier](https://tahieu98.github.io/2026-homepage-dunnio-tailor/v1-heritage-atelier.html)
2. [Design Studio](https://tahieu98.github.io/2026-homepage-dunnio-tailor/v2-design-studio.html)
3. [Wedding Story](https://tahieu98.github.io/2026-homepage-dunnio-tailor/v3-wedding-story.html)
   - [Wedding Story v3.1 — đầy đủ section, banner mobile 4:5](https://tahieu98.github.io/2026-homepage-dunnio-tailor/v3.1-wedding-story.html)
   - [Wedding Story v3.2 final — PC 7:4, slideshow tự động](https://tahieu98.github.io/2026-homepage-dunnio-tailor/v3.2-wedding-story.html)
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

## Thông số phiên bản hiện hành

[Hồ sơ hiện hành dạng HTML](docs/VERSION-STATUS.html) · [Markdown](docs/VERSION-STATUS.md) · [Manifest ảnh và SHA-256](docs/VERSION-STATUS.json). Tài liệu này ưu tiên hơn các bước lịch sử bên dưới. v3.2 final hiện dùng PC **7:4 / nguồn ảnh v3.1**, Tablet **5:3**, Mobile **hướng tới 4:7** có giới hạn chiều cao; tự chuyển mỗi **6 giây**, không còn banner-controls. v3.1 giữ các nút thủ công và Mobile **4:5**.

Chạy `node tools/build-version-status-docs.cjs` để đồng bộ hồ sơ từ cấu hình đang dùng.

Chạy `node tools/verify-current-docs.cjs` với HTTP preview để kiểm tra liên kết, bố cục tài liệu và bộ tính chiều cao; biên bản tại `docs/documentation-verification.json`.

## Năm concept gốc và hai biến thể

1. `v1-heritage-atelier.html` — tay nghề, nguồn gốc, giá trị.
2. `v2-design-studio.html` — cá nhân hóa, style preview, designer entry.
3. `v3-wedding-story.html` — wedding roles, date enquiry draft.
4. `v4-modern-essentials.html` — category-first, filters, use occasions.
5. `v5-fit-concierge.html` — guided finder, measurement/fit support.

Các trang có nội dung đầy đủ, responsive, banner slider thủ công, carousel, menu mobile và CTA; v3.2 đã bỏ FAQ theo yêu cầu. Các link sản phẩm và dịch vụ mở trang thật tại `https://dunniotailor.com`. Không có checkout, đăng ký tư vấn thật, lưu cấu hình 3D hay tracking trong prototype. Form cưới chỉ chuẩn bị email draft; người dùng tự xem và gửi trong ứng dụng email.

## Báo cáo responsive — Yêu cầu 19 (15/10/2026)

Hồ sơ khảo sát trước Yêu cầu 20 (Dunnio PC lúc đó là 3:2): đã đo Hockerty và Dunnio trên 30 viewport, kiểm tra metadata 12 ảnh banner của Hockerty. [Báo cáo đầy đủ dạng HTML](docs/hockerty-banner-audit-20261015.html) · [Markdown](docs/hockerty-banner-audit-20261015.md) · [Dữ liệu đo](docs/hockerty-banner-audit-20261015.json). Báo cáo BOD có mục dẫn tới bản phân tích này. Phạm vi hiện tại là báo cáo và đề xuất; homepage không được thay đổi theo đề xuất Yêu cầu 19.

Chạy `node tools/build-hockerty-audit-report.cjs` để dựng lại báo cáo từ JSON đã lưu. Nguồn ảnh/cấu trúc CSS và số đo có thể thay đổi theo chiến dịch, ngày hoặc phiên truy cập; báo cáo ghi nhận trạng thái quan sát ngày 15/10/2026.

## Wedding Story — Yêu cầu 17 (14/10/2026)

Hai biến thể mới giữ nguyên bản v3 gốc và footer. Header và logo trong menu mobile không còn liên kết tới trang so sánh.

- **v3.1:** mobile giữ banner 4:5; cụm nút chuyển ảnh căn giữa ngay dưới banner, trước hero-copy. Wedding party chuyển thành slider ngang trên mobile.
- **v3.2 ở Yêu cầu 17 (đã cập nhật bởi Yêu cầu 22):** bỏ Wedding party và FAQ; ẩn eyebrow trong hero mobile, đặt text/CTA gần chân ảnh. Hai nút cũ được tái sử dụng dưới ảnh, cách hai lề 20px. Khung ảnh hướng tới 4:7 và giới hạn chiều cao theo `100svh` để hero, CTA và hai nút nằm trong màn hình đầu.
- Thứ tự chung: hero → (Wedding party ở v3.1) → products → studio → looks → craft → customer reviews → Style Gallery → (FAQ ở v3.1) → closing → USP → footer. Products/studio/looks/craft ban đầu lấy từ v2; studio-board hiện đã thay bằng video theo Yêu cầu 21; products bỏ nội dung `.fine`.
- Craft nhấn mạnh thợ may Việt Nam với 15 năm kinh nghiệm. Feedback dùng ảnh/tên/ngày/rating tương ứng từ từng review gốc và bản tóm tắt có chú thích; một hàng slider thủ công, có prev/next, không tự chạy.
- Style Gallery giữ bảy ảnh trên desktop/tablet, bốn ảnh trên mobile để tiêu đề, mô tả và CTA nằm cùng một khung nhìn. USP bo góc; trên mobile bố cục chéo: 01/04 nền navy, chữ gold; 02/03 nền gold, chữ navy. Desktop/tablet giữ bảng màu trước đó.
- `assets/wedding-variants.css` chỉ áp dụng cho hai biến thể. `tools/build-wedding-variants.cjs` tạo lại chúng từ v2/v3 và dữ liệu trong `docs/wedding-story-sources.json`; `tools/prepare-wedding-sources.cjs` cập nhật nguồn ảnh và metadata từ website thật.
- Chạy `node tools/verify-wedding-variants.cjs` với biến môi trường `DUNNIO_PREVIEW_URL` trỏ tới HTTP preview để kiểm tra; kết quả tại `docs/wedding-story-verification.json`.
- `node tools/verify-wedding-footer.cjs` kiểm tra cuộn cảm ứng tới cuối footer sau khi đổi kích thước trên cùng một trang, gồm iPad 1032×1376, xoay ngang, tablet, mobile và PC; đồng thời kiểm tra màu nền/chữ USP. Kết quả 14 trường hợp tại `docs/wedding-footer-verification.json`. Khi kiểm thử bằng Chrome DevTools, chọn **Fit to window** để khung iPad không bị cắt bởi vùng hiển thị; footer giữ nguyên nội dung và bố cục.

## Wedding Story v3.2 final — Yêu cầu 22 (16/10/2026)

- PC trở về 7:4, dùng hai ảnh hiện có của v3.1; Tablet 5:3, Mobile 4:7 có cap theo chiều cao. Bỏ banner-controls, auto slide 6000ms; có nút dừng/phát nhỏ trên ảnh, tạm dừng khi hover/focus/offscreen/tab ẩn.
- Bỏ rail-controls ở products/looks/community; looks bỏ fine, craft bỏ detail-line. Thu gọn khoảng cách section, căn giữa CTA studio trên Mobile. All outfit ideas dùng nút gold/dark-blue; Read customer reviews nằm giữa dưới review rail.
- USP chỉ giữ số và tiêu đề, căn giữa trong các ô vuông. Eyebrow Mobile 16px, mô tả p trong main 14px. Footer/v3.1 giữ nguyên.
- [Hướng dẫn final](docs/WEDDING-FINAL-REQUEST22.md) · [Biên bản kiểm tra](docs/wedding-final-verification.json). Generator v3.2 áp dụng module tools/wedding-final.cjs; CSS/JS riêng ở assets/wedding-final.* revision request22-r1.
- Chạy `node tools/verify-wedding-final.cjs` để kiểm tra cấu trúc và ma trận quan sát browser đã lưu. Các biên bản trước 16/10 là hồ sơ theo thời điểm.

## Studio video — Yêu cầu 21 (15/10/2026)

- v3.1/v3.2 thay studio-board bằng demo Custom Outfit 3D, một player chọn video theo thiết bị: PC 1600×1000 (8:5), Tablet 834×1194 (139:199), Mobile 390×844 (195:422). Giữ nguyên khung nội dung video, có native controls; muted, loop, playsinline, phát khi vào vùng nhìn và dừng khi ra ngoài.
- Tôn trọng reduced-motion/Save-Data; giữ trạng thái dừng do người xem; poster riêng từng thiết bị và tải video khi cuộn gần phần studio. CTA mở trang designer thật.
- [Hướng dẫn triển khai](docs/STUDIO-VIDEO-UPDATE.md) · [Metadata và SHA-256](docs/studio-video-assets.json) · [16 trường hợp kiểm tra](docs/studio-video-verification.json). Các file MP4 được sao chép nguyên byte từ nguồn người dùng.
- Generator `tools/build-wedding-variants.cjs`, CSS `assets/wedding-variants.css?v=request21-r1`, script `assets/studio-video.js?v=request21-r1`; v2 và các banner hiện hành giữ nguyên.

## Lịch sử Wedding Story v3.2 — Yêu cầu 20: PC 16:7 (đã thay thế) (15/10/2026)

- PC từ 1200px chuyển sang khung **16:7**, thay thế cấu hình PC 5:3 trước đó; Tablet giữ **5:3**, Mobile giữ khung **4:7** và giới hạn chiều cao hiện tại.
- Dùng hai ảnh mới do người dùng cung cấp, kích thước thực **1896×829** (xấp xỉ 16:7). File nguồn đuôi .png chứa dữ liệu WebP; website dùng .webp đúng định dạng và giữ nguyên byte gốc. Slide 1 ảnh vườn: `wedding-story-v3.2-16x7-02-new.webp`; slide 2 bãi biển: `wedding-story-v3.2-16x7-01.webp`.
- Đồng bộ cấu hình riêng v3.2, ảnh mặc định không JavaScript, CSS và generator; CSS hiện dùng `request21-r1`, JS override banner vẫn là `request20-r2`. Cấu hình ảnh banner v3/v3.1 giữ nguyên.
- Hai slide trên chín kích thước, đổi thiết bị, prev/next, tắt JavaScript và SHA-256 ảnh nguồn đều đạt: `docs/wedding-v32-banner-verification.json`.

## Lịch sử Wedding Story v3.2 — PC 5:3 (đã thay thế) (15/10/2026)

- PC từ 1200px dùng khung **5:3**, tái sử dụng hai ảnh Tablet 1600×960: `wedding-story-a-5x3.webp` và `wedding-story-b-5x3.webp`. Cập nhật này thay thế cấu hình PC 3:2 của Yêu cầu 18 bên dưới.
- Tablet giữ **5:3**; mobile giữ khung **4:7** và giới hạn chiều cao hiện tại. Các phiên bản v3/v3.1 không đổi.
- Đã đồng bộ ảnh mặc định khi chưa chạy JavaScript, cấu hình slide, CSS và generator; đổi mã phiên bản CSS/JS để tải bản mới.
- Kiểm tra hai slide trên chín kích thước, đổi thiết bị, prev/next và ảnh mặc định không JavaScript: `docs/wedding-v32-banner-verification.json`.

## Lịch sử Wedding Story v3.2 — Yêu cầu 18 (đã thay thế) (15/10/2026)

- Banner PC (từ 1200px) chuyển sang khung **3:2**, dùng hai ảnh 1536×1024 do người dùng cung cấp trong `Banner-dunnio/original/wedding-story/processed/`. Các file nguồn có đuôi `.png` nhưng dữ liệu thực là WebP; bản đưa lên website dùng đuôi `.webp` đúng định dạng và giữ nguyên byte gốc.
- Thứ tự giữ cùng cảnh trên các thiết bị: slide 1 là ảnh vườn (`wedding-story-v3.2-3x2-02`), slide 2 là ảnh bãi biển (`wedding-story-v3.2-3x2-01`).
- Tablet tiếp tục dùng ảnh **5:3**, mobile giữ khung **4:7** có giới hạn chiều cao theo viewport như trước. v3 và v3.1 giữ nguyên cấu hình banner.
- `assets/wedding-story-v32-banners.js` chỉ được nạp ở v3.2, sau cấu hình chung và trước `app.js`; nó chỉ thay hai trường `desktop`. Generator đã đồng bộ ảnh mặc định, kích thước và thứ tự nạp script để tránh hiển thị ảnh PC cũ lúc tải trang.
- `node tools/verify-wedding-v32-banners.cjs` kiểm tra hai slide ở chín kích thước, nút chuyển ảnh, đổi thiết bị, ảnh mặc định khi tắt JavaScript và tính toàn vẹn ảnh nguồn; kết quả tại `docs/wedding-v32-banner-verification.json`.

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

Mô tả tiếp theo dành cho năm concept gốc; các ngoại lệ khung 16:7/4:7 của v3.2 và controls dưới ảnh được ghi trong VERSION-STATUS. Ảnh banner gốc `width:100%;height:auto` theo tỉ lệ thực. `concept-strip` đã xóa. **v1/v5** vẫn dùng editor chung 1659×948 (7:4) / 1619×971 (~5:3) + SVG dọc 800×1422/800×1000. **v2** 3 slide PC 1600×914 (7:4) / 3 slide tablet 1600×960 (5:3) / 2 slide mobile 1122×1402 (4:5, slide v2 thiếu bản dọc); **v3/v4** mỗi concept 2 slide đủ 3 tỉ lệ, WebP 1600×914 / 1600×960 / 1122×1402. Mobile là art direction riêng, không tự cắt giữa ảnh ngang. Khi overlay thiếu chỗ `app.js` chuyển copy xuống dưới và tách header khỏi ảnh.

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

## Banner thời trang — Yêu cầu 11

The Fit Concierge và bốn hero còn lại dùng ảnh full-width, thông điệp ngắn và một CTA dưới ảnh. Nguồn PC/Tablet/Mobile riêng; ảnh upload giữ đúng tỷ lệ thực. Slider thủ công và các module bên dưới được giữ.

- [Giải trình banner cho BOD](https://tahieu98.github.io/2026-homepage-dunnio-tailor/report.html#banner-update)
- `docs/FASHION-HERO-UPDATE.md`: art direction, UX và cách thay ảnh.
- `docs/fashion-hero-assets.json`: nguồn asset, kích thước và SHA-256.
- `docs/fashion-hero-verification.json`: full-width, một CTA, nhiều tỷ lệ ảnh và hành vi sticky CTA.
- `node tools/fashion-heroes.cjs`: chỉ dựng lại hero và artwork của 5 trang; không cần build để xem trang.
- Các browser verification tools nhận `DUNNIO_PREVIEW_URL`; có thể dùng URL `file:///C:/laragon/www/dunnio-homepage-concepts/` nếu Apache chưa chạy. `DUNNIO_STATIC_ONLY=1` bỏ HTTP route checks trong `tools/check-links.cjs`, vẫn kiểm tra link/anchor local.


## Historical Request 13 — responsive banner safe areas (12 October 2026)

Historical experiment (superseded by later editor artwork and Wedding Story changes): desktop8:3, portrait tablet4:3, tall mobile800:1422 and compact mobile4:5. The official transparent logo is truly centred; the full drawer opens from the left on all devices. Blog/Explore/Shop are inside the drawer. Foreground photographs scale uniformly against subject bounding boxes. Runtime checks reserve head/copy/control space and move copy below unregistered or unsafe artwork.

See [interactive formula](banner-guide.html), [editor recipe](docs/RESPONSIVE-BANNER-FORMULA.md), [configuration](assets/banner-layout.json), and [browser evidence](docs/responsive-banner-verification.json). Rebuild heroes using `node tools/fashion-heroes.cjs`; documentation using `node tools/update-balanced-docs.cjs`.


### Historical editor artwork update — five original concepts

User-supplied finished images replace the8:3 experiment: PC7:4 and tablet5:3, with a comparison slide. Header is a separate row. PC/tablet copy starts4.2% from left, width24%; controls136px wide,4.2% from right. See `docs/BANNER-EDITOR-SPEC.md` and `banner-guide.html`. Remaining browser tests were skipped at the user’s request.
