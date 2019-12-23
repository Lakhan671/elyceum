import { FuseNavigationModelInterface } from '../core/components/navigation/navigation.model';

export class TeacherNavigationModel implements FuseNavigationModelInterface
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
            },  {
                'id'      : 'Dashboard',
                'title'   : 'Teacher',
                'translate': 'NAV.HOME',
                
                'url':'/teacher',
                'icon':'dashboard',
                'type'    : 'item',
                'children': [ 
                ]
            } 
        ];
    }
}
