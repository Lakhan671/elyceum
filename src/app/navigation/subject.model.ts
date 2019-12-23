import { FuseNavigationModelInterface } from '../core/components/navigation/navigation.model';

export class SubjectNavigationModel implements FuseNavigationModelInterface
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
                'id'      : 'Calendar Type',
                'title'   : 'Subject',
                'translate': 'NAV.HOME',
                
                'url':'/subject',
                'icon':'view_compact',
                'type'    : 'item',
                'children': [ 
                ]
            } 
        ];
    }
}
