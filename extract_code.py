import os

def extract_code(directory, output_file):
    with open(output_file, 'w', encoding='utf-8') as out_file:
        for root, dirs, files in os.walk(directory):
            for file in files:
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', encoding='utf-8') as in_file:
                        out_file.write(f"\n\n### File: {file_path} ###\n\n")
                        out_file.write(in_file.read())
                except Exception as e:
                    print(f"Could not read file {file_path}: {e}")

# Вкажіть шлях до вашого проекту та ім'я вихідного файлу
project_directory = 'D:\Andrii\Desktop\my-lviv-site\src'
output_file = 'consolidated_code.txt'

extract_code(project_directory, output_file)
