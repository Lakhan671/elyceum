import { FuseNavigationModelInterface } from '../core/components/navigation/navigation.model';

export class RoomNavigationModel implements FuseNavigationModelInterface
{
    public model: any[];

    constructor()
    {
        this.model = [
            {
                'id'      : 'HOME',
                'title'   : '',
                'translate': 'NAV.HOME',
                'url':'/collabration/department',
                'icon':'keyboard_backspace',
                'type'    : 'item',
                'children': [ 
                ]
            },  {
                'id'      : 'Dashboard',
                'title'   : 'Room Type',
                'translate': 'NAV.HOME',
                
                'url':'/collabration/department/room',
                'icon':'view_compact',
                'type'    : 'item',
                'children': [ 
                ]
            }, {
                'id'      : 'Time table',
                'title'   : 'Room Name',
                'translate': 'NAV.time',
                
                'url':'/collabration/department/room/roomName',
                'icon':'history',
                'type'    : 'item',
                'children': [ 
                ]
            }    
        ];
    }
}
