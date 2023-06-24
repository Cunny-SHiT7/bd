import axios from "axios";

type GetMessageProps = {
  name: string;
  gender: "MALE" | "FEMALE";
};

export const getMessageFn = async (values: GetMessageProps) => {
  const { data } = await axios.post<{
    data: { message: string; voice: string };
  }>("http://localhost:4000/random", {
    name: values.name,
    gender: values.gender,
  });

  return data.data;
};
