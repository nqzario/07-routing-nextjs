"use client";
import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import Modal from "@/components/Modal/Modal";
import css from "./NotePreview.module.css";

const NotePreview = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  // ✅ повертаємо Note напряму
  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id).then((res) => res.note),
    refetchOnMount: false,
  });

  const handleClick = () => {
    router.back();
  };

  if (isLoading) return <Loader />;
  if (isError) return <ErrorMessage />;
  if (!note) return <p>Note not found</p>;

  const formattedDate = note.updatedAt
    ? `Updated at: ${note.updatedAt}`
    : note.createdAt
    ? `Created at: ${note.createdAt}`
    : "";

  return (
    <Modal onClose={handleClick}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <button onClick={handleClick} className={css.backBtn}>
              Go Back
            </button>
            <h2>{note.title}</h2>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{formattedDate}</p>
        </div>
      </div>
    </Modal>
  );
};

export default NotePreview;
