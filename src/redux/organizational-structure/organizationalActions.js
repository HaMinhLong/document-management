import * as actions from "./organizationalTypes";
import { organizational } from "../../data/organizational.json";
import { departments } from "../../data/departments.json";

export const fetchOrganizationalStructure = () => async (dispatch) => {
  try {
    const data = organizational;
    dispatch({
      type: actions.FETCH_ORGANIZATIONAL_STRUCTURE,
      payload: data,
    });
  } catch (error) {
    console.log("Error Fetch Organizational Structure: " + error.message);
  }
};
