import os, glob

def replace_in_files():
    files = glob.glob('src/**/*.jsx', recursive=True)
    count = 0
    for file in files:
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        new_content = content.replace("backgroundColor: 'white'", "backgroundColor: 'var(--white)'")
        new_content = new_content.replace("backgroundColor: \"white\"", "backgroundColor: \"var(--white)\"")
        
        if new_content != content:
            with open(file, 'w', encoding='utf-8') as f:
                f.write(new_content)
            count += 1
            print(f'Updated {file}')
    print(f'Total files updated: {count}')

replace_in_files()
