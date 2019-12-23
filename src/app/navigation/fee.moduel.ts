import { FuseNavigationModelInterface } from '../core/components/navigation/navigation.model';

export class feeNavigationModel implements FuseNavigationModelInterface
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
                'title'   : 'Fee Type',
                'translate': 'NAV.HOME',
                
                'url':'/Academics/fee/feeType',
                'icon':'view_compact',
                'type'    : 'item',
                'children': [ 
                ]
            } ,  {
                'id'      : 'Dashboard',
                'title'   : 'Fee',
                'translate': 'NAV.HOME',
                
                'url':'/Academics/fee',
                'icon':'view_compact',
                'type'    : 'item',
                'children': [ 
                ]
            }    
        ];
    }
}
