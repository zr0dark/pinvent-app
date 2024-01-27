import { FaTh, FaCommentAlt } from 'react-icons/fa'
import { MdAccountBox } from 'react-icons/md'
import { BiImageAdd } from 'react-icons/bi'

const menu = [
    {
        title: 'Dashboard',
        icon: <FaTh />,
        path: '/dashboard',
    },
    {
        title: 'Add Product',
        icon: <BiImageAdd />,
        path: '/add-product',
    },
    {
        title: 'Account',
        icon: <MdAccountBox size={25} />,
        childrens: [
            {
                title: 'Profile',
                path: '/profile',
            },
            {
                title: 'Edit Profile',
                path: '/edit-profile',
            },
        ],
    },
    {
        title: 'Report Bug',
        icon: <FaCommentAlt />,
        path: '/contact-us',
    },
]

export default menu
