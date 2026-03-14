import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "components/ui/Button.tsx";
import { Input } from "components/ui/Input.tsx";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { z } from "zod";



import { useEffect, useMemo, useRef } from "react";

import { apiFetch } from "../../../../api/apiClient.ts";
import { getUser } from "../../../../store/slice/userSlice.ts";
import { useHomeUi } from "components/ui/HomeUiContext.tsx";


const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const createPlaylistSchema = z.object({
  title: z.string().trim().min(2, "Title at least 2 characters").max(40, "Title maximum 40 characters"),
  name: z.string().trim().min(2, "Name at least 2 characters").max(40, "Name maximum 40 characters"),
  isBlackTitle: z.boolean().default(false),
  image: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, "File too large (up to 2MB)")
    .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), "JPG/PNG/WEBP only"),
});

export default function CreatePlaylistModal() {
  const user = useSelector(getUser);
  const fileInputRef = useRef(null);

  const { playlistModalOpen, closePlaylistModal } = useHomeUi();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createPlaylistSchema),
    defaultValues: {
      title: "",
      name: "",
      isBlackTitle: false,
      image: undefined,
    },
    mode: "onChange",
  });

  const imageFile = watch("image");

  const previewUrl = useMemo(() => {
    if (!imageFile) return null;
    return URL.createObjectURL(imageFile);
  }, [imageFile]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  useEffect(() => {
    if (!playlistModalOpen) reset();
  }, [playlistModalOpen, reset]);

  const onSubmit = async (data) => {
    if (!user) return;

    const fd = new FormData();

    // Краще назви як у DTO на бекенді (PascalCase), щоб без сюрпризів
    fd.append("Name", data.name);
    fd.append("Title", data.title);
    fd.append("UserId", user.id);
    fd.append("IsBlackTitle", String(data.isBlackTitle));

    if (data.image instanceof File) {
      fd.append("Image", data.image);
    }

    const res = await apiFetch("/api/playlist", {
      method: "POST",
      body: fd,
    });

    if (!res.ok) {
      console.error("Create playlist failed:", res.status, await res.text().catch(() => ""));
      return;
    }

    console.log("Created:", await res.json().catch(() => null));
    closePlaylistModal();
  };

  const triggerImagePick = () => {
    fileInputRef.current?.click();
  };

  const onPickImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // важливо: прокидаємо в RHF і одразу валідимо
    setValue("image", file, { shouldValidate: true, shouldDirty: true });

    // щоб можна було вибрати той самий файл вдруге
    e.target.value = "";
  };

  return (
    <div className={`${!playlistModalOpen && "hidden"} w-screen h-screen fixed flex items-center justify-center bg-[#0F0F10]/[60%] text-white z-20`}>
      <div className="flex flex-col items-center gap-y-[20px]">
        <div className="bg-[#464646] p-[48px] rounded-[20px] flex flex-col gap-y-[32px]">
          <div className="font-semibold text-center font-poppins text-[32px] text-[#F16001]">
            Create New Playlist
          </div>

          <div className="flex gap-[64px]">
            <div className="w-[273px] h-[314px] flex flex-col justify-between items-center p-[20px] border rounded-[16px]">
              <div className="group w-[233px] h-[233px] relative rounded-[36px] flex items-center justify-center bg-[#555555] overflow-hidden">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="preview"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : null}

                  <div className={`w-full h-full absolute flex items-center rounded-[36px] ${!previewUrl && "bg-[#525252]"} justify-center z-30 group-hover:hidden`}>
                    <div className={`font-semibold font-poppins text-[16px] z-20 text-${watch("isBlackTitle") ? "black" : "white"}`}>{watch("title").toUpperCase()}</div>
                  </div>

                <div
                  className="w-full h-full absolute flex items-center rounded-[36px] bg-[#525252]/70 justify-center hover:cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={triggerImagePick}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === "Enter" ? triggerImagePick() : null)}
                >
                  <img src="/assets/icons/icon18.svg" alt="icon" className="h-[20%]" />
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={onPickImage}
                />
              </div>

              <div className="font-bold font-inter text-[16px]">
                {watch("name")}
              </div>

              {errors.image && (
                <div className="text-[12px] text-red-300 text-center">
                  {errors.image.message}
                </div>
              )}
            </div>

            <form className="flex flex-col justify-between p-[20px]" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-[24px]">
                <div className="w-[340px] h-[52px]">
                  <Input
                    placeholder="Title"
                    autoComplete="title"
                    {...register("title")}
                  />
                  {errors.title && (
                    <div className="text-[12px] text-red-300 mt-1">{errors.title.message}</div>
                  )}
                </div>

                <div className="w-[340px] h-[52px]">
                  <Input
                    placeholder="Name"
                    autoComplete="name"
                    {...register("name")}
                  />
                  {errors.name && (
                    <div className="text-[12px] text-red-300 mt-1">{errors.name.message}</div>
                  )}
                </div>

                <div className="flex items-center gap-3 pl-[10px]">
                  <input
                    id="isBlackTitle"
                    type="checkbox"
                    className="h-5 w-5 rounded-[5px] bg-transparent border-white hover:cursor-pointer"
                    {...register("isBlackTitle")}
                  />
                  <label htmlFor="isBlackTitle" className="font-normal font-poppins text-[16px]">
                    Black Title
                  </label>
                </div>
              </div>

              <div className="w-[340px] h-[52px] mt-8">
                <Button
                  type="submit"
                  className="bg-[#F3792A] font-medium text-[18px] w-full h-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating..." : "Create"}
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div
          className="font-semibold font-poppins text-[24px] text-[#919090] hover:cursor-pointer"
          onClick={closePlaylistModal}
        >
          Close
        </div>
      </div>
    </div>
  );
}