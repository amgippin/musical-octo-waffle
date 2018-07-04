import * as React from 'react';
import Stardust from '../Models/Stardust';
import { dragon, getAllLevels } from '../Services/Calculator';

interface IState {
  stardustIndex: number;
}

const levels: Stardust[] = getAllLevels();

export default class View extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = { stardustIndex: 9 };

    this.handleChange = this.handleChange.bind(this);
  }

  public componentDidMount() {
    this.populateLevelInfo(this.state.stardustIndex);
  }

  public componentDidUpdate(nextProps: any, nextState: IState) {
    this.populateLevelInfo(this.state.stardustIndex);
  }

  public render() {
    return (
      <div>
        <select value={this.state.stardustIndex} onChange={this.handleChange}>
          {levels.map((level, index) => {
            return (
              <option key={index} value={index}>{level.stardust}</option>
            );
          })}
        </select>
      </div>
    )
  }

  private handleChange(event: any) {
    this.setState({ stardustIndex: event.target.value });
  }

  private populateLevelInfo(stardustIndex: number) {
    dragon(149, levels[stardustIndex].levels, 145, 3121) // lvl 31
    // dragon(53, levels[stardustIndex].levels, 106, 1333) // lvl 31
    dragon(55, levels[stardustIndex].levels, 128, 1963) // lvl 31
  }
}
