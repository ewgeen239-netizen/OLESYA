# Prompt: Full-Screen Photo Experience

```text
Дополни текущий лендинг Alesia Nails Szczecin так, чтобы фото работ/референсов выглядели как премиальный full-screen visual experience, как на дорогих beauty/fashion сайтах.

Главное требование:
Фото не должны выглядеть как маленькая галерея в карточках. Сделай крупные визуальные блоки почти/полностью на весь экран: immersive, editorial, premium.

Что сделать:
1. Hero должен использовать большое фото ногтей/рук как full-screen background или split-overlay без карточки:
   - высота hero: min-height 100svh на mobile и desktop;
   - фото занимает весь экран или почти весь экран;
   - поверх фото аккуратный текстовый слой с читаемым contrast overlay;
   - без дешевых градиентов, без тяжелого blur, без stock-вида.

2. Portfolio сделать не обычной сеткой, а премиальной витриной:
   - первый featured image: full-width / viewport-height section;
   - дальше чередовать крупные блоки: 100vw, 70vh, 2-column editorial grid на desktop;
   - на mobile каждая сильная работа может занимать почти весь экран по высоте;
   - сохранить aspect-ratio, object-fit: cover, object-position center;
   - добавить lightbox, где фото открывается на весь экран.

3. Lightbox:
   - при клике фото открывается full-screen overlay;
   - фон молочно-графитовый/темный premium, без перегруза;
   - изображение максимально крупное, но без обрезки важной части;
   - кнопки prev/next/close с lucide icons;
   - поддержка ESC, клик вне фото, keyboard navigation;
   - aria-label для кнопок.

4. Если фото берутся из assets/nails-alesia или public/nails-alesia:
   - использовать реальные фото в главном Portfolio;
   - лучшие 3-5 фото вывести крупно, почти на весь экран;
   - слабые/похожие фото оставить ниже в secondary grid.

5. Если добавляются примеры из интернета или Instagram:
   - не выдавать чужие фото за работы мастера;
   - вынести их в отдельную секцию "Inspiracje manicure";
   - визуально тоже можно делать full-screen/large-format, но подписать как inspiration/reference;
   - добавить поле isReference: true в data-массиве.

6. Design direction:
   - clean beauty, luxury care, feminine tech;
   - молочный белый, pearl, blush pink, champagne, soft silver, graphite;
   - текст тонкий, дорогой, много воздуха;
   - фото - главный герой сайта;
   - никаких маленьких салонных карточек, дешевого розового, glitter, сердечек.

7. Технически:
   - Next.js + TypeScript + Tailwind;
   - next/image для всех фото;
   - фиксированные размеры секций через min-h, aspect-ratio, clamp/max-width;
   - Framer Motion: мягкий fade/slide и smooth lightbox transitions;
   - sticky mobile bottom CTA не должен перекрывать фото и текст;
   - проверить iPhone/mobile, tablet, desktop wide.

8. После допила:
   - запусти lint/build;
   - запусти dev server;
   - проверь визуально, что фото реально занимают весь экран/почти весь экран;
   - исправь обрезку рук/ногтей через object-position;
   - в финале напиши, где заменить изображения и как добавить новые.

Итог должен ощущаться как дорогой portfolio/beauty editorial сайт, где фото работ - центр опыта, а запись в Instagram/WhatsApp/Booksy всегда рядом.

Ключевая фраза для Claude:
"not card gallery, but immersive editorial full-screen photo sections"
```

