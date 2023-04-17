import { API_BASE_URL } from 'fby-common/dist/config';
import get from 'lodash/get';
import { setMemberships } from 'fby-common/dist';
import { checkUser } from 'redux/services';
import { getSpace } from '../space/spaceService';

export const fetchUserMemberships = payload => async (dispatch, getState) => {
  let headers = new Headers();
  const session = await checkUser(dispatch);

  if (get(session, 'sessionId')) {
    const body = JSON.stringify({ userId: get(getState().authReducer, 'currentUser.userId', '') });

    headers.append('Content-Type', 'application/json');
    headers.append(
      'Authorization',
      `Bearer ${get(session, 'sessionId')}`,
    );
    const requestOptions = {
      method: 'POST',
      headers,
      body,
    };

    // const response = await fetch(
    //   `${API_BASE_URL}/v1/user/memberships`,
    //   requestOptions,
    // );
    // const payloadData = await response.json();
    // if (response.status === 200) {
    //   let memberships = {};
    //   let spaceIds = [];
    //   payloadData.memberships
    //     .forEach(element => {
    //       if(element.type === 'space') {
    //         spaceIds.push(element.id);
    //       }
    //       memberships[element.id] = element;
    //     });
    //   spaceIds.length && dispatch(getSpace({spaceIds}));
    //   dispatch(setMemberships({ memberships: memberships }));
    // }
  }

}