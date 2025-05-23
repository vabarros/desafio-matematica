// Configuração do Supabase
const supabaseUrl = "https://wpvntetbcdbgufxtjatj.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indwdm50ZXRiY2RiZ3VmeHRqYXRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5NDYxMDMsImV4cCI6MjA2MzUyMjEwM30.7Zv286K4d4J5_mQ9MYRt-TeY7MukMpNYvFHG-tv3jA4";
const supabaseCli = supabase.createClient(supabaseUrl, supabaseKey);

// Carrega os dados do ranking
async function carregarRanking() {
  const tbody = document.getElementById('ranking-body');
  tbody.innerHTML = '<tr><td colspan="3">Carregando...</td></tr>';

  try {
    const { data, error } = await supabase
      .from('pontuacao')
      .select('nome, pontos')
      .order('pontos', { ascending: false })
      .limit(10);

    if (error) throw error;

    tbody.innerHTML = '';

    if (data.length === 0) {
      tbody.innerHTML = '<tr><td colspan="3">Nenhuma pontuação registrada ainda.</td></tr>';
      return;
    }

    data.forEach((jogador, i) => {
      const row = `<tr>
        <td>${i + 1}º</td>
        <td>${jogador.nome}</td>
        <td>${jogador.pontos}</td>
      </tr>`;
      tbody.innerHTML += row;
    });
  } catch (err) {
    console.error(err);
    tbody.innerHTML = '<tr><td colspan="3">Erro ao carregar ranking.</td></tr>';
  }
}

// Inicia o carregamento após o DOM estar pronto
window.onload = carregarRanking;
