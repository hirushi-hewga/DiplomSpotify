import TableHeader from "./TableHeader";
import TableLine from "./TableLine";

const Table = () => {

  return (
    <div className="w-[660px]">
      <TableHeader name="You will get" col1="Without premium MUSICFLOW" col2="With premium MUSICFLOW"/>
      {data.map((item, index) => (
        <TableLine 
          key={index} 
          name={item.name} 
          img1={item.icon1} 
          img2={item.icon2} 
        />
      ))}
    </div>
  );
}

export default Table;

const data = [
  {
    name: "Setting up an interface theme",
    icon1: "no.png",
    icon2: "yes.png"
  },
  {
    name: "Download songs",
    icon1: "no.png",
    icon2: "yes.png"
  },
  {
    name: "Listen with friends in real time",
    icon1: "no.png",
    icon2: "yes.png"
  },
  {
    name: "Manage the listening queue",
    icon1: "no.png",
    icon2: "yes.png"
  },
  {
    name: "Personalisation of the homepage",
    icon1: "no.png",
    icon2: "yes.png"
  },
  {
    name: "Interactive playlists",
    icon1: "no.png",
    icon2: "yes.png"
  }
]