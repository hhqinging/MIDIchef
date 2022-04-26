import { useParams } from "react-router-dom";

function UserScreen() {
  const params = useParams();
  const { creator } = params;
  return (
    <div>
      <h1>{creator}</h1>
    </div>
  );
}
export default UserScreen;
