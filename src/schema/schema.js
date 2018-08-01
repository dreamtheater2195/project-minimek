import { ORM } from "redux-orm";

import Pilot from '../models/Pilot';
import MechDesign from '../models/MechDesign';
import Mech from '../models/Mech';

const orm = new ORM();
orm.register(Pilot, MechDesign, Mech);

export default orm; 