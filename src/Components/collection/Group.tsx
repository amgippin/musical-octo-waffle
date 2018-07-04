import * as React from 'react';
import { calcMaxOutInfo } from '../../Services/Calculator';
import { getPokemonNameById } from '../../Services/Pokedex';

// TODO: Clean up
interface IProps {
  pokemonGroup: any;
  special: any;
}

interface IState {
  hidden: boolean;
}

export default class Group extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = { hidden: true };

    this.populateTable = this.populateTable.bind(this);
    this.onHiddenToggle = this.onHiddenToggle.bind(this);
    this.styleRow = this.styleRow.bind(this);
  }

  public render() {
    return this.populateTable()
  }

  private populateTable() {
    let totalCandyToMax = 0;
    let totalEvolve = 0;

    const table = [];
    const tableRows = [];

    if(this.props.pokemonGroup.special) {
      const result = this.generateSpecialRow(this.props.pokemonGroup, this.props.special);

      tableRows.push(result.row);

      totalCandyToMax += result.candy;
      totalEvolve += result.evolve;
    } else {
      for(let j = 0; j <this.props.pokemonGroup.pokemon.length; j++) {
        const result = this.generateNormalRow(this.props.pokemonGroup.pokemon[j], j);
        
        tableRows.push(result.row);

        totalCandyToMax += result.candy;
        totalEvolve += result.evolve;
      }
    }

    table.push (
      <tr style={this.styleRow()} key={this.props.pokemonGroup.id + 'math'}>
        <td onClick={this.onHiddenToggle}>{this.state.hidden ? '+' : '-'}</td>
        <td>{this.props.pokemonGroup.id}</td>
        <td>{this.props.pokemonGroup.special ? getPokemonNameById(this.props.pokemonGroup.id) + ' - Math' : getPokemonNameById(this.props.pokemonGroup.id)}</td>
        <td colSpan={6}/>
        <td>{totalCandyToMax}</td>
        <td>{totalEvolve}</td>
        <td>{this.props.pokemonGroup.candy}</td>
        <td>{totalCandyToMax + totalEvolve > this.props.pokemonGroup.candy ? totalCandyToMax + totalEvolve - this.props.pokemonGroup.candy : 0}</td>
        <td>{totalCandyToMax + totalEvolve - this.props.pokemonGroup.candy ? 0 : (totalCandyToMax + totalEvolve - this.props.pokemonGroup.candy)/this.props.pokemonGroup.evolveCost }</td>
      </tr>
    )
    table.push(tableRows);

    return table;
  }

  private calcMaxOut(current: number) {
    return calcMaxOutInfo(current);
  }

  private generateNormalRow(mon: any, index: number) {
    const maxOut = this.calcMaxOut(mon.stardust)

    return {
      candy: maxOut.totalCandy, 
      evolve: mon.evolved ? 0 : this.props.pokemonGroup.evolveCost,
      row: (
        <tr key={index} hidden={this.state.hidden}>
          <td colSpan={3}/>
          <td>{mon.nickname ? mon.nickname : ''}</td>
          <td>{mon.rating}</td>
          <td>{mon.stardust}</td>
          <td>{mon.form}</td>
          <td>{mon.sex}</td>
          <td>{maxOut.totalStardust}</td>
          <td>{maxOut.totalCandy}</td>
          <td>{mon.evolved ? 0 : this.props.pokemonGroup.evolveCost}</td>
        </tr>
      )};
  }

  private generateSpecialRow(mon: any, specialList: any) {
    for (const row of specialList) {
      if (row.id === mon.id) {
        let maxOutTotal = 0;
        let evolveTotal = 0;

        const result: any[] = [];

        for(const i of row.rows) {      
          console.log(i);
          for (let j = 0; j <i.pokemon.length; j++) {
            const maxOut = this.calcMaxOut(i.pokemon[j].stardust)
            maxOutTotal += maxOut.totalCandy;
            evolveTotal += i.pokemon[j].evolved ? 0 : this.props.pokemonGroup.evolveCost


            result.push(
              <tr key={i.id + '+' + j} hidden={this.state.hidden}>
                <td/>
                <td>{i.id}</td>
                <td>{getPokemonNameById(i.id)}</td>
                <td>{i.pokemon[j].nickname}</td>
                <td>{i.pokemon[j].rating}</td>
                <td>{i.pokemon[j].stardust}</td>
                <td>{i.pokemon[j].form}</td>
                <td>{i.pokemon[j].sex}</td>
                <td>{maxOut.totalStardust}</td>
                <td>{maxOut.totalCandy}</td>
                <td>{i.pokemon[j].evolved ? 0 : this.props.pokemonGroup.evolveCost}</td>
              </tr>
            );
          }
        }
        
        return {
          candy: maxOutTotal, 
          evolve: evolveTotal,
          row: result
        };
      }
    }

    return {candy: 0, evolve: 0, row: null};
  }

  private onHiddenToggle() {
    const temp = !this.state.hidden;
    this.setState({hidden: temp});
  }

  private styleRow() {
    if (this.props.pokemonGroup.check) {
      return {color: 'red'}
    }
    return {};
  }
}
