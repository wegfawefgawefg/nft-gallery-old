import DatePicker from 'sassy-datepicker';

function pick_date() {
  const onChange = (date) => {
    console.log(date.toString());
  };

  return (
    <DatePicker onChange={onChange} />
  );
}