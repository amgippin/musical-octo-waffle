import Pokemon from '../Models/Pokemon';
import Stardust from '../Models/Stardust';
import { getPokemonById } from './Pokedex'; 

interface IStats {
  level: number;
  attackIV: number;
  defenseIV: number;
  staminaIV: number;
}

interface IMaxOut {
  totalCandy: number;
  totalStardust: number;
}

export function calcMaxOutInfo(curStardust: number): IMaxOut {
  const levels: Stardust[] = getAllLevels();
  let totalStardust = 0;
  let totalCandy = 0;
  const maxIndex = 16; // TODO let this be a user selection

  for (let i = 0; i < levels.length; i++) {
    if (levels[i].stardust >= curStardust && i <maxIndex) {
      totalStardust += levels[i].stardust * levels[i].levels.length;
      totalCandy += levels[i].candy * levels[i].levels.length;
    }
  }
  
  return {totalStardust, totalCandy};
}

export function getAllLevels(): Stardust[] {
  return require('./dataCalculator/stardust.json');
}

export function getScalarByLevel(level: number) {
  const scalar = require('./dataCalculator/cpScalar.json');
  level = (level*2)-2; // Correct for placement

  return scalar[level];
}

export function dragon(pkmId: number, levels: number[], hp: number, cp: number) {
  const stats: IStats[] = []
    levels.map((lvl) => {
    const staminaIV = calcStaminaIV(pkmId, lvl, hp);
    
    for (const i of staminaIV) {
      stats.concat(calcRemainingIV(pkmId, lvl, cp, i));
    }
  })

  /* tslint:disable */
  console.log(stats);
  /* tslint:enable */
}

function calcStaminaIV(pkmId: number, lvl: number, hp: number) {
  const scalar = getScalarByLevel(lvl).scalar;
  const pokemon: Pokemon = getPokemonById(pkmId);

  const bStamina = pokemon.bStamina;
  const results: number[] = [];

  for (let staminaIV = 15; staminaIV >= 0; staminaIV--) {
    const calcHP = (bStamina + staminaIV) * scalar;
    
    // if (Math.round(calcHP) === hp) {
    if (Math.floor(calcHP) === hp || Math.ceil(calcHP) === hp) {
      console.log(staminaIV);
      results.push(staminaIV);
    }
  }

  return results;
}

function calcRemainingIV(pkmId: number, lvl: number, cp: number, staminaIV: number): IStats[] {
  const scalar = getScalarByLevel(lvl).scalar;
  const pokemon: Pokemon = getPokemonById(pkmId);

  const stats = [];
  
  for(let attackIV = 15; attackIV >= 0; attackIV--) {
    for(let defenseIV = 15; defenseIV >= 0; defenseIV--) {
      const calcCP = (pokemon.bAttack + attackIV) * 
        Math.pow((pokemon.bDefense + defenseIV), 0.5) * 
        Math.pow((pokemon.bStamina + staminaIV), 0.5) * 
        Math.pow((scalar), 2) / 10;

      
      if (calcCP > cp && calcCP < cp + 1) {  
      // if (Math.round(calcCP) === cp || Math.ceil(calcCP) === cp) {
      // if (calcCP > cp && Math.round(calcCP) === cp) { 
        stats.push({'level': lvl, 'attackIV': attackIV, 'defenseIV': defenseIV, 'staminaIV': staminaIV});
        /* tslint:disable */
        console.log( 'lvl: ' + lvl + '\tattackIV: ' + attackIV + '\tdefenseIV: ' + defenseIV + '\tstaminaIV: ' + staminaIV +'\tcp: ' + calcCP)
        /* tslint:enable */
      }
    }
  }

  return stats;
}