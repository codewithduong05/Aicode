export type ProductBadgeTone = "sale" | "fresh" | "good";

export interface ProductBadge {
  label: string;
  tone: ProductBadgeTone;
}

export interface ProductHighlight {
  label: string;
  value: string;
  icon: string;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface ProductReviewPoint {
  title: string;
  detail: string;
}

export interface ProductRecord {
  slug: string;
  name: string;
  brand: string;
  collectionLabel: string;
  category: string;
  coverImage: string;
  gallery: string[];
  cardSpecs: string;
  currentPrice: number;
  originalPrice?: number;
  reviewRating: number;
  reviewCount: number;
  badges: ProductBadge[];
  financText? :  string;
  financingText: string;
  cartNote: string;
  fitForYou: string[];
  cautionNotes: string[];
  highlights: ProductHighlight[];
  specifications: ProductSpecification[];
  reviewPoints: ProductReviewPoint[];
  comparePoints: string[];
  relatedSlugs: string[];
}

export interface NeedOption {
  icon: string;
  title: string;
}

export interface TrustItem {
  icon: string;
  label: string;
}

export interface CategoryCard {
  title: string;
  count: string;
  image: string;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  avatar: string;
}

export interface AccountShortcut {
  title: string;
  description: string;
}

export interface ArticleAuthor {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

export interface Article {
  slug: string;
  category: string;
  categoryBadgeColor?: string; // e.g. "red", "blue", "green"
  title: string;
  summary: string;
  content: string;
  coverImage: string;
  publishedAt: string;
  readTime: string;
  authorId: string;
  relatedProductSlugs?: string[];
}

const tufGallery = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBkmUpJ7aUGi5xMH1QBH7eWBXNTet7mQdMvN32Fr1QG5uH7h4gYnu18llsl0ScRxNnLFo-qKiRbqOm1LKDPI3DYzrz_twgEM3_ZTSaL_swJ0QCsxr9MygnRyCnFlVct8v5xr1lRACp4Np49f3TJqrAQckH13GOn8fLkA_OJNIax-tdRAo96XYHY0ggzG4NgqKGZ9sVRNNJ2pszqKLOUcfD--vk9Tqxt0mUmlLz_QsLw8Rn0g-uX_2yu2BOiLhHl_gGbxVJ5tg4Z0WU",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCy1Zwcj20BZTwXaxJ7RgeCzROPorTRxIDS18LEt9zmVpcc5C1ckmMTU6QBj7ns_n0x9I91x48sfgHqEMBSRWMEyWS2rqncwNFojQnx81Q7zSDo72iQxJO4p5k0JeXC7OppPjsqiXIO-FnL7BHWTPa6xPJr0WCuwrVMkqb0bUEUXRto0s_USQKQcva2cNE6X9Uft3ZSWnJ_h_jS9RrthsxgXCTW8V3IP821L9oZkyEXfTFxkr2QPgLwTUJv5Ku3ORJx9TMOgEkU8Og",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCKIQaLIpEzsz6XsGkwveA3aYL4GxcY-slSwoknTHVf-kM8NRqKKz8qk70zn3d_geuvLGd-533a3ADBkjbLpAUH8U15ktXEedAVHqSplOcUdMWcUFsCFLLo0PdrY-G-2GrW5SMEzTtEBT69mszDw0_oKPy-sVDkIujOe6AgvC2fRBwI6JmNZYsz09rl6tSlefkmL_RrKrQbRIYSpqKeUksgwYPXilTc6KdSEdACfaZD-xBiNQdXNUy7SsJFhZLy_7QnR2CKzIv3Peo",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB8aN8b8ctWv5wCx7jkuExjV6TcfbqO9i04G_0hI2JH5Chs0uK1qGPd3amb34L0Z8OzW6thvawwKf_2WnDt_gAM0duC4qZ2Ez05BVF8qwuiLFKOt7mKvusG4aO1u-f-AyqdFQFfPNMo4HK8IXv-lKzAwICEyVX21fJNHku0DYdhbrRYGRJ0xPqYkiGoagTghqLY4uxSAX0dg7EgzMq3lmAsdSEDqcLVtime28oH3XVE15PNSmW9lpQdtMYKzUR1fJav-wt9928VxDo",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDS_ewTF87qIQBNL3YJf5UwRPOZCPM4rHiupWLAbOsGkCEXfgyr_vuZIJdIUe5Mei7gkr-zivOcUa4F7qIUtTtPc_xtGTK0HV4eCy5J5fxM0NuItN5nBtzwDeDISBDWQ2SAdNocojSigGl0lWEwcDC6PZDOyLGSSQFLqhlVhQJBMqblIv5EBLhbmx8X_OoJUxpPHedx9qmXOPDN70FoWrvcji__tLyOpTJG9rFvwqd7ijKiQmDBV3sRzXbqWXUFBIgKnfz_AjDOPlY",
];

const officeGallery = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDqDQWgEvdZQWvpNhkkyi-zklGzABA8NZAPnzPs72nSgKvNH4e21YwWEEsddBKb4bmf8xLxxLlSJ9tNSjdt_Q6Os9MRfrBJVW90xJ8Zxxqoso_6RWEgR8629vuLCaUoZbg3L7ftu0U02wD27JAR1H_cJ2BX--gimJ7UaEPaojWz7A9WF75-5y3lJpqMyZgx-xndhZ253Gb7mI7m7BOdTsJnpqwv3eYmGKRPRO_iOH7vyedHoMXvgVp6CwMar7O1yhi16mY5q1Z4-48",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBIqpI-YhCsyIZ4vWTn7iVZcr3OznmGke_T2LrKx6iAfdYldJAtmzPGikS8Ns4P0Rx1e5JwHhiaAGzQzxK9zht6oJ6QPO6y7TMaoNn28e56NPo530S1X9nxpOpkNDleB9XngEUdyowRmjVwCC_VV2VyEqR1duNIxRdW8FOupNsrqFCxrKTXxrWCTp3b4FtpRT9w4iw0QevMwW-49m4MoVNW2BZw96oZaNawx46uEWh3oEvdvzEKMiaHCIuLQA5tSCigPphrVJZD49U",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAlj2VtAwI6j-uisdDaZS09HuMeT7aW94jVDqa7Ef-ylcftL5rIdtSvsT1q1jPJhCxzwlQWZkkm0L7AnhLctItGMh-hnBrSyOfer8mhY8QQPmdl_8fGTqUmp29yh8p-F_OfluWjJNlGaZ6Z7UPfX53sd4XbPwMAvUp7AkrAh21vuu59xWz8Cemmu9kKmd0br6yKfHh3k9HG282gTBAMMm8tFoqqxZcSZEcEvvqVqS8RTfPe9rErRxU3dqpbWgVK0qENHrxZDtH_c_o",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBkEfOknYKG47svUvGOoJ4abRn5nThanUr76Fzb6NJLu9vDkIfDM9GoyMQUEBOj5YC6-ZMpDDtoUwVC_6hY1w0ZktuKgt2q9CdC3V1PkxM61g2RyZQ9XhGYFdiikd7o4-XBYTvvoHxLiJwEwqVf2zlYx8YPbcga7Qlt1qh8wFhSh57ijcXFbqufvc0gpmwBpxVtqfKVEPCM3hDlBUevn418I68woKbgGU-_Wgdscd8Sgu9mEvLWParMQFwGV9WKKwkVsXrJqr6ndlI",
];

const gamingGallery = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCXScGPwhKKCDrUUA_eJwjQXaUnY4W5NaIL0OJkCBYwKurzkHlaIDwyu_oVBNWD90tgV3MAciEDsUAwUaFkrAi2j6k8TGdicKGi0h-6_ItzdRV0rJDDC1MuoQSb09J-pAw41idFR15-sli0pBNJTwzdm0zjhRtV-XaMrEa_vd58JOQkwQ4otks7Zy9FhRa_zZ2PKLfGcPhF8TFnGZ7-RKun-G8cJY8cnqG1TXaAdW6ofb8acGWwVx8OGfvc-HbejcrSrjwwj_gHGp8",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAaShOl6OYCkikXmpF-Id86eBoMRZdo2UOy8DGg3X-eFIU1a5jPZrkF0Hhvrx9-purmUqodpvttpkqUQ6CWAyVLQrMTUBUaXX-OcTTtPh0xwWbMcsKyQlkebvTE2tHgQIteXlku0H4z3DodRPMIVXclx6scEb4UK-68VV5YtG8-h3YlVHlbwh6rw9kFL6aDgNcYb2LdftD-r0mjHOfpoScIdGsDwvuQBnCSb6ezwAXzGxw2XaMpBzdEq3WFS9O-o_j5HYo6I1xGF7E",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDTqVmq9-XeHH0DunVB97sosrp6j6mCW7r-7RTGBJVLUOPHSY0pOjfh0eTAIHKgdGiu_fElkT4Jatblvlsp2F1DsudfhorO445hHbpYVSxUInfpngLr0l8X_bBUG0kt_qjxATGz_Ium_FxowZwWHv95FAeDUyzd7acmU3nQ2EBUqI20_4C1quUvERlTHO1K_giTS2WBw6TZ1BTFXA28LUhR7cCR5CCS3dc916rF398adJB42akZsG1EjqWeu8TQCrgsSrYXJVCyKe4",
  ...tufGallery.slice(1, 3),
];

export const productsTable: ProductRecord[] = [
  {
    slug: "asus-tuf-gaming-a15-fa507nu-lp034w",
    name: "ASUS TUF Gaming A15 FA507NU-LP034W (Ryzen 7 7735HS | RTX 4050 | 144Hz)",
    brand: "ASUS",
    collectionLabel: "ASUS TUF Gaming",
    category: "Gaming",
    coverImage: tufGallery[0],
    gallery: tufGallery,
    cardSpecs: "Ryzen 7 7735HS | 16GB | 512GB | RTX 4050",
    currentPrice: 23490000,
    originalPrice: 27990000,
    reviewRating: 4.8,
    reviewCount: 128,
    badges: [
      { label: "Bán chạy", tone: "sale" },
      { label: "Mới về", tone: "good" },
    ],
    // financText: `Trả góp 0% chỉ từ <span className="financingText">${1950000}/tháng</span>`,
    financText : "Trả góp 0% chỉ từ ",
    financingText: "1.950.000đ/tháng",
    cartNote: "Giữ giá online đến 23:59 hôm nay",
    fitForYou: [
      "Bạn cần một chiếc laptop gaming bền bỉ đạt chuẩn quân đội.",
      "Ưu tiên hiệu năng đồ họa RTX 40-series thế hệ mới nhất.",
      "Yêu cầu màn hình 144Hz mượt mà cho game bắn súng.",
    ],
    cautionNotes: [
      "Bạn cần máy siêu mỏng nhẹ để di chuyển hàng ngày (máy nặng 2.2kg).",
      "Bạn làm đồ họa chuyên nghiệp cần độ bao phủ màu 100% sRGB.",
    ],
    highlights: [
      { label: "CPU", value: "Ryzen 7 7735HS", icon: "cpu" },
      { label: "GPU", value: "RTX 4050 6GB", icon: "gpu" },
      { label: "Display", value: '15.6" 144Hz FHD', icon: "display" },
      { label: "RAM/SSD", value: "16GB / 512GB", icon: "memory" },
    ],
    specifications: [
      { label: "CPU", value: "AMD Ryzen 7 7735HS" },
      { label: "RAM", value: "16GB DDR5 4800MHz" },
      { label: "Ổ cứng", value: "512GB SSD M.2 NVMe" },
      { label: "Đồ họa", value: "NVIDIA GeForce RTX 4050 6GB" },
      { label: "Màn hình", value: '15.6" FHD IPS 144Hz' },
      { label: "Khối lượng", value: "2.2kg" },
    ],
    reviewPoints: [
      { title: "Khung máy chắc chắn", detail: "Hoan thien dam chat TUF, phan ban le va vo may cho cam giac on dinh khi su dung lau dai." },
      { title: "Nhiet do de kiem soat", detail: "He thong quat kep giu xung nhip on ngay ca khi choi game FPS lien tuc." },
      { title: "Man hinh muot", detail: "Tan so quet 144Hz cho trai nghiem game va cuon noi dung muot hon ro ret." },
    ],
    comparePoints: [
      "Manh hon dong office/gaming entry nhung doi lai trong luong nang hon.",
      "Gia tri tot neu uu tien GPU RTX 4050 hon la man sac mau chuan do hoa.",
      "Phu hop lam may choi game va hoc tap ky thuat hon la laptop di chuyen moi ngay.",
    ],
    relatedSlugs: ["msi-katana-15-b13vek-252vn", "lenovo-legion-5-15iah7h", "asus-vivobook-15-x1504va"],
  },
  {
    slug: "msi-katana-15-b13vek-252vn",
    name: "MSI Katana 15 B13VEK-252VN (Core i7 13620H | RTX 4050 | 144Hz)",
    brand: "MSI",
    collectionLabel: "MSI Gaming",
    category: "Gaming",
    coverImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAaShOl6OYCkikXmpF-Id86eBoMRZdo2UOy8DGg3X-eFIU1a5jPZrkF0Hhvrx9-purmUqodpvttpkqUQ6CWAyVLQrMTUBUaXX-OcTTtPh0xwWbMcsKyQlkebvTE2tHgQIteXlku0H4z3DodRPMIVXclx6scEb4UK-68VV5YtG8-h3YlVHlbwh6rw9kFL6aDgNcYb2LdftD-r0mjHOfpoScIdGsDwvuQBnCSb6ezwAXzGxw2XaMpBzdEq3WFS9O-o_j5HYo6I1xGF7E",
    gallery: gamingGallery,
    cardSpecs: "i7 13620H | 16GB | 512GB | RTX 4050",
    currentPrice: 21990000,
    originalPrice: 24990000,
    reviewRating: 4.6,
    reviewCount: 74,
    badges: [{ label: "Gia tot", tone: "sale" }],
    financText : "Tra gop 0% chi tu ",
    financingText: "1.820.000đ/thang",
    cartNote: "Con 4 may o kho mien Nam",
    fitForYou: [
      "Ban can may gaming RTX 4050 de vao game va render co ban.",
      "Thich ban phim co den nen noi bat trong tan gia tam trung.",
      "Can he thong tan nhiet on de su dung lau trong phong may lanh.",
    ],
    cautionNotes: [
      "Thiet ke noi bat hon laptop di hoc, khong phu hop neu ban can ngoai hinh toi gian.",
      "Thoi luong pin trung binh, can sac khi mang di ca ngay.",
    ],
    highlights: [
      { label: "CPU", value: "Core i7 13620H", icon: "cpu" },
      { label: "GPU", value: "RTX 4050 6GB", icon: "gpu" },
      { label: "Display", value: '15.6" 144Hz FHD', icon: "display" },
      { label: "RAM/SSD", value: "16GB / 512GB", icon: "memory" },
    ],
    specifications: [
      { label: "CPU", value: "Intel Core i7 13620H" },
      { label: "RAM", value: "16GB DDR5 5200MHz" },
      { label: "Ổ cứng", value: "512GB SSD NVMe" },
      { label: "Đồ họa", value: "NVIDIA GeForce RTX 4050 6GB" },
      { label: "Màn hình", value: '15.6" FHD IPS 144Hz' },
      { label: "Khối lượng", value: "2.25kg" },
    ],
    reviewPoints: [
      { title: "Ban phim de lam quen", detail: "Form phim lon, do nay tot va de thao tac khi choi game lan go van ban." },
      { title: "Hieu nang can bang", detail: "Cap doi CPU i7 va RTX 4050 du suc gap coding, game va do hoa co ban." },
      { title: "Gia ca canh tranh", detail: "Thuong xuyen nam trong nhom may gaming RTX 4050 gia de vao nhat." },
    ],
    comparePoints: [
      "Can bang giua gia va hieu nang, phu hop neu ban uu tien GPU.",
      "Vo may khong dam chat quan doi nhu dong TUF nhung nhe hon mot chut.",
      "Phu hop de doi sang RTX 4050 neu ban dang o muc ngan sach 22 trieu.",
    ],
    relatedSlugs: ["asus-tuf-gaming-a15-fa507nu-lp034w", "lenovo-legion-5-15iah7h"],
  },
  {
    slug: "lenovo-legion-5-15iah7h",
    name: "Lenovo Legion 5 15IAH7H (Core i7 12700H | RTX 3060 | 165Hz)",
    brand: "Lenovo",
    collectionLabel: "Lenovo Legion",
    category: "Gaming",
    coverImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCXScGPwhKKCDrUUA_eJwjQXaUnY4W5NaIL0OJkCBYwKurzkHlaIDwyu_oVBNWD90tgV3MAciEDsUAwUaFkrAi2j6k8TGdicKGi0h-6_ItzdRV0rJDDC1MuoQSb09J-pAw41idFR15-sli0pBNJTwzdm0zjhRtV-XaMrEa_vd58JOQkwQ4otks7Zy9FhRa_zZ2PKLfGcPhF8TFnGZ7-RKun-G8cJY8cnqG1TXaAdW6ofb8acGWwVx8OGfvc-HbejcrSrjwwj_gHGp8",
    gallery: gamingGallery,
    cardSpecs: "i7 12700H | 16GB | 512GB | RTX 3060",
    currentPrice: 28990000,
    originalPrice: 31990000,
    reviewRating: 4.9,
    reviewCount: 89,
    badges: [{ label: "On dinh", tone: "good" }],
    financText:"Tra gop 0% chi tu ",
    financingText: "2.410.000đ/thang",
    cartNote: "Co san phien ban RAM 32GB dat truoc",
    fitForYou: [
      "Ban uu tien tan nhiet va trai nghiem choi game on dinh duoi tai nang.",
      "Can man 165Hz va ban phim chac chan de su dung lau dai.",
      "Muon may gaming can bang giua hieu nang va hoan thien.",
    ],
    cautionNotes: [
      "Gia cao hon nhom RTX 4050 tam trung.",
      "Trong luong va kich thuoc van thuoc nhom laptop gaming day dan.",
    ],
    highlights: [
      { label: "CPU", value: "Core i7 12700H", icon: "cpu" },
      { label: "GPU", value: "RTX 3060 6GB", icon: "gpu" },
      { label: "Display", value: '15.6" 165Hz WQHD', icon: "display" },
      { label: "RAM/SSD", value: "16GB / 512GB", icon: "memory" },
    ],
    specifications: [
      { label: "CPU", value: "Intel Core i7 12700H" },
      { label: "RAM", value: "16GB DDR5 4800MHz" },
      { label: "Ổ cứng", value: "512GB SSD PCIe 4.0" },
      { label: "Đồ họa", value: "NVIDIA GeForce RTX 3060 6GB" },
      { label: "Màn hình", value: '15.6" WQHD IPS 165Hz' },
      { label: "Khối lượng", value: "2.35kg" },
    ],
    reviewPoints: [
      { title: "Ban phim Legion de danh gia cao", detail: "Do nay tot, layout hop ly cho ca game thu va nguoi dung van phong." },
      { title: "Nhiet do em", detail: "Dong Legion giu muc nhiet do va tieng quat de chiu trong da so tac vu." },
      { title: "Man hinh chat luong", detail: "Do sang va tan so quet cao phu hop cho game, xem phim va lam noi dung." },
    ],
    comparePoints: [
      "On dinh va cao cap hon nhom gaming gia 22-24 trieu.",
      "Phu hop nguoi can man hinh dep hon va he thong tan nhiet chau chuot.",
      "Neu ban uu tien gia, TUF va Katana de tiep can hon.",
    ],
    relatedSlugs: ["asus-tuf-gaming-a15-fa507nu-lp034w", "msi-katana-15-b13vek-252vn"],
  },
  {
    slug: "dell-xps-13-plus-9320",
    name: "Dell XPS 13 Plus 9320 (Core i7 1260P | 16GB | 512GB)",
    brand: "Dell",
    collectionLabel: "Dell XPS",
    // category: "Mong nhe cao cap",
    category : "Gaming",
    coverImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDqDQWgEvdZQWvpNhkkyi-zklGzABA8NZAPnzPs72nSgKvNH4e21YwWEEsddBKb4bmf8xLxxLlSJ9tNSjdt_Q6Os9MRfrBJVW90xJ8Zxxqoso_6RWEgR8629vuLCaUoZbg3L7ftu0U02wD27JAR1H_cJ2BX--gimJ7UaEPaojWz7A9WF75-5y3lJpqMyZgx-xndhZ253Gb7mI7m7BOdTsJnpqwv3eYmGKRPRO_iOH7vyedHoMXvgVp6CwMar7O1yhi16mY5q1Z4-48",
    gallery: officeGallery,
    cardSpecs: "i7 1260P | 16GB | 512GB | 13.4 inch",
    currentPrice: 34990000,
    originalPrice: 41000000,
    reviewRating: 4.7,
    reviewCount: 96,
    badges: [{ label: "Flash Sale", tone: "sale" }],
     financText:"Tra gop 0% chi tu ",
    financingText: "2.910.000đ/thang",
    cartNote: "Bao hanh chinh hang 24 thang",
    fitForYou: [
      "Ban uu tien thiet ke cao cap va man hinh dep cho moi cuoc hop.",
      "Can may Windows mong nhe nhung van du suc cho cong viec van phong nang.",
      "Muon touchpad an va layout toi gian, hien dai.",
    ],
    cautionNotes: [
      "Khong phai lua chon tot nhat neu ban choi game 3D nang.",
      "Gia thanh thuoc nhom ultrabook cao cap.",
    ],
    highlights: [
      { label: "CPU", value: "Core i7 1260P", icon: "cpu" },
      { label: "Display", value: '13.4" 3.5K OLED', icon: "display" },
      { label: "RAM", value: "16GB LPDDR5", icon: "memory" },
      { label: "Khối lượng", value: "1.26kg", icon: "bag" },
    ],
    specifications: [
      { label: "CPU", value: "Intel Core i7 1260P" },
      { label: "RAM", value: "16GB LPDDR5" },
      { label: "Ổ cứng", value: "512GB SSD NVMe" },
      { label: "Đồ họa", value: "Intel Iris Xe Graphics" },
      { label: "Màn hình", value: '13.4" OLED 3.5K' },
      { label: "Khối lượng", value: "1.26kg" },
    ],
    reviewPoints: [
      { title: "Ngoai hinh cao cap", detail: "Thiet ke XPS dong deu, hien dai va rat hop moi truong cong so cao cap." },
      { title: "Trackpad tang ap", detail: "Cam giac su dung moi me, bo mat lien mach tren than may." },
      { title: "De mang di", detail: "Khoi luong nhe va sac USB-C gon phu hop di chuyen lien tuc." },
    ],
    comparePoints: [
      "Phu hop nguoi uu tien thiet ke va trai nghiem cao cap hon hieu nang do hoa.",
      "Nho gon hon nhieu so voi laptop gaming hay may 15.6 inch.",
      "Gia cao hon nhom van phong pho thong nhung doi lai hoan thien tot hon ro ret.",
    ],
    relatedSlugs: ["macbook-air-m2-8gb-256gb", "asus-vivobook-15-x1504va"],
  },
  {
    slug: "macbook-air-m2-8gb-256gb",
    name: "MacBook Air M2 8GB 256GB (13.6 inch Liquid Retina)",
    brand: "Apple",
    collectionLabel: "MacBook Air",
    category: "Mong nhe",
    coverImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBkEfOknYKG47svUvGOoJ4abRn5nThanUr76Fzb6NJLu9vDkIfDM9GoyMQUEBOj5YC6-ZMpDDtoUwVC_6hY1w0ZktuKgt2q9CdC3V1PkxM61g2RyZQ9XhGYFdiikd7o4-XBYTvvoHxLiJwEwqVf2zlYx8YPbcga7Qlt1qh8wFhSh57ijcXFbqufvc0gpmwBpxVtqfKVEPCM3hDlBUevn418I68woKbgGU-_Wgdscd8Sgu9mEvLWParMQFwGV9WKKwkVsXrJqr6ndlI",
    gallery: officeGallery.slice().reverse(),
    cardSpecs: "Apple M2 | 8GB | 256GB | 13.6 inch",
    currentPrice: 24590000,
    originalPrice: 27000000,
    reviewRating: 4.9,
    reviewCount: 203,
    badges: [{ label: "Flash Sale", tone: "sale" }],
     financText:"Tra gop 0% chi tu ",
    financingText: "2.050.000đ/thang",
    cartNote: "Mau midnight giao nhanh trong 2 gio",
    fitForYou: [
      "Ban can may gon nhe, pin ben cho di hoc va di hop ca ngay.",
      "He dieu hanh macOS phu hop team sang tao, marketing va nguoi da dung Apple.",
      "Uu tien do em, may mat va kha nang mo app van phong nhanh.",
    ],
    cautionNotes: [
      "Ban can nang cap RAM/SSD ve sau, vi may khong de nang cap.",
      "Khong toi uu neu ban can game Windows hoac mot so phan mem ky thuat chuyen biet.",
    ],
    highlights: [
      { label: "Chip", value: "Apple M2", icon: "cpu" },
      { label: "Display", value: '13.6" Liquid Retina', icon: "display" },
      { label: "RAM", value: "8GB unified", icon: "memory" },
      { label: "Khối lượng", value: "1.24kg", icon: "bag" },
    ],
    specifications: [
      { label: "Chip", value: "Apple M2 8-core CPU" },
      { label: "RAM", value: "8GB unified memory" },
      { label: "Ổ cứng", value: "256GB SSD" },
      { label: "Đồ họa", value: "GPU 8-core" },
      { label: "Màn hình", value: '13.6" Liquid Retina' },
      { label: "Khối lượng", value: "1.24kg" },
    ],
    reviewPoints: [
      { title: "Pin de thuong", detail: "Voi tac vu van phong va hop online, may tru duoc den het ngay lam viec." },
      { title: "Van hanh em", detail: "Thiet ke khong quat phu hop moi truong can su yen tinh." },
      { title: "Chat luong hoan thien", detail: "Vo nhom, man hinh va loa tao trai nghiem dong nhat dung chat Apple." },
    ],
    comparePoints: [
      "Lua chon rat manh neu ban uu tien pin va do gon nhe.",
      "He sinh thai macOS la diem cong lon, nhung can can nhac neu phu thuoc phan mem Windows.",
      "Gia nhinh hon nhom laptop office pho thong nhung giu gia tri ban lai tot.",
    ],
    relatedSlugs: ["dell-xps-13-plus-9320", "asus-vivobook-15-x1504va"],
  },
  {
    slug: "asus-vivobook-15-x1504va",
    name: "ASUS Vivobook 15 X1504VA (Core i5 1335U | 8GB | 512GB | FHD)",
    brand: "ASUS",
    collectionLabel: "ASUS Vivobook",
    category: "Van phong",
    coverImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAlj2VtAwI6j-uisdDaZS09HuMeT7aW94jVDqa7Ef-ylcftL5rIdtSvsT1q1jPJhCxzwlQWZkkm0L7AnhLctItGMh-hnBrSyOfer8mhY8QQPmdl_8fGTqUmp29yh8p-F_OfluWjJNlGaZ6Z7UPfX53sd4XbPwMAvUp7AkrAh21vuu59xWz8Cemmu9kKmd0br6yKfHh3k9HG282gTBAMMm8tFoqqxZcSZEcEvvqVqS8RTfPe9rErRxU3dqpbWgVK0qENHrxZDtH_c_o",
    gallery: officeGallery,
    cardSpecs: "i5 1335U | 8GB | 512GB | FHD",
    currentPrice: 14490000,
    originalPrice: 15990000,
    reviewRating: 4.8,
    reviewCount: 124,
    badges: [{ label: "Bán chạy", tone: "sale" }],
     financText:"Tra gop 0% chi tu ",
    financingText: "1.210.000đ/thang",
    cartNote: "Tang balo va chuot khi mua online",
    fitForYou: [
      "Ban can laptop de hoc tap, office va hop online o muc gia de tiep can.",
      "Muon may 15.6 inch de xem noi dung va nhap lieu thoai mai.",
      "Can SSD 512GB de dung lau ma khong qua lo ve bo nho.",
    ],
    cautionNotes: [
      "Card do hoa tich hop khong phu hop game 3D nang.",
      "RAM goc 8GB nen can can nhac nang cap neu da nhiem nang.",
    ],
    highlights: [
      { label: "CPU", value: "Core i5 1335U", icon: "cpu" },
      { label: "Display", value: '15.6" FHD', icon: "display" },
      { label: "RAM", value: "8GB DDR4", icon: "memory" },
      { label: "Ổ cứng", value: "512GB SSD", icon: "storage" },
    ],
    specifications: [
      { label: "CPU", value: "Intel Core i5 1335U" },
      { label: "RAM", value: "8GB DDR4" },
      { label: "Ổ cứng", value: "512GB SSD NVMe" },
      { label: "Đồ họa", value: "Intel Iris Xe Graphics" },
      { label: "Màn hình", value: '15.6" FHD 60Hz' },
      { label: "Khối lượng", value: "1.7kg" },
    ],
    reviewPoints: [
      { title: "Gia tri de tiep can", detail: "Muc gia hop ly cho sinh vien, nhan vien van phong va nguoi mua may dau tien." },
      { title: "Trai nghiem can bang", detail: "May khoi dong nhanh, mo Excel, Chrome va hop online on dinh." },
      { title: "De nang cap", detail: "Duoi doi may cho phep can nhac nang cap RAM de dung lau hon." },
    ],
    comparePoints: [
      "Lua chon hop ly nhat neu ban uu tien ngan sach.",
      "Kem cao cap hon XPS hoac MacBook, nhung re hon dang ke.",
      "Phu hop hoc tap va van phong, khong huong den gaming nang.",
    ],
    relatedSlugs: ["dell-xps-13-plus-9320", "macbook-air-m2-8gb-256gb"],
  },
];

export const needs: NeedOption[] = [
  { icon: "briefcase", title: "Văn phòng & Học tập" },
  { icon: "gamepad", title: "Gaming" },
  { icon: "palette", title: "Đồ họa & Creative" },
  { icon: "laptop", title: "Mỏng nhẹ mang đi" },
];

export const trustItems: TrustItem[] = [
  { icon: "shield", label: "Bảo hành chính hãng" },
  { icon: "truck", label: "Giao nhanh 2h" },
  { icon: "wallet", label: "Trả góp 0%" },
];

export const categoryCards: CategoryCard[] = [
  {
    title: "Laptop Văn Phòng",
    count: "980+ Sản phẩm",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBIqpI-YhCsyIZ4vWTn7iVZcr3OznmGke_T2LrKx6iAfdYldJAtmzPGikS8Ns4P0Rx1e5JwHhiaAGzQzxK9zht6oJ6QPO6y7TMaoNn28e56NPo530S1X9nxpOpkNDleB9XngEUdyowRmjVwCC_VV2VyEqR1duNIxRdW8FOupNsrqFCxrKTXxrWCTp3b4FtpRT9w4iw0QevMwW-49m4MoVNW2BZw96oZaNawx46uEWh3oEvdvzEKMiaHCIuLQA5tSCigPphrVJZD49U",
  },
  {
    title: "Gaming Series",
    count: "420+ Sản phẩm",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBrA8kABgZ_dMlxjEWDUwRL8FpZXOHLZ3Eg7XoiijP3BAJ8AqIee_lqukBPAr3ugnRRubtm7DSzR5pGrb-REXPZMjQ9ka8C3aysG5j9sZ_ArPCRebE36Y_UzuQayISLogxWj3s9DIJZ-FtfjUHcXazKii6pPTRq3_xQz0MhpZoOWyz3namGvVphRzzvZZwAleA-FsiPV-3cHEIZ98Khh35rVhTLTgEvbU1pntACAaymExG3aXCFbxcER14YTtMIVWtwkuTmB3ZXAF8",
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Minh Phan",
    role: "Lập trình viên",
    quote:
      "Máy tính ở đây luôn được tuyển chọn kỹ. Mình được tư vấn đúng cấu hình cho code mà không bị ép mua máy quá đắt.",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDndiQDGat1Sufu7LzA3xPipy6LMQT2qsIqMN7-LL9PiD4D8Xq3vtC6M93ov7OtwtIbkeZll_hjP7EX13NB05itW8buZXUdFMomCH4difWs8lJmfxr7h3ZHYUmyY3uCPnFeKVblFeiCE_mWV0tk8RWiBKehmUR9_NDq0OlM9T7VTySreaQe62W7Ap9NSzQ0w0OB2uOldOKMS77R-wFQi8VDpd5lctUJMGX1kPle0t-DttOGtW42kDJjq5JZoRua8IYbj_cAZ8a2hBw",
  },
  {
    name: "Trang Nguyễn",
    role: "Marketing Lead",
    quote:
      "Dịch vụ giao nhanh 2h cứu nguy cho mình trong buổi họp quan trọng. Laptop mỏng nhẹ đúng ý mình cần.",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAi79TGFC2xqAh9fNpE2JV6XsoLLKvRwgYQ7Yea_HoxlAghW-UklN3imuv7SHY8KT_FgO3MrpiUOeO-F432_sD8wEmSnIxjfukyfrHVlZ45jgt07uUh9NGec-xfvZhK_7SgcHgpi-QotJa5lryUwzyOQjm1mBMIq85OMPOMMFIGgqBAHrT2_Ae3ygWXALB542qbXeyUnAqvR5C4M9EDMNsDJYIkJInHTljkdQ2T85RU5jQCpBcCJLndu6ixucc3e1ayzwUK6_GUOU",
  },
];

export const accountShortcuts: AccountShortcut[] = [
  {
    title: "Theo dõi đơn hàng",
    description: "Tra cứu trạng thái giao máy, hóa đơn và lịch hẹn nhận hàng.",
  },
  {
    title: "Tra cứu bảo hành",
    description: "Xem thời hạn bảo hành chính hãng và lịch sử hỗ trợ kỹ thuật.",
  },
  {
    title: "Liên hệ chuyên gia",
    description: "Nhận tư vấn cấu hình đúng nhu cầu học tập, làm việc hoặc gaming.",
  },
];

export const footerLinks = {
  support: ["Chính sách đổi trả", "Trả góp 0%"],
  contact: ["Giao hàng nhanh", "Liên hệ"],
};

export const homeCollections = {
  flashSaleSlugs: ["dell-xps-13-plus-9320", "macbook-air-m2-8gb-256gb"],
  bestSellerSlugs: ["asus-vivobook-15-x1504va", "lenovo-legion-5-15iah7h"],
  cartSlugs: ["macbook-air-m2-8gb-256gb", "dell-xps-13-plus-9320"],
};

export function getProductBySlug(slug: string) {
  return productsTable.find((product) => product.slug === slug);
}

export function getProductsBySlugs(slugs: string[]) {
  return slugs
    .map((slug) => getProductBySlug(slug))
    .filter((product): product is ProductRecord => Boolean(product));
}

export function formatPrice(value: number) {
  return `${new Intl.NumberFormat("vi-VN").format(value)}đ`;
}

export function calculateDiscountPercent(currentPrice: number, originalPrice?: number) {
  if (!originalPrice || originalPrice <= currentPrice) {
    return null;
  }

  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}

export const authorsTable: ArticleAuthor[] = [
  {
    id: "minh-duc",
    name: "Minh Đức",
    role: "Chuyên gia phần cứng",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDndiQDGat1Sufu7LzA3xPipy6LMQT2qsIqMN7-LL9PiD4D8Xq3vtC6M93ov7OtwtIbkeZll_hjP7EX13NB05itW8buZXUdFMomCH4difWs8lJmfxr7h3ZHYUmyY3uCPnFeKVblFeiCE_mWV0tk8RWiBKehmUR9_NDq0OlM9T7VTySreaQe62W7Ap9NSzQ0w0OB2uOldOKMS77R-wFQi8VDpd5lctUJMGX1kPle0t-DttOGtW42kDJjq5JZoRua8IYbj_cAZ8a2hBw",
  },
  {
    id: "hoang-yen",
    name: "Hoàng Yến",
    role: "Reviewer công nghệ",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAi79TGFC2xqAh9fNpE2JV6XsoLLKvRwgYQ7Yea_HoxlAghW-UklN3imuv7SHY8KT_FgO3MrpiUOeO-F432_sD8wEmSnIxjfukyfrHVlZ45jgt07uUh9NGec-xfvZhK_7SgcHgpi-QotJa5lryUwzyOQjm1mBMIq85OMPOMMFIGgqBAHrT2_Ae3ygWXALB542qbXeyUnAqvR5C4M9EDMNsDJYIkJInHTljkdQ2T85RU5jQCpBcCJLndu6ixucc3e1ayzwUK6_GUOU",
  }
];

export const articlesTable: Article[] = [
  {
    slug: "cho-laptop-gaming-sinh-vien-2024",
    category: "TƯ VẤN CHỌN MUA",
    categoryBadgeColor: "#ffdad6",
    title: "Cách chọn Laptop Gaming cho tân sinh viên 2024",
    summary: "Mùa tựu trường đang đến gần, việc lựa chọn một chiếc laptop vừa phục vụ học tập vừa đáp ứng nhu cầu giải trí đỉnh cao là bài toán khó. Cùng chuyên gia Digital Curator khám phá những tiêu chí vàng mang lại hiệu năng tối ưu nhất...",
    content: "Việc chọn mua laptop gaming cho sinh viên không chỉ dừng lại ở cấu hình phần cứng mạnh mẽ mà còn phải cân đối giữa khả năng di động và độ bền. 1. CPU & GPU: Luôn ưu tiên bộ đôi i7 thế hệ 13 hoặc Ryzen 7 kèm RTX 40-series. 2. Màn hình: 144Hz là tiêu chuẩn tối thiểu để trải nghiệm gaming mượt mà. 3. Pin & Sạc: Cần sạc nhanh vì các tác vụ nặng sẽ ngốn pin khá nhanh.",
    coverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDS_ewTF87qIQBNL3YJf5UwRPOZCPM4rHiupWLAbOsGkCEXfgyr_vuZIJdIUe5Mei7gkr-zivOcUa4F7qIUtTtPc_xtGTK0HV4eCy5J5fxM0NuItN5nBtzwDeDISBDWQ2SAdNocojSigGl0lWEwcDC6PZDOyLGSSQFLqhlVhQJBMqblIv5EBLhbmx8X_OoJUxpPHedx9qmXOPDN70FoWrvcji__tLyOpTJG9rFvwqd7ijKiQmDBV3sRzXbqWXUFBIgKnfz_AjDOPlY",
    publishedAt: "12/08/2024",
    readTime: "8 phút đọc",
    authorId: "minh-duc",
    relatedProductSlugs: ["asus-tuf-gaming-a15-fa507nu-lp034w", "msi-katana-15-b13vek-252vn"]
  },
  {
    slug: "meo-toi-uu-windows-11",
    category: "THỦ THUẬT",
    categoryBadgeColor: "#fff4d6",
    title: "5 mẹo tối ưu hiệu năng Windows 11 cực kỳ đơn giản",
    summary: "Làm sao để chiếc laptop của bạn luôn mượt mà như lúc mới mua? Sau đây là 5 bước dọn dẹp và tối ưu hệ thống nhanh chóng cho người dùng Windows...",
    content: "1. Tắt các ứng dụng chạy ngầm không cần thiết. 2. Dọn dẹp ổ đĩa hệ thống định kỳ. 3. Cập nhật driver Card đồ họa mới nhất. 4. Tùy chỉnh Power Plan sang Best Performance. 5. Gỡ bỏ Bloatware...",
    coverImage: officeGallery[0],
    publishedAt: "4 giờ trước",
    readTime: "5 phút đọc",
    authorId: "hoang-yen",
    relatedProductSlugs: ["dell-xps-13-plus-9320"]
  },
  {
    slug: "danh-gia-dell-xps-15-2024",
    category: "REVIEW",
    categoryBadgeColor: "#e0f2f1",
    title: "Đánh giá Dell XPS 15 (2024): Đỉnh cao của sự tinh tế",
    summary: "Dòng Laptop doanh nhân đẳng cấp nhất của Dell có thiết kế mới cùng những cải tiến ấn tượng về hiệu năng và màn hình OLED 3.5K siêu sắc nét...",
    content: "Dell XPS 15 luôn được coi là chuẩn mực của laptop Windows cao cấp. Phiên bản 2024 mang đến chip Intel Core Ultra mới nhất, bàn phím vô hình độc đáo và trackpad phản hồi haptic cực nhạy. Màn hình OLED vần là điểm sáng lớn nhất...",
    coverImage: officeGallery[1],
    publishedAt: "1 ngày trước",
    readTime: "12 phút đọc",
    authorId: "minh-duc",
    relatedProductSlugs: ["dell-xps-13-plus-9320"]
  },
  {
    slug: "the-he-chip-moi-40-percent",
    category: "TIN TỨC",
    categoryBadgeColor: "#e3f2fd",
    title: "Lộ diện thế hệ Chip mới: Hiệu năng tăng 40%",
    summary: "Những thông tin rò rỉ mới nhất về những dòng vi xử lý dành cho laptop ra mắt cuối năm nay hứa hẹn sự bùng nổ về sức mạnh đa nhân...",
    content: "Các báo cáo từ chuỗi cung ứng cho thấy thế hệ vi xử lý tiếp theo sẽ tập trung mạnh vào AI tích hợp và khả năng tối ưu điện năng. Hiệu suất xử lý đồ họa tích hợp có thể tăng vọt, biến laptop mỏng nhẹ thành cỗ máy làm việc thực thụ...",
    coverImage: gamingGallery[0],
    publishedAt: "2 ngày trước",
    readTime: "4 phút đọc",
    authorId: "hoang-yen",
    relatedProductSlugs: ["lenovo-legion-5-15iah7h"]
  },
  {
    slug: "minimalist-workspace-laptop",
    category: "DECOR",
    categoryBadgeColor: "#f5f5f5",
    title: "Xây dựng góc làm việc Minimalist cùng Laptop",
    summary: "Gợi ý cách set-up không gian làm việc tối giản, tinh tế giúp tăng cảm hứng và hiệu suất làm việc mỗi ngày cho giới trẻ hiện đại...",
    content: "Một góc làm việc tối giản không chỉ đẹp mà còn giúp bạn tập trung hơn. Đầu tiên hãy bắt đầu bằng việc giấu dây cáp. Sử dụng một chiếc giá đỡ laptop để cải thiện tư thế ngồi. Thêm một chút mảng xanh từ cây nhỏ để cân bằng không gian...",
    coverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDS_ewTF87qIQBNL3YJf5UwRPOZCPM4rHiupWLAbOsGkCEXfgyr_vuZIJdIUe5Mei7gkr-zivOcUa4F7qIUtTtPc_xtGTK0HV4eCy5J5fxM0NuItN5nBtzwDeDISBDWQ2SAdNocojSigGl0lWEwcDC6PZDOyLGSSQFLqhlVhQJBMqblIv5EBLhbmx8X_OoJUxpPHedx9qmXOPDN70FoWrvcji__tLyOpTJG9rFvwqd7ijKiQmDBV3sRzXbqWXUFBIgKnfz_AjDOPlY",
    publishedAt: "28/07/2024",
    readTime: "10 phút đọc",
    authorId: "minh-duc",
    relatedProductSlugs: ["macbook-air-m2-8gb-256gb", "asus-vivobook-15-x1504va"]
  }
];

export function getArticleBySlug(slug: string) {
  return articlesTable.find((a) => a.slug === slug);
}

export function getAuthorById(id: string) {
  return authorsTable.find((a) => a.id === id);
}
