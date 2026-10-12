"""
Automatic Project Name Synchronizer for Kotha's Atelier.

Whenever you change project names in residential-portfolio/index.html:
Simply run:
    python sync_projects.py

This automatically propagates the new names across:
1. All individual subproject HTML pages (cannon-place, broomwood, between-commons, etc.)
2. The slider navigation cards (.slider-nav)
3. The full-screen caption titles (.captions-full)
4. The bottom expanding project CTAs (component-expanding-cta)
5. The global runtime JS registry in global.min3c82.js
"""

import os
import re
from html.parser import HTMLParser

PORTFOLIO_INDEX = r'e:\kothas\minaleandmann.com\residential-portfolio\index.html'
PORTFOLIO_DIR = r'e:\kothas\minaleandmann.com\residential-portfolio'
GLOBAL_JS = r'e:\kothas\minaleandmann.com\wp-content\themes\pegasus\dist\js\global.min3c82.js'

PROJECT_ORDER = [
    'cannon-place',
    'broomwood',
    'seymour-walk',
    'alexander-place',
    'no-40',
    'mews-house',
    'thornton',
    'between-commons',
    'the-cube-house',
    'the-victorian',
    'montague'
]

class PortfolioParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.section = None
        self.in_cell = False
        self.in_title = False
        self.current_title = ''
        self.slides = []
        self.captions = []

    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        classes = attrs_dict.get('class', '').split()
        if 'slider-nav' in classes:
            self.section = 'slider-nav'
        elif 'captions-full' in classes:
            self.section = 'captions-full'
        
        if self.section and tag == 'li' and 'cell' in classes:
            self.in_cell = True
            self.current_title = ''

        if self.in_cell:
            if self.section == 'slider-nav' and tag == 'p':
                self.in_title = True
            elif self.section == 'captions-full' and tag == 'h4':
                self.in_title = True

    def handle_endtag(self, tag):
        if self.section == 'slider-nav' and tag == 'p':
            self.in_title = False
        elif self.section == 'captions-full' and tag == 'h4':
            self.in_title = False

        if tag == 'li' and self.in_cell:
            self.in_cell = False
            if self.current_title:
                title = self.current_title.strip()
                if self.section == 'slider-nav':
                    self.slides.append(title)
                elif self.section == 'captions-full':
                    self.captions.append(title)

    def handle_data(self, data):
        if self.in_title and self.in_cell:
            self.current_title += data

def sync_projects():
    # 1. Parse source of truth from residential-portfolio/index.html
    with open(PORTFOLIO_INDEX, 'r', encoding='utf-8') as f:
        html = f.read()

    parser = PortfolioParser()
    parser.feed(html)

    if len(parser.slides) < 11:
        print(f"Warning: only found {len(parser.slides)} slides in portfolio index.")
        return

    titles = parser.slides[:11]
    registry = {PROJECT_ORDER[i]: titles[i] for i in range(11)}

    print("Master Project Names from residential-portfolio/index.html:")
    for slug, name in registry.items():
        print(f"  {slug:20}: {name}")

    # 2. Update each subproject page
    updated_files = 0
    for root, dirs, files in os.walk(PORTFOLIO_DIR):
        for f in files:
            if not f.endswith('.html'):
                continue
            p = os.path.join(root, f)
            if os.path.abspath(p) == os.path.abspath(PORTFOLIO_INDEX):
                continue

            with open(p, 'r', encoding='utf-8', errors='ignore') as fp:
                content = fp.read()

            orig_content = content

            # Update slider-nav titles by slide index
            slider_pos = content.find('class="component slider-nav"')
            captions_pos = content.find('class="component captions-full"')
            if slider_pos != -1 and captions_pos != -1:
                slider_block = content[slider_pos:captions_pos]
                
                # Replace each slide's <p> title
                def replace_slide_title(match):
                    idx = replace_slide_title.idx
                    replace_slide_title.idx += 1
                    if idx < len(titles):
                        return f'<div class="inner"><p>{titles[idx]}</p>'
                    return match.group(0)

                replace_slide_title.idx = 0
                new_slider_block = re.sub(r'<div class="inner">\s*<p>[^<]*</p>', replace_slide_title, slider_block)
                content = content[:slider_pos] + new_slider_block + content[captions_pos:]

            # Update captions-full titles
            captions_pos = content.find('class="component captions-full"')
            if captions_pos != -1:
                main_pos = content.find('<main id="content">', captions_pos)
                if main_pos != -1:
                    captions_block = content[captions_pos:main_pos]

                    def replace_caption_title(match):
                        idx = replace_caption_title.idx
                        replace_caption_title.idx += 1
                        if idx < len(titles):
                            return f'<h4>{titles[idx]}</h4>'
                        return match.group(0)

                    replace_caption_title.idx = 0
                    new_captions_block = re.sub(r'<h4>[^<]*</h4>', replace_caption_title, captions_block)
                    content = content[:captions_pos] + new_captions_block + content[main_pos:]

            # Update expanding CTA headers matching any slug
            for slug, title in registry.items():
                pattern = rf'(href="[^"]*{re.escape(slug)}[^"]*"[^>]*>[\s\S]*?<div class="caption">[\s\S]*?<h4>)[^<]*(</h4>)'
                content = re.sub(pattern, rf'\g<1>{title}\g<2>', content)

            if content != orig_content:
                with open(p, 'w', encoding='utf-8') as fp:
                    fp.write(content)
                rel = os.path.relpath(p, PORTFOLIO_DIR)
                print(f"  Synced: {rel}")
                updated_files += 1

    print(f"\nStatic HTML pages updated: {updated_files}")

    # 3. Update global.min3c82.js registry
    if os.path.exists(GLOBAL_JS):
        with open(GLOBAL_JS, 'r', encoding='utf-8') as fp:
            js = fp.read()

        reg_str = "window.PROJECT_REGISTRY = window.PROJECT_REGISTRY || {\n"
        reg_lines = [f"        '{slug}': '{name}'" for slug, name in registry.items()]
        reg_str += ",\n".join(reg_lines) + "\n    };"

        new_js = re.sub(
            r'window\.PROJECT_REGISTRY = window\.PROJECT_REGISTRY \|\| \{[\s\S]*?\};',
            reg_str,
            js
        )
        if new_js != js:
            with open(GLOBAL_JS, 'w', encoding='utf-8') as fp:
                fp.write(new_js)
            print("  Synced window.PROJECT_REGISTRY in global.min3c82.js")

if __name__ == '__main__':
    sync_projects()
