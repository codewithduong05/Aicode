"use client";

import { useEffect, useState } from "react";
import { Be_Vietnam_Pro, Inter } from "next/font/google";
import BottomNav from "./components/BottomNav";
import Icon from "./components/Icon";
import SectionTitle from "./components/SectionTitle";
import styles from "./page.module.css";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "700", "900"],
});

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
});

type NavId = "home" | "categories" | "compare" | "promotions" | "account";
type SheetId = "cart" | "compare" | "account" | null;

const needs = [
  { icon: "briefcase", title: "Văn phòng & Học tập" },
  { icon: "gamepad", title: "Gaming" },
  { icon: "palette", title: "Đồ họa & Creative" },
  { icon: "laptop", title: "Mỏng nhẹ mang đi" },
];

const trustItems = [
  { icon: "shield", label: "Bảo hành chính hãng" },
  { icon: "truck", label: "Giao nhanh 2h" },
  { icon: "wallet", label: "Trả góp 0%" },
];

const flashSaleProducts = [
  {
    name: "Dell XPS 13 Plus 9320 i7 1260P",
    price: "34.990.000đ",
    originalPrice: "41.000.000đ",
    badge: "-15%",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDqDQWgEvdZQWvpNhkkyi-zklGzABA8NZAPnzPs72nSgKvNH4e21YwWEEsddBKb4bmf8xLxxLlSJ9tNSjdt_Q6Os9MRfrBJVW90xJ8Zxxqoso_6RWEgR8629vuLCaUoZbg3L7ftu0U02wD27JAR1H_cJ2BX--gimJ7UaEPaojWz7A9WF75-5y3lJpqMyZgx-xndhZ253Gb7mI7m7BOdTsJnpqwv3eYmGKRPRO_iOH7vyedHoMXvgVp6CwMar7O1yhi16mY5q1Z4-48",
  },
  {
    name: "MacBook Air M2 8GB 256GB",
    price: "24.590.000đ",
    originalPrice: "27.000.000đ",
    badge: "-10%",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBkEfOknYKG47svUvGOoJ4abRn5nThanUr76Fzb6NJLu9vDkIfDM9GoyMQUEBOj5YC6-ZMpDDtoUwVC_6hY1w0ZktuKgt2q9CdC3V1PkxM61g2RyZQ9XhGYFdiikd7o4-XBYTvvoHxLiJwEwqVf2zlYx8YPbcga7Qlt1qh8wFhSh57ijcXFbqufvc0gpmwBpxVtqfKVEPCM3hDlBUevn418I68woKbgGU-_Wgdscd8Sgu9mEvLWParMQFwGV9WKKwkVsXrJqr6ndlI",
  },
];

const bestSellers = [
  {
    name: "ASUS Vivobook 15 X1504VA",
    specs: "i5 1335U | 8GB | 512GB | FHD",
    rating: "4.8",
    reviews: "124 đánh giá",
    price: "14.490.000đ",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAlj2VtAwI6j-uisdDaZS09HuMeT7aW94jVDqa7Ef-ylcftL5rIdtSvsT1q1jPJhCxzwlQWZkkm0L7AnhLctItGMh-hnBrSyOfer8mhY8QQPmdl_8fGTqUmp29yh8p-F_OfluWjJNlGaZ6Z7UPfX53sd4XbPwMAvUp7AkrAh21vuu59xWz8Cemmu9kKmd0br6yKfHh3k9HG282gTBAMMm8tFoqqxZcSZEcEvvqVqS8RTfPe9rErRxU3dqpbWgVK0qENHrxZDtH_c_o",
  },
  {
    name: "Lenovo Legion 5 15IAH7H",
    specs: "i7 12700H | 16GB | 512GB | RTX 3060",
    rating: "4.9",
    reviews: "89 đánh giá",
    price: "28.990.000đ",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCXScGPwhKKCDrUUA_eJwjQXaUnY4W5NaIL0OJkCBYwKurzkHlaIDwyu_oVBNWD90tgV3MAciEDsUAwUaFkrAi2j6k8TGdicKGi0h-6_ItzdRV0rJDDC1MuoQSb09J-pAw41idFR15-sli0pBNJTwzdm0zjhRtV-XaMrEa_vd58JOQkwQ4otks7Zy9FhRa_zZ2PKLfGcPhF8TFnGZ7-RKun-G8cJY8cnqG1TXaAdW6ofb8acGWwVx8OGfvc-HbejcrSrjwwj_gHGp8",
  },
];

const categories = [
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

const testimonials = [
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

const cartItems = [
  {
    name: "MacBook Air M2",
    specs: "8GB | 256GB",
    price: "24.590.000đ",
    note: "Giữ giá online đến 23:59 hôm nay",
  },
  {
    name: "Dell XPS 13 Plus",
    specs: "i7 | 16GB | 512GB",
    price: "34.990.000đ",
    note: "Còn 2 máy giao nhanh tại TP.HCM",
  },
];

const accountShortcuts = [
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

const footerLinks = {
  support: ["Chính sách đổi trả", "Trả góp 0%"],
  contact: ["Giao hàng nhanh", "Liên hệ"],
};

const bottomNavItems = [
  { id: "home" as const, icon: "home", label: "Trang chủ", targetId: "hero-section" },
  { id: "categories" as const, icon: "grid", label: "Danh mục", targetId: "categories-section" },
  { id: "compare" as const, icon: "compare", label: "So sánh" },
  { id: "promotions" as const, icon: "tag", label: "Khuyến mãi", targetId: "flash-sale-section" },
  { id: "account" as const, icon: "user", label: "Tài khoản" },
];

export default function LaptopStorePage() {
  const [openSheet, setOpenSheet] = useState<SheetId>(null);
  const [sectionNav, setSectionNav] = useState<NavId>("home");
  const [selectedNeed, setSelectedNeed] = useState(needs[0].title);
  const [compareSelection, setCompareSelection] = useState<string[]>([]);

  useEffect(() => {
    const sectionPairs: Array<{ id: string; nav: NavId }> = [
      { id: "hero-section", nav: "home" },
      { id: "flash-sale-section", nav: "promotions" },
      { id: "categories-section", nav: "categories" },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio);

        const topEntry = visibleEntries[0];

        if (!topEntry) {
          return;
        }

        const matched = sectionPairs.find((item) => item.id === topEntry.target.id);

        if (matched) {
          setSectionNav(matched.nav);
        }
      },
      {
        threshold: [0.15, 0.35, 0.6],
        rootMargin: "-20% 0px -55% 0px",
      },
    );

    sectionPairs.forEach((item) => {
      const section = document.getElementById(item.id);
      if (section) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, []);

  const activeNav: NavId =
    openSheet === "compare" ? "compare" : openSheet === "account" ? "account" : sectionNav;

  const comparedProducts = bestSellers.filter((product) => compareSelection.includes(product.name));

  const scrollToSection = (sectionId: string) => {
    setOpenSheet(null);
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const toggleCompareProduct = (productName: string) => {
    setCompareSelection((current) => {
      if (current.includes(productName)) {
        return current.filter((item) => item !== productName);
      }

      if (current.length === 2) {
        return [current[1], productName];
      }

      return [...current, productName];
    });
  };

  const handleBottomNavSelect = (itemId: string) => {
    const navId = itemId as NavId;

    if (navId === "compare") {
      setOpenSheet("compare");
      return;
    }

    if (navId === "account") {
      setOpenSheet("account");
      return;
    }

    const item = bottomNavItems.find((entry) => entry.id === navId);
    if (item?.targetId) {
      scrollToSection(item.targetId);
    }
  };

  const renderSheetContent = () => {
    if (openSheet === "cart") {
      return (
        <>
          <div className={styles.sheetHeader}>
            <div>
              <p className={styles.sheetKicker}>Giỏ hàng</p>
              <h3 className={styles.sheetTitle}>2 sản phẩm đang chờ bạn</h3>
              <p className={styles.sheetSubtitle}>Giữ giá và ưu đãi giao nhanh trong hôm nay.</p>
            </div>
            <button
              aria-label="Đóng giỏ hàng"
              className={styles.closeSheetButton}
              onClick={() => setOpenSheet(null)}
              type="button"
            >
              Đóng
            </button>
          </div>

          <div className={styles.sheetList}>
            {cartItems.map((item) => (
              <article className={styles.sheetListItem} key={item.name}>
                <div className={styles.sheetMeta}>
                  <h4>{item.name}</h4>
                  <p>{item.specs}</p>
                  <span className={styles.sheetPill}>{item.note}</span>
                </div>
                <strong className={styles.sheetPrice}>{item.price}</strong>
              </article>
            ))}
          </div>

          <div className={styles.sheetFooter}>
            <div className={styles.sheetSummary}>
              <div className={styles.sheetSummaryRow}>
                <span>Tạm tính</span>
                <strong>59.580.000đ</strong>
              </div>
              <div className={styles.sheetSummaryRow}>
                <span>Giao nhanh</span>
                <strong>Miễn phí</strong>
              </div>
            </div>
            <div className={styles.sheetActions}>
              <button className={styles.secondaryAction} onClick={() => setOpenSheet(null)} type="button">
                Tiếp tục xem
              </button>
              <button className={styles.primaryAction} type="button">
                Thanh toán
              </button>
            </div>
          </div>
        </>
      );
    }

    if (openSheet === "compare") {
      return (
        <>
          <div className={styles.sheetHeader}>
            <div>
              <p className={styles.sheetKicker}>So sánh laptop</p>
              <h3 className={styles.sheetTitle}>Tối đa 2 sản phẩm</h3>
              <p className={styles.sheetSubtitle}>Chọn trong mục bán chạy để đối chiếu cấu hình và giá.</p>
            </div>
            <button
              aria-label="Đóng bảng so sánh"
              className={styles.closeSheetButton}
              onClick={() => setOpenSheet(null)}
              type="button"
            >
              Đóng
            </button>
          </div>

          {comparedProducts.length === 0 ? (
            <div className={styles.emptyState}>
              <h4>Chưa có máy để so sánh</h4>
              <p>Nhấn vào checkbox `So sánh` ở phần bán chạy để thêm tối đa 2 laptop.</p>
              <button
                className={styles.primaryAction}
                onClick={() => scrollToSection("best-seller-section")}
                type="button"
              >
                Chọn laptop ngay
              </button>
            </div>
          ) : (
            <>
              <div className={styles.sheetList}>
                {comparedProducts.map((product) => (
                  <article className={styles.sheetListItem} key={product.name}>
                    <div className={styles.sheetMeta}>
                      <h4>{product.name}</h4>
                      <p>{product.specs}</p>
                      <p>{product.rating} sao · {product.reviews}</p>
                    </div>
                    <div className={styles.sheetPriceBlock}>
                      <strong className={styles.sheetPrice}>{product.price}</strong>
                      <button
                        className={styles.inlineLink}
                        onClick={() => toggleCompareProduct(product.name)}
                        type="button"
                      >
                        Bỏ chọn
                      </button>
                    </div>
                  </article>
                ))}
              </div>
              <div className={styles.sheetFooter}>
                <div className={styles.sheetSummary}>
                  <div className={styles.sheetSummaryRow}>
                    <span>Đã chọn</span>
                    <strong>{comparedProducts.length}/2 laptop</strong>
                  </div>
                </div>
                <div className={styles.sheetActions}>
                  <button
                    className={styles.secondaryAction}
                    onClick={() => scrollToSection("best-seller-section")}
                    type="button"
                  >
                    Chọn thêm
                  </button>
                  <button className={styles.primaryAction} type="button">
                    So sánh ngay
                  </button>
                </div>
              </div>
            </>
          )}
        </>
      );
    }

    return (
      <>
        <div className={styles.sheetHeader}>
          <div>
            <p className={styles.sheetKicker}>Tài khoản</p>
            <h3 className={styles.sheetTitle}>Dịch vụ sau mua</h3>
            <p className={styles.sheetSubtitle}>Theo dõi đơn hàng, bảo hành và hỗ trợ cấu hình tại một nơi.</p>
          </div>
          <button
            aria-label="Đóng bảng tài khoản"
            className={styles.closeSheetButton}
            onClick={() => setOpenSheet(null)}
            type="button"
          >
            Đóng
          </button>
        </div>

        <div className={styles.accountGrid}>
          {accountShortcuts.map((item) => (
            <article className={styles.accountTile} key={item.title}>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </article>
          ))}
        </div>

        <div className={styles.sheetFooter}>
          <div className={styles.sheetSummary}>
            <div className={styles.sheetSummaryRow}>
              <span>Hotline tư vấn</span>
              <strong>1900 6868</strong>
            </div>
          </div>
          <div className={styles.sheetActions}>
            <button className={styles.secondaryAction} onClick={() => setOpenSheet(null)} type="button">
              Để sau
            </button>
            <button
              className={styles.primaryAction}
              onClick={() => scrollToSection("support-section")}
              type="button"
            >
              Nhờ chuyên gia
            </button>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <main className={`${beVietnamPro.className} ${styles.pageShell}`}>
        <div className={`${inter.className} ${styles.phoneFrame}`}>
          <header className={styles.topbar}>
            <div className={styles.brand}>
              <button
                aria-label="Mở danh mục nhanh"
                className={styles.iconButton}
                onClick={() => scrollToSection("categories-section")}
                type="button"
              >
                <Icon name="menu" className={styles.icon} />
              </button>
              <button className={styles.brandButton} onClick={() => scrollToSection("hero-section")} type="button">
                <span className={styles.brandName}>Laptop Store</span>
              </button>
            </div>

            <button
              aria-expanded={openSheet === "cart"}
              aria-label="Mở giỏ hàng"
              className={`${styles.iconButton} ${styles.cartButton}`}
              onClick={() => setOpenSheet((current) => (current === "cart" ? null : "cart"))}
              type="button"
            >
              <Icon name="cart" className={styles.icon} />
              <span className={styles.cartCount}>{cartItems.length}</span>
            </button>
          </header>

          <section className={styles.hero} id="hero-section">
            <div className={styles.heroCopy}>
              <h1>Bạn cần laptop cho việc gì?</h1>
              <p className={styles.heroText}>
                Chúng tôi giúp bạn tìm chiếc máy hoàn hảo, tối ưu cho nhu cầu thực tế và ngân sách của bạn.
              </p>
            </div>

            <div className={styles.needGrid}>
              {needs.map((item) => (
                <button
                  aria-pressed={selectedNeed === item.title}
                  className={`${styles.needCard} ${
                    selectedNeed === item.title ? styles.needCardActive : ""
                  }`}
                  key={item.title}
                  onClick={() => setSelectedNeed(item.title)}
                  type="button"
                >
                  <span className={styles.needIconWrap}>
                    <Icon name={item.icon} className={styles.needIcon} />
                  </span>
                  <span>{item.title}</span>
                </button>
              ))}
            </div>

            <button className={styles.primaryCta} onClick={() => scrollToSection("support-section")} type="button">
              <Icon name="spark" className={styles.buttonIcon} />
              Để tôi tư vấn
            </button>

            <div className={`${styles.heroOrb} ${styles.heroOrbPrimary}`} />
            <div className={`${styles.heroOrb} ${styles.heroOrbSecondary}`} />
          </section>

          <section className={styles.trustStrip}>
            {trustItems.map((item) => (
              <div className={styles.trustItem} key={item.label}>
                <Icon name={item.icon} className={styles.trustIcon} />
                <span>{item.label}</span>
              </div>
            ))}
          </section>

          <section className={styles.contentSection} id="flash-sale-section">
            <SectionTitle
              title="Flash Sale"
              rightLabel="Xem tất cả"
              accent={
                <>
                  <Icon name="spark" className={styles.flashIcon} />
                  <span className={styles.timerPill}>02:14:55</span>
                </>
              }
            />

            <div className={styles.flashGrid}>
              {flashSaleProducts.map((product) => (
                <article className={`${styles.productCard} ${styles.compactCard}`} key={product.name}>
                  <div className={`${styles.imageWrap} ${styles.square}`}>
                    <img alt={product.name} src={product.image} />
                    <span className={styles.saleBadge}>{product.badge}</span>
                  </div>
                  <h3>{product.name}</h3>
                  <p className={styles.price}>{product.price}</p>
                  <p className={styles.oldPrice}>{product.originalPrice}</p>
                  <span className={`${styles.pill} ${styles.pillMuted}`}>Góp 0%</span>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.contentSection} id="best-seller-section">
            <SectionTitle title="Bán chạy nhất" />
            <div className={styles.stackList}>
              {bestSellers.map((product) => (
                <article
                  className={`${styles.productCard} ${styles.rowCard} ${
                    compareSelection.includes(product.name) ? styles.rowCardSelected : ""
                  }`}
                  key={product.name}
                >
                  <div className={`${styles.imageWrap} ${styles.thumb}`}>
                    <img alt={product.name} src={product.image} />
                  </div>
                  <div className={styles.rowContent}>
                    <div>
                      <div className={styles.rowTop}>
                        <h3>{product.name}</h3>
                        <label className={styles.compareToggle}>
                          <input
                            checked={compareSelection.includes(product.name)}
                            onChange={() => toggleCompareProduct(product.name)}
                            type="checkbox"
                          />
                          <span>So sánh</span>
                        </label>
                      </div>
                      <p className={styles.specs}>{product.specs}</p>
                      <div className={styles.ratingRow}>
                        <Icon name="star" className={styles.starIcon} />
                        <strong>{product.rating}</strong>
                        <span>{product.reviews}</span>
                      </div>
                    </div>
                    <p className={styles.price}>{product.price}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.contentSection} id="categories-section">
            <SectionTitle title="Danh mục phổ biến" />
            <div className={styles.categoryGrid}>
              {categories.map((category) => (
                <article className={styles.categoryCard} key={category.title}>
                  <img alt={category.title} src={category.image} />
                  <div className={styles.categoryOverlay} />
                  <div className={styles.categoryCopy}>
                    <h3>{category.title}</h3>
                    <p>{category.count}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className={`${styles.contentSection} ${styles.reviewsSection}`}>
            <SectionTitle title="Trải nghiệm khách hàng" />
            <div className={styles.reviewRow}>
              {testimonials.map((item) => (
                <article className={styles.reviewCard} key={item.name}>
                  <div className={styles.reviewUser}>
                    <img alt={item.name} src={item.avatar} />
                    <div>
                      <h3>{item.name}</h3>
                      <p>{item.role}</p>
                    </div>
                  </div>
                  <blockquote>{`"${item.quote}"`}</blockquote>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.contentSection} id="support-section">
            <div className={styles.expertCard}>
              <div className={styles.expertCopy}>
                <p className={`${styles.eyebrow} ${styles.eyebrowLight}`}>Hỗ trợ cấu hình</p>
                <h2>Nhờ chuyên gia tư vấn</h2>
                <p>Bạn vẫn chưa tìm được máy? Để chuyên gia của chúng tôi gọi lại hỗ trợ ngay.</p>
                <div className={styles.phoneForm}>
                  <input placeholder="Số điện thoại của bạn" type="text" />
                  <button aria-label="Gọi tư vấn" type="button">
                    <Icon name="call" className={styles.buttonIcon} />
                  </button>
                </div>
              </div>
              <div className={styles.expertMark}>
                <Icon name="support" className={styles.supportIcon} />
              </div>
            </div>
          </section>

          <footer className={styles.footer} id="footer-section">
            <div>
              <h3>Laptop Store</h3>
              <p>Hệ thống phân phối laptop chuyên nghiệp hàng đầu Việt Nam.</p>
            </div>
            <div>
              <h4>Hỗ trợ</h4>
              {footerLinks.support.map((item) => (
                <a href="#" key={item}>
                  {item}
                </a>
              ))}
            </div>
            <div>
              <h4>Liên hệ</h4>
              {footerLinks.contact.map((item) => (
                <a href="#" key={item}>
                  {item}
                </a>
              ))}
            </div>
            <p className={styles.footerNote}>© 2024 Laptop Store. Bảo hành chính hãng.</p>
          </footer>
        </div>

        <BottomNav
          activeItem={activeNav}
          items={bottomNavItems.map((item) => ({
            ...item,
            badge: item.id === "compare" && compareSelection.length > 0 ? compareSelection.length : undefined,
          }))}
          onSelect={handleBottomNavSelect}
        />

        {openSheet ? (
          <>
            <button
              aria-label="Đóng bảng thông tin"
              className={styles.sheetBackdrop}
              onClick={() => setOpenSheet(null)}
              type="button"
            />
            <aside className={styles.bottomSheet} role="dialog" aria-modal="true">
              <span className={styles.sheetHandle} />
              {renderSheetContent()}
            </aside>
          </>
        ) : null}
      </main>
    </>
  );
}
