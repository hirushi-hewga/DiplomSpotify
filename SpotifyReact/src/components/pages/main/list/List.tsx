import ListHeader from "./ListHeader";
import ListLine from "./ListLine";
import { ITrack } from "interfaces/track";

interface IListProps {
  tracks: ITrack[]
}

const List: React.FC<IListProps> = ({ tracks }) => {
  
  return (
    <div className="w-full">
      <ListHeader col1="Title" col2="You have listened to" col3="Album" col4="Date added" col5="Time"/>
      {tracks ? tracks.map((item) => (
          <div key={item.id} className="">
            <ListLine track={item}/>
          </div>
        )) : null
      }
    </div>
  );
}

export default List;