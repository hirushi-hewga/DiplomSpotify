import { z } from "zod";
import { ACCEPTED_IMAGE_MIME_TYPES, MAX_FILE_SIZE } from "components/constants/index.ts";

export const ArtistCreateSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Minimum 2 characters"})
    .max(50, { message: "Maximum 50 characters"}),

  image: z
    .any()
    .transform(fileList => fileList instanceof FileList ? fileList[0] : fileList) // Вилучаємо перший файл з FileList
    .refine((file) => file !== null, "Image is required")
    .refine((file) => file.size <= MAX_FILE_SIZE, "Max file size - 10MB")
    .refine((file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file.type),
      "Only .jpg .jpeg .png .webp")
});

export type ArtistCreateSchemaType = z.infer<typeof ArtistCreateSchema>;

export const ArtistEditSchema = z.object({
  id: z.string(),

  name: z
    .string()
    .min(2, { message: "Minimum 2 characters"})
    .max(50, { message: "Maximum 50 characters"}),

  image: z
    .any()
    .transform(file => file ? file : null)
    .refine((file) => file.size <= MAX_FILE_SIZE, "Max file size - 10MB")
    .refine((file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file.type),
      "Only .jpg .jpeg .png .webp") 
})

export type ArtistEditSchemaType = z.infer<typeof ArtistEditSchema>;