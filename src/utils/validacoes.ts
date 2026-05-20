/**
 * Aplica máscara de celular: (XX) XXXXX-XXXX
 * Aceita 11 dígitos (DDD + 9 dígitos)
 */
export function mascaraTelefone(valor: string): string {
  const digits = valor.replace(/\D/g, '').slice(0, 11);
  if (digits.length === 0) return '';
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

/**
 * Valida se o telefone está no formato (XX) XXXXX-XXXX
 */
export function validarTelefone(telefone: string): boolean {
  return /^\(\d{2}\) \d{5}-\d{4}$/.test(telefone);
}

/**
 * Valida se o e-mail tem formato válido
 */
export function validarEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/**
 * Aplica máscara de preço: apenas dígitos e vírgula (ex: 52,90)
 * Limita a 2 casas decimais após a vírgula
 */
export function mascaraPreco(valor: string): string {
  const semEspeciais = valor.replace(/[^\d,]/g, '');
  const virgula = semEspeciais.indexOf(',');
  if (virgula === -1) return semEspeciais;
  const inteiro = semEspeciais.slice(0, virgula);
  const decimal = semEspeciais.slice(virgula + 1).replace(/,/g, '').slice(0, 2);
  return `${inteiro},${decimal}`;
}
