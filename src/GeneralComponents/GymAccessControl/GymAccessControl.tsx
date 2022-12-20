import React, { useState, useEffect } from 'react';
import GymNoAccessPage from './GymNoAccessPage';
import { IApplicationState } from '../../Store/state';
import { connect } from 'react-redux';

type IProps = IApplicationState & {
    data: {
        roles: string[];
        withNoAccessPage?: boolean;
    }
    noAccessChildren?: any;
    children?: any;
}

const GymAccessControl = (props: IProps) => {
    const [hasAccess, setHasAccess] = useState<number>(0)
    useEffect(() => {
        let perm = false;
        props.data.roles.map((item: any) => {
            if (props.dashboard.userClaims.roles.some(x => x.toLocaleLowerCase() == item.toLocaleLowerCase()))
                perm = true;
        });
        if (props.dashboard.userClaims.roles.some(x => x.toLocaleLowerCase() == "OAuthAdminAdministrator".toLocaleLowerCase()))
            perm = true;
        if (perm)
            setHasAccess(1);
        else
            setHasAccess(2);
    }, [])
    return (
        <React.Fragment>
            {
                hasAccess == 1 ?
                    props.children
                    :
                    hasAccess == 2 ?
                        props.data.withNoAccessPage ?
                            <GymNoAccessPage />
                            :
                            props.noAccessChildren ?
                                props.noAccessChildren()
                                :
                                ""
                        : ""
            }
        </React.Fragment>
    );
}
export default connect(
    (state: IApplicationState) => state
)(GymAccessControl);
