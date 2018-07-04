import * as React from 'react';
import Pokemon from '../Models/Pokemon';
import { getPokemonByGen, getPokemonNameById } from '../Services/Pokedex';

export default class PokemonList extends React.Component {
  public render() {
    const gen1: Pokemon[] = getPokemonByGen(1);
    this.renderType(gen1[0].type);
    this.renderPrevious(gen1[0].previous!)
    this.renderEvolution(gen1[0].evolution!)

    return (
      <table>
        {gen1.map((monster, index) => {
          return (
            <tr key={index}>
              <th>{monster.id}</th>
              <th>{monster.name}</th>
              <th>{this.renderType(gen1[0].type)}</th>
              <th>{this.renderPrevious(gen1[0].previous!)}</th>
              <th>{this.renderEvolution(gen1[0].evolution!)}</th>
            </tr>
          )
        })}
      </table>
    );
  }

  private renderEvolution(evolution: number[]) {
    if (evolution) {
      return (
        <table>
          <tr>
            <th>{getPokemonNameById(evolution[0])}</th>
            <th>{getPokemonNameById(evolution[1])}</th>
          </tr>
        </table>
      );
    }
    else {
      return null;
    }
  }

  private renderPrevious(previous: number[]) {
    if (previous) {
      return (
        <table>
          <tr>
            <th>{getPokemonNameById(previous[0])}</th>
            <th>{getPokemonNameById(previous[1])}</th>
          </tr>
        </table>
      );
    }
    else {
      return null;
    }
  }

  private renderType(type: string[]) {
    return (
      <table>
        <tr>
          <th>{type[0]}</th>
          <th>{type[1]}</th>
        </tr>
      </table>
    );
  }
}
