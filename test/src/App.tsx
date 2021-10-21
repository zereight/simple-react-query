import { useQuery, useMutation } from "simple-react-query";
import {} from "react-query";

const App = () => {
  const { data } = useQuery<string>({
    enabled: false,
    query: async () => {},
    onSuccess: () => {},
    refetchInterval: 2
  });

  return <h1>Hello World</h1>;
};

export default App;
