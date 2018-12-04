// import "./theremin.css";
// import React, {
//   useState,
//   useEffect,
//   useMemo
// } from "react";
// import createOscillator from "./createOscillator";

// function App() {
//   let oscillator = useMemo(() => createOscillator());

//   let play = () => {
//     oscillator.play();
//   };

//   let stop = () => {
//     oscillator.stop();
//   };

//   let changeTone = event => {
//     const { clientX, clientY } = event;
//     const {
//       top,
//       right,
//       bottom,
//       left
//     } = event.target.getBoundingClientRect();
//     const pitch = (clientX - left) / (right - left);
//     const volume = 1 - (clientY - top) / (bottom - top);
//     oscillator.setPitchBend(pitch);
//     oscillator.setVolume(volume);
//   };

//   return (
//     <div className="App">
//       <div
//         className="theremin"
//         onMouseEnter={play}
//         onMouseLeave={stop}
//         onMouseMove={changeTone}
//       />
//       <div className="label pitch">◀︎ Pitch ▶︎</div>
//       <div className="label volume">◀︎ Volume ▶︎</div>
//     </div>
//   );
// }

// export default App;

import "./theremin.css";
import React, {
  useState,
  useEffect,
  useMemo
} from "react";
import createOscillator from "./createOscillator";

function useTone({ isPlaying, pitch, volume }) {
  let oscillator = useMemo(() => createOscillator(), []);

  useEffect(() => {
    if (isPlaying) {
      oscillator.play();
    } else {
      oscillator.stop();
    }
    oscillator.setPitchBend(pitch);
    oscillator.setVolume(volume);
  });
}

function App() {
  let [isPlaying, setIsPlaying] = useState(false);
  let [pitch, setPitch] = useState(true);
  let [volume, setVolume] = useState(true);

  useTone({ isPlaying, pitch, volume });

  let play = () => setIsPlaying(true);

  let stop = () => setIsPlaying(false);

  let changeTone = event => {
    const { clientX, clientY } = event;
    const {
      top,
      right,
      bottom,
      left
    } = event.target.getBoundingClientRect();
    const pitch = (clientX - left) / (right - left);
    const volume = 1 - (clientY - top) / (bottom - top);
    setPitch(pitch);
    setVolume(volume);
  };

  return (
    <div className="App">
      <div
        className="theremin"
        onMouseEnter={play}
        onMouseLeave={stop}
        onMouseMove={changeTone}
      />
      <div className="label pitch">◀︎ Pitch ▶︎</div>
      <div className="label volume">◀︎ Volume ▶︎</div>
    </div>
  );
}

export default App;
