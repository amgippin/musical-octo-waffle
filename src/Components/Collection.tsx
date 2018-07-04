import * as React from 'react';
import { getCollection, getSpecial } from '../Services/Collection';
import Group from './collection/Group';

export default class Collection extends React.Component {

  public render() {
    
    return (
      <table>
        <tbody>
          <tr>
            <th/>
            <th>#</th>
            <th>Name</th>
            <th>Nickname</th>
            <th>Ratting</th>
            <th>Stardust</th>
            <th>Form</th>
            <th>Sex</th>
            <th>Stardust</th>
            <th>Candy</th>
            <th>Evolve</th>
            <th>Have</th>
            <th>Need</th>
            <th>Evolve</th>
          </tr>
          { this.populateTable() }
        </tbody>
      </table>
    );
  }

  private populateTable() {
    const collection = getCollection();
    const table = [];
    const special = getSpecial();

    // for (let i = 189; i < collection.length; i++) {
    for (const i of collection) {
      // table.push(<Group key={collection[i].id} pokemonGroup={collection[i]} special={special}/>);
      table.push(<Group key={i.id} pokemonGroup={i} special={special}/>);
    }

    return table;
  }
}
