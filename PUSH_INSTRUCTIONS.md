# Инструкция по загрузке переведённого сайта на GitHub

## ✅ Что уже сделано

Весь сайт полностью переведён на немецкий язык:
- ✅ Изменён атрибут языка с `ru` на `de`
- ✅ Переведены все meta-теги и Open Graph
- ✅ Переведена Hero-секция и навигация
- ✅ Переведена секция "Über mich" с фактами
- ✅ Переведена секция "Berufserfahrung" (профессиональные формулировки)
- ✅ Переведена секция "Schulbildung"
- ✅ Переведена секция "Fähigkeiten und Sprachen"
- ✅ Переведена секция "Kontakt"
- ✅ Обновлены все alt-тексты и aria-labels

Изменения закоммичены локально.

## 🚀 Как загрузить изменения на GitHub

### Вариант 1: Через GitHub Desktop (проще всего)

1. Скачайте и установите [GitHub Desktop](https://desktop.github.com/)
2. Откройте GitHub Desktop
3. Войдите в свой аккаунт GitHub
4. File → Add Local Repository → выберите папку `C:\Users\leona\portfolio-de`
5. Нажмите кнопку "Push origin" в верхней части окна
6. Готово! Изменения загружены на сайт

### Вариант 2: Через командную строку (для продвинутых)

1. Настройте аутентификацию GitHub CLI:
   ```
   gh auth login
   ```
   Следуйте инструкциям для входа

2. Или создайте Personal Access Token:
   - Перейдите на https://github.com/settings/tokens
   - Generate new token (classic)
   - Выберите scope: `repo`
   - Скопируйте токен

3. Запустите push с токеном:
   ```
   cd C:\Users\leona\portfolio-de
   git push https://YOUR_TOKEN@github.com/elemental07/portfolio.git main
   ```

### Вариант 3: Через веб-интерфейс GitHub

1. Откройте https://github.com/elemental07/portfolio
2. Нажмите "Add file" → "Upload files"
3. Перетащите файл `index.html` из папки `C:\Users\leona\portfolio-de`
4. Commit message: `Translate site content to German`
5. Нажмите "Commit changes"

## 📋 Список всех изменений

### Meta-теги (строки 2-15):
- `lang="ru"` → `lang="de"`
- description на немецком
- og:title: "IT & Техника" → "IT & Technik"
- og:description на немецком

### Hero-секция (строки 31-47):
- alt текст: "Фотография" → "Foto von"
- "IT & Техника" → "IT & Technik"
- Описание на немецком
- aria-label: "Навигация по секциям" → "Navigation zu den Abschnitten"
- Навигация: "Обо мне" → "Über mich", "Опыт" → "Erfahrung", "Образование" → "Bildung", "Контакты" → "Kontakt"

### Секция "Über mich" (строки 50-73):
- Заголовок и два абзаца на немецком
- Факты: "Специализация" → "Fachgebiet", "Локация" → "Standort", "Образование" → "Bildung", "Статус" → "Status"
- Значения на немецком: "Ландсхут, Германия" → "Landshut, Deutschland"

### Секция "Berufserfahrung" (строки 76-110):
- "Опыт" → "Berufserfahrung"
- Все обязанности переведены профессиональным языком для немецкого Lebenslauf

### Секция "Schulbildung" (строки 112-129):
- "Образование" → "Schulbildung"
- Предметы: "Математика" → "Mathematik", "Техника" → "Technik", "Проектная работа" → "Projektprüfung", "Физкультура" → "Sport"

### Секция "Fähigkeiten und Sprachen" (строки 131-154):
- "Навыки и языки" → "Fähigkeiten und Sprachen"
- "Компетенции" → "Kompetenzen"
- Все компетенции переведены стандартными немецкими терминами
- "Языки" → "Sprachen"
- "родной" → "Muttersprache"

### Секция "Kontakt" (строки 156-175):
- "Контакты" → "Kontakt"
- Описание на немецком
- "Телефон" → "Telefon"
- "Локация" → "Standort"

## 🔍 Проверка перевода

После загрузки откройте сайт https://elemental07.github.io/portfolio/ и проверьте:
- [ ] Язык в браузере определяется как немецкий
- [ ] Все секции на немецком
- [ ] Навигация работает
- [ ] Превью при шаринге на немецком (проверьте в Facebook/LinkedIn debug tools)

---

**Статус:** Перевод завершён, готов к загрузке  
**Дата:** 11.09.2026  
**Файлов изменено:** 1 (index.html)  
**Строк изменено:** 56 вставок, 56 удалений
