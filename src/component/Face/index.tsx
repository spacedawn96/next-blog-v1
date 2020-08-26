import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import card from './card.module.scss';

const FaceTap = styled.div``;

export type FaceProps = {
  username?: string;
  followHandleSubmit?: any;
  error: any;
  unFollowHandleSubmit?: any;
  unfollowError?: any;
  BooleanIsFollowing: any;
};

function Face(props: FaceProps) {
  const dotClass = classNames(`${card.dot} ${card.two}`);
  const eyeClass = classNames(`${card.eye} ${card.right}`);
  const mouthClass = classNames(`${card.mouth} ${card.happy}`);
  const mouthSadClass = classNames(`${card.mouth} ${card.sad}`);
  const shadowClass = classNames(`${card.shadow} ${card.scale}`);
  const moveClass = classNames(`${card.shadow} ${card.move}`);

  return (
    <>
      {props.error || props.unfollowError ? (
        <div className={card.container}>
          <div className={card.errorBox}>
            <div className={card.dot} />
            <div className={dotClass} />
            <div className={card.face2}>
              <div className={card.eye} />
              <div className={eyeClass} />
              <div className={mouthSadClass} />
            </div>
            <div className={moveClass} />
            <div className={card.message}>
              <h1 className={card.alert}>Error!</h1>
              <p>oh no, something went wrong.</p>
            </div>
            <button className={card.buttonBox}>
              <h1 className={card.red}>try again</h1>
            </button>
          </div>
        </div>
      ) : (
        <div className={card.container}>
          <div className={card.successBox}>
            <div className={dotClass} />
            <div className={card.dot} />
            <div className={card.face}>
              <div className={card.eye} />
              <div className={eyeClass} />
              <div className={mouthClass} />
            </div>
            <div className={shadowClass} />
            <div className={card.message}>
              <h1 className={card.alert}>Follow me!</h1>
              <div>By {props.username}</div>
            </div>
            {props.BooleanIsFollowing ? (
              <button className={card.buttonBox} onClick={props.unFollowHandleSubmit}>
                <h1 className={card.green}>
                  <span>Unfollow</span>
                </h1>
              </button>
            ) : (
              <button className={card.buttonBox} onClick={props.followHandleSubmit}>
                <h1 className={card.green}>
                  <span>Follow</span>
                </h1>
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Face;
