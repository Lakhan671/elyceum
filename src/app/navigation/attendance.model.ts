import { FuseNavigationModelInterface } from '../core/components/navigation/navigation.model';

export class AtendanceNavigationModel implements FuseNavigationModelInterface
{
    public model: any[];

    constructor()
    {
        this.model = [
            {
                'id'      : 'HOME',
                'title'   : '',
                'translate': 'NAV.HOME',
                'url':'/Academics',
                'icon':'keyboard_backspace',
                'type'    : 'item',
                'children': [ 
                ]
            },   {
                'id'      : 'Dashboard',
                'title'   : 'Student Attendance',
                'translate': 'NAV.HOME',
                
                'url':'/Academics/attendance',
                'icon':'dashboard',
                'type'    : 'item',
                'children': [ 
                ]
            } ,   {
                'id'      : 'Dashboard',
                'title'   : 'Attendance History',
                'translate': 'NAV.HOME',
                
                'url':'/Academics/attendance/history',
                'icon':'dashboard',
                'type'    : 'item',
                'children': [ 
                ]
            } ,  {
                'id'      : 'Dashboard',
                'title'   : 'Teacher Attendance',
                'translate': 'NAV.HOME',
                
                'url':'/Academics',
                'icon':'dashboard',
                'type'    : 'item',
                'children': [ 
                ]
            } ,  {
                'id'      : 'Dashboard',
                'title'   : 'Staf Attendance',
                'translate': 'NAV.HOME',
                
                'url':'/Academics',
                'icon':'dashboard',
                'type'    : 'item',
                'children': [ 
                ]
            } 
        ];
    }
}
