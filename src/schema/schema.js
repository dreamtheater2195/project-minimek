import { Schema } from "redux-orm";

import Pilot from '../models/Pilot';
import MechDesign from '../models/MechDesign';
import Mech from '../models/Mech';

const schema = new Schema();
schema.register(Pilot, MechDesign, Mech);

export default schema; 