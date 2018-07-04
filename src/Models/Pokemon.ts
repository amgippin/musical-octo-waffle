export default interface IPokemon {
  // Base stat
  id: number;
  name: string;
  type: string[];

  // Evolution
  evolution?: number[];
  previous?: number[];

  // Stat
  bStamina: number;
  bAttack: number;
  bDefense: number;
}