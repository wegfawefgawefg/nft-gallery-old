import React from 'react';

// import logo from './logo.svg';
// import './App.css';

// import UrMom from './modules/UrMom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  const [visible, setVisible] = React.useState(false);
  const [date, setDate] = React.useState(new Date());

  // const handleDateSelect = (newDate) => {
  //   setDate(newDate);
  //   setVisible(false);
  // };

  const togglePicker = () => setVisible((v) => !v);

  return (
    <div className="DatePicker">
      <button
        onClick={togglePicker}
        type="button"
      >
        Choose Date
      </button>
      <p className="inline">{date.toDateString()}</p>
      {visible ? (
        // <DatePicker
        //   selected={date}
        //   onChange={handleDateSelect}
        //   minDate={new Date(2021, 10, 16)}
        // />
        <DatePicker 
          selected={date} 
          onChange={(date) => setDate(date)} 
        />
      ) : null}
    </div>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //   </header>
    // </div>
  );
}

export default App;
