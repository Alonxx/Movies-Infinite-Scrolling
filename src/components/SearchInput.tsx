"use client";
import React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui";
import { useMoviesDataStore } from "@/stores";

const SearchSchema = z.object({
  title: z.string().min(1).max(10),
});

type TSearchSchema = z.infer<typeof SearchSchema>;

export const SearchInput: React.FC<{
  onHandlerResult: (title: string | undefined, error: boolean) => void;
}> = ({ onHandlerResult }) => {
  const {
    register,
    formState: { errors },
    getValues,
    setError,
    clearErrors,
    setValue,
  } = useForm<TSearchSchema>({
    resolver: zodResolver(SearchSchema),
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearErrors("title");
    try {
      const { value } = event.target;
      const parseSchema = SearchSchema.parse({ title: value });
      onHandlerResult(parseSchema.title, false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError("title", {
          type: "manual",
          message: error.issues[0].message,
        });
      }
      onHandlerResult(undefined, true);
    }
  };

  const { storedSearchTerm } = useMoviesDataStore();

  React.useEffect(() => {
    if (!storedSearchTerm) return;
    setValue("title", storedSearchTerm);
    onHandlerResult(storedSearchTerm, false);
  }, []);

  return (
    <div>
      <Input
        {...register("title", {
          onChange: handleSearchChange,
        })}
        placeholder="🔍 Type a movie name ..."
      />

      {errors.title && (
        <span className="text-red-600 text-sm md:text-lg">
          {errors.title.message}
        </span>
      )}
    </div>
  );
};
