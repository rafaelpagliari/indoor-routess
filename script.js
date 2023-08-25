document.addEventListener('DOMContentLoaded', () => {
  const origemSelect = document.getElementById('origem');
  const destinoSelect = document.getElementById('destino');
  const instructionsDiv = document.getElementById('instructions');

  const updateInstructions = async () => {
    const origemId = origemSelect.value;
    const destinoId = destinoSelect.value;

    try {
      const response = await fetch(`/getInstructions?origem=${origemId}&destino=${destinoId}`);
      const instructions = await response.json();

      // Limpar as instruções anteriores
      instructionsDiv.innerHTML = '';

      // Adicionar as novas instruções
      instructions.forEach(instruction => {
        const instructionItem = document.createElement('li');
        instructionItem.textContent = instruction.instrucao;
        instructionsDiv.appendChild(instructionItem);
      });
    } catch (error) {
      console.error('Erro ao buscar instruções:', error);
    }
  };

  origemSelect.addEventListener('change', updateInstructions);
  destinoSelect.addEventListener('change', updateInstructions);
});

