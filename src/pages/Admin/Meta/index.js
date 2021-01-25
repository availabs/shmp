import { metaDoc } from './metadocs.type'
import PageManager from './components/PageManager'
import PageEdit from './components/PageEdit'
import { API_HOST } from 'config'
// import PageView from './components/PageView'


let config = {
    type: 'div',
    wrappers: [
        "dms-manager",
        {
            type:"dms-provider",
            options: {
                imgUploadUrl: `${ API_HOST }/img/new`,
            }
        },
        "dms-router",
        "show-loading",
        "dms-falcor",
        "with-auth"
      ],
    props: {
        format: metaDoc,
        title: "Documentation",
    },
    children: [
        {
            type: PageManager,
            props: { dmsAction: "list" }
        },
        {
            type: PageEdit,
            props: { dmsAction: "create" },
            wrappers: ["dms-create", "with-auth"]
        },

        {
            type: PageEdit,
            props: { dmsAction: "edit" },
            wrappers: ["dms-edit", "with-auth"]
        }
    ]
}

export default {
    path: "/meta",
    mainNav: false,
    // exact: true,
    auth: true,
    name: 'Meta',
    authLevel: 5,
    icon: '',
    layout: 'Simple',
    layoutSettings: {
        fixed: true,
        nav: 'side',
        maxWidth: '',
        headerBar: false,
        
    },
    component: config
}
