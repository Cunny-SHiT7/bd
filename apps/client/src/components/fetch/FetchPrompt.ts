export const fetchPrompt = async (name: string) => {
  console.log("begin fetching");
  console.log(name);
  const response = await fetch("http://localhost:4000/random", {
    method: "POST",
    body: JSON.stringify({
      name,
      gender: "MALE",
    }),
  });
  console.log(response);
  const res = await response.json();

  return res;
};
