import React from 'react';
import DatePicker from 'sassy-datepicker';
import './App.css';

export default function App() {
  const [visible, setVisible] = React.useState(false);
  const [date, setDate] = React.useState(new Date());
  const [dest, setDest] = React.useState('');
  const [src, setSrc] = React.useState('');

  const handleDestChange = (e) => {
    setDest(e.target.value.toUpperCase());
  };

  const handleSrcChange = (e) => {
    setSrc(e.target.value.toUpperCase());
  };

  const handleDateSelect = (newDate) => {
    setDate(newDate);
    setVisible(false);
  };

  const togglePicker = () => setVisible((v) => !v);

  const handleSubmit = (e) => {
    e.preventDefault();
    // make a network request to fetch data
    alert('API not yet integrated to fetch real data');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold w-9/12 mx-auto">Find Flights ✈️</h1>
      <form className="mt-8 w-9/12 mx-auto space-y-2" onSubmit={handleSubmit}>
        <h3 className="font-bold text-lg">Select date of Departure</h3>
        <div className="flex justify-between">
          <label className="font-bold mr-2">From</label>
          <input
            type="text"
            placeholder="From where?"
            value={src}
            onChange={handleSrcChange}
            className="border rounded shadow p-1 outline-none focus:ring"
          />
        </div>
        <div className="flex justify-between">
          <label className="font-bold mr-2">To</label>
          <input
            type="text"
            placeholder="To where?"
            value={dest}
            onChange={handleDestChange}
            className="border rounded shadow p-1 outline-none focus:ring"
          />
        </div>
        <div>
          <label className="font-bold mr-2">Date of Departure</label>
          <div className="relative mt-2">
            <button
              className="px-2 py-1 bg-indigo-400 text-sm rounded-lg border-none text-white mr-2 outline-none focus:ring ring-indigo-100"
              onClick={togglePicker}
              type="button"
            >
              Choose Date
            </button>
            <p className="inline">{date.toDateString()}</p>
            {visible ? (
              <DatePicker
                selected={date}
                onChange={handleDateSelect}
                minDate={new Date(2021, 10, 16)}
                maxDate={new Date(2022, 10, 16)}
                className="absolute mt-2"
              />
            ) : null}
          </div>
        </div>
        <hr />
        <button
          className="px-6 py-1.5 bg-green-400 rounded-lg border-none text-white outline-none focus:ring ring-green-100"
          type="submit"
        >
          Find flights
        </button>
      </form>
    </div>
  );
}
