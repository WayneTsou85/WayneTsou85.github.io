/**
 * 計算文章閱讀時間
 * 中文按 500 字/分鐘，英文按 200 詞/分鐘
 */
export function getReadingTime(content: string): string {
  // 移除 frontmatter 與 HTML 標籤
  const clean = content
    .replace(/---[\s\S]*?---/, '')
    .replace(/<[^>]*>/g, '')
    .trim();

  // 計算中文字數
  const chineseChars = clean.match(/[\u4e00-\u9fff\u3400-\u4dbf]/g) || [];
  const chineseMinutes = chineseChars.length / 500;

  // 計算英文字數（移除中文後計算）
  const withoutChinese = clean.replace(/[\u4e00-\u9fff\u3400-\u4dbf]/g, '');
  const englishWords = withoutChinese.split(/\s+/).filter(w => w.length > 0);
  const englishMinutes = englishWords.length / 200;

  const totalMinutes = Math.ceil(chineseMinutes + englishMinutes);
  return totalMinutes < 1 ? '1 min read' : `${totalMinutes} min read`;
}
