import { IArtist } from "interfaces/artist";
import { Button } from "components/ui/Button";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useDeleteArtistMutation } from "services/artist";
import { API_URL } from "utils/envData";

interface ArtistsListVm {
  artists: IArtist[] | undefined;
}

const ArtistsList: React.FC<ArtistsListVm> = (props) => {
  const navigate = useNavigate();
  const imageSrc = API_URL + "/Images/200_";

  const { artists } = props;
  const [deleteArtist] = useDeleteArtistMutation();

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm font-bold text-left text-black">
            <thead className="text-xs text-black uppercase bg-gray-200">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        #
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Image
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Назва
                    </th>
                </tr>
            </thead>
            <tbody>
                {artists?.map((artist, index) => (
                    <tr key={artist.id} className="bg-white border-b hover:bg-gray-50 ">
                        <td className="px-6 py-4">{++index}</td>
                        <td className="px-6 py-4">
                            <img src={imageSrc + artist.image}/>
                        </td>
                        <td className="px-6 py-4">{artist.name}</td>
                        <td className="px-6 py-4 text-right space-x-5">
                            <Button
                                onClick={() => navigate(`/admin/artists/edit/${artist.id}`)}
                                variant="icon"
                                size="iconmd"
                            >
                                <IconEdit className="text-blue-700" />
                            </Button>
                            <Button onClick={() => deleteArtist(artist.id)} variant="icon" size="iconmd">
                                <IconTrash className="text-red-500" />
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
}

export default ArtistsList;