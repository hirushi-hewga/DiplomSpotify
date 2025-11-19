import { IconCirclePlus } from "@tabler/icons-react";
import ArtistsList from "components/admin/artist/ArtistsList";
import { Button } from "components/ui/Button";
import PageTitle from "components/ui/PageTitle";
import { Link } from "react-router-dom";
import { useGetArtistsQuery } from "services/artist";

const ArtistPage = () => {
    //const { data: artists } = useGetArtistsQuery();

    return (
        <div className="flex flex-col gap-4">
            <PageTitle title="Artist list" description="Select to edit" />
            <div className="flex justify-end">
                <Link to="/admin/artists/create">
                    <Button variant="default" size="auto">
                        <IconCirclePlus />
                        ADD NEW
                    </Button>
                </Link>
            </div>

            <ArtistsList artists={[]} />
        </div>
    );
};

export default ArtistPage;
