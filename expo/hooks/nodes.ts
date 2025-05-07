import { useQuery } from "@tanstack/react-query";
import { getNodesByType } from "@/services/sanity";

export const useNodesByType = (type: string) => {
  return useQuery({
    queryKey: ['nodes', type],
    queryFn: () => getNodesByType(type),
  });
};
// const { data: sanityQuestions, isLoading } = useQuery({
//   queryKey: ["intro-assessment-questions"],
//   queryFn: async () => {
//     const query = `*[_type == "node" && type == "intro_assessment"] {
//       _id,
//       title,
//       description,
//       "questions": questions[] {
//         _key,
//         question,
//         type,
//         options
//       }
//     }`;
//     return client.fetch(query);
//   },
// });

