import os
import re

def replace_ip_in_files(directory, old_ip, new_ip):
    modified_files = []
    for root, dirs, files in os.walk(directory):
        # Ignorar o diretório node_modules
        if 'node_modules' in dirs:
            dirs.remove('node_modules')
            continue
        for file in files:
            if file.endswith(('.html', '.css', '.js')):
                file_path = os.path.join(root, file)
                with open(file_path, 'r') as f:
                    content = f.read()
                # Usando expressão regular para substituir o IP
                updated_content = re.sub(re.escape(old_ip), new_ip, content)
                if updated_content != content:
                    modified_files.append(file_path)
                    with open(file_path, 'w') as f:
                        f.write(updated_content)
    return modified_files

# Diretório onde os arquivos estão localizados
directory = '/var/www/html/indoor-routess/'
# IP antigo e novo
old_ip = '186.237.57.106'
new_ip = '186.237.58.74'

modified_files = replace_ip_in_files(directory, old_ip, new_ip)

if modified_files:
    print("Os seguintes arquivos foram modificados:")
    for file in modified_files:
        print(file)
else:
    print("Nenhum arquivo foi modificado.")

