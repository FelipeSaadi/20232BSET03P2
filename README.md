# 20232BSET03P2
Inteli - Engenharia de Software | Avaliação 2023-2B P2

## Tratativas
Foram identificados erros nos IDs das tabelas, foi implementado o autoincrimento de ID.

Não era verificado o conteudo das requisições recebidas, agora temos uma verificação do tipo do dado recebido e de tamanho, para garantir que não seja colocado algo que não seja o nome de um animal.

Era possível criar diversos animais com o mesmo nome, foi implementado uma segurança de réplicas, garantindo que apenas haja uma versão do dado no sistema.