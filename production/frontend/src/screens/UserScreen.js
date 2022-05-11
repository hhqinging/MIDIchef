import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function UserScreen() {
  const params = useParams();
  const { creator } = params;
  const dispatch = useDispatch();

  return (
    <div>
      {/* <h1>{creator}</h1> */}
      <div>
        <img
          src="https://images.unsplash.com/photo-1616256605281-c37b1ebdf281?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGhvcml6b250YWx8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
          alt="ranpic"
          backdropFilter="blur(200px)"
          style={{
            width: "100%",
            height: "200px",
            opacity: "0.4",
          }}
        />
      </div>
      <div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1616256605281-c37b1ebdf281?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGhvcml6b250YWx8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
            alt="ranpic"
            style={{ width: "250px", height: "250px", borderRadius: "100%" }}
          />
        </div>
      </div>
    </div>
  );
}
export default UserScreen;
