import Controller from "./Controller.js";

const schema = Joi.object({
  sessionDate: Joi.date().required(),
  room: Joi.string(),
  movieId: Joi.string().required(),
});

export default class SessionController extends Controller {
  constructor() {
    super("session");
  }
}
