import os, re

PROJECT_RENAMES = [
    # (Old exact text, New exact text)
    ('<p>Cannon Place</p>', '<p>The Urban Edge</p>'),
    ('<h4>Cannon Place</h4>', '<h4>The Urban Edge</h4>'),
    ('<p>Broomwood</p>', '<p>Dovetail House</p>'),
    ('<h4>Broomwood</h4>', '<h4>Dovetail House</h4>'),
    ('Cannon Place is a Victorian house conversion,', 'The Urban Edge is a Victorian house conversion,'),
]

portfolio_dir = r'e:\kothas\minaleandmann.com\residential-portfolio'
updated_files = 0

for root, dirs, files in os.walk(portfolio_dir):
    for f in files:
        if f.endswith('.html'):
            p = os.path.join(root, f)
            with open(p, 'r', encoding='utf-8', errors='ignore') as fp:
                content = fp.read()
                
            orig_content = content
            for old_str, new_str in PROJECT_RENAMES:
                content = content.replace(old_str, new_str)
                
            if content != orig_content:
                with open(p, 'w', encoding='utf-8') as fp:
                    fp.write(content)
                rel = os.path.relpath(p, r'e:\kothas\minaleandmann.com')
                print(f'Updated: {rel}')
                updated_files += 1

print(f'\nTotal files updated: {updated_files}')
