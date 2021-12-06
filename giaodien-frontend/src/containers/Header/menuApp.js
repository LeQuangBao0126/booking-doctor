export const adminMenu = [
    { // quản lý ng dùng
        name: 'menu.system.header', menus: [
            {
                name: 'menu.admin.manage-doctor',
                link: '/system/user-doctor'
            },
            {
                name: 'menu.admin.manage-admin',
                link: '/system/user-admin'
            },
            {
                name: 'menu.admin.crud-redux',
                link: '/system/user-redux'
            },
            {
                name: 'menu.admin.manage-doctor',
                link: '/system/manage-doctor'
            },
            {
                name: 'menu.doctor.manage-schedule',
                link: '/doctor/manage-schedule'
            }
        ]
    },
    { // quản lý phòng khám
        name: 'menu.admin.clinic',
        menus: [
            {
                name: 'menu.admin.manage-clinic',
                link: '/system/manage-clinic'
            }
        ]
    },
    { // quản lý chuyên khoa
        name: 'menu.admin.specialty',
        menus: [
            {
                name: 'menu.admin.manage-specialty',
                link: '/system/manage-specialty'
            }
        ]
    },
    { // quản lý cẩm nang
        name: 'menu.admin.handbook',
        menus: [
            {
                name: 'menu.admin.manage-handbook',
                link: '/system/manage-handbook'
            }
        ]
    },
    //quản lý lịch trình khám bệnh của bác sĩ
    {
        name: 'menu.doctor.manage-schedule',
        menus: [
            {
                name: 'menu.doctor.manage-schedule',
                link: '/doctor/manage-schedule'
            }
        ]
    },
];
//menu cho bac sĩ
export const doctorMenu = [
    {
        name: 'menu.doctor.manage-schedule',
        menus: [
            {
                name: 'menu.doctor.manage-schedule',
                link: '/doctor/manage-schedule'
            }
        ]
    },
]

                // subMenus: [
                //     {  name: 'menu.system.system-administrator.user-manage', 
                //        link: '/system/user-manage'
                //     },
                //     { name: 'menu.system.system-administrator.user-manage-redux',
                //       link: '/system/user-redux' 
                //     },
                // ]