import Person from '../views/company/person/Person.vue'
import Duty from '../views/company/duty/Duty.vue'
let companys=[
    {
        path: '/company/person',
        name: 'Person',
        component: Person,
        // redirect: '/company/person',
        meta: { title: '人员管理' },
    },
    {
        path: '/company/duty',
        name: 'Duty',
        component: Duty,
        // redirect: '/company/duty',
        meta: { title: '值班信息' },
    },
]


export default companys;