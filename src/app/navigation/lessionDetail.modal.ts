import { FuseNavigationModelInterface } from '../core/components/navigation/navigation.model';

export class lessionDetailNavigationModel implements FuseNavigationModelInterface
{
    public model: any[];

    constructor()
    {
        this.model = [
            {
                'id'      : 'HOME',
                'title'   : '',
                'translate': 'NAV.HOME',
                'url':'/subject/Detail/Unit/lession',
                'icon':'keyboard_backspace',
                'type'    : 'item',
                'children': [ 
                ]
            },  {
                'id'      : 'Dashboard',
                'title'   : 'lession Detail',
                'translate': 'NAV.HOME',
                
                'url':'/subject/Detail/lession/detail',
                'icon':'view_compact',
                'type'    : 'item',
                'children': [ 
                ]
            }     
        ];
    }
}
