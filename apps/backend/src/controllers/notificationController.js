import {
  listNotifications,
  readNotification,
} from "../services/notificationService.js";
export async function list(req, res, next) {
  try {
    res.json({ data: await listNotifications(req.user.id) });
  } catch (e) {
    next(e);
  }
}
export async function read(req, res, next) {
  try {
    const x = await readNotification(req.params.id, req.user.id);
    if (!x) {
      const e = new Error("Notification introuvable.");
      e.statusCode = 404;
      throw e;
    }
    res.json({ data: x });
  } catch (e) {
    next(e);
  }
}
