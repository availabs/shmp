import { connect } from "react-redux"

// const FAKE_USER = {
//   groups: ["AVAIL"],
//   authLevel: 5,
//   authed: true,
//   id: 389
// }

export default Component => {
  const mapStateToProps = (state, props) => ({ user: state.user });
  return connect(mapStateToProps, null)(Component);
}
