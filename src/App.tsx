import { useEffect, useReducer, type Dispatch } from 'react';
import { inProgress, loadState, reducer, saveState, type Action } from './game';
import type { State } from './types';
import Backdrop from './components/Backdrop';
import Mascot from './components/Mascot';
import Home from './screens/Home';
import TeamSetup from './screens/TeamSetup';
import PickThemes from './screens/PickThemes';
import Board from './screens/Board';
import Card from './screens/Card';
import End from './screens/End';

export interface ScreenProps {
  state: State;
  dispatch: Dispatch<Action>;
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, undefined, loadState);

  // Every change is persisted, so a refresh or closed tab resumes the match.
  useEffect(() => saveState(state), [state]);

  const props: ScreenProps = { state, dispatch };

  return (
    <div className="app">
      <Backdrop />
      <header className="topbar">
        <button className="brand" onClick={() => dispatch({ type: 'go', screen: 'home' })}>
          <Mascot size={36} /> Khamse bi 3younak
        </button>
        {inProgress(state) && state.screen !== 'board' && (
          <button className="btn ghost small" onClick={() => dispatch({ type: 'go', screen: 'board' })}>
            Back to match
          </button>
        )}
      </header>

      <main>
        {state.screen === 'home' && <Home {...props} />}
        {state.screen === 'teams' && <TeamSetup {...props} />}
        {state.screen === 'pick' && <PickThemes {...props} />}
        {state.screen === 'board' && state.board && <Board {...props} />}
        {state.screen === 'board' && !state.board && <Home {...props} />}
        {state.screen === 'end' && <End {...props} />}
      </main>

      {state.screen === 'board' && state.board && state.cur && <Card {...props} />}
    </div>
  );
}
