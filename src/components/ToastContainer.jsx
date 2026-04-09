import React, { Component } from "react";
import PropTypes from "prop-types";

class ToastContainer extends Component {
  constructor(props) {
    super(props);
    console.log("ToastContainer constructor", props);
  }

  componentDidMount() {
    console.log("ToastContainer componentDidMount");
  }

  componentDidUpdate(prevProps) {
    console.log("ToastContainer componentDidUpdate", {
      previousToasts: prevProps.toasts,
      currentToasts: this.props.toasts,
    });
  }

  componentWillUnmount() {
    console.log("ToastContainer componentWillUnmount");
  }

  render() {
    const { toasts } = this.props;

    return (
      <div className="toast-container">
        {toasts.map((t) => (
          <div className="toast" key={t.id}>
            <span>{t.msg}</span>
          </div>
        ))}
      </div>
    );
  }
}

//prop validation
ToastContainer.propTypes = {
  toasts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      msg: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ToastContainer;
