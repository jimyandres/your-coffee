import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HomePage} from '../pages/home/home';
import {ProfilePage} from '../pages/profile/profile';
import {AboutPage} from '../pages/about/about';
import {SearchPage} from "../pages/search/search";
import {LoginPage} from "../pages/login/login";

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = HomePage;

    pages: Array<{ title: string, component: any, icon: string }>;

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
        this.initializeApp();

        // used for an example of ngFor and navigation
        this.pages = [
            // {title: 'Perfil', component: ProfilePage, icon: 'contact'},
            {title: 'Iniciar sesión', component: LoginPage, icon: 'log-in'},
            {title: 'Página principal', component: HomePage, icon: 'cafe'},
            {title: 'Acerca de', component: AboutPage, icon: 'information-circle'},
            // {title: 'List', component: ListPage, icon: 'left-arrow'}
        ];

    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }

    searchPage() {
        // Redirect to the search page
        this.nav.push(SearchPage);
    }
}
