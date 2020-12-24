import React from 'react';
import { Stack } from '@chakra-ui/core';

import appstoreImage from './assets/appstore.svg';
import googlePlayImage from './assets/google-play.svg';

export const iOsAppUrl =
  'https://apps.apple.com/sg/app/tigerhall/id1450973021?utm_source=website&utm_medium=appicon&utm_campaign=web';

export const androidAppUrl =
  'https://play.google.com/store/apps/details?id=com.tigerhall&hl=en&utm_source=website&utm_medium=appicon&utm_campaign=web';

export default function DownloadAppButtons({ ...props }) {
  return (
    // eslint-disable-next-line react/jsx-no-undef
    <Stack {...props} direction="row" spacing={8}>
      <a href={androidAppUrl} rel="nofollow">
        <img
          src={googlePlayImage}
          alt="Download mobile application form google play"
          style={{
            padding: '10px'
          }}
        />
      </a>
      <a href={iOsAppUrl}>
        <img
          src={appstoreImage}
          alt="Download mobile application form app store"
          style={{
            padding: '10px'
          }}
        />
      </a>
    </Stack>
  );
}
