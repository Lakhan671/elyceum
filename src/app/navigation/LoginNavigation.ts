import { FuseNavigationModelInterface } from '../core/components/navigation/navigation.model';

export class LoginFuseNavigationModel implements FuseNavigationModelInterface
{
    public model: any[];

    constructor()
    {
        this.model = [
            {
                'id'      : 'logo',
                'title'   : '',
                'translate': 'NAV.APPLICATIONS',
                'type'    : 'item',
                'url'  : '/auth/login',
                 'ImageShow': true,
                'side': '0%',

                'children': []
            },
            {
                'ImageShow': false,

                'id'      : 'Sign In',
                'title'   : 'Sign In',
                'translate': 'NAV.APPLICATIONS',
                'type'    : 'item',
                'url'  : '/auth/login',
                'side': '72%',

                'children': []
            },{
                'ImageShow': false,

                'id'      : 'Join Us',
                'title'   : 'Join Us',
                'translate': 'NAV.APPLICATIONS',
                'type'    : 'item',
                'url'  : '/auth/register',
                'side': '0',

                'children': []
            }
        ];
    }
}
