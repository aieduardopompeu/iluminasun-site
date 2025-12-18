import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "wouter";
import { Calendar, ChevronLeft, ChevronRight, Clock, User } from "lucide-react";

export type FeaturedPost = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  slug: string;
  image?: string;
  imageAlt?: string;
};

type FeaturedCarouselProps = {
  posts: FeaturedPost[];
  className?: string;
  autoplay?: boolean;
  intervalMs?: number;
  badgeText?: string; // "Destaque"
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(!!mq.matches);
    update();

    // compat
    if (mq.addEventListener) mq.addEventListener("change", update);
    else mq.addListener(update);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", update);
      else mq.removeListener(update);
    };
  }, []);

  return reduced;
}

export default function FeaturedCarousel({
  posts,
  className,
  autoplay = true,
  intervalMs = 7000,
  badgeText = "Destaque",
}: FeaturedCarouselProps) {
  const safePosts = useMemo(() => posts?.filter(Boolean) ?? [], [posts]);
  const count = safePosts.length;

  const prefersReducedMotion = usePrefersReducedMotion();
  const [active, setActive] = useState(0);

  const pausedRef = useRef(false);
  const touchRef = useRef<{ startX: number; lastX: number; dragging: boolean } | null>(null);

  useEffect(() => {
    if (!autoplay) return;
    if (prefersReducedMotion) return;
    if (count <= 1) return;

    const id = window.setInterval(() => {
      if (pausedRef.current) return;
      setActive((i) => (i + 1) % count);
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [autoplay, intervalMs, prefersReducedMotion, count]);

  useEffect(() => {
    // mantém índice válido se mudar quantidade
    if (active > count - 1) setActive(0);
  }, [count, active]);

  function goPrev() {
    if (count <= 1) return;
    setActive((i) => (i - 1 + count) % count);
  }

  function goNext() {
    if (count <= 1) return;
    setActive((i) => (i + 1) % count);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goPrev();
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goNext();
    }
  }

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    // swipe apenas para touch/pen
    if (e.pointerType === "mouse") return;
    touchRef.current = { startX: e.clientX, lastX: e.clientX, dragging: true };
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!touchRef.current?.dragging) return;
    touchRef.current.lastX = e.clientX;
  }

  function onPointerUp() {
    const t = touchRef.current;
    if (!t) return;

    const delta = t.lastX - t.startX;
    touchRef.current = null;

    // limiar
    if (Math.abs(delta) < 40) return;
    if (delta > 0) goPrev();
    else goNext();
  }

  if (count === 0) return null;

  const post = safePosts[active];
  const imgSrc = post.image || "/blog/regulamentacao-aneel.webp";
  const imgAlt = post.imageAlt || post.title;

  return (
    <div
      className={["rounded-2xl border border-border bg-background p-6", className]
        .filter(Boolean)
        .join(" ")}
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
      onFocusCapture={() => (pausedRef.current = true)}
      onBlurCapture={() => (pausedRef.current = false)}
    >
      <div
        className="grid gap-6 lg:grid-cols-[1fr_1.2fr]"
        role="region"
        aria-label="Carrossel de destaques do blog"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {/* Imagem */}
        <div className="relative min-h-[220px] rounded-xl overflow-hidden border border-border bg-muted">
          <img
            src={imgSrc}
            alt={imgAlt}
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/0 via-black/0 to-black/10" />

          <div className="absolute left-4 top-4 inline-flex items-center rounded-full bg-background/80 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur border border-border">
            {badgeText}
          </div>

          {/* Setas */}
          {count > 1 ? (
            <>
              <button
                type="button"
                aria-label="Voltar destaque"
                onClick={goPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-border bg-background/80 p-2 backdrop-blur hover:bg-background"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Próximo destaque"
                onClick={goNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-border bg-background/80 p-2 backdrop-blur hover:bg-background"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          ) : null}

          {/* Dots */}
          {count > 1 ? (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 backdrop-blur">
              {safePosts.map((_, i) => (
                <button
                  key={`dot-${i}`}
                  type="button"
                  aria-label={`Ir para destaque ${i + 1}`}
                  onClick={() => setActive(i)}
                  className={[
                    "h-2 w-2 rounded-full",
                    i === active ? "bg-foreground" : "bg-foreground/30 hover:bg-foreground/50",
                  ].join(" ")}
                />
              ))}
              <span className="ml-2 text-[10px] font-semibold text-foreground/70">
                {active + 1}/{count}
              </span>
            </div>
          ) : null}
        </div>

        {/* Conteúdo */}
        <div className="space-y-3">
          <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            {post.category}
          </div>

          <h2 className="text-2xl font-bold leading-tight">{post.title}</h2>
          <p className="text-sm text-muted-foreground">{post.excerpt}</p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <User className="h-3 w-3" />
              {post.author}
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {post.date}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.readTime} de leitura
            </span>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link href={`/blog/${post.slug}`}>
              <a className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-95">
                Ler Artigo Completo <span aria-hidden>→</span>
              </a>
            </Link>

            <div className="text-xs text-muted-foreground">
              <div className="font-semibold text-foreground/80">Relacionados</div>
              <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
                <Link href="/simulador"><a className="hover:text-primary">Simulador</a></Link>
                <Link href="/kit-solar"><a className="hover:text-primary">Kits</a></Link>
                <Link href="/servicos"><a className="hover:text-primary">Serviços</a></Link>
                <Link href="/contato"><a className="hover:text-primary">Contato</a></Link>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Link href="/contato">
              <a className="text-xs text-muted-foreground hover:text-primary">
                Quer ajuda para entender seu enquadramento (residencial/comercial/industrial/rural)? Falar com especialista →
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
