import { IRoute } from '../interfaces/routing';
import GridBlurredBackdrop from '../layout/components/community/Community';
import ContactFormWithSocialButtons from '../layout/components/contact/Contact';
import SplitScreen from '../layout/components/home/Home';

import NotFound from '../pages/sessions/404';
import InternalError from '../pages/sessions/500';
import SignIn from '../pages/sessions/Sign-in';
import SignUp from '../pages/sessions/Sign-up';

export const sessionRoutes: IRoute[] = [
  {
    path: 'page-404',
    component: NotFound
  },
  {
    path: 'page-500',
    component: InternalError
  },
  {
    path: 'sign-in',
    component: SignIn
  },
  {
    path: 'sign-up',
    component: SignUp
  },
  {
    path: 'home',
    component: SplitScreen
  },
  {
    path: 'contact',
    component: ContactFormWithSocialButtons
  },
  {
    path: 'community',
    component: GridBlurredBackdrop
  }
];
