import * as React from "react";
import * as yup from "yup";

import { FieldValues, useForm } from "react-hook-form";

import { open } from "@tauri-apps/api/dialog";
import { trpc } from "../../utils/trpc";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
  .object({
    name: yup.string().required(),
    path: yup.string().required(),
  })
  .required();

export const Create = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const mutation = trpc.useMutation("connection.add");

  const onSubmit = async (data: FieldValues) => {
    await mutation
      .mutateAsync({ name: data.name, path: data.path })
      .then(() => {
        navigate("/");
      });
  };

  const openFile = async () => {
    // Open a selection dialog for image files
    const selected = await open({
      multiple: false,
      filters: [
        {
          name: "Database",
          extensions: ["db"],
        },
      ],
    });

    setValue("path", typeof selected === "string" ? selected : "");
  };

  return (
    <div className="p-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} />
        <button type="button" onClick={openFile}>
          Open file
        </button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
