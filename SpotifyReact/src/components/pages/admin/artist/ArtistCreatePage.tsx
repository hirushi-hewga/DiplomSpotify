import PageTitle from "components/ui/PageTitle";
import ArtistCreateForm from "components/form/artist/ArtistCreateForm";

const ArtistCreatePage = () => {

    return (
      <div className="flex flex-col gap-4">
        <PageTitle title="Add artist" description="Create new artist" />
        <ArtistCreateForm />
      </div>
    );
};

export default ArtistCreatePage;
