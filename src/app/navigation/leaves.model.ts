import { FuseNavigationModelInterface } from '../core/components/navigation/navigation.model';

export class LeavesNavigationModel implements FuseNavigationModelInterface
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
                'id'      : 'LEAVETYPE',
                'title'   : 'leave Type',
                'translate': 'NAV.HOME',
                
                'url':'/Academics/leaves/leaveType',
                'icon':'view_compact',
                'type'    : 'item',
                'children': [ 
                ]
            } ,  {
                'id'      : 'LEAVETYPE',
                'title'   : 'leaves',
                'translate': 'NAV.HOME',
                
                'url':'/Academics/leaves',
                'icon':'view_compact',
                'type'    : 'item',
                'children': [ 
                ]
            }    
        ];
    }
}
