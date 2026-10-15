# Banner chung và hệ danh mục Dunnio

> **Hiện hành 15/10/2026:** v3.2 PC **16:7**, nguồn 1896×829, slide 1 **02-new**, slide 2 **01**; Tablet **5:3**, Mobile khung hướng tới **4:7** có giới hạn chiều cao. v3.1 giữ PC gần 7:4, Tablet 5:3, Mobile 4:5. Xem [trạng thái phiên bản hiện hành](VERSION-STATUS.md) và [bản HTML](VERSION-STATUS.html). Các tỷ lệ/ảnh trong phần lịch sử không ghi đè cấu hình này.

Ngày 12/10/2026. Áp dụng trên cả 5 homepage theo yêu cầu tiếp theo sau Yêu cầu 11.

## Tham chiếu và quyết định

Đã xem [Hockerty US](https://www.hockerty.com/en-us/) trong trình duyệt và đối chiếu ảnh PC/Tablet/Mobile người dùng cung cấp: ảnh chiến dịch dẫn dắt vùng đầu trang, navigation trên ảnh, headline ngắn và subline ở vùng dưới ảnh. Dùng cùng cấu trúc đó cho cả 5 demo, giữ màu navy/gold và Garamon Pro Display/Afacad của Dunnio; chỉ đổi chủ đề, hình và đích CTA.

Headline, subline một câu và CTA đều là HTML, không đóng chữ vào ảnh. Một lớp chuyển sắc navy hỗ trợ tương phản ở vùng nav và copy. Slider thủ công; không autoplay. Navbar chuyển white/navy khi cuộn hoặc mở menu. Ảnh nguồn riêng: PC 1600×900 (16:9), tablet 1200×900 (4:3), mobile 800×1422 (xấp xỉ 9:16). Tablet tới 1199px dùng nguồn tablet và menu drawer; desktop từ 1200px có mega menu. Ảnh hoàn chỉnh vẫn giữ tỷ lệ thực qua `height:auto`.

Nếu artwork thay thế quá thấp để chứa copy và header, copy tự chuyển ra dưới ảnh để tránh đè nội dung hoặc mất nút. Dải banner white phía dưới của lần hiệu chỉnh trước đã được thay bằng overlay theo tham chiếu Hockerty; các ghi chú lần trước cần đọc như lịch sử thiết kế.

## Đủ danh mục như website hiện tại

Nguồn menu lấy từ [Dunnio Tailor](https://dunniotailor.com/) ngày 12/10/2026, lưu thành `assets/navigation-tree.json` cùng SHA-256 của HTML nguồn. Sáu mục chính:

1. Customize outfit: Outfit Sets và Individual Items.
2. Custom clothing: Suits, Shirts, Pants, Blazers, Tuxedo, đầy đủ nhánh vật liệu/kiểu trang phục.
3. Occasion: Wedding suits, Business, Formal Events, Party, Casual.
4. Shop: bốn nhóm phụ kiện đang có.
5. Blog: liên kết trực tiếp.
6. Explore: Customers, Support, Policies, About Us.

Có 72 liên kết menu, 71 đích duy nhất; Custom clothing có 24 nhánh. Tất cả 71 đích trả HTTP 200 khi kiểm tra ở thời điểm cập nhật; dữ liệu nằm trong `navigation-source-checks.json`. Kết quả này không đảm bảo trạng thái của URL trong tương lai.

PC dùng các panel phân nhóm có click/hover, ArrowDown để vào nhánh, Escape và nút đóng. Tablet/Mobile có drawer với sáu mục chính, màn danh mục con đầy đủ, nút quay lại và nút đóng luôn nhìn thấy. Focus được giữ trong drawer; nội dung nền bị inert trong lúc mở; đóng menu trả focus về nơi mở. Có nút “Custom clothing” nhìn thấy trên header ở màn hình nhỏ, ngoài nút Menu.

## Lối vào dịch vụ cho khách ít dùng công nghệ

`.intro-line` trở thành một grid 10 lựa chọn nhìn thấy trực tiếp ngay dưới banner: Custom suits, 3 Piece Suits, Tuxedos, Dress shirts, Dress pants, Blazers, Vests, Wedding suits, Design your outfit, How it works. Không giấu các lựa chọn trong rail cần swipe. PC 5 cột, tablet 3 cột, mobile 2 cột; nút navy đậm/chữ white, arrow gold, nhãn mobile 16px và vùng bấm ít nhất 68px. Nút “All custom clothing” mở cùng menu đầy đủ của header.

Nguyên tắc UX: nhận biết thay vì phải nhớ biểu tượng menu; nhiều lối vào cùng một danh mục nhưng cùng tên/đích, để khách mới không cần hiểu cấu trúc điều hướng trước. Mega menu phân nhóm giúp quét nội dung; drawer giữ ngữ cảnh bằng tên danh mục và nút quay lại. Đây là giả thuyết thiết kế cần đo với người dùng, không phải bằng chứng tăng chuyển đổi.

## Blog

Bỏ toàn bộ section bài blog tiêu biểu (`journal-section`) khỏi cả 5 homepage theo ưu tiên nội dung người dùng yêu cầu. Giữ Blog trong menu và footer. Bộ chọn trang phục, category, craft, fit/process, inspiration và 4 USP ngay trước footer tiếp tục thuộc hành trình mua.

## Kiểm chứng

`hockerty-navigation-verification.json` ghi lại kiểm tra cấu trúc và browser review. Cần đọc cùng status của từng giai đoạn; không diễn giải static checks thành kiểm thử giao diện đã hoàn tất. Thư viện screenshot được cập nhật sau browser review. Kiểm thử responsive trong browser không thay thế kiểm thử iOS/Android thực hoặc usability test với nhóm khách ít dùng công nghệ.
