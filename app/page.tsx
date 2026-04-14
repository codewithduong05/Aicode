"use client";

import { useEffect, useState, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import BottomNav from "./components/BottomNav";
import Icon from "./components/Icon";
import SectionTitle from "./components/SectionTitle";
import { beVietnamPro, inter } from "./fonts";
import {
  accountShortcuts,
  calculateDiscountPercent,
  categoryCards,
  footerLinks,
  formatPrice,
  getProductsBySlugs,
  homeCollections,
  needs,
  testimonials,
  trustItems,
} from "./lib/fake-db";
import { useCompareSelection } from "./lib/useCompareSelection";
import styles from "./page.module.css";

type NavId = "home" | "categories" | "compare" | "promotions" | "account";
type SheetId = "cart" | "account" | null;

const bottomNavItems = [
  { id: "home" as const, icon: "home", label: "Trang chủ", targetId: "hero-section" },
  { id: "categories" as const, icon: "grid", label: "Danh mục", targetId: "categories-section" },
  { id: "compare" as const, icon: "compare", label: "So sánh" },
  { id: "promotions" as const, icon: "tag", label: "Khuyến mãi", targetId: "flash-sale-section" },
  { id: "account" as const, icon: "user", label: "Tài khoản" },
];

const flashSaleProducts = getProductsBySlugs(homeCollections.flashSaleSlugs);
const bestSellerProducts = getProductsBySlugs(homeCollections.bestSellerSlugs);
const cartProducts = getProductsBySlugs(homeCollections.cartSlugs);

export default function LaptopStorePage() {
  const router = useRouter();
  const [openSheet, setOpenSheet] = useState<SheetId>(null);
  const [sectionNav, setSectionNav] = useState<NavId>("home");
  const [selectedNeed, setSelectedNeed] = useState(needs[0]?.title ?? "");
  const { selection: compareSelection, toggleSelection } = useCompareSelection();

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

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const sectionId = query.get("section");
    const sheetId = query.get("sheet");

    if (sheetId === "account" || sheetId === "cart") {
      setOpenSheet(sheetId);
    }

    if (!sectionId) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const activeNav: NavId = openSheet === "account" ? "account" : sectionNav;

  const comparedProducts = getProductsBySlugs(compareSelection);
  const cartTotal = cartProducts.reduce((total, product) => total + product.currentPrice, 0);
  const compareCategories = [...new Set(comparedProducts.map((product) => product.category))];
  const compareSummaryLabel =
    compareCategories.length === 1
      ? `So sánh Laptop ${compareCategories[0]}`
      : compareCategories.length > 1
        ? `So sánh ${compareCategories.join(" / ")}`
        : "So sánh laptop đã chọn";

  const scrollToSection = (sectionId: string) => {
    setOpenSheet(null);
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const goToComparePage = () => {
    setOpenSheet(null);
    router.push("/compare");
  };

  const goToProduct = (slug: string) => {
    setOpenSheet(null);
    router.push(`/products/${slug}`);
  };

  const handleProductKeyDown = (event: KeyboardEvent<HTMLElement>, slug: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      goToProduct(slug);
    }
  };

  const handleBottomNavSelect = (itemId: string) => {
    const navId = itemId as NavId;

    if (navId === "compare") {
      goToComparePage();
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
              <h3 className={styles.sheetTitle}>{cartProducts.length} sản phẩm đang chờ bạn</h3>
              <p className={styles.sheetSubtitle}>Giữ giá và ưu đãi giao nhanh trong hôm nay.</p>
            </div>
            <div>
              <button
                aria-label="Đóng giỏ hàng"
                className={styles.closeSheetButton}
                onClick={() => setOpenSheet(null)}
                type="button"
              >
                Đóng
              </button>
            </div>

          </div>

          <div className={styles.sheetList}>
            {cartProducts.map((product) => (
              <article className={styles.sheetListItem} key={product.slug}>
                <button
                  className={styles.sheetItemButton}
                  onClick={() => goToProduct(product.slug)}
                  type="button"
                >
                  <div className={styles.sheetMeta}>
                    <h4>{product.name}</h4>
                    <p>{product.cardSpecs}</p>
                    <span className={styles.sheetPill}>{product.cartNote}</span>
                  </div>
                  <strong className={styles.sheetPrice}>{formatPrice(product.currentPrice)}</strong>
                </button>
              </article>
            ))}
          </div>

          <div className={styles.sheetFooter}>
            <div className={styles.sheetSummary}>
              <div className={styles.sheetSummaryRow}>
                <span>Tạm tính</span>
                <strong>{formatPrice(cartTotal)}</strong>
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
              <button className={styles.primaryAction} onClick={() => goToProduct(cartProducts[0].slug)} type="button">
                Thanh toán
              </button>
            </div>
          </div>
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
    <main
      className={`${beVietnamPro.className} ${styles.pageShell} ${compareSelection.length > 0 ? styles.pageShellWithCompare : ""
        }`}
    >
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
            <span className={styles.cartCount}>{cartProducts.length}</span>
          </button>
        </header>

        <section className={styles.hero} id="hero-section">
          <div className={styles.herobutton}>
            <span className={styles.heroIconWrap}>
              <Icon name="aigen" className={styles.heroIcon} />
            </span>
            <p>GIẢI PHÁP CÔNG NGHỆ TỐI ƯU</p>

          </div>
          <div className={styles.heroCopy}>

            <h1>Bạn cần laptop cho
              nhu cầu gì?</h1>

            <p className={styles.heroText}>
              Chúng tôi giúp bạn tìm chiếc máy hoàn hảo, tối ưu cho nhu cầu thực tế và ngân sách của bạn.
            </p>
          </div>

          <div className={styles.needGrid}>
            {needs.map((item) => (
              <button
                aria-pressed={selectedNeed === item.title}
                className={`${styles.needCard} ${selectedNeed === item.title ? styles.needCardActive : ""}`}
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
            {flashSaleProducts.map((product) => {
              const discount = calculateDiscountPercent(product.currentPrice, product.originalPrice);

              return (
                <article
                  aria-label={`Xem chi tiết ${product.name}`}
                  className={`${styles.productCard} ${styles.compactCard} ${styles.clickableCard}`}
                  key={product.slug}
                  onClick={() => goToProduct(product.slug)}
                  onKeyDown={(event) => handleProductKeyDown(event, product.slug)}
                  role="link"
                  tabIndex={0}
                >
                  <div className={`${styles.imageWrap} ${styles.square}`}>
                    <img alt={product.name} src={product.coverImage} />
                    {discount ? <span className={styles.saleBadge}>-{discount}%</span> : null}
                  </div>
                  <h3>{product.name}</h3>
                  <p className={styles.price}>{formatPrice(product.currentPrice)}</p>
                  {product.originalPrice ? (
                    <p className={styles.oldPrice}>{formatPrice(product.originalPrice)}</p>
                  ) : null}
                  <span className={`${styles.pill} ${styles.pillMuted}`}>Góp 0%</span>
                </article>
              );
            })}
          </div>
        </section>

        <section className={styles.contentSection} id="best-seller-section">
          <SectionTitle title="Bán chạy nhất" />
          <div className={styles.stackList}>
            {bestSellerProducts.map((product) => (
              <article
                aria-label={`Xem chi tiết ${product.name}`}
                className={`${styles.productCard} ${styles.rowCard} ${compareSelection.includes(product.slug) ? styles.rowCardSelected : ""
                  } ${styles.clickableCard}`}
                key={product.slug}
                onClick={() => goToProduct(product.slug)}
                onKeyDown={(event) => handleProductKeyDown(event, product.slug)}
                role="link"
                tabIndex={0}
              >
                <div className={`${styles.imageWrap} ${styles.thumb}`}>
                  <img alt={product.name} src={product.coverImage} />
                </div>
                <div className={styles.rowContent}>
                  <div>
                    <div className={styles.rowTop}>
                      <h3>{product.name}</h3>
                      <label
                        className={styles.compareToggle}
                        onClick={(event) => event.stopPropagation()}
                        onKeyDown={(event) => event.stopPropagation()}
                      >
                        <input
                          checked={compareSelection.includes(product.slug)}
                          onChange={() => toggleSelection(product.slug)}
                          type="checkbox"
                        />
                        <span>So sánh</span>
                      </label>
                    </div>
                    <p className={styles.specs}>{product.cardSpecs}</p>
                    <div className={styles.ratingRow}>
                      <Icon name="star" className={styles.starIcon} />
                      <strong>{product.reviewRating.toFixed(1)}</strong>
                      <span>({product.reviewCount} đánh giá)</span>
                    </div>
                  </div>
                  <p className={styles.price}>{formatPrice(product.currentPrice)}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.contentSection} id="categories-section">
          <SectionTitle title="Danh mục phổ biến" />
          <div className={styles.categoryGrid}>
            {categoryCards.map((category) => (
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

      {compareSelection.length > 0 ? (
        <div className={styles.compareDock}>
          <button
            aria-label="Mở trang so sánh"
            className={styles.compareDockInfo}
            onClick={goToComparePage}
            type="button"
          >
            <span className={styles.compareDockIconWrap}>
              <Icon className={styles.compareDockIcon} name="compare" />
            </span>
            <span className={styles.compareDockCopy}>
              <strong>Đã chọn {compareSelection.length}</strong>
              <span>{compareSummaryLabel}</span>
            </span>
          </button>
          <button className={styles.compareDockButton} onClick={goToComparePage} type="button">
            So sánh ngay
          </button>
        </div>
      ) : null}

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
          <aside aria-modal="true" className={styles.bottomSheet} role="dialog">
            <span className={styles.sheetHandle} />
            {renderSheetContent()}
          </aside>
        </>
      ) : null}
    </main>
  );
}
