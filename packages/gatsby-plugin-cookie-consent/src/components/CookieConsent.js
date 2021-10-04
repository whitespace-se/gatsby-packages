import { Link as DefaultLink } from "@whitespace/components";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import * as cookieConsentStyles from "./CookieConsent.module.css";

CookieConsent.propTypes = {
  active: PropTypes.bool,
  position: PropTypes.string,
  approveButton: PropTypes.node,
  declineButton: PropTypes.node,
  description: PropTypes.string,
  moreLinkText: PropTypes.string,
  moreLinkUrl: PropTypes.string,
  title: PropTypes.string,
  onAccept: PropTypes.func,
  onDeny: PropTypes.func,
  className: PropTypes.string,
  styles: PropTypes.objectOf(PropTypes.string),
  components: PropTypes.objectOf(PropTypes.node),
};

export default function CookieConsent({
  active = true,
  position,
  approveButton,
  declineButton,
  description,
  moreLinkText,
  moreLinkUrl,
  title,
  onAccept,
  onDeny,
  className,
  styles = cookieConsentStyles,
  components: { Link } = { Link: DefaultLink },
  ...restProps
}) {
  return (
    active && (
      <div
        className={clsx(
          styles.component,
          position && styles[position],
          className,
        )}
        role="region"
        aria-live="polite"
        aria-labelledby="ccTitle"
        aria-describedby="ccDesc"
        {...restProps}
      >
        <div role="document" className={clsx(styles.wrapper)} tabIndex="0">
          <h2 id="ccTitle" className={clsx(styles.title)}>
            {title}
          </h2>
          <p id="ccDesc" className={clsx(styles.description)}>
            {description}{" "}
            {moreLinkUrl && (
              <Link className={clsx(styles.more)} to={moreLinkUrl}>
                {moreLinkText}
              </Link>
            )}
          </p>

          <div className={clsx(styles.buttonGroup)}>
            {declineButton && (
              <button
                className={clsx(styles.button, styles.buttonDecline)}
                type="button"
                onClick={onDeny}
              >
                {declineButton}
              </button>
            )}
            {approveButton && (
              <button
                className={clsx(styles.button, styles.buttonApprove)}
                type="button"
                onClick={onAccept}
              >
                {approveButton}
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
}
