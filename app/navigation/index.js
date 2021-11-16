import React from 'react';

import { AuthenticatedUserProvider } from './AuthenticatedUserProvider';
import RootNavigator from './RootNavigator';

// all providers are wrapped here

export default function Routes() {
    return (
        <AuthenticatedUserProvider>
            <RootNavigator />
        </AuthenticatedUserProvider>
    );
};