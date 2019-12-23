import { FuseNavigationModelInterface } from '../core/components/navigation/navigation.model';

export class DepartmentNavigationModel implements FuseNavigationModelInterface
{
    public model: any[];

    constructor()
    {
        this.model = [
            {
                'id'      : 'HOME',
                'title'   : '',
                'translate': 'NAV.HOME',
                'url':'/collabration',
                'icon':'keyboard_backspace',
                'type'    : 'item',
                'children': [ 
                ]
            },  {
                'id'      : 'Dashboard',
                'title'   : 'Department',
                'translate': 'NAV.HOME',
                
                'url':'/collabration/department',
                'icon':'view_compact',
                'type'    : 'item',
                'children': [ 
                ]
            }, {
                'id'      : 'Time table',
                'title'   : 'Course',
                'translate': 'NAV.time',
                
                'url':'/collabration/department/course',
                'icon':'history',
                'type'    : 'item',
                'children': [ 
                ]
            }, {
                'id'      : 'group',
                'title'   : 'Branch',
                'translate': 'NAV.group',
                
                'url':'/collabration/department/branch',
                'icon':'group_work',
                'type'    : 'item',
                'children': [ 
                ]
            }, {
                'id'      : 'group',
                'title'   : 'Session',
                'translate': 'NAV.group',
                
                'url':'/collabration/department/session',
                'icon':'group_work',
                'type'    : 'item',
                'children': [ 
                ]
            }, {
                'id'      : 'group',
                'title'   : 'semister',
                'translate': 'NAV.group',
                
                'url':'/collabration/department/semister',
                'icon':'group_work',
                'type'    : 'item',
                'children': [ 
                ]
            },{
                'id'      : 'group',
                'title'   : 'Room',
                'translate': 'NAV.group',
                
                'url':'/collabration/department/room',
                'icon':'group_work',
                'type'    : 'item',
                'children': [ 
                ]
            },{
                'id'      : 'group',
                'title'   : 'Section',
                'translate': 'NAV.group',
                
                'url':'/collabration/department/section',
                'icon':'group_work',
                'type'    : 'item',
                'children': [ 
                ]
            }       
        ];
    }
}
