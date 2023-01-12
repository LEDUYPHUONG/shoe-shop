import Dropdown from "react-bootstrap/Dropdown";
import { history } from "../../index";
import { logout } from "../../util/tools";

function HandleClickSignInOrJoin() {
  return (
    <>
      <Dropdown className="d-inline mx-2">
        <Dropdown.Toggle id="dropdown-autoclose-true">
          <i className="fa-solid fa-globe me-2 bg-transparent"></i>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            className="text-decoration-none"
            onClick={() => {
              alert('You will be redirected to the home page!')
              history.push('/');
              window.location.reload();
            }}
          >
            Profile
          </Dropdown.Item>
          <Dropdown.Item
            className="text-decoration-none"
            onClick={() => {
              logout();
            }}
          >
            Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export default HandleClickSignInOrJoin;
