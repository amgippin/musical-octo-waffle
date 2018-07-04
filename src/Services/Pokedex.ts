import Pokemon from '../Models/Pokemon';

export function getPokemonByGen(gen: number): Pokemon[] {
  switch (gen) {
    case 1: return require('./dataPokedex/gen1.json');
    case 2: return require('./dataPokedex/gen2.json');
    case 3: return require('./dataPokedex/gen3.json');
    default: return [];
  }
}

export function getPokemonNameById(id: number): string {
  const pokeDex = getPokeDex();

  for(const mon of pokeDex) {
    if (mon.id === id) {
      return mon.name;
    }
  }

  return '';
}

export function getPokemonById(id: number) {
  const pokeDex = getPokeDex();

  for(const mon of pokeDex) {
    if (mon.id === id) {
      return mon;
    }
  }

  return pokeDex[0];
}

// TODO: make this more efficent
function getPokeDex(): Pokemon[] {
  const gen1: Pokemon[] = require('./dataPokedex/gen1.json');
  const gen2: Pokemon[] = require('./dataPokedex/gen2.json');
  const gen3: Pokemon[] = require('./dataPokedex/gen3.json');

  return gen1.concat(gen2).concat(gen3);
}
