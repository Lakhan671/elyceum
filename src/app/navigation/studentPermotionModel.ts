import { FuseNavigationModelInterface } from '../core/components/navigation/navigation.model';

export class studentPermotionModel implements FuseNavigationModelInterface
{
    public model: any[];

    constructor()
    {
        this.model = [
            {
                'id'      : 'HOME',
                'title'   : '',
                'translate': 'NAV.HOME',
                'url':'/student',
                'icon':'keyboard_backspace',
                'type'    : 'item',
                'children': [ 
                ]
            },  {
                'id'      : 'Dashboard',
                'title'   : 'Student Permotion Type',
                'translate': 'NAV.HOME',
                
                'url':'/student/Permotion/type',
                'icon':'view_compact',
                'type'    : 'item',
                'children': [ 
                ]
            }, {
                'id'      : 'Time table',
                'title'   : 'Student Permotion',
                'translate': 'NAV.time',
                
                'url':'/student/Permotion/save',
                'icon':'history',
                'type'    : 'item',
                'children': [ 
                ]
            }     
        ];
    }
}
