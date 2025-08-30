import * as bcrypt from 'bcrypt';

/**
 * Gera um hash seguro para uma senha
 * @param password senha em texto puro
 * @param saltRounds número de salt rounds (opcional, default 10)
 * @returns hash da senha
 */
export async function HashPassword(password: string, saltRounds = 10): Promise<string> {
  const salt = await bcrypt.genSalt(saltRounds);
  return bcrypt.hash(password, salt);
}

/**
 * Compara uma senha em texto puro com um hash
 * @param password senha em texto puro
 * @param hash hash armazenado no banco
 * @returns true se a senha corresponder ao hash
 */
export async function ComparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}