
// return a <p> with the word potato in it. 
//  use a loop to create a bunch of <p> tags.
//  the number of potatos is based on time

function UrMom() {
  const potatos = [];
  let num_potatos = Math.sin(Date.now() / 1000) * 10 + 15;
  for (let i = 0; i < num_potatos; i++) {
    potatos.push(<p>potato</p>);
  }
  return (
    potatos
  )
}

export default UrMom;
