import {
  escapeHTML,
  toHTML,
  uriLooksSafe,
  type PortableTextBlockComponent,
  type PortableTextComponents,
} from "@portabletext/to-html";
import type { PortableTextBody } from "../types/post";
import { slugify } from "./slug";

/**
 * Renders a post body from Sanity to HTML, styled by `.post-body` in
 * `src/styles/global.css`.
 *
 * `toHTML` escapes span text itself; every value interpolated here by hand
 * (alt text, captions, callouts, code, URLs) is escaped explicitly, since a
 * post body is content and must never be able to inject markup.
 */

/**
 * True only for a web page on another domain, which opens in a new tab.
 * Site paths and chrod.dev URLs stay in the tab, and so do `mailto:`/`tel:`:
 * a new tab for those opens blank before the mail or phone app takes over.
 */
function isExternal(href: string): boolean {
  try {
    const url = new URL(href);
    return (
      (url.protocol === "http:" || url.protocol === "https:") &&
      url.hostname.replace(/^www\./, "") !== "chrod.dev"
    );
  } catch {
    // Relative paths and anchors throw without a base: they are internal.
    return false;
  }
}

/** Widths offered to the browser. The column is 768px wide, so 1600 covers 2x screens. */
const IMAGE_WIDTHS = [800, 1200, 1600];

/**
 * h2/h3 get an `id` from their text, so a section can be linked to directly
 * (and quoted by an assistant with a precise URL). Repeats get a numeric
 * suffix rather than colliding.
 */
function headingRenderer(
  level: 2 | 3,
  usedIds: Set<string>,
): PortableTextBlockComponent {
  return ({ children, value }) => {
    const text = (value.children ?? [])
      .map((child) => ("text" in child ? String(child.text ?? "") : ""))
      .join("");
    const base = slugify(text) || `section-${level}`;
    let id = base;
    for (let n = 2; usedIds.has(id); n++) id = `${base}-${n}`;
    usedIds.add(id);
    return `<h${level} id="${id}">${children ?? ""}</h${level}>`;
  };
}

export function renderPostBody(body: PortableTextBody): string {
  const usedIds = new Set<string>();

  const components: PortableTextComponents = {
    // Same reason as `onMissingComponent` below: unknown means invisible.
    unknownType: () => "",
    block: {
      h2: headingRenderer(2, usedIds),
      h3: headingRenderer(3, usedIds),
    },
    marks: {
      link: ({ children, value }) => {
        const href = String(value?.href ?? "");
        if (!uriLooksSafe(href)) return children;
        // `data-post-link` marks the links an author typed, which is what
        // `checkPostLinks` in astro.config.mjs verifies after the build.
        const attrs = isExternal(href)
          ? ' target="_blank" rel="noopener noreferrer"'
          : " data-post-link";
        return `<a href="${escapeHTML(href)}"${attrs}>${children}</a>`;
      },
    },
    types: {
      image: ({ value }) => {
        if (!value?.url) return "";
        const width = Number(value.width) || 0;
        const height = Number(value.height) || 0;
        // Sanity's CDN resizes on the fly and picks the format the browser
        // accepts. A phone gets the 800px version instead of downloading the
        // desktop one, and no version is ever upscaled past the original.
        const at = (w: number) => `${value.url}?w=${w}&fit=max&auto=format`;
        const widths = width
          ? [...new Set(IMAGE_WIDTHS.map((w) => Math.min(w, width)))]
          : IMAGE_WIDTHS;
        const largest = widths[widths.length - 1];
        const srcset = widths.map((w) => `${at(w)} ${w}w`).join(", ");
        const src = at(largest);
        const size =
          width && height
            ? ` width="${largest}" height="${Math.round((largest / width) * height)}"`
            : "";
        const caption = value.caption
          ? `<figcaption>${escapeHTML(String(value.caption))}</figcaption>`
          : "";
        return `<figure><img src="${escapeHTML(src)}" srcset="${escapeHTML(srcset)}" sizes="(min-width: 800px) 768px, calc(100vw - 2rem)" alt="${escapeHTML(String(value.alt ?? ""))}"${size} loading="lazy" decoding="async" />${caption}</figure>`;
      },
      callout: ({ value }) => {
        const tone = value?.tone === "warning" ? "warning" : "note";
        const paragraphs = String(value?.text ?? "")
          .split(/\n{2,}/)
          .map((p) => `<p>${escapeHTML(p).replace(/\n/g, "<br />")}</p>`)
          .join("");
        return `<aside class="callout callout-${tone}">${paragraphs}</aside>`;
      },
      codeBlock: ({ value }) => {
        const language = value?.language
          ? ` data-language="${escapeHTML(String(value.language))}"`
          : "";
        return `<pre${language}><code>${escapeHTML(String(value?.code ?? ""))}</code></pre>`;
      },
    },
  };

  return toHTML(body, {
    components,
    // A block type the renderer does not know yet should leave a gap, not
    // dump Sanity's internal shape into the page.
    onMissingComponent: false,
  });
}
