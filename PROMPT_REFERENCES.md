# Prompt: Internet / Instagram Nail References

```text
Ты senior frontend/product designer и full-stack engineer. Нужно улучшить уже созданный лендинг Alesia Nails Szczecin, сделав визуал и портфолио более живыми и премиальными за счет референсов nail-работ.

Контекст:
Сайт для nail-мастера в Szczecin: Алеся Гаркавенко, Instagram @nails_alesia_szczecin.
Цель: показать уровень работ, вызвать доверие у женщин 20-45 лет и привести к записи через Instagram/WhatsApp/Booksy.
Стиль: clean beauty, luxury care, feminine tech, calm premium.

Задача:
1. Проверь текущую структуру проекта и адаптируйся под существующий стек.
2. Найди, где лежат изображения: assets/nails-alesia, public/nails-alesia, public/images, app/assets или аналогичные папки.
3. Если в проекте уже есть реальные фото работ Алеси - используй их в портфолио в первую очередь.
4. Если фото мало или они однотипные, добавь аккуратную систему placeholder/reference cards, чтобы сайт выглядел законченным, но не выдавал чужие работы за работы мастера.
5. НЕ скачивай и НЕ используй чужие фото из Instagram/интернета как портфолио без разрешения. Вместо этого:
   - сделай блок "Inspiracje / Style, ktore mozesz wybrac";
   - подпиши такие изображения как inspiration/reference, а не portfolio;
   - используй royalty-free изображения только если лицензия позволяет;
   - если используешь внешние картинки, вынеси их в отдельный data-массив с полями source, alt, category, isReference.
6. Для Instagram @nails_alesia_szczecin добавь CTA-блок и визуальную секцию "Zobacz wiecej prac na Instagramie", но не парси Instagram агрессивно и не обходи ограничения платформы.

Что улучшить в дизайне:
- Сделай Portfolio более премиальным: masonry/grid layout, крупные карточки, мягкие hover states, lightbox.
- Добавь категории работ: Natural, French, Nude, Elegant, Seasonal, Extensions.
- Добавь фильтры/segmented control по категориям.
- Добавь подписи к работам: коротко, элегантно, без рекламного шума.
- У каждой карточки должен быть стабильный aspect-ratio, alt text и lazy loading.
- Добавь пустое состояние, если фото не найдены: дорогие минималистичные placeholders с текстом "Portfolio photo coming soon".
- Сохрани вайб: молочный белый, blush pink, pearl, champagne, soft silver, graphite text.
- Не использовать дешевые розовые градиенты, блестки, сердечки, перегруз декором.

Технически:
- Если это Next.js: используй next/image.
- Если есть lucide-react - используй иконки для Instagram, MessageCircle/Phone, Calendar, Sparkles, ShieldCheck, MapPin.
- Если есть Framer Motion - добавь легкие fade/slide анимации и плавный lightbox.
- Проверить адаптивность: mobile-first, tablet, desktop wide.
- Не допускать layout shift.
- Проверить, чтобы CTA на мобильном был sticky bottom и не перекрывал контент.

Контент для секции вдохновения:
Заголовок: Inspiracje manicure
Подзаголовок: Subtelne kierunki stylizacji - finalny efekt dobieramy do Twojej plytki, okazji i stylu.

Карточки:
- Clean nude manicure
- Soft french
- Milky pink
- Elegant short nails
- Delicate extensions
- Seasonal accent

Важно:
Главное портфолио должно быть честным. Реальные работы Алеси показываем как portfolio. Чужие/примерные визуалы только как inspiration/reference и явно отделяем от работ мастера.

После изменений:
- Запусти lint/build, если есть.
- Запусти локальный dev server.
- Проверь сайт на mobile и desktop.
- Исправь визуальные проблемы: переполнение текста, перекрытие sticky CTA, плохие отступы, дергание сетки, неработающий lightbox.
- В финале дай кратко: что изменено, где лежит массив изображений, как заменить placeholders на реальные фото.
```

