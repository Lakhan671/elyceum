import { FuseNavigationModelInterface } from '../core/components/navigation/navigation.model';

export class studentNavigationModel implements FuseNavigationModelInterface
{
    public model: any[];

    constructor()
    {
        this.model = [
            {
                'id'      : 'HOME',
                'title'   : '',
                'translate': 'NAV.HOME',
                'url':'/home',
                'icon':'keyboard_backspace',
                'type'    : 'item',
                'children': [ 
                ]
            },  {
                'id'      : 'Dashboard',
                'title'   : 'Add Student',
                'translate': 'NAV.HOME',
                
                'url':'/student',
                'icon':'view_compact',
                'type'    : 'item',
                'children': [ 
                ]
            }, {
                'id'      : 'Time table',
                'title'   : 'Student Permotion',
                'translate': 'NAV.time',
                
                'url':'/student/Permotion',
                'icon':'history',
                'type'    : 'item',
                'children': [ 
                ]
            }      
        ];
    }
}
