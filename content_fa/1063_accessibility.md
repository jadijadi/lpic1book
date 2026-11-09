Title: ۱۰۶.۳ دسترسی‌پذیری و امکانات معلولین (a11y)
Section: موضوع ۱۰۶: رابط‌های کاربری و دسکتاپ
Summary: نرم‌افزارهای صفحه‌خوان (Orca)، بزرگ‌نمایی صفحه، صفحه‌کلیدهای مجازی و تم‌های با کنتراست بالا.

Tags: LPIC1, 102, LPIC1-102-500
Authors: Jadi
Summary: 106.3 Accessibility Date: 2021-08-03 13:28 Category: 106
Topic: Accessibility
sortorder: 320


_Weight: 1_

Demonstrate knowledge and awareness of accessibility technologies.
### Key Knowledge Areas

* Basic knowledge of visual settings and themes.
* Basic knowledge of assistive technology.
### Terms and Utilities

* High Contrast/Large Print Desktop Themes
* Screen Reader
* Braille Display
* Screen Magnifier
* On-Screen Keyboard
* Sticky/Repeat keys
* Slow/Bounce/Toggle keys
* Mouse keys
* Gestures
* Voice recognition



## Linux is for everyone

Some people have physical complications. Some can not see well, some can not see at all and some can not user their finger as most people do. Linux have 3 answers:

1- AccessX helps people with physical problems to use keyboard/mouse  
2- Visual Settings help people with vision problems by magnifying the screen and things like that  
3- Assistive Technologies are things like text-to-speech \(tts\) and reads the screen for people with visual problem  

These options are available in display managers \(login screen\) and in major desktops \(like GNOME, KDE Plasma, xfce, ...\). 

In Gnome the config is located at Settings ~ Universal Access. The configurations are categorized and are as follows:

* High Contrast
* Zoom
* Large text
* Screen Reader
* Screen Keyboard \(show a keyboard on screen\)
* Visual Alerts \(instead Beeps, flash the screen \)
* Sticky Keys \(Press shift, then press a -&gt; capital A\)
* Slow Keys \(do not repeat keys after pressing a key for few seconds\)
* Bounce Keys \(if you hit a key twice fast, it won't accept the second one\)
* Mouse Keys \(Arrow keys on number path will work as a mouse\)
* Simulate Secondary Click \(by holding down the click\)
* Hover click \(click by waiting on a button\)
 

## TTS
Applications like **Orca** or **Emacspeak** can read the dialog boxes to you so you can decide what the answer only by hearing.


<div class="book-img-frame" style="text-align: center; margin: 24px 0;"><img src="{{ "/books/book13/assets/" | url }}braille.jpg" alt="A Braille Display" style="max-width: 100%; border-radius: 8px; border: 1px solid var(--g-border-dim);" loading="lazy"></div>

Above you can see a Braille Display. This device will output text as braille for visually impaired people, although using a modern Text To Speech or screen reader might be more practical when possible.

## Voice recognition
After the recent advancements in Voice recognition, this is one of the best methods for people with disabilities to control their OSs.