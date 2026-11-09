# 🐧 LPIC-1 Study Guide (Version 500) | راهنمای آزمون لینوکس LPIC-1

> **Complete study notes, video tutorials, and objectives for Linux Professional Institute Certification (LPIC-1: Exams 101-500 & 102-500).**  
> **درسنامه‌های جامع، سرفصل‌های آزمون رسمی و ویدئوهای آموزشی آزمون‌های ۱۰۱ و ۱۰۲ مدرک بین‌المللی LPIC-1 نگارش ۵۰۰.**  
> Author & Instructor: **Jadi Mirmirani (جادی میرمیرانی)**

---

[![Gitab Persian Reader](https://img.shields.io/badge/مطالعه_آنلاین_فارسی-گیتاب-blueviolet?style=for-the-badge&logo=gitbook)](https://hheydarian.github.io/Gitab/books/book13/)
[![License: CC BY-SA 4.0](https://img.shields.io/badge/License-CC_BY--SA_4.0-lightgrey.svg?style=for-the-badge)](https://creativecommons.org/licenses/by-sa/4.0/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](http://makeapullrequest.com)

---

## 🌐 زبان‌ها و روش‌های مطالعه / Available Editions

| نسخه | توضیحات | لینک دسترسی |
| :--- | :--- | :--- |
| 🇮🇷 **فارسی (آنلاین)** | نسخه تعاملی و زیبا در گیتاب همراه با ویدئوها و فونت وزیر | **[ورود به گیتاب](https://hheydarian.github.io/Gitab/books/book13/)** |
| 🇮🇷 **فارسی (مارک‌داون)** | فایل‌های منبع به زبان فارسی در همین مخزن | **[پوشه content_fa/](./content_fa/)** |
| 🇬🇧 **English (Original)** | Original English lesson files and exam objectives | **[Folder content/](./content/)** |

---

## 📖 درباره دوره و آزمون

مدرک **LPIC-1** از بنیاد حرفه‌ای لینوکس (LPI)، استاندارد طلایی ورود به بازار کار جهانی لینوکس و سیستم‌های متن‌باز است. برای دریافت این گواهینامه، داوطلب باید در دو آزمون موفق شود:
1. **آزمون ۱۰۱ (Exam 101-500)**: شامل معماری سیستم، نصب لینوکس، مدیریت بسته‌ها، دستورات خط فرمان گنو و یونیکس، و سیستم‌های فایل.
2. **آزمون ۱۰۲ (Exam 102-500)**: شامل پوسته‌ها و اسکریپت‌نویسی، رابط‌های کاربری، وظایف مدیریتی، سرویس‌های اساسی سیستم، اصول شبکه و امنیت.

تمامی ۴۶ درسنامهٔ این کتاب دارای ویدئوی آموزشی اختصاصی از جادی در یوتیوب بوده و پوشش ۱۰۰٪ بر روی سرفصل‌های رسمی دارد.

---

## 📑 سرفصل‌های آموزشی (Curriculum Overview)

### 📌 آزمون ۱۰۱ (Exam 101 Objectives)
- **موضوع ۱۰۱: معماری سیستم (System Architecture)**
  - شناسایی سخت‌افزار، بوت سیستم لینوکس، سطوح اجرایی (Runlevels) و خاموش‌کردن
- **موضوع ۱۰۲: نصب لینوکس و مدیریت بسته‌ها (Linux Installation & Package Management)**
  - پارتیشن‌بندی دیسک، مدیر بوت GRUB، کتابخانه‌های اشتراکی، بسته‌های دبیان (APT/DPKG) و ردهت (RPM/YUM)
- **موضوع ۱۰۳: دستورات گنو و یونیکس (GNU & Unix Commands)**
  - خط فرمان، فیلترهای متنی، مدیریت فایل، لوله‌ها و تغییرمسیرها، فرآیندها، عبارات باقاعده و ویرایشگر Vi
- **موضوع ۱۰۴: دیسک‌ها و فایل‌سیستم‌ها (Devices, Linux Filesystems, FHS)**
  - ایجاد پارتیشن‌ها، مانت دیسک‌ها، مجوزها و دسترسی‌ها، پیوندهای سخت و نرم، و استاندارد FHS

### 📌 آزمون ۱۰۲ (Exam 102 Objectives)
- **موضوع ۱۰۵: شل‌ها و اسکریپت‌نویسی (Shells & Shell Scripting)**
  - متغیرهای محیطی و نوشتن اسکریپت‌های کاربردی Bash
- **موضوع ۱۰۶: رابط‌های کاربری و دسکتاپ (User Interfaces & Desktops)**
  - سیستم X11، مدیرهای ورود (Display Managers) و دسترسی‌پذیری
- **موضوع ۱۰۷: وظایف مدیریتی (Administrative Tasks)**
  - مدیریت کاربران و گروه‌ها، زمان‌بندی کارها با Cron/At، و بومی‌سازی Locale
- **موضوع ۱۰۸: سرویس‌های اساسی سیستم (Essential System Services)**
  - همگام‌سازی زمان (NTP/Chrony)، ثبت وقایع سیستم (Syslog/Journald)، عامل انتقال ایمیل (MTA) و چاپ (CUPS)
- **موضوع ۱۰۹: اصول شبکه (Networking Fundamentals)**
  - پروتکل‌های اینترنت، آدرس‌دهی، پیکربندی شبکه، عیب‌یابی و سرویس DNS کلاینت
- **موضوع ۱۱۰: امنیت سیستم (Security)**
  - مدیریت امنیت، اختیارات ریشه، امنیت هاست، و محافظت از داده‌ها با رمزنگاری (GPG و SSH)

---

## 🤝 مشارکت و ارسال پول‌ریکوئست (Contributing)

این مخزن به صورت متن‌باز منتشر شده و هرگونه بهبود در توضیحات، افزودن نکات تستی جدید، رفع خطاهای تایپی و توسعه ترجمه به گرمی استقبال می‌شود.

---

## ⚖️ مجوز (License)

این اثر تحت مجوز **Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)** در دسترس همگان قرار دارد.
