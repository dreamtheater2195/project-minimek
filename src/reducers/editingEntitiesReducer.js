import { createReducer } from "common/utils/reducerUtils";
import schema from "../schema";
const defaultEditingEntities = schema.getDefaultState();
export default createReducer(defaultEditingEntities, {

}); 