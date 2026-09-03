# Zdjęcia prac — instrukcja podmiany

1. Wrzuć pliki do tego folderu (`public/nails-alesia/`).
   Sugerowane nazwy: `french-01.jpg`, `nude-01.jpg`, `gel-01.jpg`,
   `pedicure-01.jpg`, `design-01.jpg`, `profile.jpg`.

2. Otwórz `data/site.ts` i wpisz ścieżkę w polu `src`:

   ```ts
   { id: "g-01", src: "/nails-alesia/french-01.jpg", ... }
   ```

   Zdjęcie mastera: `profile.avatar = "/nails-alesia/profile.jpg"`.

3. Proporcje (`ratio`) w danych muszą pasować do kadru zdjęcia:
   `"3/4"` (pionowe), `"4/5"`, `"1/1"` (kwadrat).
   Dzięki temu strona nie „skacze” podczas ładowania.

Zalecane: JPG/WebP, dłuższy bok 1600–2000 px, do ~400 KB na plik.
