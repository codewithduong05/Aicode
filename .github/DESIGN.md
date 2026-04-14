```markdown
# Hệ Thống Thiết Kế: The Digital Curator

## 1. Overview & Creative North Star
Hệ thống thiết kế này không chỉ là một bộ công cụ thương mại điện tử; nó là một **"Nhà Giám Tuyển Kỹ Thuật Số" (The Digital Curator)**. Trong một thị trường đầy rẫy những banner nhấp nháy và màu sắc gây hấn, chúng ta chọn sự tĩnh lặng, chuyên gia và sự minh bạch tuyệt đối.

**Creative North Star:** *Sự tinh tế trong sự tối giản (Sophisticated Utility).*
Chúng ta phá vỡ cấu trúc lưới (grid) cứng nhắc bằng cách sử dụng các khoảng trắng có chủ đích, các lớp (layers) xếp chồng nhẹ nhàng và tỷ lệ typography mang tính biên tập (editorial). Mục tiêu là tạo ra cảm giác như khách hàng đang bước vào một showroom cao cấp, nơi mỗi chiếc laptop được trưng bày như một tác phẩm nghệ thuật, thay vì một nhà kho chứa hàng.

---

## 2. Colors: Tonal Depth & Soul
Chúng ta không sử dụng màu sắc để lấp đầy không gian; chúng ta sử dụng chúng để dẫn dắt hành vi và xây dựng niềm tin.

### Palette Highlights
- **Primary (`#004ac6`):** Đại diện cho sự tin cậy của chuyên gia. Sử dụng cho các điểm chạm quan trọng.
- **Secondary/Accent (`#855300`):** Màu hổ phách dành riêng cho giá tiền và nút "Mua ngay". Nó nổi bật nhưng không gắt gỏng.
- **Surface Tiers:** Sử dụng từ `surface-container-lowest` (#ffffff) đến `surface-dim` (#d2d9f4) để phân cấp nội dung.

### The "No-Line" Rule
**Nghiêm cấm sử dụng border 1px để phân chia các phần.** Sự phân chia phải được thực hiện thông qua sự thay đổi sắc thái màu nền (ví dụ: một thẻ sản phẩm `surface-container-lowest` nằm trên nền `surface-container-low`). Điều này tạo ra một giao diện mượt mà, không bị "vụn" bởi các đường kẻ cứng.

### The "Glass & Gradient" Rule
Để thoát khỏi cảm giác "web bán hàng mẫu", các yếu tố nổi (floating elements) như giỏ hàng hoặc menu điều hướng phải sử dụng hiệu ứng **Glassmorphism**.
- **Công thức:** Kết hợp màu `surface` với độ trong suốt 80% và `backdrop-blur: 12px`.
- **Signature Gradient:** Sử dụng dải chuyển màu nhẹ từ `primary` (#004ac6) sang `primary-container` (#2563eb) cho các banner chính để tạo chiều sâu và linh hồn cho thiết kế.

---

## 3. Typography: Vietnamese Clarity
Sự kết hợp giữa **Be Vietnam Pro** (Headings) và **Inter** (Body) tạo ra sự cân bằng giữa tính kỹ thuật và sự gần gũi.

- **Display & Headline (Be Vietnam Pro):** Dành cho tiêu đề lớn, thông điệp thương hiệu. Khoảng cách dòng (line-height) được thiết lập rộng rãi (1.2 - 1.4) để các dấu thanh tiếng Việt không bị chồng chéo.
- **Title & Body (Inter):** Tối ưu cho việc đọc thông số kỹ thuật. 
- **Price Highlighting:** Giá tiền luôn sử dụng `Title-LG` hoặc `Headline-SM`, in đậm (Bold), sử dụng màu `secondary`. Ví dụ: **24.990.000đ**.

| Token | Font | Size | Case | Usage |
| :--- | :--- | :--- | :--- | :--- |
| `display-lg` | Be Vietnam Pro | 3.5rem | Sentence | Hero banners |
| `headline-md` | Be Vietnam Pro | 1.75rem | Sentence | Tên sản phẩm chi tiết |
| `title-md` | Inter | 1.125rem | Medium | Danh mục, Menu |
| `body-md` | Inter | 0.875rem | Regular | Mô tả thông số kỹ thuật |

---

## 4. Elevation & Depth: Tonal Layering
Thay vì dùng bóng đổ (shadow) để tạo khối, chúng ta sử dụng **Tonal Layering (Lớp phủ sắc thái)**.

- **The Layering Principle:** 
    - Lớp nền chính: `surface` (#faf8ff).
    - Section nổi bật: `surface-container-low`.
    - Card sản phẩm: `surface-container-lowest` (#ffffff).
- **Ambient Shadows:** Chỉ sử dụng bóng đổ khi phần tử thực sự "bay" trên bề mặt (như Modal hoặc Dropdown). 
    - *Shadow Token:* `box-shadow: 0 10px 30px rgba(19, 27, 46, 0.05);` (Màu shadow là biến thể của `on-surface`).
- **The "Ghost Border":** Nếu cần phân tách các biến thể sản phẩm (RAM, màu sắc), sử dụng `outline-variant` với độ trong suốt 20%. Tuyệt đối không dùng màu đen hoặc xám đặc.

---

## 5. Components: Editorial Precision

### Buttons (Nút bấm)
- **Primary:** Gradient từ `primary` đến `primary-container`, bo góc `md` (12px). "Mua Ngay" - Tạo sự thôi thúc nhưng tinh tế.
- **Secondary:** Nền `secondary-fixed-dim`, chữ `on-secondary-fixed`. "Thêm vào giỏ".
- **Ghost:** Không nền, chỉ có chữ và icon. "Xem chi tiết".

### Cards (Thẻ sản phẩm)
- **Cấm sử dụng divider.** Phân tách thông tin (Hình ảnh - Tên - Giá) bằng khoảng trắng `spacing-lg`.
- **Hover state:** Không dùng shadow lớn. Khi hover, thẻ hơi nâng nhẹ (transform: translateY(-4px)) và đổi màu nền sang `surface-bright`.

### Input Fields (Ô nhập liệu)
- Nền `surface-container-low`, không border. Khi focus, xuất hiện một "Ghost Border" màu `primary` ở mức 30% opacity.
- Nhãn (Label) sử dụng `label-md` màu `secondary-text`.

### Product Chips (Nhãn trạng thái)
- **In-stock:** Nền `tertiary-container` (Xanh lá), chữ `on-tertiary-container`. "Còn hàng".
- **Promotion:** Nền `error-container` (Đỏ nhạt), chữ `on-error-container`. "Giảm 15%".

---

## 6. Do's and Don'ts

### Do (Nên làm)
- **Sử dụng tiếng Việt tự nhiên:** Thay vì "Buy Now", hãy dùng "Mua ngay". Thay vì "Description", dùng "Đặc điểm nổi bật".
- **Khoảng trống là sang trọng:** Hãy để các sản phẩm "thở". Khoảng cách giữa các section tối thiểu là 80px.
- **Căn lề bất đối xứng:** Thử đặt hình ảnh laptop tràn lề trái và nội dung ở 2/3 lề phải để tạo cảm giác editorial.

### Don't (Không nên làm)
- **Không dùng Border 1px:** Nhắc lại, đây là kẻ thù của sự cao cấp trong hệ thống này.
- **Không dùng Icon quá màu mè:** Chỉ sử dụng Outline Icons với nét mảnh (1.5pt) màu `secondary-text`.
- **Không nhồi nhét:** Đừng cố đưa tất cả thông số vào thẻ sản phẩm ở trang chủ. Chỉ đưa: CPU, RAM, Card đồ họa, Giá.

---
*Hệ thống này được thiết kế để tạo ra một hành trình mua sắm điềm tĩnh, nơi khách hàng cảm thấy ý kiến của họ được tôn trọng và sự chuyên nghiệp của chúng ta được khẳng định qua từng pixel.*