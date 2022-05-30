// @flow
import React, {useEffect, useRef, useState, useCallback} from 'react';
import { Link, useParams} from 'react-router-dom';
import SimpleBar from 'simplebar-react';


import { getMenuItems } from '../helpers/menu';

// components
import AppMenu from './Menu';

// images
import logoSm from '../assets/images/logo_tunap.png';
import logoDark from '../assets/images/logo_tunap.png';
import logoDarkSm from '../assets/images/logo_tunap.png';
import logo from '../assets/images/logo_tunap.png';
import profileImg from '../assets/images/users/avatar-1.jpg';

type SideBarContentProps = {
    hideUserProfile: boolean,
};

/* sidebar content */
const SideBarContent = ({ hideUserProfile }: SideBarContentProps) => {
    const {companyId} = useParams();
    const [menuItems, setMenuItems] = useState([]);

    const changeUrlFromMenuItems = (items) => {
        return items.map((item) => {
            item = Object.assign(item, {});

            if(item.hasOwnProperty('url')){
                if(!item.hasOwnProperty('temporalUrl')){
                    item.temporalUrl = item.url;
                } else {
                    item.url = item.temporalUrl;
                }

                item.url = '/panel/company/' + companyId + item.url;
            }

            if(item.hasOwnProperty('children')){
                item.children = changeUrlFromMenuItems(item.children);
            }

            return item;
        });
    };

    useEffect(() => {
        setMenuItems(changeUrlFromMenuItems(getMenuItems()));
    }, [companyId]);

    return (
        <>
            {!hideUserProfile && (
                <div className="leftbar-user">
                    <Link to="/">
                        <img src={profileImg} alt="" height="42" className="rounded-circle shadow-sm" />
                        <span className="leftbar-user-name">Dominic Keller</span>
                    </Link>
                </div>
            )}
            <AppMenu menuItems={menuItems} />

            <div className="clearfix" />
        </>
    );
};

type LeftSidebarProps = {
    hideLogo: boolean,
    hideUserProfile: boolean,
    isLight: boolean,
    isCondensed: boolean,
};

const LeftSidebar = ({ isCondensed, isLight, hideLogo, hideUserProfile }: LeftSidebarProps): React$Element<any> => {
    const menuNodeRef: any = useRef(null);

    /**
     * Handle the click anywhere in doc
     */
    const handleOtherClick = (e: any) => {
        if (menuNodeRef && menuNodeRef.current && menuNodeRef.current.contains(e.target)) return;
        // else hide the menubar
        if (document.body) {
            document.body.classList.remove('sidebar-enable');
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOtherClick, false);

        return () => {
            document.removeEventListener('mousedown', handleOtherClick, false);
        };
    }, []);

    return (
        <>
            <div className="leftside-menu" ref={menuNodeRef}>
                {!hideLogo && (
                    <>
                        <Link to="/" className="logo text-center logo-light">
                            <span className="logo-lg">
                                <img src={isLight ? logoDark : logo} alt="logo" height="40"  />
                            </span>
                            <span className="logo-sm">
                                <img src={isLight ? logoSm : logoDarkSm} alt="logo" height="40"   />
                            </span>
                        </Link>

                        <Link to="/" className="logo text-center logo-dark">
                            <span className="logo-lg">
                                <img src={isLight ? logoDark : logo} alt="logo" height="50"   />
                            </span>
                            <span className="logo-sm">
                                <img src={isLight ? logoSm : logoDarkSm} alt="logo" height="50"   />
                            </span>
                        </Link>
                    </>
                )}

                {!isCondensed && (
                    <SimpleBar style={{ maxHeight: '100%' }} timeout={500} scrollbarMaxSize={320}>
                        <SideBarContent
                            menuClickHandler={() => {}}
                            isLight={isLight}
                            hideUserProfile={hideUserProfile}
                        />
                    </SimpleBar>
                )}
                {isCondensed && <SideBarContent isLight={isLight} hideUserProfile={hideUserProfile} />}
            </div>
        </>
    );
};

LeftSidebar.defaultProps = {
    hideLogo: false,
    hideUserProfile: false,
    isLight: false,
    isCondensed: false,
};

export default LeftSidebar;
