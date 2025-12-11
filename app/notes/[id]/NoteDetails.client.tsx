"use client";
import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import css from "./NoteDetails.module.css";
import { useRouter } from "next/navigation";

const NoteDetails = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const handleClick = () => {
    router.back();
  };

  const formattedDate = data
    ? data.note.updatedAt
      ? `Updated at: ${data.note.updatedAt}`
      : `Created at: ${data.note.createdAt}`
    : "";

  if (isLoading) return <Loader />;
  if (isError) return <ErrorMessage />;
  if (!data) return null;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <button onClick={handleClick}>Go Back</button>
          <h2>{data.note.title}</h2>
        </div>
        <p className={css.content}>{data.note.content}</p>
        <p className={css.date}>{formattedDate}</p>
      </div>
    </div>
  );
};

export default NoteDetails;
