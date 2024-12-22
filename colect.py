import os

def extract_javascript_code(js_directory, output_file):
    """
    Extrai todo código JavaScript encontrado em um diretório e seus subdiretórios,
    salvando em um arquivo txt com o caminho de cada arquivo.
    
    Args:
        js_directory (str): Caminho do diretório a ser pesquisado
        output_file (str): Nome do arquivo de saída
    """
    # Verifica se o diretório existe
    if not os.path.exists(js_directory):
        print(f"Erro: O diretório {js_directory} não existe!")
        return False

    # Lista para armazenar os arquivos JavaScript encontrados
    js_files = []

    # Percorre o diretório e subdiretórios
    for root, dirs, files in os.walk(js_directory):
        for file in files:
            # Verifica se é um arquivo JavaScript
            if file.endswith('.jsx') or file.endswith(".js"):
                js_files.append(os.path.join(root, file))

    # Se não encontrou arquivos JavaScript
    if not js_files:
        print(f"Nenhum arquivo JavaScript encontrado em: {js_directory}")
        return False
    
    # Cria ou sobrescreve o arquivo de saída
    with open(output_file, 'w', encoding='utf-8') as output:
        output.write("ARQUIVOS JAVASCRIPT\n")
        output.write("="*80 + "\n")
        output.write(f"Diretório base: {js_directory}\n")
        output.write("="*40 + "\n\n")
        
        for js_file in js_files:
            try:
                with open(js_file, 'r', encoding='utf-8') as f:
                    # Escreve o caminho do arquivo
                    output.write(f"{'='*80}\n")
                    output.write(f"Arquivo: {js_file}\n")
                    output.write(f"{'='*80}\n\n")
                    
                    # Copia o código
                    content = f.read()
                    output.write(content)
                    output.write("\n\n")
                    
                print(f"Código JavaScript extraído com sucesso: {js_file}")
                    
            except Exception as e:
                print(f"Erro ao ler o arquivo {js_file}: {str(e)}")
    
    return True

def extract_prisma_schema(prisma_directory, output_file, append_mode=True):
    """
    Procura e extrai o schema.prisma do diretório especificado e seus subdiretórios.
    
    Args:
        prisma_directory (str): Caminho do diretório base para procurar schemas
        output_file (str): Nome do arquivo de saída
        append_mode (bool): Se True, adiciona ao arquivo existente. Se False, cria novo arquivo
    """
    if not os.path.exists(prisma_directory):
        print(f"Erro: O diretório {prisma_directory} não existe!")
        return False

    prisma_files = []
    
    # Procura por arquivos schema.prisma
    for root, dirs, files in os.walk(prisma_directory):
        for file in files:
            if file == "schema.prisma":
                prisma_files.append(os.path.join(root, file))

    if not prisma_files:
        print(f"Nenhum arquivo schema.prisma encontrado em: {prisma_directory}")
        return False

    # Abre o arquivo no modo apropriado
    mode = 'a' if append_mode else 'w'
    with open(output_file, mode, encoding='utf-8') as output:
        output.write("\n\nSCHEMAS PRISMA\n")
        output.write("="*80 + "\n")
        output.write(f"Diretório base: {prisma_directory}\n")
        output.write("="*80 + "\n\n")
        
        for prisma_file in prisma_files:
            try:
                with open(prisma_file, 'r', encoding='utf-8') as f:
                    # Escreve o caminho do arquivo
                    output.write(f"{'='*80}\n")
                    output.write(f"Arquivo: {prisma_file}\n")
                    output.write(f"{'='*80}\n\n")
                    
                    # Copia o schema
                    content = f.read()
                    output.write(content)
                    output.write("\n\n")
                    
                print(f"Schema Prisma extraído com sucesso: {prisma_file}")
                    
            except Exception as e:
                print(f"Erro ao ler o arquivo {prisma_file}: {str(e)}")
    
    return True

def extract_all_code(js_directory, prisma_directory, output_file):
    """
    Executa a extração completa dos códigos JavaScript e schemas Prisma
    de diretórios diferentes.
    
    Args:
        js_directory (str): Caminho do diretório base para arquivos JavaScript
        prisma_directory (str): Caminho do diretório base para schemas Prisma
        output_file (str): Nome do arquivo de saída
    """
    print("\nIniciando extração de códigos...")
    print(f"Diretório JavaScript: {js_directory}")
    print(f"Diretório Prisma: {prisma_directory}")
    print(f"Arquivo de saída: {output_file}\n")
    
    # Contador para arquivos processados
    success_count = 0
    
    # Extrai códigos JavaScript
    if extract_javascript_code(js_directory, output_file):
        success_count += 1
    
    # Extrai schemas Prisma
    if extract_prisma_schema(prisma_directory, output_file):
        success_count += 1
    
    # Relatório final
    print("\n" + "="*50)
    print("Relatório de Extração:")
    print("="*50)
    if success_count == 0:
        print("Nenhum arquivo foi encontrado e extraído!")
    elif success_count == 1:
        print("Apenas um tipo de arquivo foi encontrado e extraído.")
    else:
        print("Ambos os tipos de arquivo foram encontrados e extraídos.")
    print(f"Arquivo de saída: {output_file}")
    print("="*50)

# Exemplo de uso
if __name__ == "__main__":
    # Configuração dos diretórios
    js_directory = "./src"     # Diretório base para arquivos JavaScript
    prisma_directory = "./prisma"     # Diretório base para schemas Prisma
    output_file = "codigos_extraidos.txt"       # Arquivo de saída
    
    # Executa a extração completa
    extract_all_code(js_directory, prisma_directory, output_file)