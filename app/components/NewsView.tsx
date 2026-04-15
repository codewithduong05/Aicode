"use client";

import { Article, articlesTable, getAuthorById } from "../lib/fake-db";
import Icon from "./Icon";
import styles from "../page.module.css";

interface NewsViewProps {
  onBack: () => void;
  onSelectArticle: (slug: string) => void;
}

export default function NewsView({ onBack, onSelectArticle }: NewsViewProps) {
  const categories = ["Tất cả bài viết", "Tư vấn chọn mua", "Review chi tiết", "Thủ thuật Laptop", "Tin tức công nghệ"];

  return (
    <div className={styles.newsViewLayout}>
      {/* Header section based on design */}
      <header className={styles.newsHeader}>
        <div className={styles.newsTopBar}>
          <button className={styles.newsTopIconBtn} type="button" aria-label="Tìm kiếm">
            <Icon name="search" className={styles.newsTopIcon} />
          </button>
          <h2 className={styles.newsBrand}>The Digital Curator</h2>
          <button className={styles.newsTopIconBtn} type="button" aria-label="Menu">
            <Icon name="menu" className={styles.newsTopIcon} />
          </button>
        </div>
        <div className={styles.newsHero}>
          <h1>Góc Chuyên Gia & Tư Vấn Công Nghệ</h1>
          <p>Nơi tổng hợp kiến thức chuyên sâu, đánh giá công tâm và những mẹo công nghệ giúp bạn làm chủ thiết bị của mình.</p>
        </div>
      </header>

      <div className={styles.newsCategories}>
        {categories.map((cat, i) => (
          <button key={cat} className={i === 0 ? styles.newsCatActive : styles.newsCat} type="button">
            {cat}
          </button>
        ))}
      </div>

      <div className={styles.newsGrid}>
        {articlesTable.map((article, index) => {
          const author = getAuthorById(article.authorId);
          const isFeatured = index === 0;

          return (
            <article
              key={article.slug}
              className={isFeatured ? styles.newsFeaturedCard : styles.newsCard}
              onClick={() => onSelectArticle(article.slug)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  onSelectArticle(article.slug);
                }
              }}
            >
              <div className={styles.newsImageWrap}>
                <img src={article.coverImage} alt={article.title} />
              </div>
              <div className={styles.newsCardContent}>
                <div className={styles.newsCardMeta}>
                  <span
                    className={styles.newsBadge}
                    style={{ backgroundColor: article.categoryBadgeColor, color: article.categoryBadgeColor === "#ffdad6" ? "#93000a" : "inherit" }}
                  >
                    {article.category}
                  </span>
                  <span className={styles.newsReadTime}>{article.readTime}</span>
                </div>
                <h3>{article.title}</h3>
                <p className={styles.newsCardSummary}>{article.summary}</p>

                {author && (
                  <div className={styles.newsAuthorBadge}>
                    <div className={styles.authorAvatar}>
                      <img src={author.avatar} alt={author.name} />
                    </div>
                    <div className={styles.authorInfo}>
                      <strong>{author.name}</strong>
                      <span>{author.role} • {article.publishedAt}</span>
                    </div>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>

      <footer className={styles.newsFooter}>
        <h2 className={styles.newsBrandFooter}>The Digital Curator</h2>
        <p className={styles.copyNote}>© 2024 The Digital Curator. BY LAPTOP STORE VN</p>
        <p className={styles.copyNoteSub}>Tất cả bản quyền được bảo hộ.</p>
        <div className={styles.newsFooterLinks}>
          <a href="#">Về chúng tôi</a>
          <a href="#">Chính sách bảo mật</a>
          <div className={styles.linkDivider} />
          <a href="#">Trở thành người viết</a>
          <a href="#">Liên hệ hợp tác</a>
        </div>
      </footer>
    </div>
  );
}
