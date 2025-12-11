"use client";
import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import css from "./NoteDetails.module.css";

const NoteDetails = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  // ✅ Повертаємо Note напряму
  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id).then((res) => res.note), // повертаємо саме Note
    refetchOnMount: false,
  });

  const handleClick = () => {
    router.back();
  };

  if (isLoading) return <Loader />;
  if (isError) return <ErrorMessage />;
  if (!note) return <p>Note not found</p>; // на випадок, якщо note немає

  const formattedDate = note.updatedAt
    ? `Updated at: ${note.updatedAt}`
    : note.createdAt
    ? `Created at: ${note.createdAt}`
    : "";

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <button onClick={handleClick}>Go Back</button>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{formattedDate}</p>
      </div>
    </div>
  );
};

export default NoteDetails;
