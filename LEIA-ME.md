# Convite: Claudete 50 anos 🌻

Site: https://gabrielsrd.github.io/convite-claudete-50/

## Ligar as confirmações à planilha (uma vez só)

1. Crie uma planilha nova no Google Sheets (ex.: "Convidados Claudete 50").
2. Menu **Extensões → Apps Script**.
3. Apague o que estiver no editor, cole o conteúdo de `apps-script/Code.gs` e salve.
4. **Implantar → Nova implantação** → engrenagem → **App da Web**.
   - Executar como: **Eu**
   - Quem pode acessar: **Qualquer pessoa**
5. Clique em **Implantar**, autorize com sua conta Google
   (se aparecer "app não verificado": Avançado → Acessar).
6. Copie a **URL do app da Web** (termina em `/exec`) e coloque em
   `RSVP_ENDPOINT` no `index.html`.

As confirmações aparecem na aba **Confirmações** da planilha.
Total de pessoas confirmadas: `=SOMA(Confirmações!D:D)`.

Se alterar o `Code.gs` depois: Implantar → Gerenciar implantações → editar →
Versão: **Nova versão** (assim a URL continua a mesma).
