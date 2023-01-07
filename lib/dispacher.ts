export default function reducer(state, action) {
  if (action.type === "notification") {
    return {
      notification: state.notification,
    };
  }
  throw Error("Unknown action.");
}
