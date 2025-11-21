import { useState } from "react";
import { ArtistCreateSchema, ArtistCreateSchemaType } from "interfaces/zod/artist";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCreateArtistMutation } from "services/artist";
import { Button } from "components/ui/Button";
import { Input } from "components/ui/Input";
import Label from "components/ui/Label";
import Attention from "components/ui/Attention";
import FileInput from "components/ui/FileInput";
import { IconLoader2 } from "@tabler/icons-react";
import { toastOptions } from "components/constants/toastOptions.ts";
import { toast } from "react-toastify";

const ArtistCreateForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ArtistCreateSchemaType>({ resolver: zodResolver(ArtistCreateSchema) });

  const navigate = useNavigate();

  const [image, setImage] = useState<string | undefined>(undefined);

  const [ createArtist, { isLoading: createArtistIsLoading }] = useCreateArtistMutation();

  const onSubmit = async (data: ArtistCreateSchemaType) => {
    try {
      console.log("data " + data);
      await createArtist(data).unwrap();
      navigate("/admin/artists/list");
      toast.success("Artist created successful", toastOptions);
    } catch (error) {
      toast.error("Error atrist created", toastOptions);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4 border-2 border-[#dbdce0] p-8">
        <div>
            <Label htmlFor="name">Name*</Label>
            <Input
                className={`${errors.name} ? "focus:border-red-500" : ""`}
                placeholder="John Clark"
                type="text"
                id="name"
                {...register("name")}
            />
            {errors.name && <Attention>{errors.name.message}</Attention>}
        </div>
        <div>
          <Label>Image*</Label>
            <FileInput
                previewImage={image}
                setPreviewImage={setImage}
                {...register("image")}
            />
            {errors.image && <Attention>{String(errors.image.message)}</Attention>}
        </div>
        <div className="flex items-center justify-center">
            <Button size="full">
                {createArtistIsLoading ? <IconLoader2 className="animate-spin" /> : "Add artist"}
            </Button>
        </div>
    </form>
  )
}

export default ArtistCreateForm;